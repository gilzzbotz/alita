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
	name: "gimage",
	alias: ["gimg", "image"],
	use: "query",
	category: "search engine",
	desc: "Mesin pencarian google",
	//isUrl: true,
	isSpam: true,
	isLimit: true,
	//isPremium: true,
	query: true, 
	example: "burung",
	async run({ msg, conn }, { q, args }) {
		text = q
		if (args[0].includes('https://') || args[0].includes('http://')) {
			conn.sendFile(msg.from, text, '', '', msg)
		} else if (text) {
			let img = await go.image(text, options)
			var sections = []
			sections.push({
				title: text.toUpperCase(),
				rows: img.map((v) => ({
					title: v.origin.title,
					rowId: 'gimage ' + v.url,
				}))})
		  conn.sendMessage(msg.from, {
		  	title: `Pencarian ` + text.toUpperCase(),
		  	text: img.length + ' image ' + text + ' telah ditemukan, silahkan pilih untuk mendownload',
		  	footer: '',
		  	buttonText: 'Pilih',
		  	sections
		  })
		}
	}
}