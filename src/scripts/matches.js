_ = require('lodash')

function getSortedKeys(obj) {
	var keys = [];
	for (var key in obj) keys.push(key);
	return keys.sort(function(a, b) {
		return obj[a] - obj[b]
	});
}

var counts = {};
[].slice.call(document.querySelectorAll('.userrow-meta-location'))
	.map(function(loc) {
		array = loc.innerText.split(', ')
		return array[array.length - 1]
	})
	.forEach(function(state, idx) {
		counts[state] = counts[state] ? counts[state] + 1 : 1
	})

counts = _sortBy(counts, function(value, state) {
	console.log(value, state)
})
console.log(counts)
