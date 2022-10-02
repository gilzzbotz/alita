module.exports = {
	name: "welcome",
	desc: "Mengaktifkan welcome dalam group",
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
			if (db.data.group[msg.from].welcome === true) return msg.reply('Welcome sudah aktif')
			db.data.group[msg.from].welcome = true
			msg.reply(`Sukses menyalakan welcome`)
		} else if (text === 'off') {
			if (db.data.group[msg.from].welcome === false) return msg.reply('Welcome sudah non-aktif')
			db.data.group[msg.from].welcome = false
			msg.reply(`Sukses mematikan welcome`)
		} else {
			let buttons = [{ 
				buttonId: `welcome on`, buttonText: { displayText: 'On'}, type: 1 }, {
			  buttonId: `welcome off`, buttonText: { displayText: 'Off'}, type: 1 }]
			let buttonMessage = {
				text: `*WELCOME*\n*Status:* ${db.data.group[msg.from].welcome ? 'Aktif' : 'Tidak aktif'}`,
				footer: ' ',
				buttons: buttons,
				headerType: 4
			}
      conn.sendMessage(msg.from, buttonMessage)
		}
	},
};
