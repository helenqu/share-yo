


$(function() {

            var yoColors = ['#86BE95', '#FE51D5', '#5E2ECC', '#00F6AD', '#AFB109', '#18A2E9', '#CB1136', '#67D3D6', '#3BCE58', '#5E76D0'];
            var url=null;
            var buddyList = JSON.parse(localStorage.getItem('buddies'));
            var shuffledColors = _.shuffle(yoColors);
            if (buddyList) {
                for (var i = 0; i < buddyList.length; i++) {
                    var $buddy = $('<tr>').append($('<td>').append($('<a>').attr('href', '#').text(buddyList[i])));
                    $buddy.css('background-color', shuffledColors[i % buddyList.length]);
                    $('.buddy-list').append($buddy);
                }
            }

            chrome.tabs.getSelected(null,function(tab){
                url=tab.url;//tab.id.url;
            });


            $('#yoform').submit(function(event) {
                event.preventDefault();
                var username = $('#username').val();
                var api_token = (localStorage.getItem('apiKey')); //'137f1ca55799404dd51da56246b62f5747e58437'
                /*chrome.storage.sync.get(['apiKey'], function(data) {
                    var opts = {
                        api_token: data.apiKey,
                        username: useame,
                        link: $(location).attr('href')
                    };*/
                    // http://api.justyo.co/yo/
                var opts = {
                        api_token: api_token,
                        username: username,
                        link: url//$(location).attr('href')//url
                    };
                    $.post('http://api.justyo.co/yo/', opts, function(output) {
                        console.log(output);
                        $('#username').val('');
                        $('.err-msg').hide();
                        }).fail(function(){
                        $('.err-msg').show();
                    });
                });

                    var buddyList = JSON.parse(localStorage.getItem('buddies'));
                    if (!buddyList) {
                        buddyList = [];
                    }
                    var buddyIndex = buddyList.indexOf(username);
                    if (buddyIndex === -1) {
                        buddyList.unshift(username);
                        localStorage.setItem('buddies', JSON.stringify(buddyList));
                        var $buddy = $('<tr>').append($('<td>').append($('<a>').attr('href', '#').text(username)));
                        $buddy.css('background-color', yoColors[Math.floor(Math.random() * 10)]);
                        $('.buddy-list').prepend($buddy);
                    } else if (buddyIndex >= 0) {
                        // move buddy to the front of the array
                        buddyList.splice(buddyIndex, 1);
                        buddyList.unshift(username);
                        localStorage.setItem('buddies', JSON.stringify(buddyList));
                    }
                });