module.exports = {
	name: "bisakah",
	alias: ["bisakah"],
	category: "magic shell",
	desc: "dapatkan jawaban dari kerang ajaib",
	use: "text",
	query: true,
	isSpam: true,
	isGroup: true,
	isLimit: true,
	async run({ msg, conn }, { q, pickRandom }) {
	  apa = ['Tidak bisa', 'Iya', 'Mungkin saja bisa', 'Mungkin tidak bisa', "Todak tahu", "Mungkin bisa", "Coba tanyakan sekali lagi"]
    jawaban = pickRandom(apa)
    capt = 'Bisakah ' + q
    capt += "\n*" + jawaban  + "*"
    msg.reply(capt, { withTag: true })
	},
}