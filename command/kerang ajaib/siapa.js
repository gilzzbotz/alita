module.exports = {
	name: "siapakah",
	alias: ["siapakah"],
	category: "magic shell",
	desc: "mendapatkan jawaban dari kerang ajaib",
	use: "text",
	query: true,
	isSpam: true, 
	isGroup: true,
	isLimit: true,
	example: "yang paling jelek",
	async run({ msg, conn }, { q, pickRandom }) {
    const { isGroup } = msg;
    const groupMetadata = isGroup ? await conn.groupMetadata(msg.from) : "";
    const groupMembers = isGroup ? groupMetadata.participants : '';
 let member = groupMembers.map(u => u.id)
    siapa = pickRandom(member)
    capt = 'Siapakah ' + q + ' ?'
    capt += '\n@' + siapa.split('@')[0]
    msg.reply(capt, {withTag: true})
	},
}