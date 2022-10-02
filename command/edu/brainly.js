const fetch = require('node-fetch')

module.exports = {
	name: "brainly",
	alias: ["brainly"],
	use: "query",
	category: "information & education",
	desc: "Mesin pencarian jawaban brainly",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "pythagoras",
	async run({ msg, conn }, { q }) {
		text = q
    let cari = await fetch("https://api-xcoders.xyz/api/search/brainly?query=" + text + "&apikey=" + apikey, {method: "get"})
    let hasil = await cari.json()
    //if (hasil.status === false) return m.reply("Maaf sepertinya fitur sedang mengalami Error..")
    let answer = hasil.result.map((v, i) => `*Pertanyaan* : ${v.pertanyaan}\n*Jawaban* :\n${v.jawaban.map((v,i) => `${i + 1}) ${v.text}`).join('\n')}`).join('\n*______________________________________*\n\n')
    msg.reply(answer)
	}
}