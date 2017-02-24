var articlesElt = document.getElementById("demo");
ajaxGet("https://blockchain.info/fr/rawtx", function (reponse) {
    var jsonPretty = JSON.stringify(JSON.parse(reponse),null,2);
    document.getElementById("demo").innerHTML = jsonPretty;
});