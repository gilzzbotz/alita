module.exports = {
	name: "listpremium",
	alias: ["listprem", "listvip"],
	category: "main",
	isSpam: true,
	async run({ msg, conn }) {
		let data = db.data.users
        let caption = `List Premium\n\n`
        for (let i in data) {
        	if (data[i].premium === true) {
            let checkExp = require("parse-ms")(data[i].premiumExp - Date.now());
            caption += `*Link WhatsApp* : wa.me/${i.split("@")[0]}\n*Premium Expired* : ${checkExp.year ? checkExp.year + ' tahun' : checkExp.days ? checkExp.days + ' hari' : checkExp.hours ? checkExp.hours + ' jam' : checkExp.minutes ? checkExp.minutes + ' menit' : checkExp.seconds ? checkExp.seconds + ' detik' : ''}\n\n`;
        	}
        }
		msg.reply(caption)
	},
};
