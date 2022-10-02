function formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}


module.exports = {
	name: "limit",
	alias: ["cekglimit", "ceklimit", "glimit"],
	category: "main",
	desc: "check limit",
	isSpam: true,
	async run({ msg, conn }, { q, map }) {
		capt = 'Limit : ' + db.data.users[msg.sender].limit 
		capt += '\nLimit Game : ' + db.data.users[msg.sender].limitgame 
		capt += '\n\nLimit akan reset dalam waktu 1 jam ketika habis.'
		msg.reply(capt)
	},
};
