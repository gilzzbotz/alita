fs = require("fs");

module.exports = async (conn, msg) => {
	try {
		let metadata = await conn.groupMetadata(msg.id)
		const Name = metadata.subject
    const Desc = metadata.desc
		let participants = msg.participants
		let isWelcome = db.data.group[msg.id].welcome
		let welcomeAdd = db.data.group[msg.id].setwelcome
		//let welcomeBye = db.data.group[msg.id].setbye
		
		for (let num of participants) {
			try {
				ppimg = await conn.profilePictureUrl(num, 'image')
			} catch {
				ppimg = undefined
			}

			if (msg.action == 'add' && isWelcome) {
				let caption = welcomeAdd.replace('@user', '@' + num.split("@")[0]).replace('@groupname', Name).replace('@desc', Desc).replace('@groupName', Name)
				if (ppimg === undefined) {
					await conn.sendMessage(msg.id, { 
						text: caption, 
						mentions: [num] 
					})
				} else {
					await conn.sendMessage(msg.id, { image: { url: ppimg }, contextInfo: { mentionedJid: [num] }, caption: caption}) 
				}
			} else if (msg.action == 'remove' && isWelcome) {
				/*
				conn.sendMessage(msg.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: welcomeBye.replace('@user', '@' + numsg.split("@")[0])})
				*/
			}
		}
	} catch (err) {
		console.log(err)
	}
}