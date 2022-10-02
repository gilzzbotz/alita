module.exports = {
	name: "linkgc",
	alias: ["linkgc"],
	category: "group",
	desc: "mendapatkan linkgroup",
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	isSpam: true,
	async run({ msg, conn }, { q }) {
	  const code = await conn.groupInviteCode(msg.from)
		const templateButtons = [
    {index: 1, urlButton: {displayText: 'Copy Link', url: 'https://www.whatsapp.com/otp/copy/ https://chat.whatsapp.com/' + code}} 
    ]
    const templateMessage = {
    text: 'Berhasil mengambil link group',
    footer: '',
    templateButtons: templateButtons 
    }
    await conn.sendMessage(msg.from, templateMessage);
	},
};
