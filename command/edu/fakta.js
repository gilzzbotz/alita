module.exports = {
	name: "fakta",
	alias: ["fakta"],
	use: "",
	category: "information & education",
	desc: "Random fakta unik di dunia",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	//query: true, 
	example: "pythagoras",
	async run({ msg, conn }, { q }) {
    let cari = await rzky.randomtext.fakta()
    let hasil = cari.result
    msg.reply(hasil)
	}
}