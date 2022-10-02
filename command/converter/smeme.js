// module
const BodyForm = require("form-data");
const axios = require("axios");
const fs = require("fs");
const filetype = require("file-type");
let util = require('util')
const { sticker } = require("../../lib/convert");
//end module

//function upload file
function TelegraPh (Path) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}

let { webp2png } = require("../../lib/webp2");

function getRandom (ext, length = "10") {
    var result = ""
    var character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    var characterLength = character.length
    for (var i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * characterLength))
    }

    return `${result}.${ext}`
}

module.exports = {
	name: "smeme",
	alias: ["stext"],
	desc: "menambah text kedalam sticker",
	use: "text | text",
	category: "converter",
	isSpam: true,
	isLimit: true,
	query: true,
	wait: true,
	async run({ msg, conn }, { q, getBuffer}) {
		const { quoted, type } = msg;
		const content = JSON.stringify(quoted);
		const isMedia = type === "imageMessage"
		const isQImg = type === "extendedTextMessage" && content.includes("imageMessage");
		const isQStic = type === "extendedTextMessage" && content.includes("stickerMessage");
		if(isMedia || isQImg || isQStic ) {
		let download = isQStic || isQImg ? await msg.quoted.download() : await msg.download()
		const form = new BodyForm()
		form.append('sampleFile', download, { filename: 'fromBot-' + getRandom('jpg') })
		if (q) {
			form.append('comment', q)
		} else {
			form.append('comment', "Alita")
		}
		let hasil = await axios.post('https://api-xcoders.xyz/api/tools/upload', form.getBuffer(), { headers: { "content-type": `multipart/form-data; boundary=${form._boundary}`}
		}).then(({ data }) => {
			return data.result.url
		})
		if (q.match('|')) {
			 let anu = q.split('|')
		    a = anu[0] !== "" ? anu[0] : ' ';
		    b = typeof anu[1] !== "undefined" ? anu[1] : ' ';
		    wasted = `https://api.memegen.link/images/custom/${encodeURIComponent(a)}/${encodeURIComponent(b)}.png?background=${hasil}`
		    final = await getBuffer(wasted) 
		    packInfo = {
		    	packname: db.data.setting.packname,
		    	author: db.data.setting.author,
		    }
		    stickerBuff = await sticker(final, { isSticker: true, withPackInfo: true, packInfo, cmdType: "1" });
		    await conn.sendMessage(msg.from, { sticker: stickerBuff }, { quoted: msg });
		    delete filename 
		} else {
			spasi = ' '
			wasted = `https://api.memegen.link/images/custom/${spasi}/${q}.png?background=${hasil}`
		    final = await getBuffer(wasted) 
		    packInfo = {
		    	packname: db.data.setting.packname,
		    	author: db.data.setting.author,
		    }
		    stickerBuff = await sticker(final, { isSticker: true, withPackInfo: true, packInfo, cmdType: "1" });
		    await conn.sendMessage(msg.from, { sticker: stickerBuff }, { quoted: msg });
		    delete filename 
		}
		} else {
			msg.reply('Kirim atau reply gambar/sticker dengan caption smeme text')
		}
	},
};
