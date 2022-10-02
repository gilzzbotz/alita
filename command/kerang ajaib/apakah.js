module.exports = {
	name: "apakah",
	alias: ["apakah"],
	category: "magic shell",
	desc: "dapatkan jawaban dari kerang ajaib",
	use: "text",
	query: true,
	isSpam: true,
	isGroup: true,
	isLimit: true,
	async run({ msg, conn }, { q, pickRandom }) {
	  apa = ['Tidak', 'Iya', 'Mungkin saja iya', 'Mungkin tidak', "Tidak tahu", "Mungkin iya", "Coba tanyakan sekali lagi"]
    jawaban = pickRandom(apa)
    capt = 'Apakah ' + q
    capt += "\n*" + jawaban  + "*"
    msg.reply(capt, { withTag: true })
	},
}