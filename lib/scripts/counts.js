function weakMessageCount() {
	return ['hi', 'hello', 'hey', 'how are you', 'how are u', "what's up", 'whats up', 'how r u'].map(function (phrase) {
		return [].slice.call(document.querySelectorAll('.previewline')).filter(function (line) {
			return line.innerText.toLowerCase().includes(phrase.toLowerCase());
		}).length;
	}).reduce(function (a, b) {
		return a + b;
	}, 0);
}

function mailboxBadgeCount() {
	messages = document.querySelector('#nav_mailbox_badge .count');
	if (messages === null) {
		return 0;
	} else {
		return +messages.innerText;
	}
}

function countsForPhrase(phrase) {
	var count = [].slice.call(document.querySelectorAll('.previewline')).filter(function (line) {
		return line.innerText.toLowerCase().includes(phrase.toLowerCase());
	}).length;
}