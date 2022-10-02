const fetch = require("node-fetch")

module.exports = {
	name: "instagram",
	alias: ["ig", "igdl"],
	use: "link",
	category: "downloader",
	desc: "download image/video dari Instagram",
	isUrl: true,
	isSpam: true,
	isLimit: true,
	query: true, 
	example: "https://www.instagram.com/reel/Cgtul95g2e4/?igshid=MTA0ZTI1NzA=",
	async run({ msg, conn }, { args }) {
		let res = await fetch('https://api.akuari.my.id/downloader/igdl2?link=' + args[0], {method: "get"})
		let ig = await res.json()
		if (!ig.hasil) return msg.reply('Maaf sepertinya fitur sedang mengalami Error..')
		for (var i of ig.hasil.url_list) {
			require('delay')(5000)
			await conn.sendFile(msg.from, i, '', '', msg)
		}
	}
}