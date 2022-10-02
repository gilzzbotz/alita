const fetch = require('node-fetch')

module.exports = {
	name: "chord",
	alias: ["chord"],
	use: "query",
	category: "search engine",
	desc: "Mesin pencarian chord lagu",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "ya sudahlah",
	async run({ msg, conn }, { q }) {
		text = q
    let cari = await fetch("https://api-xcoders.xyz/api/search/chordlagu?query=" + text + "&apikey=" + apikey, {method: "get"})
    let hasil = await cari.json()
    str = hasil.result.chord
    msg.reply(str)
	}
}