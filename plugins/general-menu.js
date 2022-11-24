let tags = {}
const defaultMenu = {
  before: '\t*👋 Hi, %name*\n*° 🌍 Dɑte ɑnd Time ⏰ °*\n\t%date\n\t\t∙ %wib Wib\n\t\t∙ %wita Wita\n\t\t∙ %wit Wit\n',
  header: '\t\t───── ❝ Bot Informɑtion ❞ ─────\n*° Count Features :* %value Features\n*° Prefix :* [ Multi ]\n*° Github Repo :* Currently Not Available ( Private )\n*° Runtime :* %uptime\n',
  body: '',
  footer: 'Monx Pscho.',
  after: '',
}
const vidthumb = [
"https://telegra.ph/file/4354190002ab30af58676.mp4",
"https://telegra.ph/file/712e485e49e2630e7e02a.mp4"
]
let handler = async (m, { conn, isOwner, usedPrefix: _p }) => {
  try {
    let name = isOwner ? 'My Owner 🤴🏻' : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    })
    let wib = d.toLocaleTimeString(locale, { timeZone: 'Asia/Jakarta' })
    let wita = d.toLocaleTimeString(locale, { timeZone: 'Asia/Makassar' })
    let wit = d.toLocaleTimeString(locale, { timeZone: 'Asia/Jayapura' })
    let uptime = clockString(process.uptime() * 1000)
    let value = Object.values(global.plugins).filter(x => !x.disabled && x.help && !/command|menu|stats/.test(x.help)).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let _text = [ before , header ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime,
      me: conn.user.name || conn.getName(conn.user.jid),
      name, date, wib, wita, wit, value,
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.sendHydrated(m.chat, text.trim(), defaultMenu.footer, vidthumb[Math.floor(Math.random() * vidthumb.length)], 'https://instagram.com/xmonxnl', 'Instɑgrɑm', '', '', [['Commɑnd', `${_p}command`]], m, { viewOnce: true, gifPlayback: true })
  } catch (e) {
    m.reply('An error occurred')
    throw e
  }
}


handler.command = /^(menu|help|\?)$/i

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
