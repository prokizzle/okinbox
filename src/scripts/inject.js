var Messenger = require("electron")
	.ipcRenderer

var _ = require('lodash')
var currentTab = 'inbox'
var state = {}
var prevMessageCount = 0

setInterval(function() {
	Messenger.sendToHost('requestState')
}, 1000)

Messenger.on('loadMore', function() {
	scrollToBottom()
});

Messenger.on('deleteOldRepliedToMessages', function() {
	deleteOldRepliedToMessages()
})

window.setInterval(function() {
	if (currentTab == 'inbox') {

		if (!anyMessages()) {
			scrollToBottom()
		}
	}
}, 3000)

window.setInterval(function() {
	if (currentTab === 'inbox') {
		if (!anyMessages()) {
			location.reload();
		}
	}
}, 300000)

function mailboxBadgeCount() {
	messages = document.querySelector('#nav_mailbox_badge .count')
	if (messages === null) {
		return 0
	} else {
		return +messages.innerText
	}
}

window.setInterval(function() {
	if (currentTab === 'inbox') {
		messages = document.querySelector('#nav_mailbox_badge .count')
			.innerText
		if (messages !== "0" && !anyMessages()) {
			location.reload()
		}
	}
}, 60000)

Messenger.on('sendLogin', function(sender, args) {
	console.log('sendLogin', args);
	document.querySelector('#login_username')
		.value = args.username
	document.querySelector('#login_password')
		.value = args.password
	document.querySelector('#sign_in_button')
		.click()
})

Messenger.on('refresh', function() {
	location.reload()
})

Messenger.on('deleteMatchMessages', function() {
	deleteMessagesByPhrases(["it's a match"])
})

Messenger.on('deleteNoPhotos', function() {
	deleteNoPhotos()
})

Messenger.on('deleteWeakMessages', function() {
	deleteMessagesByPhrases([
		'hi', 'hello', 'hey',
		'how are you', 'how are u', 'how r u',
		"what's up", 'whats up'
	])
})

function deleteWeakMessages () {
	deleteMessagesByPhrases([
		'hi', 'hello', 'hey',
		'how are you', 'how are u', 'how r u',
		"what's up", 'whats up'
	])
}

function deleteMatchMessages() {
	deleteMessagesByPhrases(["it's a match"])
}

function weakMessageCount() {
	return [
			'hi', 'hello', 'hey',
			'how are you', 'how are u',
			"what's up", 'whats up',
			'how r u'
		].map(function(phrase) {
			return [].slice.call(document.querySelectorAll('.previewline'))
				.filter(function(line) {
					return line.innerText.toLowerCase()
						.includes(phrase.toLowerCase())
				})
				.length

		})
		.reduce(function(a, b) {
			return a + b;
		}, 0)
}


function totalMessages() {
	return [].slice.call(document.querySelectorAll('.previewline'))
		.length
}

window.setInterval(function() {
	if (currentTab === 'inbox') {
		var noPhotoMessages = [].slice.call(document.querySelectorAll('.photo'))
			.filter(function(photo) {
				return photo.children[0].src === 'https://k0.okccdn.com/media/img/user/placeholder_2013/pq_60.png'
			})
			.length
		var repliedTo = [].slice.call(document.querySelectorAll('.thread.message.repliedMessage'))
			.length
		Messenger.sendToHost('visibleMessages', totalMessages())
		Messenger.sendToHost('noPhotoMessages', noPhotoMessages)
		Messenger.sendToHost('weakMessages', weakMessageCount())
		Messenger.sendToHost('repliedToMessages', repliedTo)
		sendCountsForPhrase("it's a match", 'match')
	}
}, 3000)

function noPhotoMessages() {
	return [].slice.call(document.querySelectorAll('.photo'))
		.filter(function(photo) {
			return photo.children[0].src === 'https://k0.okccdn.com/media/img/user/placeholder_2013/pq_60.png'
		})
}

function anyMessages() {
	return _.some(
		[
			noPhotoMessages()
			.length,
			weakMessageCount(),
			countsForPhrase("it's a match")
		],
		function(item) {
			return item > 0
		}
	)
}

window.setInterval(function() {
	if (currentTab === 'inbox') {
		var count = document.querySelector('.storagenumbers .count')
		if (count !== null) {
			Messenger.sendToHost('messageCount', count.innerText)
		}
	}
}, 2000)

function sendCountsForPhrase(phrase, slug) {
	var count = [].slice.call(document.querySelectorAll('.previewline'))
		.filter(function(line) {
			return line.innerText.toLowerCase()
				.includes(phrase.toLowerCase())
		})
		.length
	Messenger.sendToHost(slug + 'PhraseCount', count)
}

function countsForPhrase(phrase) {
	var count = [].slice.call(document.querySelectorAll('.previewline'))
		.filter(function(line) {
			return line.innerText.toLowerCase()
				.includes(phrase.toLowerCase())
		})
		.length
}

function deleteMessagesByPhrases(phrases) {
	phrases.forEach(function(phrase) {
		[].slice.call(document.querySelectorAll('.previewline'))
			.filter(function(line) {
				return line.innerText.toLowerCase()
					.includes(phrase.toLowerCase())
			})
			.map(function(el) {
				id = el.parentElement.parentElement.parentElement.id
				return document.querySelector('#' + id + ' .quickdelete_link ')
			})
			.forEach(function(item, idx) {
				setTimeout(function() {
					item.click()
					console.log('deleting ' + phrase + ' ' + idx)
				}, idx * 1000)
			})
	})
}

function deleteOldMessages() {
	messages = [].slice.call(document.querySelectorAll('.thread.message'))
	messages
		.filter(function(message) {
			id = document.querySelector('#' + message.id + ' .fancydate')
				.id
			date = new Date((id.split('_')[1]) / 1000)
			return ((new Date() - date) / 60 / 60 / 24) > 90
		})
		.length
		.map(function(message) {
			return document.querySelector('#' + message.id + ' .quickdelete_link')
		})
		.forEach(function(delete_link, idx) {
			setTimeout(function() {
				delete_link.click()
			}, idx * 1000)
		})
}

function deleteOldRepliedToMessages() {
	messages = [].slice.call(document.querySelectorAll('.thread.message'))
	messages
		.filter(function(message) {
			return message.classList.contains('repliedMessage')
		})
		.map(function(message) {
			return document.querySelector('#' + message.id + ' .quickdelete_link')
		})
		.forEach(function(delete_link, idx) {
			setTimeout(function() {
				delete_link.click()
			}, idx * 1000)
		})
}

function deleteNoPhotos() {
	window.delay = 0;
	[].slice.call(document.querySelectorAll('.photo'))
		.filter(function(photo) {
			return photo.children[0].src === 'https://k0.okccdn.com/media/img/user/placeholder_2013/pq_60.png'
		})
		.map(function(el, idx) {
			id = el.parentElement.parentElement.parentElement.id
			setTimeout(function() {
				el.parentElement.parentElement.parentElement.remove()
			}, idx + 10000)
			return document.querySelector('#' + id + ' .quickdelete_link ')
		})
		.forEach(function(item, idx) {
			window.delay += 1
			setTimeout(function() {

				item.click()
			}, idx * 1000)
		})

	// setTimeout(function() {
	// 	if ([].slice.call(document.querySelectorAll('.photo'))
	// 		.length > 0) {
	// 		location.reload()
	// 	}
	// }, delay)
}


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

Messenger.on('currentTab', function(sender, tab) {

	currentTab = tab
})

Messenger.on('nextMatch', function() {
	nextMatch()
})
autoDelete = {}
Messenger.on('toggleAutodelete', function(sender, toggle) {

	autoDelete[toggle.command] = toggle.enabled

})

Messenger.on('setState', function(sender, nextState) {

	if (state !== nextState) {
		state = nextState

	}
})

window.setInterval(function() {
	_.each(state.autodelete, function(enabled, command) {

		if (enabled) {

			// window[command]()
			eval(command + '()');
		}
	})
}, 3000)

window.setInterval(function() {
	if (prevMessageCount === totalMessages()) {
		if (!anyMessages()) {
			location.reload()
		}
	} else {

		prevMessageCount = totalMessages()
	}
}, 5000)

function nextMatch() {
	if (location.pathname === '/messages' && !location.search.includes('readmsg')) {
		messages = [].slice.call(document.querySelectorAll('.thread'))
		messages
			.filter(function(message) {
				classList = [].slice.call(message.classList)
				return !classList.includes('repliedMessage')
			})
			.forEach(function(message, idx) {
				document.querySelector('#' + message.id + ' .open')
					.click()
				throw BreakException
			})
	}

	if (document.querySelector('.desc')
		.innerText.includes('perfect time')) {
		document.querySelector('.desc a')
			.click()
	}

}

function scrollToBottom() {
	if (location.pathname === '/messages' && !location.search.includes('readmsg')) {
		window.scrollTo(0, document.body.scrollHeight)
	}
}
