var Messenger = require("electron").ipcRenderer;

setInterval(function () {
	Messenger.sendToHost('requestState');
}, 1000);

window.setInterval(function () {
	if (state.currentTab == 'inbox') {
		console.log('anyMessages', anyMessages());
		console.log('badgeMessages', mailboxBadgeCount());
		if (!anyMessages()) {
			scrollToBottom();
		}
	}
}, 3000);

window.setInterval(function () {
	if (state.currentTab === 'inbox') {
		if (!anyMessages()) {
			location.reload();
		}
	}
}, 300000);

window.setInterval(function () {
	if (state.currentTab === 'inbox') {
		messages = document.querySelector('#nav_mailbox_badge .count').innerText;
		if (messages !== "0" && !anyMessages()) {
			location.reload();
		}
	}
}, 60000);

window.setInterval(function () {
	if (state.currentTab === 'inbox') {
		var totalMessages = [].slice.call(document.querySelectorAll('.previewline')).length;
		var noPhotoMessages = [].slice.call(document.querySelectorAll('.photo')).filter(function (photo) {
			return photo.children[0].src === 'https://k0.okccdn.com/media/img/user/placeholder_2013/pq_60.png';
		}).length;
		var repliedTo = [].slice.call(document.querySelectorAll('.thread.message.repliedMessage')).length;
		Messenger.sendToHost('visibleMessages', totalMessages);
		Messenger.sendToHost('noPhotoMessages', noPhotoMessages);
		Messenger.sendToHost('weakMessages', weakMessageCount());
		Messenger.sendToHost('repliedToMessages', repliedTo);
		sendCountsForPhrase("it's a match", 'match');
	}
}, 3000);

window.setInterval(function () {
	if (state.currentTab === 'inbox') {
		var count = document.querySelector('.storagenumbers .count');
		if (count !== null) {
			Messenger.sendToHost('messageCount', count.innerText);
		}
	}
}, 2000);

window.setInterval(function () {
	updateLoginStatus();
}, 2000);

autoDelete = {};

setInterval(function () {
	_.each(state.autodelete, function (enabled, command) {
		console.log('autodelete', command, enabled);
		if (enabled) {
			console.log(command, typeof command);
			// window[command]()
			eval(command + '()');
		}
	});
}, 3000);