const fetch = require("node-fetch")

module.exports = {
	name: "catbox",
	alias: ["catbox"],
	use: "link",
	category: "downloader",
	desc: "download video dari catbox.moe",
	isUrl: true,
	isSpam: true,
	isLimit: true,
	isPremium: true,
	query: true, 
	example: "link",
	async run({ msg, conn }, { q }) {
		try {
			conn.sendVideo(msg.from, q, msg)
		} catch (e) {
			msg.reply('Maaf sepertinya fitur sedang mengalami Error...')
		}
	}
}