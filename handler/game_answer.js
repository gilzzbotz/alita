const similarity = require('similarity');
const threshold = 0.72;

module.exports = async (msg, conn) => {
let from = msg.from
let text = msg.body

if (!conn.game) return 
    if (conn.game[from]) {
        if (text.toLowerCase() == conn.game[from][1].toLowerCase().trim()) {
            msg.reply('Kamu benar.. jawabannya adalah ' + conn.game[from][1])
            clearTimeout(conn.game[from][2])
            clearTimeout(conn.game[from][3])
            delete conn.game[from]
            db.data.users[msg.sender].game += 1
            db.data.users[msg.sender].gamewin += 1
            db.data.users[msg.sender].mmr += 4
        } else if (similarity(text.toLowerCase(), conn.game[from][1].toLowerCase().trim()) >= threshold) msg.reply('Sedikit lagi, hampir benar..')
    }

}
