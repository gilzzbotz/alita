const fetch = require("node-fetch")

module.exports = {
	name: "tiktokmusic",
	alias: ["ttaudio", "tiktokaudio"],
	use: "link",
	category: "downloader",
	desc: "download audio dari tiktok",
	isUrl: true,
	isSpam: true,
	isLimit: true,
	query: true, 
	example: "https://vt.tiktok.com/ZSRuo5pFM/",
	async run({ msg, conn }, { q }) {
		let coba = await fetch('http://hadi-api.cf/api/tiktok?url=' + q, {method: "get"})
    let tt = await coba.json()
    await conn.sendMessage(msg.from, {
    	audio: {
    		url: tt.result.audio_only.original
    	}
    },
		 { quoted: msg })
	}
}