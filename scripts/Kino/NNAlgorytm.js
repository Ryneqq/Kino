function NNAlgorithm() {
    this.start; // miejsce od którego wyznaczamy algorytm
    this.index;
    this.count;
    this.reserve;



    this.FindStart = function() {
        var empty; // pierwsze puste siedzenie
        var clicked; // pierwsze klikniete siedzenie (wybrane)

        for (var i = 0; i < seat.length; i++) {
            if (!clicked && seat[i].clicked) {
                clicked = seat[i];
                this.index = i;
                break;
            } else if (!empty && !seat[i].taken) {
                empty = seat[i];
                this.index = i;
            }
        }

        if (clicked) {
            return clicked;
        } else if (empty) {
            return empty;
        } else {
            return null; // oznacza to, że nie ma już wolnych miejsc
        }
    }

    this.ComputeDistance = function() {
        var freeseats = [];

        var col = 16;
        var rows = 6;

        var costR = 10;
        var costC = 160;

        //this.index = 51; // <- debugowanie
        seat[this.index].dist = 0;

        var n = this.index % col // w którym rzędzie jesteśmy
        var ix = this.index; // index siedzenia poczatkowego

        if (n > 0) {
            // nie jesteśmy w pierwszym rzędzie
            for (var i = this.index - col; i % col > 0; i -= col) {
                seat[i].dist = seat[i + col].dist + costC;
                ix -= col;
            }
        }
        // już jesteśmy

        // wypełniamy tablicę wartościami
        for (var k = ix, l = 0; k < 96; k += col, l++) {
            if (seat[k].dist < 0 && k > col) {
                seat[k].dist = seat[k - col].dist + costC;
            }
            var i = k + 1;
            while (i < l * col + col) {
                seat[i].dist = seat[i - 1].dist + costR;
                i++;
            }
            i = k - 1;
            while (i >= l * col) {
                seat[i].dist = seat[i + 1].dist + costR;
                i--;
            }
        }

        var k = 0;

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < col; j++) {
                if (!seat[k].taken)
                    freeseats.push(seat[k]);
                //console.log("Miejce " + k + " jest odlegle o " + seat[k].dist); // <- debugowanie
                k++;
            }
        }

        return freeseats;

    }

    this.Clear = function() {
        var k = 0;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 16; j++) {
                seat[k].dist = -1;
                k++;
            }
        }
    }

    this.FindKNN = function(k) {
        if (this.start) {
            if (this.start.taken)
                this.start = this.FindStart();
        } else {
            this.start = this.FindStart();
        }

        if (!this.start) {
            //nie ma wolnych miejcs
            console.log("brak wolnych miejsc");
        }

        this.count = slid.value(); // wydaje mi się, że to jest strasznie słabe
        this.reserve = this.ComputeDistance();

        this.reserve.sort(function(a, b) {
            return parseFloat(a.dist) - parseFloat(b.dist);
        });


        for (var i = 0; i < k; i++) {
            if (!this.reserve[i].clicked) {
                this.reserve[i].clicked = true;
            }
            //reservation.ChangeSliderValue(1);
        }
    }

    this.Unfind = function(k) {
        for (var i = k; i > this.count; i--) {
            this.reserve[i].clicked = false;
            //console.log(this.reserve[i]);
            clickedSeats -= 1;
            //reservation.ChangeSliderValue(-1);
        }
    }
}