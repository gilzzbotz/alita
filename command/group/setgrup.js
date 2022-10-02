
module.exports = {
	name: "setgrup",
	alias: ["setgrup", "setgroup", "closegc", "opengc", "group"],
	category: "group",
	desc: "Membuka dan menutup pengaturan group",
  isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, conn }, { q }) {
	  let text = q 
	  if (text === 'tutup') {
	  	await conn.groupSettingUpdate(msg.from, 'announcement')
	  } else if (text === 'buka') {
	  	await conn.groupSettingUpdate(msg.from, 'not_announcement')
	  } else {
	  	const buttons = [{ 
	  		buttonId: 'group tutup', buttonText: { displayText: 'Tutup Group'}, type: 1},{ 
	    	buttonId: 'group buka', buttonText: { displayText: 'Buka Group'}, type: 1}]
	    const buttonMessage = {
	    	text: "Pilih pengaturan group",
	    	footer: '',
		    buttons: buttons,
		    headerType: 1
		  }
		  await conn.sendMessage(msg.from, buttonMessage)
	  }
	}
}