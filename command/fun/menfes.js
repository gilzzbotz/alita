module.exports = {
	name: "menfes",
	alias: ["menfess", "confess", "confes"],
	category: "fun",
	desc: "mengirim pesan rahasia keseseorang",
	use: "num | text",
	query: true,
	isSpam: true,
	isLimit: true,
	//isGroup: true,
	async run({ msg, conn }, { q, pickRandom }) {
	  let anu = q.split('|')
	  let nomor = anu[0]
	  let pesan = anu[1]
	  if(!pesan) return msg.reply('Masukan pesan kamu..')
    if(pesan.length > 300) return msg.reply('Pesan kamu terlalu panjang..')
    let target = nomor.replace(/[^0-9]/g, '')+"@s.whatsapp.net"
    const [result] = await conn.onWhatsApp(nomor.replace(/[^0-9]/g, ''))
    if (result === undefined) return msg.reply('Nomor tersebut tidak terdapat di WhatsApp ')
    let capt = `Kamu mendapatkan pesan Menfes dari seseorang
Pesan: ` + pesan 
    conn.sendMessage(target, {text: capt})
    msg.reply('Pesan kamu telah dikirim ke nomor ' + nomor.replace(/[^0-9]/g, ''))
	},
}