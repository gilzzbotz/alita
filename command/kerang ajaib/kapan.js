module.exports = {
	name: "kapankah",
	alias: ["kapankah"],
	category: "magic shell",
	desc: "mendapatkan jawaban dari kerang ajaib",
	use: "text",
	query: true,
	isSpam: true,
	isGroup: true,
	isLimit: true,
	async run({ msg, conn }, { q, pickRandom }) {
	  No = Math.floor(Math.random() * 10)
    Apa = ["Jam lagi","Hari lagi","Minggu lagi","Bulan lagi","Tahun lagi"]
    jawaban = pickRandom(Apa)
    capt = 'Kapankah ' + q + ' ?'
    capt += '\n*' + No + ' ' + jawaban + "*"
    msg.reply(capt, { withTag: true })
	},
}