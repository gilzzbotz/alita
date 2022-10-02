module.exports = {
	name: "truth",
	alias: ["truth"],
	category: "fun",
	desc: "game truth or dare",
	isSpam: true,
	isGroup: true,
	isLimit: true,
	async run({ msg, conn }, { q }) {
	  let cari = await rzky.randomtext.truth()
        let hasil = cari.result
        msg.reply(hasil)
	},
}