/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : BLADE-MD
 * @author : salmanytofficial <https://github.com/Bladeh4x>
 * @description : BLADE, A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

const { tlang, botpic, cmd, prefix, runtime, Config , sleep } = require('../lib')
const axios = require('axios')
const speed = require('performance-now')
const fetch = require('node-fetch');


const PastebinAPI = require("pastebin-js");
pastebin = new PastebinAPI("EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL");
cmd({
        pattern: "pastebin",
        desc: "To check ping",
        category: "tools",
        filename: __filename,
    },
    async(Void, citel) => {
        if(!citel.quoted) return citel.reply('Please quote any text to get link.')
        let data = await pastebin.createPaste(citel.quoted.text, "Secktor-Pastebin")
        citel.reply('_Here is your link._\n'+data)
    }
);


//---------------------------------------------------------------------------
cmd({
    pattern: "chat",
    alias :['gpt'],
    desc: "chat with an AI(GPT)",
    category: "AI",
    use: '<◡̈⋆🅷🅸(●’◡’●)ﾉ,𝚂𝚝𝚊𝚛>',
    filename: __filename,
},
async(Void, citel,text) => {
    let zx = text.length;
    if (zx < 8) {
        let {data} = await axios.get(`http://api.brainshop.ai/get?bid=167991&key=aozpOoNOy3dfLgmB&uid=[${citel.sender.split("@")[0]}]&msg=[${text}]`);
        return citel.reply(data.cnt);  
    }
    if (!text) return citel.reply(`Hey there! ${citel.pushName}. How are you doing these days?`);
    // const { Configuration, OpenAIApi } = require("openai");
    // const configuration = new Configuration({
    //     apiKey: Config.OPENAI_API_KEY || "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",
    // });
    // const openai = new OpenAIApi(configuration);
    // const completion = await openai.createCompletion({
    //     model: "text-davinci-002",
    //     prompt: text,
    //     temperature: 0.5,
    //     max_tokens: 80,
    //     top_p: 1.0,
    //     frequency_penalty: 0.5,
    //     presence_penalty: 0.0,
    //     stop: ['"""'],
    // });
    // citel.reply(completion.data.choices[0].text);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Config.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "system", content: "You" }, { role: "user", content: text }],
    }),
  });

  const data = await response.json();
  console.log("GPT REPONCE : ",data); 
  if (!data.choices || data.choices.length === 0) {citel.reply("*Invalid ChatGPT API Key, Please Put New Key*"); }
  return await  citel.reply(data.choices[0].message.content)

}
)

cmd({
    pattern: "dalle",
    alias : ['dall','dall-e'],
    desc: "Create Image by AI",
    category: "AI",
    use: '<an astronaut in mud.>',
    filename: __filename,
},
async(Void, citel,text,{isCreator}) => 
{
//if (!isCreator) return citel.reply(tlang().owner)
if (Config.OPENAI_API_KEY=='') return citel.reply('You Dont Have OPENAI_API_KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys');
if (!text) return citel.reply(`*Give Me A Query To Get Dall-E Reponce ?*`); 
const imageSize = '256x256'
const apiUrl = 'https://api.openai.com/v1/images/generations';
const response = await fetch(apiUrl, {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Config.OPENAI_API_KEY}`
},
body: JSON.stringify({
  model: 'image-alpha-001',
  prompt: text,
  size: imageSize ,
  response_format: 'url'
})
});

const data = await response.json();
let buttonMessage = {
    image:{url:data.data[0].url},
    caption : '*---Your DALL-E Result---*'

}

Void.sendMessage(citel.chat,{image:{url:data.data[0].url}})
}
)

//---------------------------------------------------------------------------
cmd({
        pattern: "alive2",
        alias: ["about","bat"],
        desc: "To check bot alive state",
        category: "tools",
        filename: __filename,
    },
    async(Void, citel) => {
        const uptime = process.uptime();
        timestampe = speed();
        latensie = speed() - timestampe;
        let ter = `
ㅤ     ╞═════𖠁SHELBY-BOT𖠁═════╡

╰─➤｡･:*˚:✧｡ *${tlang().title}* ｡･:*˚:✧｡
╰─➤*🍷Description:* A WhatsApp bot with rich features, built in NodeJs to make your WhatsApp enjoyable.
╰─➤*🍷Speed:* ${latensie.toFixed(4)} ms
╰─➤*⏱Uptime:* ${runtime(process.uptime())}
╰─➤*🍷Version:* 10.0.0
╰─➤*🍷Owner:*  ${Config.ownername}
╰─➤*Powered by ${tlang().title}*
°୭̥ 🍷 ───────────────────────── .°🍷 ❁ `;
        let buttonMessaged = {
            image: {
                url: await botpic(),
            },
            caption: ter,
            footer: tlang().footer,
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: tlang().title,
                    body: `Bot-Status`,
                    thumbnail: log0,
                    mediaType: 2,
                    mediaUrl: ``,
                    sourceUrl: ``,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)

//---------------------------------------------------------------------------

cmd({
        pattern: "repo",
        alias: ["star", "sc","script"],
        desc: "Sends info about repo.",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
        let { data } = await axios.get('https://api.github.com/repos/EX-BOTS/BAT-MD')
        let cap = `Hey ${citel.pushName}\n
*🔪 𝑻𝑶𝑻𝑨𝑳 𝑺𝑴𝑶𝑲𝑬:* ${data.stargazers_count} stars
*🍷 𝒇𝒐𝒓𝒌𝒔:* ${data.forks_count} forks
*🍷 𝒓𝒆𝒑𝒐:*https://github.com/GEEKMD099/THOMAS-SHELBY-MD
*🍷𝒈𝒓𝒐𝒖𝒑:* https://chat.whatsapp.com/FRQiuFWlYJ3Jolx7OACtKo
*🔍𝒔𝒄𝒂𝒏 𝒒𝒓:* https://geek-qr-c6ccf7b7583e.herokuapp.com/
*𝒄𝒉𝒂𝒏𝒏𝒆𝒍 𝒍𝒊n𝒌:* https://whatsapp.com/channel/0029VaWQOHsFSAsv3SD3dJ3a
*⚙️𝑫𝑬𝑷𝑳𝑶𝒀 𝒀𝑶𝑼𝑹 𝑶𝑾𝑵:*-https://dashboard.heroku.com/new?template=https://github.com/GEEKMD099/THOMAS-SHELBY-MD`
        let buttonMessaged = {
            image: { url: await botpic() },
            caption: cap,
            footer: tlang().footer,
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: "STAR-REPO",
                    body: "Easy to Use",
                    thumbnail: log0,
                    mediaType: 4,
                    mediaUrl: '',
                    sourceUrl: ``,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)
//---------------------------------------------------------------------------
cmd({
        pattern: "status",
        alias: ["about"],
        desc: "To check bot status",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
        const uptime = process.uptime();
        timestampe = speed();
        latensie = speed() - timestampe;
        let ter = `
🔪 *${tlang().title}* 🔪
𝐎𝐖𝐍𝐄𝐑:-+237620857930
*🍺Description:* 𝙰 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝚋𝚘𝚝 𝚠𝚒𝚝𝚑 𝚛𝚒𝚌𝚑 𝚏𝚎𝚊𝚝𝚞𝚛𝚎𝚜, 𝚋𝚞𝚒𝚕𝚝 𝚒𝚗 𝙽𝚘𝚍𝚎𝙹𝚜 𝚝𝚘 𝚖𝚊𝚔𝚎 𝚢𝚘𝚞𝚛 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝚎𝚗𝚓𝚘𝚢𝚊𝚋𝚕𝚎...𝚋𝚢 THOMAS-FAN.
*🍺Speed:* ${latensie.toFixed(4)} ms
*🍺Uptime:* ${runtime(process.uptime())}
*🍺Version:* 0.0.7
*🍺Owner:*  ${Config.ownername}
*Powered by ${tlang().title}*
`;
        let buttonMessaged = {
            image: {
                url: await botpic(),
            },
            caption: ter,
            footer: tlang().footer,
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: tlang().title,
                    body: `Bot-Status`,
                    thumbnail: log0,
                    mediaType: 2,
                    mediaUrl: ``,
                    sourceUrl: ``,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)

//---------------------------------------------------------------------------
cmd({
    pattern: "theme",
    desc: "To find the theme",
    category: "general",
    filename: __filename,
},
async(Void, citel,text,{isCreator}) => {

if(!isCreator) return citel.reply(tlang().owner);
let str="*All available theme*"
str+=`  1.BAT\n\n this is the theme of SHELBY-BOT.\_Reply ${prefix}setvar THEME:SHELBY`
return citel.reply(str)

}
)