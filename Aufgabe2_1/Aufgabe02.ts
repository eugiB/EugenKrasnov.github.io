/*
Aufgabe: Aufgabe 02
Name: Eugen Krasnov
Matrikel: 259525
Datum: 21.10.18
Hiermit versichere ich, dass ich diesen
Code in zusammenarbeit mit Hendrik Lange und Jannis Backhaus
erarbeitet habe. Er wurde
nicht kopiert und auch nicht diktiert.
*/
namespace UNO {

    let deck: number[][] = [];
    let hand: number[][] = [];
    let num: number = 0;


    function Deck() {
        // Zahlen (0 - 9); Aussetzen (10); Richtungswechsel (11); 2-Ziehen (12); 4-Ziehen (13); Farbwahl (14);
        // blau (0); gelb (1); gr�n (2); rot (3); schwarz (4);
        for (let color: number = 0; color < 5; color++) {
            switch (color) {
                case 0:
                case 1:
                case 2:
                case 3:
                    for (let typ: number = 0; typ < 13; typ++) {
                        for (let i: number = 0; i < 2; i++) {
                            deck[num] = [color, typ];
                            num++;
                            if (typ == 0)  // nur eine 0 dann break
                                break;
                    }
            }
                    
            break;
                case 4:
            for (let typ: number = 13; typ < 15; typ++) {
                for (let i: number = 0; i < 4; i++) {
                    deck[num] = [color, typ];   // Schwarz hat nur 2 karten a 4stk.
                    num++;
                }
            }
            break;

                default:
            break;
        }

    }

    let div_board: HTMLDivElement = document.createElement("div");
    let div_hand: HTMLDivElement = document.createElement("div");
    let div_stapel: HTMLDivElement = document.createElement("div");
    let div_deck: HTMLDivElement = document.createElement("div");
    document.body.appendChild(div_board);
    div_board.appendChild(div_hand);
    div_board.appendChild(div_stapel);
    div_board.appendChild(div_deck);
    div_hand.classList.add("div_hand");
    div_stapel.classList.add("div_stapel");
    div_board.classList.add("div_board");
    div_deck.classList.add("div_deck");
    div_stapel.setAttribute("Id", "Stapel");
    document.getElementById("Stapel").innerHTML += "Ablage";



    for (let i: number = 0; i < cards; i++) {
        let div: HTMLDivElement = document.createElement("div");
        div_hand.appendChild(div);
        let a: number = generateRandom(0, deck.length);
        let t: number = (deck[a][1]);
        let c: number = (deck[a][0]);

        switch (c) {
            case 0:
                div.classList.add("blue", "card");
                break;
            case 1:
                div.classList.add("yellow", "card");
                break;
            case 2:
                div.classList.add("green", "card");
                break;
            case 3:
                div.classList.add("red", "card");
                break;
            case 4:
                div.classList.add("black", "card");
                break;
        }

        switch (t) {


            case 0:
                div.classList.add("zero")
                div.innerHTML = "0";
                break;

            case 1:
                div.classList.add("one")
                div.innerHTML = "1";
                break;

            case 2:
                div.classList.add("two")
                div.innerHTML = "2";
                break;

            case 3:
                div.classList.add("three")
                div.innerHTML = "3";
                break;

            case 4:
                div.classList.add("four")
                div.innerHTML = "4";
                break;

            case 5:
                div.classList.add("five")
                div.innerHTML = "5";
                break;

            case 6:
                div.classList.add("six")
                div.innerHTML = "6";
                break;

            case 7:
                div.classList.add("seven")
                div.innerHTML = "7";
                break;

            case 8:
                div.classList.add("eight")
                div.innerHTML = "8";
                break;

            case 9:
                div.classList.add("nine")
                div.innerHTML = "9";
                break;

            case 10:
                div.classList.add("skip")
                div.innerHTML = "Skip";
                break;

            case 11:
                div.classList.add("direction")
                div.innerHTML = "<-->";
                break;

            case 12:
                div.classList.add("drawtwo")
                div.innerHTML = "+2";
                break;

            case 13:
                div.classList.add("drawfour")
                div.innerHTML = "+4";
                break;

            case 14:
                div.classList.add("choose")
                div.innerHTML = "Colorchange";
                break;

        }
    }

}
        let cards = parseInt(prompt("Mit wievielen karten m�chten sie spielen?"), 10); // 10 steht f�r dezimalzahlsystem //parseInt nimmt Zahlenstystem
    let content: string;

//generateRandom(0,deck.length)
function generateRandom(min: number, max: number) {
    min = Math.ceil(min);  //runden
    max = Math.floor(max);  //abrunden
    return Math.floor(Math.random() * (max - min)) + min;
}


document.addEventListener('DOMContentLoaded', Deck);
}