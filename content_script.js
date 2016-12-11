function show_popup(x, y, text){
    var popup = $('#popup');
    popup.text(text);
    var popup_h = popup.outerHeight(),
        popup_w = popup.outerWidth(),
        display_h = $(window).height() - 50,
        display_w = $(window).width() - 50;
    if (x + popup_w > display_w) x -= popup_w;
    if (y + popup_h > display_h) y -= popup_h;
    popup.show("slow").offset({top: y + $(window).scrollTop(), left: x});
}

function get_popup_coordinates(){
    sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount > 0) {
        var r = sel.getRangeAt(0).getBoundingClientRect();
        y = r.bottom;
        x = r.left;
    }
}

var sel = null,
    x, y;

$('body').append('<div id="popup" style="display: none; position: absolute; overflow: auto "></div>');

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    get_popup_coordinates();
    get_key(function(key){
        var text = msg.msg_text;
        if (msg.decode_flag) text = code(text, key, true);
        else text = code(text, key, false);
        show_popup(x, y, text);
        sendResponse();
    });
});

$(document).mouseup(function (e)
{
    var container = $('#popup');

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide("slow");
        sel = null;
    }
});

$(document).bind('keydown', 'shift+d', function () {
    get_popup_coordinates();
    var text = sel.toString();
    if (sel != null) get_key(function (key) {
        text = code(text, key, true);
        show_popup(x, y, text);
    });
});

$(document).bind('keydown', 'shift+c', function () {
    get_popup_coordinates();
    var text = sel.toString();
    if (sel != null) get_key(function (key) {
        text = code(text, key, false);
        show_popup(x, y, text);
    });
});