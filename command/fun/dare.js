module.exports = {
	name: "dare",
	alias: ["dare"],
	category: "fun",
	desc: "game truth or dare",
	isSpam: true,
	isGroup: true,
	isLimit: true,
	async run({ msg, conn }, { q }) {
	  let cari = await rzky.randomtext.dare()
        let hasil = cari.result
        msg.reply(hasil)
	},
}