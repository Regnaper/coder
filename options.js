﻿document.addEventListener('DOMContentLoaded', function() {
    var keyButton = document.getElementById('key_button');
    keyButton.addEventListener('click', function() { 
	    var key = document.getElementById('key_field').value;
	    localStorage.setItem('key', key);
    }, false);
}, false);