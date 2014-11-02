$(document).ready(function() {
  $('#introform').on('submit', function(event) {
    event.preventDefault();
    var YOSERNAME = $('#username').val();
    var YOPIKEY = $('#apikey').val();
    console.log(YOSERNAME);
    chrome.storage.local.set({
      userName: YOSERNAME,
      apiKey: YOPIKEY
     }
    }
  });
  chrome.storage.local.get(['apiKey', 'userName'], function(data) {
    if (data.apiKey > '' || data.userName > '') {
      $('#YOPIKEY').val(data.apiKey);
      $('#username').val(data.userName);
    }
  });