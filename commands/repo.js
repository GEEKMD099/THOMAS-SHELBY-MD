const { tlang, ringtone, cmd,fetchJson, sleep, botpic,ffmpeg, getBuffer, pinterest, prefix, Config } = require('../lib')
const { mediafire } = require("../lib/mediafire.js");
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor')
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
var dlsize = 1000 // 1000mb
//---------------------------------------------------------------------------

cmd({

            pattern: "repo",           
            desc: "(source code).",
            category: "general",
            react: "🍷",
            filename: __filename,
            use: '<text>',

        },

        async (Void,citel,text,{isCreator}) => {
       if(!isCreator) return citel.reply(tlang().owner);
        let buttons = [{

                    buttonId: `${prefix}system`,
                    buttonText: {
                    displayText: "System",
                    },

                    type: 1,
                },
                  {
                    buttonId: `${prefix}ping`,
                    buttonText: {
                    displayText: "Ping",

                    },
                    type: 1,
                },
            ];
            let buttonMessage = {
                image: {
                    url: 'https://telegra.ph/file/607d631d85d9a1bab56a7.jpg',
                },

                caption: `
╭────《𝐑𝐄𝐏𝐎》─────❖
╭──────────────❖
│🍷𝐒𝐓𝐀𝐑𝐒:- 𝐔𝐧𝐝𝐞𝐟𝐢𝐧𝐞𝐝
│🍷𝐒𝐂𝐀𝐍-𝐐𝐑:- https://geek-qr-c6ccf7b7583e.herokuapp.com/
│ 𝐑𝐄𝐏𝐎:-https://github.com/EX-BOTS/BAT-MD
│ 𝙁𝙊𝙍𝙆:-https://github.com/EX-BOTS/BAT-MD/fork
│ 𝘾𝙝𝙖𝙣𝙣𝙚𝙡:-https://whatsapp.com/channel/0029VaWQOHsFSAsv3SD3dJ3a
│ 𝙎𝙪𝙥𝙥𝙤𝙧𝙩:- https://chat.whatsapp.com/FRQiuFWlYJ3Jolx7OACtKo
╰───────────────❖
©𝙀𝙓𝘾𝙀𝙇:-𝑺𝑯𝑬𝑳𝑩𝒀-𝘽𝙊𝙏
`,

                footer: tlang().footer,
                headerType: 4,
            };
            return Void.sendMessage(citel.chat, buttonMessage, {
                quoted: citel,
            });
        }
    )