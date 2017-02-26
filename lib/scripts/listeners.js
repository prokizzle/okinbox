var Messenger = require("electron").ipcRenderer;

Messenger.on('sendLogin', function (sender, args) {
	console.log('sendLogin', args);
	document.querySelector('#login_username').value = args.username;
	document.querySelector('#login_password').value = args.password;
	document.querySelector('#sign_in_button').click();
});

Messenger.on('currentTab', function (sender, tab) {
	console.log('tab', tab);
	currentTab = tab;
});

Messenger.on('nextMatch', function () {
	nextMatch();
});

Messenger.on('toggleAutodelete', function (sender, toggle) {

	autoDelete[toggle.command] = toggle.enabled;
	console.log(autoDelete);
});

Messenger.on('setState', function (sender, nextState) {
	var state = nextState;
	console.log('state', state);
});

Messenger.on('notInterested', function () {

	if (location.pathname.match('/profile') != null) {
		if (document.querySelector('.overflow2015-hide').dataset.profileAction === 'hide') {
			document.querySelector('.overflow2015-hide').click();
			return;
		}
		if (document.getElementsByClassName('liked').length > 0) {
			document.getElementsByClassName('liked')[0].click();
			return;
		}
		if (document.querySelectorAll('.header .close').length) {
			document.querySelectorAll('.header .close')[0].click();
			return;
		} else {
			history.back();
		}
	} else {
		document.getElementById("delete_conversation").click();
		var time = setTimeout(function () {
			document.getElementById("save_yes").click();
		}, 500);
	}
});

Messenger.on('refresh', function () {
	location.reload();
});

Messenger.on('deleteMatchMessages', function () {
	deleteMessagesByPhrases(["it's a match"]);
});

Messenger.on('deleteNoPhotos', function () {
	deleteNoPhotos();
});

Messenger.on('deleteWeakMessages', function () {
	deleteMessagesByPhrases(['hi', 'hello', 'hey', 'how are you', 'how are u', 'how r u', "what's up", 'whats up']);
});

Messenger.on('sendLogin', function (sender, args) {
	console.log('sendLogin', args);
	document.querySelector('#login_username').value = args.username;
	document.querySelector('#login_password').value = args.password;
	document.querySelector('#sign_in_button').click();
});

Messenger.on('loadMore', function () {
	scrollToBottom();
});

Messenger.on('deleteOldRepliedToMessages', function () {
	deleteOldRepliedToMessages();
});