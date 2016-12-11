document.addEventListener('DOMContentLoaded', function() {
    var codeButton = document.getElementById('codeButton');
    codeButton.addEventListener('click', function() {
        var text = document.getElementById("text");
        get_key(function(key){
            text.value = code(text.value, key, false);
        });
    }, false);
    var decodeButton = document.getElementById('decodeButton');
    decodeButton.addEventListener('click', function() {
        var text = document.getElementById("text");
        get_key(function(key){
            text.value = code(text.value, key, true);
        });
    }, false);
}, false);