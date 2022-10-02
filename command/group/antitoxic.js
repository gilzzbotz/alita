module.exports = {
	name: "antitoxic",
	desc: "Mengaktifkan antitoxic dalam group",
	use: "on / off",
	category: "group",
	//query: true,
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	//isSpam: true,
	async run({ msg, conn }, { q }) {
		text = q
		if (text === 'on') {
			if (db.data.group[msg.from].antitoxic === true) return msg.reply('Anti toxic sudah aktif')
			db.data.group[msg.from].antitoxic = true
			msg.reply(`Sukses menyalakan anti toxic`)
		} else if (text === 'off') {
			if (db.data.group[msg.from].antitoxic === false) return msg.reply('Anti toxic sudah non-aktif')
			db.data.group[msg.from].antitoxic = false
			msg.reply(`Sukses mematikan Anti toxic`)
		} else {
			let buttons = [{ 
				buttonId: `antitoxic on`, buttonText: { displayText: 'On'}, type: 1 }, {
			  buttonId: `antitoxic off`, buttonText: { displayText: 'Off'}, type: 1 }]
			let buttonMessage = {
				text: `*ANTI TOXIC*\n*Status:* ${db.data.group[msg.from].antitoxic ? 'Aktif' : 'Tidak aktif'}`,
				footer: ' ',
				buttons: buttons,
				headerType: 4
			}
      conn.sendMessage(msg.from, buttonMessage)
		}
	},
};
