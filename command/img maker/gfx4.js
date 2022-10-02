module.exports = {
	name: "kaneki",
	alias: ["gfx4"],
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
		conn.sendFile(msg.from, 'https://chikka-web.herokuapp.com/api/bot/gfx1?nama=' + encodeURIComponent(q) + '&apikey=demo', '', '', msg)
	}
}