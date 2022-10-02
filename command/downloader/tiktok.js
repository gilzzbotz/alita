const fetch = require("node-fetch")

module.exports = {
	name: "tiktok",
	alias: ["tt", "ttdl", "ttvideo", "ttnowm", "tiktoknowm"],
	use: "link",
	category: "downloader",
	desc: "download video dari tiktok tanpa watermark",
	isUrl: true,
	isSpam: true,
	isLimit: true,
	query: true, 
	example: "https://vt.tiktok.com/ZSRuo5pFM/",
	async run({ msg, conn }, { q }) {
		let coba = await fetch('http://hadi-api.cf/api/tiktok?url=' + q, {method: "get"})
    let tt = await coba.json()
    await conn.sendMessage(msg.from, {
    	video: {
    		url: tt.result.video.nowm
    	},
		 caption: ' ',
		 buttons: [
			{ buttonId: 'tiktokmusic ' + q, buttonText: { displayText: 'Audio' }, type: 1}],
			}, { quoted: msg })
	}
}