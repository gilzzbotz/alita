module.exports = {
	name: "promote",
	alias: ["pm"],
	category: "group",
	desc: "Promote jadi admin group",
	use: "",
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, conn }) {
		if (!msg.quoted && !msg.mentions) return msg.reply('Silahkan ulangi dan tag salah satu member') 
		const mm = msg.quoted ? [msg.quoted.sender] : msg.mentions;
		await msg.reply("Suksess menaikkan jabatan menjadi admin");
		for (let i of mm) await conn.groupParticipantsUpdate(msg.from, [i], "promote");
	},
};
