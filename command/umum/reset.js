module.exports = {
	name: "resetlimit",
	alias: ["resetlim"],
	category: "private",
	desc: "Reset Limit",
	isSpam: true,
	isOwner: true,
	//query: true,
	use: '',
	async run({ msg, conn }, { q }) {
		for (var i in db.data.users) {
			db.data.users[i].limit = 20
			db.data.users[i].limitgame = 15
			db.data.users[i].inLimit = false 
			db.data.users[i].inLimitG = false 
		}
		msg.reply('Selesai')
	},
};
