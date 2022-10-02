module.exports = {
	name: "maintenance",
	desc: "Mengaktifkan maintenance",
	use: "on / off",
	category: "private",
	//query: true,
	//isGroup: true,
	//isAdmin: true,
	//isBotAdmin: true,
	//isSpam: true,
	isOwner: true,
	async run({ msg, conn }, { q }) {
		text = q
		if (text === 'on') {
			if (db.data.group[msg.from].maintenance === true) return msg.reply('Maintenance sudah aktif')
			db.data.group[msg.from].maintenance = true
			msg.reply(`Sukses menyalakan Maintenance`)
		} else if (text === 'off') {
			if (db.data.group[msg.from].maintenance === false) return msg.reply('Maintenance sudah non-aktif')
			db.data.group[msg.from].maintenance = false
			msg.reply(`Sukses mematikan Maintenance`)
		} else {
			let buttons = [{ 
				buttonId: `maintenance on`, buttonText: { displayText: 'On'}, type: 1 }, {
			  buttonId: `maintenance off`, buttonText: { displayText: 'Off'}, type: 1 }]
			let buttonMessage = {
				text: `*MAINTENANCE*\n*Status:* ${db.data.group[msg.from].maintenance ? 'Aktif' : 'Tidak aktif'}`,
				footer: ' ',
				buttons: buttons,
				headerType: 4
			}
      conn.sendMessage(msg.from, buttonMessage)
		}
	},
};
