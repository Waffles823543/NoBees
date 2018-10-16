var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var express = require('express');
var app = express();
app.get('/', (req, res) => res.send('welcome to no bees website... it\'s a work in progress'))
app.listen(process.env.PORT || 5000);

const fortniteInfractions = {}

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    const bees = "(bee|bees)"
    const noU = "(no u)"
    const fortnite = "(fortnite)"
    
    if(message.toLowerCase().match(bees) && userID != bot.id){
        logger.info("bees");
        bot.sendMessage({
            to: channelID,
            message: "no bees"
        });
    }else if(message.toLowerCase().match(noU) && userID != bot.id){
        logger.info("no u");
        let chosenOne = bot.users[Object.keys(bot.users)[Math.floor(Math.random() * Object.keys(bot.users).length)]];
        while (chosenOne.bot == true){
            chosenOne = bot.users[Object.keys(bot.users)[Math.floor(Math.random() * Object.keys(bot.users).length)]];
        }
        logger.info(chosenOne);
        logger.info(chosenOne.channelID);
        logger.info(userID);
        bot.sendMessage({
            to: channelID,
            message: "no <@" + chosenOne.id + ">"
        });
    }else if(message.toLowerCase().match(fortnite) && userID != bot.id){
        logger.info("fortnite");
        if(fortniteInfractions[userID]){
            fortniteInfractions[userID]++;
        }else{
            fortniteInfractions[userID] = 1;
        }

        if(fortniteInfractions[userID]+1 % 3 == 0){
            bot.sendMessage({
                to: channelID,
                message: "ur mom gay"
            });
        }
    }
});

setInterval(() => {
    console.log("100s");
}, 100000)