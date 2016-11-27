document.addEventListener('DOMContentLoaded', function() {
    var storage = chrome.storage.local,
        key;
    storage.get('key', function(result){
        key = result.key;
    });
    var codeButton = document.getElementById('codeButton');
    codeButton.addEventListener('click', function() {
        var text = document.getElementById("text");
        text.value = code(text.value, key, false);
    }, false);
    var decodeButton = document.getElementById('decodeButton');
    decodeButton.addEventListener('click', function() {
        var text = document.getElementById("text");
        text.value = code(text.value, key, true);
    }, false);
}, false);