module.exports = {
	name: "setinfo",
	alias: ["setin"],
	category: "private",
	desc: "Mengganti informasi bot",
	isSpam: true,
	isOwner: true,
	query: true,
	use: 'text',
	async run({ msg, conn }, { q }) {
		db.data.setting.info = q 
		msg.reply('Sukses mengganti info')
	},
};
