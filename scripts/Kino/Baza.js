var database

function Base() {
    this.data; // odczytane dane
    this.ref; // referencja do bazy danych

    // ======================== zmienne referencyjne ========================
    this.room; // room: (string)(id) nazwa sali np. 'SALA1' 
    this.movie; // movie: (string)(id) nazwa filmu np. 'SZKLANKA_PO_LAPKACH'
    this.date; // date: (string)(id) data wyświetlenia filmu np. '12_06_17'
    this.hour; // hour: (string)(id) godzina wyświetlenia filmu np. '13_15'
    // ======================================================================

    // Metoda nawiązuje połączenie z baza danych
    this.Init = function() {
        var config = {
            apiKey: "AIzaSyDOKAbfq39Nq2rjyiglJbv2mCTXQbn7-XE",
            authDomain: "kino-91621.firebaseapp.com",
            databaseURL: "https://kino-91621.firebaseio.com",
            projectId: "kino-91621",
            storageBucket: "kino-91621.appspot.com",
            messagingSenderId: "538661189111"
        };
        firebase.initializeApp(config);
        database = firebase.database();

    }

    /*
    Metoda służy do ustawienia referencji zgodnie z zapytaniem strony:
    room - (string) nazwa sali np.SALA1
    movie - (string) nazwa filmu(id)  - np. SZKLANKA_PO_LAPKACH
    date - (string) data filmu np. 12_06_17
    hour - (string) godzina filmu np. 13_15
    */
    this.SetRef = function(room, movie, date, hour) {

        this.room = room;
        this.movie = movie;
        this.date = date;
        this.hour = hour;

        this.ref = database.ref('Kino' + '/' + this.room + '/' + this.movie + '/' + this.date + '/' + this.hour);
    }

    // ================= Zapisywanie =================
    // metoda przyjmuje tablice intow z siedzeniami
    this.SendToFirebase = function(seats) {
            // Objekt z danymi w srodku - jest wysylany do bazy danych
            var data = {
                seats: seats
            }

            var push = this.ref.push(data, finished);
            console.log("Firebase generated key: " + push.key);

            // Czy wysyłanie danych się powiodło
            function finished(err) {
                // jeżeli obiekt err jest zainicjowany to pojawił się błąd
                if (err) {
                    console.log("ooops, something went wrong.");
                    console.log(err);
                } else {
                    resKey = push.key;
                    console.log('Data saved successfully');
                }
            }
        }
        // ===============================================

    // =============== Czytanie bazy danych ===============
    // metoda wywoływana do zalaczenia eventu update'owania danych
    this.LoadFirebase = function() {
            this.ref.on('value', this.gotData, this.errData);
        }
        // wywolywana jezeli wystapi blad podczas pobierania danych
    this.errData = function(error) {
            console.log("Something went wrong.");
            console.log(error);
        }
        // wywolywana w momencie odebrania danych
    this.gotData = function(data) {
            this.data = data.val();
            if (this.data) {
                gotdata = true;
                var keys = Object.keys(this.data);
                console.log(keys);
                // Keys - to tablica obiektów
                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    var seats = this.data[k].seats; // zarezerwowane siedzenia

                    console.log("seats booked: " + seats);
                    booked += UpdateSeats(seats);
                }
                console.log("number of seats booked: " + booked);
                reservation.UpdateSlider();

            } else {
                error = true;
                console.log("err");
            }
        }
        // ====================================================

}