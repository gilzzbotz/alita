let fetch = require('node-fetch')

module.exports = {
	name: "tebakkata",
	alias: ["tebakkata"],
	category: "game",
	desc: "Game untuk menebak sesuatu dari susunan kata",
	isSpam: true,
	isGroup: true,
	isLimitGame: true,
	async run({ msg, conn }, { q, map }) {
		let from = msg.from
		conn.game = conn.game ? conn.game : {}
		if (from in conn.game) {
			conn.sendMessage(msg.from, { text: 'Silahkan selesaikan permainan terlebih dahulu'}, {quoted: conn.game[from][0]})
			return false 
		} 
		
		let ambil = await (await fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/game/tebakkata.json')).json()
		let json = ambil[Math.floor(Math.random() * ambil.length)]
		caption = json.soal + '\n\nWaktumu 30 detik untuk menjawab'
		conn.game[from] = [
			await msg.reply(caption),
			json.jawaban,
			setTimeout(() => {
				capt = conn.game[from][1].replace(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/gi, '-')
				conn.sendMessage(msg.from, { text: "Petunjuk : " + capt.toUpperCase()}, { quoted: conn.game[from][0] })
			}, 30000 - 10000),
			setTimeout(() => {
				conn.sendMessage(msg.from, { text: 'Waktu habis, Jawabannya adalah ' + conn.game[from][1].toUpperCase()}, { quoted: conn.game[from][0]})
				delete conn.game[from]
				db.data.users[msg.sender].game += 1
				db.data.users[msg.sender].gamelose += 1
				db.data.users[msg.sender].mmr -= 5
			}, 30000)
    ]
	},
};
