module.exports = {
	name: "drake",
	alias: ["drake"],
	category: "meme maker",
	desc: "membuat meme gambar drake",
	isSpam: true,
	isLimit: true,
	query: true,
	example: 'halo | hai',
	async run({ msg, conn }, { q, args }) {
		let anu = args.join(" ").split('|')
		let text1 = anu[0] !== '' ? anu[0] : 'Text 1 nya mana'
    let text2 = anu[1] !== '' ? anu[1] : 'Text 2 nya mana'
    let hasil = 'https://api-xcoders.xyz/api/maker/drake?text=' + text1 + '&text2=' + text2 + '&apikey=' + apikey
    await conn.sendFile(msg.from, hasil, '', '', msg)
	},
}