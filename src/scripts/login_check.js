var Messenger = require("electron")
	.ipcRenderer

function updateLoginStatus() {
	var loggedIn = document.querySelector('#login_actions') === null
	Messenger.sendToHost('loggedIn', loggedIn)
}

window.setInterval(function() {
	updateLoginStatus()
}, 2000)

Messenger.on('sendLogin', function(sender, args) {
	console.log('sendLogin', args);
	document.querySelector('#login_username')
		.value = args.username
	document.querySelector('#login_password')
		.value = args.password
	document.querySelector('#sign_in_button')
		.click()
})
