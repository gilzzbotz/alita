module.exports = {
	name: "ren",
	alias: ["gfx6"],
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
		conn.sendFile(msg.from, 'https://rest-beni.herokuapp.com/api/canvas/gfx5?teks=' + q, '', '', msg)
	}
}