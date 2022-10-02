module.exports = {
	name: "broadcastgroup",
	alias: ["bcgc"],
	desc: "Mengirim Pesan siaran",
	use: "q",
	category: "private",
	isOwner: true,
	query: true,
	async run({ msg, conn }, { q }) {
		let getGroups = await conn.groupFetchAllParticipating();
		let groups = Object.entries(getGroups)
			.slice(0)
			.map((entry) => entry[1]);
		let anu = groups.map((v) => v.id);
		for (let i of anu) {
			await require("delay")(3000);
			const templateGroup = [
			  {index: 1, urlButton: {displayText: 'Whatsapp Group', url: 'https://chat.whatsapp.com/HOvBhl7jMbT51VixvJP62c'}}]
       const templateMessage = {
       	text: q,
        footer: 'Broadcast',
        templateButtons: templateGroup}
       await conn.sendMessage(i, templateMessage);
		}
		await msg.reply("Sukses");
	},
};
