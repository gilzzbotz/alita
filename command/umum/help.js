const moment = require('moment-timezone')
const processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};
const reSize = async (image, width, height) => {
			  let jimp = require('jimp')
			  var read = await jimp.read(image);
			  var data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
			  return data
      }

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

module.exports = {
	name: "help",
	alias: ["h", "cmd", "menu"],
	category: "umum",
	async run({ msg, conn }, { q, owner, map, args }) {
		if (q) {
			const data = [];
			const name = q.toLowerCase();
			const { command, prefix } = map;
			const cmd = command.get(name) || [...command.values()].find((x) => x.alias.find((x) => x == args[0]));
			if (!cmd || (cmd.category === "hidden" && !config.owner.includes(msg.sender)))
				return await msg.reply("Command not found");
			else data.push(`*Name:* ` + cmd.name);
			if (cmd.alias) data.push(`*Alias:* ${cmd.alias.join(", ")}`);
			if (cmd.desc) data.push(`*Deskripsi:* ${cmd.desc}`);
			if (cmd.use)
				data.push(`*Use:* ${prefix}${cmd.name} ${cmd.use}\n\nNote: [] = optional, | = or, <> = must be filled`);

			return await msg.reply(data.join("\n"));
		} else {
			const { pushName, sender } = msg;
			const { prefix, command } = map;
			const cmds = command.keys();
			let category = [];
			const xes = require("parse-ms")(prem.getPremiumExpired(msg.sender, premium) - Date.now());
		/*	dashboard = db.data.dashboard.sort(function (a, b) {
				return b.success - a.success;
			});*/

			for (let cmd of cmds) {
				let info = command.get(cmd);
				if (!cmd) continue;
				if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
				cteg = info.category || "No Category";
				if (info.type == "changelog") continue;
				if (cteg == "hidden") continue;
				if (!cteg || cteg === "private") cteg = "owner command";
				if (Object.keys(category).includes(cteg)) category[cteg].push(info);
				else {
					category[cteg] = [];
					category[cteg].push(info);
				}
			}
			let str = `Hai ${pushName} saya Alita.
Ada yang bisa saya bantu ? berikut list command Alita.

${moment().locale('id').tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')}
Total Request : ${db.data.hint.count}
Total User : ${Object.keys(global.db.data.users).length}

Informasi: ${db.data.setting.info}\n${readMore}\n`;
			const keys = Object.keys(category);
			//var a = 1
			for (const key of keys) {
				str += `*${key.toUpperCase()}*\n${category[key]
					.map(
						(cmd, index) =>
							`  » *${cmd.name}* ${
								cmd.category == "private"
									? ""
									: cmd.use
									? cmd.use.replace(">", "").replace("<", "")
									: ""
							}`
					)
					.join("\n")}\n\n`;
			}
			str += `Untuk melihat bagaimana command bekerja. ketik *${prefix}help command*, ex: ${prefix}help sticker`;
			let templateButtons = [
                { urlButton: { displayText: "Instagram", url: "https://www.instagram.com/mrfzvx" } },
                { urlButton: { displayText: "WhatsApp Group", url: "https://chat.whatsapp.com/HOvBhl7jMbT51VixvJP62c" } },
                { quickReplyButton: { displayText: "Speed", id: ".speedtest" } },
                { quickReplyButton: { displayText: "Status", id: ".status" } },
                { quickReplyButton: { displayText: "Owner", id: ".owner" } },
            ]
            
            let winrate = db.data.users[msg.sender].winrate
            let footer = `
Request: ${db.data.users[msg.sender].hint}
Limit : ${db.data.users[msg.sender].premium ? 'Unlimited' : db.data.users[msg.sender].limit}
Limit Game : ${db.data.users[msg.sender].premium ? 'Unlimited' : db.data.users[msg.sender].limitgame}
Win Rate Game : ${winrate.toFixed(1)} %\n`
            let templateMessage = {
                location: { jpegThumbnail: await reSize(db.data.setting.thumb, 300, 175)},
                caption: str,
                footer: footer,
                templateButtons: templateButtons
            }

            await conn.sendMessage(msg.from, templateMessage)
		}
	},
};
