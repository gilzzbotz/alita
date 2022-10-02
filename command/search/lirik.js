const fetch = require('node-fetch')

module.exports = {
	name: "lirik",
	alias: ["lyrics"],
	use: "query",
	category: "search engine",
	desc: "Mesin pencarian lirik lagu",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "unaa",
	async run({ msg, conn }, { q }) {
		text = q
    let cari = await fetch("https://api-xcoders.xyz/api/search/liriklagu?query=" + text + "&apikey=" + apikey, {method: "get"})
    let hasil = await cari.json()
    if (hasil.result.lyrics === "") return msg.reply("Lirik " + text + " tidak ditemukan")
    str = hasil.result.lyrics
    msg.reply(str)
	}
}