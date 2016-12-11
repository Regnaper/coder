function get_key(callback) {
    chrome.storage.local.get('key', function(r){
        callback(r.key);
    });
}

function code(text, key, decode)
{
    var code_text = "",
        key,
        key_count = 0;
    get_key(function(key){
        key = key;
    });
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