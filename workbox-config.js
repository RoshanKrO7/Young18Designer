module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,html,css,js,png,jpg,jpeg,svg,gif,ico,woff,woff2,ttf,eot}'
	],
	swDest: 'build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	clientsClaim: true,
	skipWaiting: true,
	runtimeCaching: [
		{
			urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
			handler: 'CacheFirst',
			options: {
				cacheName: 'images',
				expiration: {
					maxEntries: 60,
					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
				},
			},
		},
		{
			urlPattern: /\.(?:js|css)$/,
			handler: 'StaleWhileRevalidate',
			options: {
				cacheName: 'static-resources',
			},
		},
		{
			urlPattern: /^https:\/\/fonts\.googleapis\.com/,
			handler: 'StaleWhileRevalidate',
			options: {
				cacheName: 'google-fonts-stylesheets',
			},
		},
		{
			urlPattern: /^https:\/\/fonts\.gstatic\.com/,
			handler: 'CacheFirst',
			options: {
				cacheName: 'google-fonts-webfonts',
				expiration: {
					maxEntries: 30,
					maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
				},
			},
		}
	]
};