module.exports = {
	name: "kanna",
	alias: ["kanagen", 'kana'],
	category: "meme maker",
	desc: "membuat meme gambar anime kanna gen",
	isSpam: true,
	isLimit: true,
	query: true,
	example: 'halo',
	async run({ msg, conn }, { q }) {
		hasil = 'https://api-xcoders.xyz/api/maker/kannagen?text=' + encodeURIComponent(q) + '&apikey=' + apikey
    conn.sendFile(msg.from, hasil, '', '', msg)
	},
}