const phoneNum = require("awesome-phonenumber");

function formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

module.exports = {
	name: "me",
	alias: ["profile"],
	desc: "Melihat profil",
	wait: true,
	isSpam: true,
	category: "main",
	async run({ msg, conn }) {
		var tol = `${msg.sender.split("@")[0]}`;
		var bio;
		try {
			bio = await conn.fetchStatus(msg.sender);
		} catch {
			bio = "Bio Not found";
		}
		try {
			var pp = await conn.profilePictureUrl(msg.sender, "image");
		} catch {
			var pp = "https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png";
		}
	//	var gender = await require("axios").get("https://api.genderize.io/?name=" + encodeURIComponent(conn.getName(msg.sender)));
		var from = await phoneNum("+" + msg.sender.split("@")[0]).getRegionCode();
		var Country = await require("country-language").getCountry(from);
		let checkExp = require("parse-ms")(db.data.users[msg.sender].premiumExp - Date.now());
		txt = `*Profile*\n`;
		txt += `Nama : ${conn.getName(msg.sender)}\n`;
		txt += `Bio : ${bio.status || bio}\n`;
		txt += `Nomor : ${phoneNum("+" + tol.replace("@s.whatsapp.net", "")).getNumber("international")}\n`;
		//txt += `Jenis kelamin : ${gender.data.gender || "male" == "male" ? "Laki-Laki" : "Perempuan"}\n`;
		txt += `Negara : ${Country.name}\n`;
		txt += `Link : https://wa.me/${msg.sender.split("@")[0]}\n\n`;
		txt += `*Limit*\n`
		txt += `Premium : ${db.data.users[msg.sender]. premium ? `Iya\nExpired : ${checkExp.years ? checkExp.years + ' tahun' : checkExp.days ? checkExp.days + ' hari' : checkExp.hours ? checkExp.hours + ' jam' : checkExp.minutes ? checkExp.minutes + ' menit' : checkExp.seconds ? checkExp.seconds + ' detik' : ''}` : 'Tidak'}`
		txt += `\nLimit : ${db.data.users[msg.sender].limit}\n`
		txt += `Limit Game : ${db.data.users[msg.sender].limitgame}\n\n`
		//txt += `ATM : Rp. ${formatNumber(db.data.users[msg.sender].atm)}.00,-\n\n`
		txt += `*Game Statistik*\n`
		txt += `${db.data.users[msg.sender].game} game dimainkan\n`
		txt += `Menang : ${db.data.users[msg.sender].gamewin} kali\n`
		txt += `Kalah : ${db.data.users[msg.sender].gamelose} kali\n`
		txt += `Win Rate : ${db.data.users[msg.sender].winrate ? db.data.users[msg.sender].winrate.toFixed(1) : 0} %\n`
		txt += `MMR : ${db.data.users[msg.sender].mmr}`
		//msg.reply(txt, {withTag: true})
		conn.sendMessage(msg.from, {
			image: { url: pp },
			caption: txt,
			mentions: [msg.sender],
		});
	},
};
