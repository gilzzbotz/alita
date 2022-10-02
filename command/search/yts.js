const { Client } = require('youtubei')
const you = new Client()

module.exports = {
	name: "ytsearch",
	alias: ["yts"],
	use: "query",
	category: "search engine",
	desc: "Mesin pencarian YouTube",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "ya sudahlah",
	async run({ msg, conn }, { q }) {
		let cari = await you.search(q, {type: "video"})
		var sections = []
		sections.push({
			title: q.toUpperCase(),
			rows: cari.map((v) => ({
				title: v['title'],
				rowId: `play https://youtu.be/` + v.id,
			}))})
		conn.sendMessage(msg.from, {
			title: `Pencarian ` + q.toUpperCase(),
			text: cari.length + ' video ' + q + ' telah ditemukan, silahkan pilih untuk mendownload',
			footer: '',
			buttonText: 'Pilih',
			sections})
	}
}