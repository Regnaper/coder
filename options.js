﻿document.addEventListener('DOMContentLoaded', function() {
    var keyButton = document.getElementById('key_button');
    keyButton.addEventListener('click', function() { 
	    var key = document.getElementById('key_field');
        var storage = chrome.storage.local;
        storage.set({'key':key.value});
        key.value = "************";
        alert('New key successful saved');
    }, false);
}, false);