module.exports = {
	name: "gura",
	alias: ["gfx3"],
	use: "text",
	category: "Image Maker",
	desc: "membuat gfx dengan karakter anime",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "Alita",
	async run({ msg, conn }, { q }) {
		conn.sendFile(msg.from, 'https://chikka-web.herokuapp.com/api/bot/gura?nama=' + encodeURIComponent(q) + '&apikey=demo', '', '', msg)
	}
}