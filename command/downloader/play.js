const fetch = require("node-fetch")
const { Client } = require('youtubei')
const you = new Client()
const { y2mateA } = require("../../lib/y2mate");
module.exports = {
	name: "play",
	alias: ["song", "lagu"],
	use: "query",
	category: "downloader",
	desc: "download audio/video dari YouTube",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "dear god",
	async run({ msg, conn }, { q, getBuffer }) {
		let cari = await you.search(q, {type: "video"})
    let hasil = cari.map((v) => {
    	return {
    		id: v.id,
    		title: v['title'],
    		duration: v['duration'],
    		views: v['viewCount'],
    		thumbnail: v.thumbnails[0].url.split('?')[0],
    	}
    })
    
    let goo = await fetch('https://api.akuari.my.id/downloader/youtube3?link=https://youtu.be/' + hasil[0].id + '&type=480', {method: 'get'})
    let yt = await goo.json()
   // if(Number(yt.result.size.split(' MB')[0]) >= 10) {
    //} else {
    
   conn.sendMessage(msg.from, { audio: { url: yt.audio.audio }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
      //  }
    conn.sendMessage(msg.from, { image: { 
    	url: hasil[0].thumbnail },
    	caption: hasil[0].title,
    	buttons: [{
    		buttonId: "ytmp3 " + "https://youtu.be/" + hasil[0].id, buttonText: { displayText: 'Audio'}, type: 1},{ 
    		buttonId: "ytmp4 " + "https://youtu.be/" + hasil[0].id, buttonText: { displayText: 'Video'}, type: 2}
    		]}, { quoted: msg });
	}
}
