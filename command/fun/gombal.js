let fetch = require('node-fetch')

module.exports = {
	name: "gombal",
	alias: ["gombal"],
	category: "fun",
	desc: "menampilkan gombal-gombalan receh",
	isSpam: true,
	isLimit: true,
	async run({ msg, conn }, { q }) {
		fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/gombal.txt')
		.then(res => res.text())
		.then(body => {
			let tod = body.split("\n");
			let pjr = tod[Math.floor(Math.random() * tod.length)];
			let hala = pjr.replace(/pjrx-line/g, "\n");
			msg.reply(hala);
		});
	},
}