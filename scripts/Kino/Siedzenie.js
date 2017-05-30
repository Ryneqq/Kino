function Siedzenie() {
    this.pos = createVector();
    this.taken = false;
    this.text;
    this.dist;
    this.index;

    this.highlighted = false;
    this.clicked = false;


    this.Set = function(x, y, t) {
        this.pos = createVector(x, y);
        this.text = t;
        this.index = t - 1;
        this.dist = -1;
    }

    this.Book = function() {
        this.taken = true;
        this.highlighted = false;
        this.clicked = false;
    }

    this.Distance = function() {
        return this.dist;
    }
    this.Distance = function(d) {
        this.dist = d
    }

    this.Highlight = function() {
        if (abs(this.pos.x - mouseX) < 10 && abs(this.pos.y - mouseY) < 20) {
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
            reservation.ChangeSliderValue(1);
            return true;
        }
    }

    this.Show = function() {

        // Krzesło wzięte
        if (this.taken) {
            fill(255, 0, 0); // red
            if (this.highlighted) { // myszka na nim
                fill(170, 0, 0);
            }
            this.clicked = false; // nie mozna klikac jak jest wziete

            // Krzesło wolne
        } else if (!gotdata) {
            fill(100);
        } else {
            fill(0, 255, 0); // green 
            if (this.highlighted) { // myszka na nim
                fill(0, 225, 225);
            }
            if (this.clicked) { // klikniety
                fill(0, 100, 0);
            }
        }

        // narysuj
        stroke(2);
        rect(this.pos.x, this.pos.y, 20, 40);
        noStroke();
        textSize(12);
        textAlign(CENTER);
        fill(0);
        text("" + this.text, this.pos.x, this.pos.y);

    }
}