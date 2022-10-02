/*
function formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

const ms = require('parse-ms')
const toMs = require('ms')

module.exports = {
	name: "buy",
	alias: ["buy"],
	desc: "Membeli limit dan Premium",
	use: "",
	type: "changelog",
	async run({ msg, conn }, { q, args }) {
	  data = db.data.users[msg.sender]
	  var jumlah = args[1]
			if (args[0] === 'premium') {
				capt = `Saldo ATM : ${formatNumber(db.data.users[msg.sender].atm)}\n\n`
				capt += `*List Harga Premium*\n`
				capt += `1 jam : Rp. 45.000,-\n`
				capt += `Beli dengan ketik buy premium jumlah\nContoh : buy premium 2`
				if (!jumlah) return msg.reply(capt)
				if (isNaN(jumlah)) return msg.reply('Gunakan angka untuk jumlah..')
				hrp = jumlah * 45000
				if (hrp >= data.atm) return msg.reply('Uang kamu belum cukup untuk membeli premium')
				db.data.users[msg.sender].premium = true 
				db.data.users[msg.sender].premiumExp = Date.now() + toMs(jumlah + 'h') 
				db.data.users[msg.sender].atm -= hrp 
				msg.reply('Berhasil membeli premium ' + jumlah + ' jam')
			} else if (args[0] === 'limit') {
				capt = `Saldo ATM : ${formatNumber(db.data.users[msg.sender].atm)}\n\n`
				capt += `*Harga Limit*\n`
				capt += `1 limit = Rp. 1000,-\n`
				capt += `Beli dengan ketik buy limit jumlah\nContoh : buy limit 2`
				if (!jumlah) return msg.reply(capt)
				if (isNaN(jumlah)) return msg.reply('Gunakan angka untuk jumlah..')
				hrp = jumlah * 1000
				if (hrp >= data.atm) return msg.reply('Uang kamu belum cukup untuk membeli limit')
				db.data.users[msg.sender].limit += jumlah
				db.data.users[msg.sender].atm -= hrp 
				msg.reply('Berhasil membeli limit ' + jumlah)
			} else if (args[0] === 'limitgame') {
				capt = `Saldo ATM : ${formatNumber(db.data.users[msg.sender].atm)}\n\n`
				capt += `*Harga Limit Game*\n`
				capt += `1 limit = Rp. 2000,-\n`
				capt += `Beli dengan ketik buy limitgame jumlah\nContoh : buy limitgame 1`
				if (!jumlah) return msg.reply(capt)
				if (isNaN(jumlah)) return msg.reply('Gunakan angka untuk jumlah..')
				hrp = jumlah * 2000
				if (hrp >= data.atm) return msg.reply('Uang kamu belum cukup untuk membeli limit Game..')
				db.data.users[msg.sender].atm -= hrp
				db.data.users[msg.sender].limitgame += jumlah
				msg.reply('Berhasil membeli limit game ' + jumlah)
			} else {
				capt = `Saldo ATM : ${formatNumber(db.data.users[msg.sender].atm)}\n\n`
				capt += `*List Order*\n`
				capt += `• Premium\n`
				capt += `• Limit\n`
				capt += `• Limit Game`
				buttonMessage = {
					text: capt,
					footer: ' ',
					buttons: [{ 
						buttonId: 'buy premium', buttonText: { 
							displayText: 'Premium' }, type: 1}, { 
					  buttonId: 'buy limit', buttonText: { 
						  displayText: 'Limit' }, type: 1}, {
					  buttonId: 'buy limitgame', buttonText: { 
						  displayText: 'Limit Game' }, type: 1}],
					headerType: 1
			}
      await conn.sendMessage(msg.from, buttonMessage)
			}
		}
	}
	*/