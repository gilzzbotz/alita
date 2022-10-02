module.exports = {
	name: "facts",
	alias: ["fact"],
	category: "meme maker",
	desc: "membuat meme gambar",
	isSpam: true,
	isLimit: true,
	query: true,
	example: 'hai',
	async run({ msg, conn }, { q }) {
		hasil = 'https://api-xcoders.xyz/api/maker/facts?text=' + encodeURIComponent(q) + '&apikey=' + apikey
    client.sendFile(msg.from, hasil, '', '', msg)
	},
}