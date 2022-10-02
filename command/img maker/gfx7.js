module.exports = {
	name: "kobo",
	alias: ["gfx7"],
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
		conn.sendFile(msg.from, 'https://rest-beni.herokuapp.com/api/canvas/customgfx1?teks=' + q + '&bg=https://user-images.githubusercontent.com/72728486/190111632-d9172944-aff8-4daa-b8c8-9fe678f8a1eb.jpg', '', '', msg)
	}
}