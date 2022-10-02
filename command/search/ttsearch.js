const fetch = require('node-fetch')

module.exports = {
	name: "ttsearch",
	alias: ["ttsearch"],
	use: "query",
	category: "search engine",
	desc: "Mesin pencarian video tiktok",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "unaa",
	async run({ msg, conn }, { q }) {
		text = q
		let coba = await fetch('https://api-xcoders.xyz/api/search/tiktokhashtag?query='+ text + '&apikey=' + apikey, {method: "get"})
		let cari = await coba.json()
		if (cari.status === false) return msg.reply('Video ' + text + 'tidak ditemukan')
		var sections = []
		sections.push({
			title: text.toUpperCase(),
			rows: cari.result.map((v) => ({
				title: '@' + v.username,
				rowId: `tiktok ` + v.videoUrl,
				description: v.description
			}))})
		conn.sendMessage(msg.from, {
			title: `Pencarian ` + text.toUpperCase(),
			text: 'Tiktok video ' + text + ' telah ditemukan, silahkan pilih untuk mendownload',
			footer: '',
			buttonText: 'Pilih',
			sections})
	}
}