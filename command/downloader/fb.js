const fetch = require("node-fetch")

module.exports = {
	name: "facebook",
	alias: ["fb", "fbdl"],
	use: "link",
	category: "downloader",
	desc: "download video dari facebook",
	isUrl: true,
	isSpam: true,
	isLimit: true,
	query: true, 
	example: "https://www.facebook.com/reel/471804074335613?s=yWDuG2&fs=e",
	async run({ msg, conn }, { args }) {
		let res = await fetch('https://api.akuari.my.id/downloader/fbdl2?link=' + args[0], {method: "get"})
		let fb = await res.json()
		if (!fb.hasil) return msg.reply('Maaf sepertinya fitur sedang mengalami Error..')
		await conn.sendFile(msg.from, fb.hasil[0].url, '', '', msg)
	}
}