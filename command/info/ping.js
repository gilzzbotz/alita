const moment = require("moment-timezone");

const ping = function (timestamp, now) {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

module.exports = {
	name: "ping",
	alias: ["p", "speed"],
	category: "main",
	desc: "kecepatan respon bot.",
	isSpam: true,
	async run({ msg }) {
		await msg.reply(`${ping(msg.messageTimestamp, Date.now())} detik`);
	},
};
