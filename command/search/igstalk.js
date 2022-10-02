const fetch = require('node-fetch')

module.exports = {
	name: "igstalk",
	alias: ["igstalk"],
	use: "username",
	category: "search engine",
	desc: "fitur instagram stalker",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "mrfzvx",
	async run({ msg, conn }, { q, args }) {
		let cari = await fetch('https://api-xcoders.xyz/api/stalk/ig?username=' + q.replace("@", "") + '&apikey=' + apikey, { method: "get"})
         let hasil = await cari.json()
         if (hasil.status === false) return msg.reply('Maaf sepertinya fitur sedang mengalami Error..')
         caption = `${hasil.result.fullname} (@${hasil.result.username})
*${hasil.result.followers} Followers* | *${hasil.result.following} Following* | *${hasil.result.post_count} Postingan*
${hasil.result.biography}
${hasil.result.external_url ? hasil.result.external_url : ''}`
         conn.sendMessage(msg.from, { image: { url: hasil.result.profile_url }, caption: caption, templateButtons: [
						{ urlButton: { displayText: "Follow", url: "https://instagram.com/" + hasil.result.username } },
					]}, { quoted: msg})
	}
}