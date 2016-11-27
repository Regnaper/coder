function get_coordinates( event ) {
    x = event.pageX;
    y = event.pageY - $(window).scrollTop();
}

function show_popup(x, y, text){
    $('#popup').text(text);
    var popup_h = $("#popup").outerHeight(),
        popup_w = $("#popup").outerWidth(),
        display_h = $( window ).height() - 50,
        display_w = $( window ).width() - 50;
    if (x + popup_w > display_w) x -= popup_w;
    if (y + popup_h > display_h) y -= popup_h;
    $('#popup').show("slow").offset({top: y + $(window).scrollTop(), left: x});
}

$('body').append('<div id="popup" style="display: none; position: absolute; overflow: auto "></div>');

$( document ).contextmenu(get_coordinates);

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    var text = msg.msg_text;
    var key = msg.msg_key;
    if (msg.decode_flag) text = code(text, key, true);
        else text = code(text, key, false);
    show_popup(x, y, text);
    sendResponse();
});

$(document).mouseup(function (e)
{
    var container = $("#popup");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide("slow");
    }
});
$(document).bind('keydown', 'ctrl+q', function(){
    var storage = chrome.storage.local,
        key;
    storage.get('key', function(result){
        key = result.key;
    });
    var text = window.getSelection();
    text = code(text, key, false);
    console.log(text);
});