module.exports = {
	name: "demote",
	alias: ["dm"],
	category: "group",
	desc: "Demote admin group",
	use: "",
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, conn }) {
		if (!msg.quoted && !msg.mentions) return msg.reply('Silahkan ulangi dan tag salah satu member')
		const mm = msg.quoted ? [msg.quoted.sender] : msg.mentions;
		for (let i of mm) await conn.groupParticipantsUpdate(msg.from, [i], "demote");
		await msg.reply("Suksess menurunkan jabatan admin");
	},
};
