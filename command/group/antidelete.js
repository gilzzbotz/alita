module.exports = {
	name: "mute",
	desc: "Mengaktifkan mute dalam group",
	use: "on / off",
	category: "group",
	//query: true,
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	//isSpam: true,
	noMute: true,
	async run({ msg, conn }, { q }) {
		text = q
		if (text === 'on') {
			if (db.data.group[msg.from].mute === true) return msg.reply('Mute group sudah aktif')
			db.data.group[msg.from].mute = true
			msg.reply(`Sukses menyalakan Mute group`)
		} else if (text === 'off') {
			if (db.data.group[msg.from].mute === false) return msg.reply('Mute group sudah non-aktif')
			db.data.group[msg.from].mute = false
			msg.reply(`Sukses mematikan Mute group`)
		} else {
			let buttons = [{ 
				buttonId: `mute on`, buttonText: { displayText: 'On'}, type: 1 }, {
			  buttonId: `mute off`, buttonText: { displayText: 'Off'}, type: 1 }]
			let buttonMessage = {
				text: `*MUTE GROUP*\n*Status:* ${db.data.group[msg.from].mute ? 'Aktif' : 'Tidak aktif'}`,
				footer: ' ',
				buttons: buttons,
				headerType: 4
			}
      conn.sendMessage(msg.from, buttonMessage)
		}
	},
};
