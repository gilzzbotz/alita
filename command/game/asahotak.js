let fetch = require('node-fetch')

module.exports = {
	name: "asahotak",
	alias: ["asahotak"],
	category: "game",
	desc: "Game untuk mengasah otak kamu",
	isSpam: true,
	isGroup: true,
	isLimitGame: true,
	async run({ msg, conn }, { q, map }) {
		let from = msg.from
		conn.game = conn.game ? conn.game : {}
		if (from in conn.game) {
			msg.reply('Silahkan selesaikan permainan terlebih dahulu', conn.game[from][0])
			return false 
		} 
		
		let ambil = await (await fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/game/asahotak.json')).json()
		let json = ambil[Math.floor(Math.random() * ambil.length)]
		caption = json.soal + '\n\nWaktumu 30 detik untuk menjawab'
		conn.game[from] = [
			await msg.reply(caption),
			json.jawaban,
			setTimeout(() => {
				capt = conn.game[from][1].replace(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/gi, '-')
				msg.reply("Petunjuk : " + capt.toUpperCase(), conn.game[from][0])
			}, 30000 - 10000),
			setTimeout(() => {
				msg.reply('Waktu habis, Jawabannya adalah ' + conn.game[from][1].toUpperCase(), conn.game[from][0])
				delete conn.game[from]
				db.data.users[msg.sender].game += 1
				db.data.users[msg.sender].gamelose += 1
				db.data.users[msg.sender].mmr -= 5
			}, 30000)
    ]
	},
};
