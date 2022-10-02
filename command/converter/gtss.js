let gtts = require('node-gtts')
let fs = require('fs')
let path = require('path')
let { spawn } = require('child_process')
const defaultLang = 'id'

function tts(text, lang = 'id') {
  console.log(lang, text)
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang)
      let filePath = path.join('../../temp', (1 * new Date) + '.wav')
      tts.save(filePath, text, () => {
        resolve(fs.readFileSync(filePath))
        fs.unlinkSync(filePath)
      })
    } catch (e) { reject(e) }
  })
}

module.exports = {
	name: "tts",
	alias: ["tts"],
	desc: "Convert text to sound",
	use: "text",
	category: "converter",
	query: true,
	isSpam: true,
	isLimit: true,
	//wait: true,
	async run({ msg, conn }, { q, args, getBuffer }) {
		let lang = args[0]
    let text = args.slice(1).join(' ')
  	if ((args[0] || '').length !== 2) {
    	lang = defaultLang
    	text = args.join(' ')
  	}
	  if (!text && msg.quoted && msg.quoted.text) text = msg.quoted.text
	  let res
    try { res = await tts(text, lang) }
    catch (e) {
    	msg.reply(e + '')
    	res = await tts(text)
    } finally {
    await conn.sendFile(msg.from, res, '', '', msg, true)
  }
	},
};