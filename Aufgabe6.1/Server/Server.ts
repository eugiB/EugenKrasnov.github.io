import * as Http from "http";               //Der gesamte Inhalt des Moduls "http" wird als Http importiert.
import * as URL from "url";

namespace L06_SendData {                    //
    console.log("Starting server");         //Consolelog wird ausgegeben mit nachricht "Starting server"
    
    interface product{
        [key:string]:number;
        }
    
    let port: number = process.env.PORT;    //Stellt den PORT als number ein zum Heroku server  
    if (port == undefined)                  //Falls der Port nicht definiert ist,
        port = 8100;                        //Port soll die nummer 8100 haben (verbindet Heroku mit EIA2)

    let server: Http.Server = Http.createServer();      //Es wird ein ServerObjekt erzeugt und in der Variablen Server gespeichert
    server.addListener("request", handleRequest);       //Es wird ein listener angeh�ngt der request registriert und handlerequest ausf�hrt
    server.addListener("listening", handleListen);      //solange der K�ufer auf die funktion zugreift, sieht der H�ndler das.
    server.listen(port);                                //schaut zu was f�r ein Port verwendet wird. (8100)

    function handleListen(): void {                 
        console.log("Listening");                       //Consolelog "Listening" wird ausgegeben
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {  //erstellt eine Funktion die bei einer Http.Incomingmessage, eine Http.ServerResponse zur�ck schickt
        console.log("I hear voices!");              // gibt Consolelog "I hear voices!" aus
         console.log(_request);
        _response.setHeader("content-type", "text/html; charset=utf-8");        //setzt in den HTML header "content-type" und text/html; charset=utf-8
        _response.setHeader("Access-Control-Allow-Origin", "*");                //Access-Control-Allow-Origin wird auch in den Header gesetzt, damit die antwort des Codes mit dem Nutzer geteilt wird.

let Bestellung: product = URL.parse(_request.url, true).query;
        console.log(Bestellung);
            
        for (let key in Bestellung){            
            _response.write(key + " = " + Bestellung[key]);
        }
            _response.end();
}
    }