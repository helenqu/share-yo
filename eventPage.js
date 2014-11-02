$(function(){

var yoColors = ['#86BE95', '#FE51D5', '#5E2ECC', '#00F6AD', '#AFB109', '#18A2E9', '#CB1136', '#67D3D6', '#3BCE58', '#5E76D0'];

var buddyList = JSON.parse(localStorage.getItem('buddies'));
  var shuffledColors = _.shuffle(yoColors);
  if (buddyList){
    for (var i = 0; i < buddyList.length; i++){
      var $buddy = $('<tr>').append($('<td>').append($('<a>').attr('href', '#').text(buddyList[i])));
      $buddy.css('background-color', shuffledColors[i % buddyList.length]);
      $('.buddy-list').append($buddy);
    }
  }

$('#yoform').submit(function(event){
    event.preventDefault();
    var username = $('#username').val();

    chrome.storage.local.get(['apiKey'], function(data) {
      var request = require('request');
      request.post('http://api.justyo.co/yo/',
      { form: { 'api_token': data.apiKey,
              'username': $('#username').val(),
              'link': alert(document.URL) } },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
      }
    }
  });
    
    var buddyList = JSON.parse(localStorage.getItem('buddies'));
    if (!buddyList) { buddyList = []; }
    var buddyIndex = buddyList.indexOf(username);
    if (buddyIndex === -1){
      buddyList.unshift(username);
      localStorage.setItem('buddies', JSON.stringify(buddyList));
      var $buddy = $('<tr>').append($('<td>').append($('<a>').attr('href', '#').text(username)));
      $buddy.css('background-color', yoColors[Math.floor(Math.random() * 10)]);
      $('.buddy-list').prepend($buddy);
    } else if (buddyIndex >= 0){
      // move buddy to the front of the array
      buddyList.splice(buddyIndex, 1);
      buddyList.unshift(username);
      localStorage.setItem('buddies', JSON.stringify(buddyList));
    }
  });