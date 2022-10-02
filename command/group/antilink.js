module.exports = {
	name: "antilink",
	desc: "Mengaktifkan antilink dalam group",
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
			if (db.data.group[msg.from].antilink === true) return msg.reply('Antilink sudah aktif')
			db.data.group[msg.from].antilink = true
			msg.reply(`Sukses menyalakan antilink`)
		} else if (text === 'off') {
			if (db.data.group[msg.from].antilink === false) return msg.reply('Antilink sudah non-aktif')
			db.data.group[msg.from].antilink = false
			msg.reply(`Sukses mematikan antilink`)
		} else {
			let buttons = [{ 
				buttonId: `antilink on`, buttonText: { displayText: 'On'}, type: 1 }, {
			  buttonId: `antilink off`, buttonText: { displayText: 'Off'}, type: 1 }]
			let buttonMessage = {
				text: `*ANTILINK*\n*Status:* ${db.data.group[msg.from].antilink ? 'Aktif' : 'Tidak aktif'}`,
				footer: ' ',
				buttons: buttons,
				headerType: 4
			}
      conn.sendMessage(msg.from, buttonMessage)
		}
	},
};
