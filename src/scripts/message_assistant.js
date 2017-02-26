var Messenger = require("electron")
	.ipcRenderer

var _ = require('lodash')

Messenger.on('nextMatch', function() {
	nextMatch()
})

function nextMatch() {
	if (location.pathname === '/messages' && !location.search.includes('readmsg')) {
		messages = [].slice.call(document.querySelectorAll('.thread'))
		messages
			.filter(function(message) {
				classList = [].slice.call(message.classList)
				console.log(message, classList)
				return !classList.includes('repliedMessage')
			})
			.forEach(function(message) {
				message.click()
			})
	}

	if (document.querySelector('.desc')
		.innerText.includes('perfect time')) {
		document.querySelector('.desc a')
			.click()
	}

}
Messenger.on('notInterested', function() {

	if (location.pathname.match('/profile') != null) {
		if (document.querySelector('.overflow2015-hide')
			.dataset.profileAction === 'hide') {
			document.querySelector('.overflow2015-hide')
				.click()
			return
		}
		if (document.getElementsByClassName('liked')
			.length > 0) {
			document.getElementsByClassName('liked')[0].click()
			return
		}
		if (document.querySelectorAll('.header .close')
			.length) {
			document.querySelectorAll('.header .close')[0].click();
			return
		} else {
			history.back();
		}
	} else {
		document.getElementById("delete_conversation")
			.click();
		var time = setTimeout(function() {
			document.getElementById("save_yes")
				.click();
		}, 500);
	}

})

window.setInterval(function() {

}, 1000)

// (function() {
// 	closeChats();
// })();

function closeChats() {
	var closes = document.querySelectorAll('.i-close');
	if (closes.length) {
		for (var i = 0; i < closes.length; i++) {
			closes[i].click();
		}
	}
	closes = document.querySelectorAll('.i-close');
	if (closes.length) {
		setTimeout(closeChats, 500);
	}
}
