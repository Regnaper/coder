$('body').append('<div id="popup" style="display: none; position: absolute; overflow: auto "></div>');

$( document ).contextmenu(function( event ) {
    x = event.pageX;
    y = event.pageY - $(window).scrollTop();
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    var text = msg.msg_text;
    key = msg.msg_key;
    if (msg.decode_flag) text = code(text, true);
        else text = code(text, false);
    $('#popup').text(text);
    var popup_h = $("#popup").outerHeight(),
        popup_w = $("#popup").outerWidth(),
        display_h = $( window ).height() - 50,
        display_w = $( window ).width() - 50;
    if (x + popup_w > display_w) x -= popup_w;
    if (y + popup_h > display_h) y -= popup_h;
    console.log('x= ',x,'; y= ',y,'; popup(x= ',popup_w,'; y= ',popup_h,';) display(x= ',display_w,'; y= ',display_h,';)');
    $('#popup').show("slow").offset({top: y + $(window).scrollTop(), left: x});
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