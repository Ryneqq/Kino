function Increase() {

    this.increase_highlighted = false; // czy najechano myszką na przycisk zwiększ
    this.increase_clicked = false; // czy nakliknięto na przycisk zwiększ
    this.increase_pos = createVector(width / 2 + 40, 545); // pozycja przycisku zwiększ

    this.decrease_highlighted = false; // czy najechano na przycisk zmniejsz
    this.decrease_clicked = false; // czy nakliknięto na przycisk zmniejsz
    this.decrease_pos = createVector(width / 2 - 40, 545); // pozycja przycisku zmniejsz

    this.w = 30; // szerokość przycisku
    this.h = 30; // wysokość przycisku


    this.IncreaseButt = function() {

    }

    this.DecreaseButt = function() {

    }

    this.Highlight = function() {
        if (abs(this.increase_pos.x - mouseX) < this.w / 2 && abs(this.increase_pos.y - mouseY) < this.h / 2) {
            this.increase_highlighted = true;
        } else if (abs(this.decrease_pos.x - mouseX) < this.w / 2 && abs(this.decrease_pos.y - mouseY) < this.h / 2) {
            this.decrease_highlighted = true;
        } else {
            this.increase_highlighted = false;
            this.decrease_highlighted = false;
        }

    }

    this.Click = function() {
        if (this.increase_highlighted) {
            this.increase_clicked = true;
        } else if (this.decrease_highlighted) {
            this.decrease_clicked = true;
        } else {
            this.increase_clicked = false;
            this.decrease_clicked = false;
        }
        /*
                if (this.decrease_highlighted) {
                    this.decrease_clicked = true;
                } else {
                    this.decrease_clicked = false;
                }
                */
    }

    this.Increase_Show = function() {
        fill(200);
        if (this.increase_highlighted) {
            fill(150);
            if (this.increase_clicked) {
                fill(100);
            }
        }
        stroke(5);
        rect(this.increase_pos.x, this.increase_pos.y, this.w, this.h);
        noStroke();
        textSize(16);
        textAlign(CENTER);
        fill(0);
        text(">", this.increase_pos.x, this.increase_pos.y + 5);
    }

    this.Decrease_Show = function() {
        fill(200);
        if (this.decrease_highlighted) {
            fill(150);
            if (this.decrease_clicked) {
                fill(100);
            }
        }
        stroke(5);
        rect(this.decrease_pos.x, this.decrease_pos.y, this.w, this.h);
        noStroke();
        textSize(16);
        textAlign(CENTER);
        fill(0);
        text("<", this.decrease_pos.x, this.decrease_pos.y + 5);
    }

    this.Show = function() {
        this.Increase_Show();
        this.Decrease_Show();
    }


}