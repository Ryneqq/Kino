var seat = []; // siedzenia wyswietlone na stronie
var reservation; // obiekt sluzacy do rezerwacji biletow - tworzy również guzik rezerwacji i nim zarządza
var increase; // guziki do zwiększania i zmniejszania liczby siedzeń dla inteligentnego wyszukiwania
var canvas; // canvas na ktorym syswietlamy nasz skrypt
var base; // obiekt sluzacy do sterowania baza danych
var error; // dane nie widnieja w bazie danych - zabezpieczenie przed zmiana query stringa (url)
var resKey; // klucz rezerwacji - indywidualny klucz generowany przez baze, posłóży do odbioru biletów
var gotdata; // prawda jeżeli dane zostały załadowane
var booked = 0; // int w którym trzymam liczbe siedzen zajetych
var clickedSeats = 0; // int w którym trzymam liczbe kliknietych siedzen, slozy do porownania ze sliderem
var alg;
//var slidvalue;

function setup() {
    // połącz się z bazą danych
    var params = getURLParams();
    CreateBase(params);
    // stwórz canvas
    canvas = createCanvas(616, 600);
    canvas.parent('can');
    rectMode(CENTER);
    // stwórz UI
    CreateSeats();
    reservation = new Reserve();
    increase = new Increase();
    alg = new NNAlgorithm();
    //alg.FindKNN(10);
}

function CreateBase(params) {
    // set up base
    base = new Base();
    base.Init();
    base.SetRef(params.room, params.movie, params.date, params.hour);
    //base.SendToFirebase(0); // <- jeżeli chce zainicjować film
    base.LoadFirebase(); // wywołuje event uaktualniania danych na stronie gdy te tylko się pojawią w bazie
}

function CreateSeats() {
    var k = 0;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 16; j++) {
            var newS = new Siedzenie()
            seat.push(newS);
            seat[k].Set(145 + j * 22, 220 + i * 44, k + 1);
            k++;
        }
    }
}

function draw() {
    background(192);
    if (!error && !resKey) {
        clickedSeats = 0;
        for (var i = 0; i < seat.length; i++) {
            seat[i].Show();
        }
        ShowScreen();
        reservation.Show();
        increase.Show();
        if (gotdata) {
            Intel_Res();
        }
    } else if (error) {
        if (slid)
            slid.remove();
        ShowError404();
    } else if (resKey) {
        if (slid)
            slid.remove();
        ShowKey();
    }
}

function mousePressed() {
    if (mouseButton == LEFT) {
        if (!CheckClick())
            ResetClick();
    }
}

function mouseReleased() {
    reservation.clicked = false;
}

function mouseMoved() {
    CheckPosition();
}

// Rysuj ekran
function ShowScreen() {
    stroke(5);
    fill(200);
    rect(width / 2, 80, 440, 20);
    noStroke();
    textSize(16);
    textAlign(CENTER);
    fill(0);
    text("Ekran", width / 2, 80 + 5);
}

function ShowError404() {
    noStroke();
    textSize(34);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("Error 404", width / 2, height / 2);
    textSize(24);
    fill(255, 0, 0);
    text("Page not found", width / 2, height / 2 + 30);
}

function ShowKey() {
    noStroke();
    textSize(34);
    fill(0);
    textAlign(CENTER);
    text("Rezerwacja przebiegła pomyślnie!", width / 2, height / 2 - 40);
    text("Oto Twój numer zamówienia:", width / 2, height / 2);
    textSize(24);
    fill(255, 0, 0);
    text(resKey, width / 2, height / 2 + 30);
}


function CheckPosition(x, y) {
    clickedSeats = 0;
    for (var i = 0; i < seat.length; i++) {
        seat[i].Highlight();
    }
    reservation.Highlight();
    increase.Highlight();
}

function CheckClick() {
    var choosen;
    for (var i = 0; i < seat.length; i++) {
        if (!seat[i].clicked && seat[i].Click()) {
            choosen = true;
        }
    }

    if (reservation.Click())
        reservation.Seat();

    increase.Click();

    return choosen;
}

function ResetClick() {
    for (var i = 0; i < seat.length; i++) {
        if (seat[i].Highlight()) {
            seat[i].clicked = false;
            reservation.ChangeSliderValue(-1);
        }
    }
}

function Intel_Res() {
    clickedSeats = 0;
    for (var i = 0; i < seat.length; i++) {
        if (seat[i].clicked) {
            clickedSeats++;
        }
    }
    //console.log("liczba miejsc " + clickedSeats);
    //console.log("wartosc slidera " + slid.value());

    if (clickedSeats < slid.value()) {
        alg.FindKNN(slid.value());
    }

    if (clickedSeats > slid.value()) {
        alg.Unfind(slid.value());
        alg.count = slid.value();
    }

    if (slid.value() == 0) {
        alg.Clear();
    }



}

// funkcja wywoływana przez obiekt baza by zabierane siedzenia były updateowane
function UpdateSeats(reserved) {
    var size = 0;
    for (var i = 0; i < reserved.length; i++) {
        if (!seat[reserved[i] - 1].taken) {
            seat[reserved[i] - 1].Book();
            size++;
        }
    }
    return size;
}