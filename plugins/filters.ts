import Vue from 'vue'

// Vue.filter('Bluu', (value: string) =>
// 	typeof value.replaceAll === 'function'
// 		? value
// 				.replaceAll('ą', 'a')
// 				.replaceAll('Ą', 'A')
// 				.replaceAll('ę', 'e')
// 				.replaceAll('Ę', 'E')
// 		: value,
// )
Vue.filter('Bluu', (value: string) =>
	`${value}`
		.replace(/ą/g, 'a')
		.replace(/Ą/g, 'A')
		.replace(/ę/g, 'e')
		.replace(/Ę/g, 'E'),
)
