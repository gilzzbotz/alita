const axios = require("axios");
const { sticker } = require("../../lib/convert");

module.exports = {
	name: "ttp",
	alias: ["ttp"],
	desc: "Convert text to sticker",
	use: "text",
	category: "converter",
	query: "Please enter text",
	isSpam: true,
	isLimit: true,
	wait: true,
	async run({ msg, conn }, { q, getBuffer }) {
		let letsgo = 'https://api.akuari.my.id/other/ttp?text=' + encodeURIComponent(q)
		let final = await getBuffer(letsgo)
		const packInfo = {
			packname: db.data.setting.packname,
			author: db.data.setting.author,
		}; 
		stickerBuff = await sticker(final, { isSticker: true, withPackInfo: true, packInfo, cmdType: "1" });
		await conn.sendMessage(msg.from, { sticker: stickerBuff }, { quoted: msg });
	},
};