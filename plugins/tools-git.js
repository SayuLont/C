import { exec } from 'child_process'

let handler = async (m, { text }) => {
 exec("git pull", (err, stdout) => {
           if(err) throw err
           if (stdout) {
           throw stdout
}
handler.help = ['gitpull']
handler.tags = ['tools']
handler.alias = ['git', 'gitpull']
handler.command = /^(git|gitpull|fix)$/i

export default handler
