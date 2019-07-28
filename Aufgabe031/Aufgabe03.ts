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
    let tray: number[][] = [];
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
        let div_sort: HTMLDivElement = document.createElement("div");
        document.body.appendChild(div_board);
        div_board.appendChild(div_hand);
        div_board.appendChild(div_stapel);
        div_board.appendChild(div_deck);
        div_board.appendChild(div_sort);
        div_hand.classList.add("div_hand");
        div_stapel.classList.add("div_stapel");
        div_board.classList.add("div_board");
        div_deck.classList.add("div_deck");
        div_sort.classList.add("div_sort");
        div_stapel.setAttribute("Id", "div_tray"); 
        div_sort.setAttribute("Id", "div_sort"); 
        div_hand.setAttribute("Id", "div_hand");
        div_deck.setAttribute("Id", "div_deck");
        document.getElementById("div_tray").innerHTML += "Ablage";
        document.getElementById("div_sort").innerHTML += "Sortieren";
        console.log ("showHand done");
    }

    function drawOne(): void {
        drawCard(1);
    }
    
    function spaceKeyboard(_event: KeyboardEvent): void {
        if (_event.keyCode == 32)
        {
           drawOne();
            }
        }

    function drawCard(a: number) {
        for (let i: number = 0; i < a; i++) {
            let rnum: number = generateRandom(0, deck.length);
            hand.push([deck[rnum][0], deck[rnum][1]]);
            deck.splice(rnum, 1);
            console.log("Card drawn: " + hand[hand.length - 1]);
        }
        showHand();
    }

    function initialCardDraw(): void {
        let cards = parseInt(prompt("Mit wie vielen Karten m�chtest du spielen?"), 10);
        drawCard(cards);
    }

    function showHand(): void {
        let node: HTMLElement = document.getElementById("div_hand")
       // console.log(node.firstChild);
        console.log("hand while showHand: " + hand);
        while (node.firstChild != null)
        { node.removeChild(node.firstChild) }

        for (let i: number = 0; i < hand.length; i++) {
            let div: HTMLDivElement = document.createElement("div");
            let para: HTMLParagraphElement = document.createElement("p");
            
            div.classList.add("card");
            para.classList.add("cardcontent");
 
            document.getElementById("div_hand").appendChild(div);
            div.appendChild(para);

            let t: string[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "skip", "direction", "drawtwo", "drawfour", "choose"];
            let c: string[] = ["blue", "yellow", "green", "red", "black"];
            let content: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Skip", "<=>", "+2", "+4", "Choose"];

            let index_c: number = hand[i][0];
            let index_t: number = hand[i][1];

            div.classList.add(t[index_t]);
            div.classList.add(c[index_c]);
            para.innerHTML = content[index_t];
            div.setAttribute("id", "card" + i);

        }
    };
    function showTray() {
        let node: HTMLElement = document.getElementById("div_tray")
        console.log(node.firstChild);
        console.log(hand);
        while (node.firstChild != null)
        { node.removeChild(node.firstChild) }
        let div: HTMLDivElement = document.createElement("div");
        let para: HTMLParagraphElement = document.createElement("p");

        div.classList.add("card");
        para.classList.add("cardcontent");

        document.getElementById("div_tray").appendChild(div);
        div.appendChild(para);
 
        let t: string[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "skip", "direction", "drawtwo", "drawfour", "choose"];
        let c: string[] = ["blue", "yellow", "green", "red", "black"];
        let content: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Skip", "<=>", "+2", "+4", "Choose"];

        let index_c: number = tray[(tray.length - 1)][0];
        let index_t: number = tray[(tray.length - 1)][1];

        div.classList.add(t[index_t]);
        div.classList.add(c[index_c]);
        para.innerHTML = content[index_t];
        div.setAttribute("id", "traytop");
    }



    function playCard(_event: Event): void {
        let cardnode: any = _event.target;
        let cardindex: number = Array.from(cardnode.parentNode.children).indexOf(cardnode);
        console.log("CARDNODE: " + cardnode.id);
        if (cardnode.id != "div_hand") {
            tray.push([hand[cardindex][0], hand[cardindex][1]]);
            hand.splice(cardindex, 1);
            showHand();
            showTray();
   }
    }
    function sortHand(): void {
        hand.sort(function(a, b) {
            var x = a[0];
            var y = b[0];
            return x - y;
        })
        showHand();
    }


    //generateRandom(0,deck.length)
    function generateRandom(min: number, max: number) {
        min = Math.ceil(min);  //runden
        max = Math.floor(max);  //abrunden
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function main(): void {
        Deck();
        initialCardDraw();
        document.getElementById("div_deck").addEventListener("click", drawOne)
        document.getElementById("div_hand").addEventListener("click", playCard)
        document.getElementById("div_sort").addEventListener("click", sortHand)

    }


    document.addEventListener('DOMContentLoaded', main);
    document.addEventListener('keydown', spaceKeyboard);
}

