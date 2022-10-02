require("./global.js");
require("./lib/Proto");
const { getBinaryNodeChild } = require("@adiwajshing/baileys");
const Baileys = require("@adiwajshing/baileys");
const { logger } = Baileys.DEFAULT_CONNECTION_CONFIG;
const { serialize } = require("./lib/serialize");
const { checkPrefix } = require("./lib/checkprefix");
const fs = require("fs");
const { color, getAdmin, isUrl } = require("./lib");
const cooldown = new Map();
const axios = require("axios")
const owner = config.owner;
const toMs = require('ms')
function printSpam(conn, isGc, sender, groupName) {
	if (isGc) {
		return conn.logger.warn("Detect SPAM", color(sender.split("@")[0], "lime"), "in", color(groupName, "lime"));
	}
	if (!isGc) {
		return conn.logger.warn("Detect SPAM", color(sender.split("@")[0], "lime"));
	}
}

function printLog(isCmd, sender, msg, body, groupName, isGc) {
	addBalance(msg.sender, Math.floor(Math.random() * 20), balance);
	if (isCmd && isGc) {
		return console.log(
			color("[ COMMAND GC ]", "aqua"),
			color(sender.split("@")[0], "lime"),
			color(body, "aqua"),
			"in",
			color(groupName, "lime")
		);
	}
	
	if (isCmd && !isGc) {
		return console.log(color("[ COMMAND PC ]", "aqua"), color(sender.split("@")[0], "lime"), color(body, "aqua"));
	}
}

/**
 * function
 */
 function pickRandom(list) {
 	return list[Math.floor(Math.random() * list.length)]
 }

 const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}


global.apikey = 'APIKEY'

module.exports = handler = async (m, conn, map) => {
	try {
	//	if (m.type !== "notify") return;
		let ms = m.messages[0];
//		ms.message = Object.keys(ms.message)[0] === "ephemeralMessage" ? ms.message.ephemeralMessage.message : ms.message;
		let msg = await serialize(JSON.parse(JSON.stringify(ms)), conn);
		if (!msg.message) return;

		//detect msg type senderKey and delete in order to be able to respond
		if (Object.keys(msg.message)[0] == "senderKeyDistributionMessage")
			delete msg.message.senderKeyDistributionMessage;
		if (Object.keys(msg.message)[0] == "messageContextInfo") delete msg.message.messageContextInfo;
		if (msg.key && msg.key.remoteJid === "status@broadcast") return;
		if (
			msg.type === "protocolMessage" ||
			msg.type === "senderKeyDistributionMessage" ||
			!msg.type ||
			msg.type === ""
		)
			return;

		let { body, type } = msg;
		global.dashboard = JSON.parse(fs.readFileSync("./database/dashboard.json"));
		global.customLanguage = JSON.parse(fs.readFileSync("./database/language.json"));
		const { isGroup, sender, from } = msg;
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : "";
		const groupName = isGroup ? groupMetadata.subject : "";
		const isAdmin = isGroup ? (await getAdmin(conn, msg)).includes(sender) : false;
		const isPrivate = msg.from.endsWith("@s.whatsapp.net");
		const isMyGc = msg.from.includes("6282223014661-1612197617@g.us");
		const botAdmin = isGroup ? (await getAdmin(conn, msg)).includes(conn.decodeJid(conn.user.id)) : false;
		const isOwner = owner.includes(sender);

    //if (!isOwner && !msg.isSelf) return;
    var prefa = /^[#$+.?_&<>!/\\]/
		var prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi)[0] : checkPrefix(prefa, body).prefix ?? "#"

		const arg = body.substring(body.indexOf(" ") + 1);
		const args = body.trim().split(/ +/).slice(1);
		const comand = body.trim().split(/ +/)[0];
		let q = body.trim().split(/ +/).slice(1).join(" ");
		const isCmd = body.startsWith(prefix);

		//type message
		const isVideo = type === "videoMessage";
		const isImage = type === "imageMessage";
		const isLocation = type === "locationMessage";
		const contentQ = msg.quoted ? JSON.stringify(msg.quoted) : [];
		const isQAudio = type === "extendedTextMessage" && contentQ.includes("audioMessage");
		const isQVideo = type === "extendedTextMessage" && contentQ.includes("videoMessage");
		const isQImage = type === "extendedTextMessage" && contentQ.includes("imageMessage");
		const isQDocument = type === "extendedTextMessage" && contentQ.includes("documentMessage");
		const isQSticker = type === "extendedTextMessage" && contentQ.includes("stickerMessage");
		const isQLocation = type === "extendedTextMessage" && contentQ.includes("locationMessage");
		global.isPremium = db.data.users[sender] ? db.data.users[sender].premium : false
		global.gcount = isPremium ? config.limit.gameLimitPremium : config.limit.gameLimitUser;
		global.limitCount = config.limit.limitUser;
		const Media = (media = {}) => {
			list = [];
			if (media.isQAudio) {
				list.push("audioMessage");
			}
			if (media.isQVideo) {
				list.push("videoMessage");
			}
			if (media.isQImage) {
				list.push("imageMessage");
			}
			if (media.isQDocument) {
				list.push("documentMessage");
			}
			if (media.isQSticker) {
				list.push("stickerMessage");
			}
			return list;
		};

		require("./res/EmitEvent.js")(msg, conn);
    
    
    // read command
    const cmdName = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
		const cmd =
			map.command.get(body.trim().split(/ +/).shift().toLowerCase()) ||
			[...map.command.values()].find((x) =>
				x.alias.find((x) => x.toLowerCase() == body.trim().split(/ +/).shift().toLowerCase())
			) ||
			map.command.get(cmdName) ||
			[...map.command.values()].find((x) => x.alias.find((x) => x.toLowerCase() == cmdName));
    
    
    /** 
     * Mongo DB database
     */
     let setting = db.data.setting
     if (typeof setting !== 'object') db.data.setting = {} 
     if (setting) {
     	if (!('thumb' in setting)) setting.thumb = 'https://user-images.githubusercontent.com/72728486/187090119-cb2987ac-fde5-40cf-b321-e223dd25fcb6.jpg'
     	if (!('info' in setting)) setting.info = ''
     	if (!('author' in setting)) setting.author = 'Mrfzvx'
     	if (!('packname' in setting)) setting.packname = 'Λ𝖫ITA'
     	if (!('self' in setting)) setting.self = false
     	if (!('autoRead' in setting)) setting.autoRead = false
     	if (!('maintenance' in setting)) setting.maintenance = false
     	if (!('gcOnly' in setting)) setting.gcOnly = false 
     } else db.data.setting = {
     	thumb: 'https://user-images.githubusercontent.com/72728486/187090119-cb2987ac-fde5-40cf-b321-e223dd25fcb6.jpg',
     	info: '',
     	author: 'Mrfzvx',
     	packname: 'Λ𝖫ITA',
     	self: false,
     	autoRead: false,
     	maintenance: false,
     	gcOnly: false 
     }
      
     let hint = db.data.hint
     if (typeof hint !== 'object') db.data.hint = {}
     if (hint) {
     	if (!('count' in hint)) hint.count = 0
     } else db.data.hint = {
     	count: 0 
     }
     
     let groups = db.data.group[from]
     if (typeof groups !== 'object') db.data.group[from] = {}
     if (groups) {
     	if (!('mute' in groups)) groups.mute = false
     	if (!('antilink' in groups)) groups.antilink = false
     	if (!('antitoxic' in groups)) groups.antitoxic = false
     	if (!('antidelete' in groups)) groups.antidelete = false
     	if (!('welcome' in groups)) groups.welcome = false
     	if (!('setwelcome' in groups)) groups.setwelcome = 'Hai @user'
     } else db.data.group[from] = {
     	mute: false,
     	antilink: false,
     	antitoxic: false,
     	antidelete: false,
     	welcome: false,
     	setwelcome: 'Hai @user selamat datang di @groupName',
     }
     
     let users = db.data.users[sender]
     if (typeof users !== 'object') db.data.users[sender] = {}
     if (users) {
     	if (!('registrasi' in users)) users.registrasi = false
     	if (!('chatbot' in users)) users.chatbot = false
     	if (!('premium' in users)) users.premium = false
     	if (!('premiumExp' in users)) users.premiumExp = 0
     	if (!('bahasa' in users)) users.bahasa = '-'
     	if (!('atm' in users)) users.atm = 0
     	if (!('limit' in users)) users.limit = 10
     	if (!('limitgame' in users)) users.limitgame = 5
     	if (!('inLimit' in users)) users.inLimit = false
     	if (!('inLimitG' in users)) users.inLimitG = false
     	if (!('exLimit' in users)) users.exLimit = 0
     	if (!('exLimitG' in users)) users.exLimitG = 0
     	if (!('banned' in users)) users.banned = false
     	if (!('warn' in users)) users.warn = 0
     	if (!('use' in users)) users.use = 0
     	if (!('hint' in users)) users.hint = 0
     	if (!('game' in users)) users.game = 0
     	if (!('gamewin' in users)) users.gamewin = 0
     	if (!('gamelose' in users)) users.gamelose = 0
     	if (!('winrate' in users)) users.winrate = 0
     	if (!('rating' in users)) users.rating = 0
     	if (!('mmr' in users)) users.mmr = 0
     	if (!('ulasan' in users)) users.ulasan = '-'
     } else db.data.users[sender] = {
     	registrasi: false,
     	chatbot: false,
     	premium: false,
     	premiumExp: 0,
     	bahasa: '-',
     	atm: 0,
     	limit: 10,
     	limitgame: 5,
     	inLimit: false,
     	inLimitG: false,
     	exLimit: 0,
     	exLimitG: 0,
     	banned: false,
     	warn: 0,
     	use: 0,
     	hint: 0,
     	game: 0,
     	gamewin: 0,
      gamelose: 0,
      mmr: 0,
      winrate: 0,
      rating: 0,
      ulasan: '-',
     }
    
		/** 
		 * Auto read 
		 */
		if (db.data.setting.autoRead) await conn.readMessages([msg.key]);

		/** 
		 * Handler 
		 */
		require("./lib/topdf")(msg, conn, map);
		require("./handler/game_answer")(msg, conn)
		printLog(isCmd, sender, msg, body, groupName, isGroup);
		
		/** 
		 * Premium expired
		 */
		for ( var o in db.data.users ) {
			if (db.data.users[o].premium === true && new Date() * 1 >= db.data.users[o].premiumExp) {
				conn.sendMessage('6281219700198@s.whatsapp.net', {text: "Status premium " + o + " telah berakhir hari ini"})
        db.data.users[o].premium = false 
			}
		}
		
		for ( var u in db.data.users ) {
			if (db.data.users[u].inLimit === true && new Date() * 1 >= db.data.users[u].exLimit) {
        db.data.users[u].inLimit = false 
        db.data.users[u].limit = 10
			}
		}
		
		for ( var g in db.data.users ) {
			if (db.data.users[g].inLimitG === true && new Date() * 1 >= db.data.users[g].exLimitG) {
        db.data.users[g].inLimitG = false 
        db.data.users[g].limit = 5
			}
		}
		
		
/*
		 if (body) {
		 	db.data.users[sender].atm += 55
		 }
		 */
		 if (sender) { 
       let gim = db.data.users[sender].game
       let wi = db.data.users[sender].gamewin
       let hsl = wi/gim * 100
       db.data.users[sender].winrate = hsl ? hsl : 0
       }
		 
		 
		 /** 
		  * Toxic 
		  */
	   var toxic = ["kontol", "kntl", "mmek", "memek", "anj", "anjing", "anying", "xxx", "xnxx", "porn", "pornhub", "bokep", "tolol", "tlol", "jancuk", "goblok", "asu", "fuck", "ngentot", "ngntot", "ngntt", "ngewe", "lonthe", "lonte"]
		 if (isGroup && botAdmin && db.data.group[from].antitoxic === true) {
		 	for (var t of toxic) {
		 		if (body.toLowerCase().includes(t)) {
	  	 	return conn.sendMessage(msg.from, { delete: msg.key })
		 		}
		 	}
		 }
		 
		 
		 
		 
		 if (cmd) {
		 	if (!isOwner && db.data.setting.maintenance === true) return msg.reply("Alita dalam mode maintenance, silahkan ulangi lagi nanti..")
		 	if (isGroup && !isOwner && !isAdmin && db.data.group[from].mute) return
		 	db.data.hint.count += 1
		 	db.data.users[sender].hint += 1
		 	db.data.users[sender].use = Date.now() + toMs('1d')
		 	//db.data.users[sender].atm += 90
		 	await conn.sendPresenceUpdate('composing', msg.from);
		 }
		 
		 
		/** 
		 * Antilink group 
		 */
		 isAntilink = isGroup ? db.data.group[from].antilink : false
		 if (!isOwner && !isAdmin && botAdmin && isAntilink) {
		 	let code = await conn.groupInviteCode(from)
		 	let gclink = 'https://chat.whatsapp.com/'
		 	if (body.match(gclink)) { 
		 		if (body.match(gclink + code)) {
		 		} else { 
		 			conn.sendMessage(msg.from, { delete: msg.key })
		 			setTimeout( () => {
		 				conn.groupParticipantsUpdate(from, [sender], "remove")
		 			}, 5 * 1000)
		 			setTimeout( () => {
		 				msg.reply('Jangan share link group disini')
		 			}, 0)
		 		}
		 	}
		 }
		
/*
 if (cmd && cmd.category != "private") {
		//	db.data.dashboard[cmd.name].success += 1
		//	db.data.dashboard[cmd.name].name = cmd.name
		//	db.data.dashboard[cmd.name].lastUpdate = Date.now()
		}
		*/

		if (!cmd) return;
		if (!cooldown.has(from)) {
			cooldown.set(from, new Map());
		}
		const now = Date.now();
		const timestamps = cooldown.get(from);
		const cdAmount = (cmd.options.cooldown || 2) * 1000;
		if (timestamps.has(from)) {
			const expiration = timestamps.get(from) + cdAmount;
			if (now < expiration) {
				if (isGroup) {
					let timeLeft = (expiration - now) / 1000;
					printSpam(conn, isGroup, sender, groupName);
					return await conn.sendMessage(
						from,
						{
							text: `Cooldown ${timeLeft.toFixed(1)} detik, tunggu dan coba lagi..`,
						},
						{ quoted: msg }
					);
				} else if (!isGroup) {
					let timeLeft = (expiration - now) / 1000;
					printSpam(conn, isGroup, sender);
					return await conn.sendMessage(
						from,
						{
							text: `Cooldown ${timeLeft.toFixed(1)} detik, tunggu dan coba lagi..`,
						},
						{ quoted: msg }
					);
				}
			}
		}

		setTimeout(() => timestamps.delete(from), cdAmount);
		let optionsCmd = cmd.options;
		/*
		if (optionsCmd.noPrefix) {
			if (isCmd) return;
			q = msg.body.split(" ").splice(1).join(" ");
		} else if (!optionsCmd.noPrefix) {
			if (!isCmd) return;
		}*/
		if (optionsCmd.isSpam) {
			timestamps.set(from, now);
		}
		
		/** 
		 * Premium user 
		 */
		if (optionsCmd.isPremium && !isPremium) {
			return msg.reply('Maaf command ini khusus user premium..')
		}
		
		/**
		 * Kunci command 
		 */
		if (map.lockcmd.has(cmdName)) {
			let alasan = map.lockcmd.get(cmdName);
			return msg.reply(
				`Sorry bro "${conn.getName(sender)}"" command "${cmdName}" has been disabled by owner\nReason: *${
					alasan || "-"
				}*`
			);
		}
		
		/**
		 * Limit 
		 */
		if (optionsCmd.isLimit && !isPremium && !isMyGc) {
			if (db.data.users[sender].inLimit === true) {
				cek = require("parse-ms")(db.data.users[msg.sender].exLimit - Date.now());
        capt = `Limit Kamu telah habis, limit akan reset dalam waktu ${cek.days ? cek.days + ' hari' : cek.hours ? cek.hours + ' jam' : cek.minutes ? cek.minutes + ' menit' : cek.seconds ? cek.seconds + ' detik' : ''}`
        templateGroup = [
        	{ index: 1, urlButton: {displayText: 'Klik Disini', url: 'https://chat.whatsapp.com/HOvBhl7jMbT51VixvJP62c'}}]
        templateMessage = {
        	text: capt,
          footer: 'Kamu bisa menikmati fitur tanpa pengurangan limit jika berada dalam group official kami',
          templateButtons: templateGroup}
          return conn.sendMessage(msg.from, templateMessage);
			} else if (db.data.users[sender].limit <= 0) {
				db.data.users[sender].inLimit = true 
				db.data.users[sender].exLimit = Date.now() + toMs('1h')
			} else {
			db.data.users[sender].limit -= 1
			}
		}
		
		/** 
		 * Limit Game 
		 */
		if (optionsCmd.isLimitGame && !isPremium && !isMyGc) {
			if (db.data.users[sender].inLimitG === true) {
				cek = require("parse-ms")(db.data.users[msg.sender].exLimitG - Date.now());
        capt = `Limit Game Kamu telah habis, limit akan reset dalam waktu ${cek.days ? cek.days + ' hari' : cek.hours ? cek.hours + ' jam' : cek.minutes ? cek.minutes + ' menit' : cek.seconds ? cek.seconds + ' detik' : ''}`
        templateGroup = [
        	{ index: 1, urlButton: {displayText: 'Klik Disini', url: 'https://chat.whatsapp.com/HOvBhl7jMbT51VixvJP62c'}}]
        templateMessage = {
        	text: capt,
          footer: 'Kamu bisa menikmati fitur tanpa pengurangan limit jika berada dalam group official kami',
          templateButtons: templateGroup}
          return conn.sendMessage(msg.from, templateMessage);
			} else if (db.data.users[sender].limitgame <= 0) {
				db.data.users[sender].inLimitG = true 
				db.data.users[sender].exLimitG = Date.now() + toMs('1h')
			} else {
			db.data.users[sender].limitgame -= 1
			}
		}
		
				/**
		 * Owner 
		 */
		if (optionsCmd.isOwner && !isOwner && !msg.isSelf) {
			return msg.reply('Command ini hanya bisa digunakan oleh owner..')
		}
		
		/** 
		 * Dala group 
		 */
		if (optionsCmd.isGroup && !isGroup) {
			return msg.reply('Command ini hanya bisa digunakan dalam group..')
		}
		
		/**
		 * Admin group .
		 */
		if (optionsCmd.isAdmin && !isAdmin) {
			return msg.reply('Command ini hanya bisa digunakan oleh admin group..')
		}
		
		/** 
		 * Bot admin 
		 */
		if (optionsCmd.isBotAdmin && !botAdmin) {
			return msg.reply('Jadikan Alita sebagai admin untuk menggunakan command..')
		}
		
		/**
		 * Quoted message
		 */
		if (optionsCmd.isQuoted && !msg.quoted) {
			return msg.reply('Silahkan ulangi command dan reply pesan')
		}
		
		if (optionsCmd.isMedia) {
			let medianya = Media(optionsCmd.isMedia ? optionsCmd.isMedia : {});
			if (typeof medianya[0] != "undefined" && !medianya.includes(msg.quoted ? msg.quoted.mtype : []))
				return msg.reply(
					`Please reply *${medianya
						.map((a) => `${((aa = a.charAt(0).toUpperCase()), aa + a.slice(1).replace(/message/gi, ""))}`)
						.join("/")}*`
				);
		}
		
		/**
		 * No query 
		 */
		if (optionsCmd.query && !q) {
			capt = "*Command* : " + cmd.name
			capt += "\n*Sub-command* : " + cmd.alias
			capt += "\nAdalah command dengan type " + cmd.category + ", " + cmd.desc
			return msg.reply(capt)
		}
		
		/**
		 * Private chat 
		 */
		if (optionsCmd.isPrivate && !isPrivate) {
			return msg.reply('Command ini hanya bisa digunakan dalam private chat..')
		}
		
		/**
		 * is url 
		 */
		if (optionsCmd.isUrl && !isUrl(q ? q : "p")) {
			return msg.reply('Gunakan link')
		}
		
		/** 
		 * Wait message
		 */
		if (optionsCmd.wait) {
			await conn.sendMessage(
				msg.from,
				{ text: typeof optionsCmd.wait == "string" ? optionsCmd.wait : response.wait },
				{ quoted: msg }
			);
		}
		
		/**
		 * Begin start 
		 */
		try {
			await cmd.run(
				{ msg, conn },
				{ owner: isOwner, q, map, args, arg, Baileys, prefix, response, chat: m, command: comand, pickRandom, getBuffer }
			);
		} catch (e) {
			if (cmd.category != "private") {
				//db.data.dashboard[cmd.name].name = cmd.name
				//db.data.dashboard[cmd.name].success -= 1
				//db.data.dashboard[cmd.name].failed += 1
			//	db.data.dashboard[cmd.name].lastUpdate = Date.now() 
			}
			msg.reply('Maaf sepertinya fitur sedang mengalami Error..')
			conn.sendMessage('6281219700198@s.whatsapp.net', { text: require("util").format(e)});
		}
	} catch (e) {
		console.log(color("Error", "red"), e.stack);
	}
};
