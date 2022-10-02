module.exports = {
	name: ["pinterest"],
	alias: ["pinterest", "pin"],
	use: "link / text",
	category: "downloader",
	desc: "Download video dari pinterest",
	wait: true,
	isLimit: true,
	//isUrl: true,
	isSpam: true,
	query:true,
	example: '',
	async run({ msg, conn }, { q, map, args }) {
	  var teks = args[0];
	  if (q.includes('https://')) {
	  var yt = await rzky.downloader.downloaderAll(teks);
	  var mp4 = yt.mp4[yt.mp4.length - 1];
	  delete yt.mp4;
	  await conn.sendMessage(
						msg.from,
						{
							video: {
								url: mp4.url,
							},
							mimetype: "video/mp4",
							caption: ' ',
							fileName: "pinterest.mp4",
						},
						{
							quoted: msg,
						}
					);
	  } else {
	  	const pin = await rzky.image.pinterest(q);
	  	const pinran = pin.result[Math.floor(Math.random() * pin.result.length)];
	  	conn.sendFile(msg.from, pinran, '', '', msg)
	  }
	},
}