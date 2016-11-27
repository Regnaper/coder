document.addEventListener('DOMContentLoaded', function() {
    var text;
    var codeButton = document.getElementById('codeButton');
    codeButton.addEventListener('click', function() {
        text = document.getElementById("text");
        text.value = code(text.value, false);
    }, false);

    var decodeButton = document.getElementById('decodeButton');
    decodeButton.addEventListener('click', function() {
        text = document.getElementById("text");
        text.value = code(text.value, true);
    }, false);
}, false);

var key = localStorage.getItem('key');

function code(text, decode)
{
    var code_text = "",
        key_count = 0;
    if(key == null) {
        return 'empty_key';
    }
    for(var i = 0, text_length = text.length; i < text_length; i++) {
        var symbol_numeral = text.charCodeAt(i),
            key_symbol = key.charCodeAt(key_count);
        if(decode) symbol_numeral -= key_symbol;
        else  symbol_numeral += key_symbol;
        if(symbol_numeral < 0) symbol_numeral += 2040;
        var symbol_string = String.fromCharCode(symbol_numeral);
        code_text += symbol_string;
        key_count++;
        if(key_count == key.length) key_count = 0;
    }
    return code_text;
}