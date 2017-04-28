//var articlesElt = document.getElementById("requete1");
/*ajaxGet("https://api.blockcypher.com/v1/btc/main", function (reponse) {
    var jsonPretty = JSON.stringify(JSON.parse(reponse),null,2);
    document.getElementById("requete1").innerHTML = jsonPretty;
});*/

function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    console.log(url)
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);

    });
    req.send(null);
}

function recupererRequeteAPI(url,where){
    ajaxGet(url, function (response) {
        var jsonPretty = JSON.stringify(JSON.parse(response),null,2);
        document.getElementById(where).innerHTML = syntaxHighlight(jsonPretty);
    });
}




recupererRequeteAPI("https://api.blockchain.info/stats?cors=true","requete1")
recupererRequeteAPI("https://api.blockchain.info/pools?cors=true","requete2")
recupererRequeteAPI("https://bitcoin.mubiz.com/peerinfo","requete3")


function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

