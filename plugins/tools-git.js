import { exec } from 'child_process'

let handler = async (m, { text }) => {
 exec("git pull", (err, stdout) => {
           if(err) return m.reply(err)
           if (stdout) {
           v.reply(`\t\t\t*× 🔩 GitPull GitHub 🧰 ×*

*• Actualizando el sistema a la ultima version:*

${stdout}`)
}
handler.help = ['gitpull']
handler.tags = ['tools']
handler.alias = ['git', 'gitpull']
handler.command = /^(git|gitpull|fix)$/i

export default handler
