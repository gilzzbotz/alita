const go = require('googlethis')
const options = {
  page: 0, 
  safe: false,
  additional_params: { 
    // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
    hl: 'id' 
  }
}

module.exports = {
	name: "google",
	alias: ["google"],
	use: "query",
	category: "search engine",
	desc: "Mesin pencarian google",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "ya sudahlah",
	async run({ msg, conn }, { q }) {
		text = q
		try {
         let cari = await go.search(text, options)
         let img = await go.image(text, options)
         let gos = await cari.knowledge_panel
         capt = `*GOOGLE*\n${gos.title ? `*${gos.title}*` : ''} ${gos.type ? `(${gos.type})\n` : ''}`
         capt += gos.description ? gos.description + '\n' : ''
         for (var i of gos.metadata) {
           capt += `${i.title ? `*${i.title}*` : ''} : ${i.value ? i.value + '\n' : ''}`
         }
         capt += '\n'
         for (var r of cari.results) {
           capt += `*${r.title}*\n${r.description}\n${r.url}\n\n`
         }
         capt += '\n*Pertanyaan terkait*\n'
         for (var s of cari.people_also_ask) {
           capt += `${s ? `• ${s}\n` : ''}`
         }
          conn.sendMessage(msg.from, { image: { url: img[0].url }, caption: capt}, {quoted: msg})
         } catch (e) {
         	msg.reply('Tidak ada hasil untuk ' + text)
         }
	}
}