const fetch = require("node-fetch")
const { youtube } = require("../../scrape/yt");
const { y2mateA } = require("../../lib/y2mate");
module.exports = {
	name: "ytmp3",
	alias: ["ytaudio", "audio", "yta"],
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
    let yt = await goo.json() //await y2mateA(q, "256");
   // if(Number(yt.result.size.split(' MB')[0]) >= 30) return msg.reply("Ukuran file melebihi limit, download dibatalkan")
    await conn.sendMessage(msg.from, { 
    	document: { url: yt.audio.audio }, 
    	mimetype: 'audio/mpeg', 
    	fileName: yt.title + '.mp3',
    	contextInfo: {
    		externalAdReply: {
    			title: yt.title,
    			body: ' ',
    			mediaType: 2,
    			thumbnail: await getBuffer(yt.thumbnail),
    			mediaUrl: q }
    	}
    }, { quoted: msg })
	}
}
