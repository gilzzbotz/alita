const { convertTime } = require("../../lib");

module.exports = {
	name: "runtime",
	category: "info",
	type: "changelog",
	desc: "cek runtime bot",
	isSpam: true,
	async run({ msg, conn }, { map }) {
		await msg.reply(convertTime(map.uptime.getTime()));
	},
};
