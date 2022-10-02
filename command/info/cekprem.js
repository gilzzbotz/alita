module.exports = {
	name: "cekpremium",
	alias: ["cekprem", "cekvip"],
	category: "main",
	isSpam: true,
	isPremium: true,
	async run({ msg, conn }) {
		let cekprem = require("parse-ms")(db.data.users[msg.sender].premiumExp - Date.now());
        let caption = `*Premium Expired* : ${cekprem.days ? cekprem.days + ' hari' : cekprem.hours ? cekprem.hours + ' jam' : cekprem.minutes ? cekprem.minutes + ' menit' : cekprem.seconds ? cekprem.seconds + ' detik' : ''}`
        msg.reply(caption)
	},
};
