var articlesElt = document.getElementById("requete1");
/*ajaxGet("https://api.blockcypher.com/v1/btc/main", function (reponse) {
    var jsonPretty = JSON.stringify(JSON.parse(reponse),null,2);
    document.getElementById("requete1").innerHTML = jsonPretty;
});*/

function recupererRequeteAPI(url,where){
    ajaxGet(url, function (reponse) {
        var jsonPretty = JSON.stringify(JSON.parse(reponse),null,2);
        document.getElementById(where).innerHTML = syntaxHighlight(jsonPretty);
    });
}

recupererRequeteAPI("http://bitcoin.mubiz.com/blockchaininfo","requete1")
recupererRequeteAPI("http://bitcoin.mubiz.com/mininginfo","requete2")
recupererRequeteAPI("http://bitcoin.mubiz.com/peerinfo","requete3")


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