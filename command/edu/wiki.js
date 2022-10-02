const fetch = require('node-fetch')

module.exports = {
	name: "wikipedia",
	alias: ["wiki"],
	use: "query",
	category: "information & education",
	desc: "Mesin pencarian informasi di Wikipedia",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "Soekarno",
	async run({ msg, conn }, { q }) {
    var wiki = await rzky.search.wiki(q);
    if (wiki.img == "https://telegra.ph/file/1cde98e7bc902331edc90.png") return msg.reply(q + ` tidak ditemukan`);
		var img = wiki.img;
		delete wiki.img;
		result = `*${wiki.judul}.* \n`
		result += wiki.result
		if (!img) {
			msg.reply(result)
		} else {
		await conn.sendFile(msg.from, img, "wiki.jpg", result, msg);
		}
	}
}