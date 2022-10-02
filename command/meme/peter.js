// module
const BodyForm = require("form-data");
const axios = require("axios");
const fs = require("fs");
const filetype = require("file-type");
let util = require('util')
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
	name: "peter",
	alias: ["pater"],
	desc: "",
	use: "",
	category: "meme maker",
	isSpam: true,
	isLimit: true,
	//wait: true,
	async run({ msg, conn }, { q }) {
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
		conn.sendFile(msg.from, 'https://api-xcoders.xyz/api/maker/trash?url=' + hasil + '&apikey=' + apikey, '', '', msg)
		} else {
			msg.reply('Kirim atau reply gambar dengan caption peter')
		}
	},
};
