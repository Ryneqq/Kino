var slid;

function Reserve() { // obiekt guzika rezerwuj
    this.highlighted = false;
    this.clicked = false;
    this.pos = createVector(width / 2 + 130, 550);
    this.h = 40;
    this.w = 100;

    // inicjalizacje Slidera można wywołać tylko w momencie odebrania danych
    // dlatego funkcja wywoływana przez "gotData()" w pliku Baza.js
    this.UpdateSlider = function() {
        var free = 96 - booked;
        var value;

        if (slid) {
            var value = slid.value();
            slid.remove();
            if (value > free)
                value = free;
        } else {
            value = 0;
        }
        slid = createSlider(0, free, value);
        slid.parent("slider");
        slid.position(width / 2 - slid.width / 2, this.pos.y + 15);
    }
    this.ChangeSliderValue = function(value) {
        var free = 96 - booked;
        if (value > 0) {
            // if (slider)
        } else if (value < 0) {

        }
    }

    this.Seat = function() {
        var seats = [];
        for (var i = 0, j = 0; i < seat.length; i++) {
            if (seat[i].clicked) {
                seat[i].Book();
                seats[j] = i + 1;
                j++;
            }
        }
        if (seats.length > 0)
            base.SendToFirebase(seats);
    }

    this.Highlight = function() {
        if (abs(this.pos.x - mouseX) < this.w / 2 && abs(this.pos.y - mouseY) < this.h / 2) {
            this.highlighted = true;
            return true;
        } else {
            this.highlighted = false;
            return false;
        }

    }

    this.Click = function() {
        if (this.highlighted) {
            this.clicked = true;
            return true;
        } else {
            this.clicked = false;
            return false;
        }
    }

    this.InteligentReservation = function() {

    }

    this.Show = function() {
        fill(200);
        if (this.highlighted) {
            fill(150);
            if (this.clicked) {
                fill(100);
            }
        }
        stroke(5);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        noStroke();
        textSize(16);
        textAlign(CENTER);
        fill(0);
        text("Rezerwuj", this.pos.x, this.pos.y + 5);


        text("Inteligentna", width / 2 - 130, this.pos.y - 8);
        text("rezerwacja:", width / 2 - 130, this.pos.y + 8);

        if (slid)
            text(slid.value(), width / 2, this.pos.y);
    }
}