﻿chrome.contextMenus.create({id: "mymenucode", title: "Code this", contexts:["selection"]});
chrome.contextMenus.create({id: "mymenudecode", title: "Decode this", contexts:["selection"]});

function genericOnClick(info, tab) {
    var menu = info.menuItemId,
        decode_flag,
        key;
    if (menu == "mymenudecode") decode_flag = true;
        else if (menu == "mymenucode") decode_flag = false;
    if (menu == "mymenudecode" || menu == "mymenucode") {
        var storage = chrome.storage.local;
        storage.get('key',function(result){
            key = result['key'];
        });
        var text = info.selectionText;
        chrome.tabs.executeScript(null,
            {"file": "jquery.js"},
            function() {
                chrome.tabs.sendMessage(tab.id,{"msg_text":text, "msg_key":key, "decode_flag":decode_flag});
            });
    }
}

chrome.contextMenus.onClicked.addListener(genericOnClick);