let baileys = require("@adiwajshing/baileys");

module.exports = {
	name: "delete",
	alias: ["delete", "del"],
	desc: "delete bot messages",
	category: "main",
	isQuoted: true,
	async run({ msg, conn }) {
		if (!msg.quoted.isSelf) return msg.reply("Hanya bisa menghapus pesanku")
		conn.sendMessage(msg.from, { delete: msg.quoted.key })
},
}