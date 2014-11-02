$(function() {
  
  $('#introform').submit(function(event) {
    event.preventDefault();
    /*var YOSERNAME = $('#username').val();
    var YOPIKEY = $('#apikey').val(); */
    console.log(localStorage.getItem('apiKey'));
    localStorage.setItem('userName',$('#userName').val());
    localStorage.setItem('apiKey',$('#apiKey').val());
    //localStorage.setItem('apiKey','HELLOWORLD');
    /*chrome.storage.sync.set({
      'userName': YOSERNAME,
      'apiKey': YOPIKEY
     }); */
  /* chrome.storage.sync.get(['apiKey', 'userName'], function(data) {
    if (data.apiKey > '' || data.userName > '') {
      $('#YOPIKEY').val(data.apiKey);
      $('#username').val(data.userName);
    }
  }); */
});

});