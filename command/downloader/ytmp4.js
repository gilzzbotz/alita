const fetch = require("node-fetch")
const { youtube } = require("../../scrape/yt");
const { y2mateV } = require("../../lib/y2mate");
module.exports = {
	name: "ytmp4",
	alias: ["ytv", "ytvideo", "video"],
	use: "link",
	category: "downloader",
	desc: "download video dari YouTube",
	isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "link",
	async run({ msg, conn }, { q, args, getBuffer }) {
		let goo = await fetch('https://api.akuari.my.id/downloader/youtube3?link=' + args[0] + '&type=480', {method: 'get'})
		let yt = await goo.json()
		/*
    var yt = await y2mateV(q, "480");
		if (yt[0].link == "https://app.y2mate.com/download") yt = await y2mateV(q, "360");
		if (yt[0].link == "https://app.y2mate.com/download") yt = await y2mateV(q, "144");
		*/
   // if(Number(yt.result.size.split(' MB')[0]) >= 100.00) return msg.reply("Ukuran file melebihi limit, download video dibatalkan..")
         await conn.sendMessage( 
				  msg.from, 
				  { document: { 
				    url: yt.mp4.download }, 
				    mimetype: 'video/mp4', 
				    fileName: yt.title + '.mp4',
				    contextInfo: {
          externalAdReply: {
            title: yt.title,
            body: ' ',
            mediaType: 2,
            thumbnail: await getBuffer(yt.thumbnail),
            mediaUrl: args[0]
          }
        }
				  }, { quoted: msg })
	}
}
