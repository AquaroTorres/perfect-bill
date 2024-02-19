module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,js,html,conf,sh,css,json,md}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};