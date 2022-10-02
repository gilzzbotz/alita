module.exports = {
	name: "naoka",
	alias: ["gfx5"],
	use: "text | text",
	category: "Image Maker",
	desc: "membuat gfx dengan karakter anime",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "Alita",
	async run({ msg, conn }, { q }) {
    let anu = q.split('|')
	  a = anu[0] !== "" ? anu[0] : ' ';
		b = typeof anu[1] !== "undefined" ? anu[1] : ' ';
		conn.sendFile(msg.from, 'https://chikka-web.herokuapp.com/api/bot/gfx4?text1=' + encodeURIComponent(a) + '&text2=' + encodeURIComponent(b) + '&apikey=demo', '', '', msg)
	}
}