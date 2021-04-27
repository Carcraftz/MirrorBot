//The token you want to forward messages from
let usertoken = "";
//The token you want to forward messages to
let botoken = "";
//The channels you want to forward from (channel IDs)
let forwardfrom = [];
//The channels you want to forward to (channel IDs)
let forwardto = [];
//===============================================================================================
const Discord = require("discord.js-selfbot-v11");
const user = new Discord.Client();
user.login(usertoken);
user.on("ready", ready => {
  const bot = new Discord.Client();
  bot.login(botoken);
  user.on("message", message => {
    if (forwardfrom.includes(message.channel.id) ) {
      //forward message text
      const embed = new Discord.RichEmbed()
        .setColor("#0099ff")
        .setTitle("New Message!")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(message.content)
        .setTimestamp()
        .setFooter(
          "Mirror Bot - Created by Carcraftz#5445",
          "https://cdn.glitch.com/4e652625-3b07-492f-b7ce-b1f8b1ab5bf0%2Fistockphoto-822836798-612x612.jpg?v=1570677107821"
        );
      forwardto.forEach(channel => {
        bot.channels.get(channel).send(embed);
      });
      //forward all attachments
      if (typeof message.attachments.array()[0] != "undefined") {
        var media = message.attachments.array();
        let urls = [];
        media.forEach(item => {
          urls.push(item.url);
        });
        forwardto.forEach(channel => {
          bot.channels
            .get(channel)
            .send(message.author.tag + "\nImage URLs:\n" + urls.join("\n"));
        });
      }
      //forward all embeds
      message.embeds.forEach(embed1 => {
        let embedfinal = new Discord.RichEmbed(embed1);
        console.log(embedfinal);
        embedfinal.setFooter(
          "Mirror Bot - Created by Carcraftz#5445",
          "https://cdn.glitch.com/4e652625-3b07-492f-b7ce-b1f8b1ab5bf0%2Fistockphoto-822836798-612x612.jpg?v=1570677107821"
        );
        forwardto.forEach(channel => {
          bot.channels.get(channel).send(embedfinal);
        });
      });
    }
  });
});
