//=========================================================
// Used libraries
//=========================================================

var express = require('express');
var i18n = require("i18n");
var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Setup
//=========================================================

// Language setup 
i18n.configure({
    locales:['ar', 'en', 'fr'],
    directory: __dirname + '/locales',
    register: global
});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Integration with LUIS
var url = 'https://api.projectoxford.ai/luis/v2.0/apps/6ff965de-303e-4adf-9ca1-0e26f49ba0b5?subscription-key=67350f7ea4984696b5aadd2df5177f35&verbose=true';
var recognizer = new builder.LuisRecognizer(url); // URL du modèle LUIS, LOOK ICI ARNAUD
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', intents);

//=========================================================
// Bots Dialogs
//=========================================================

require('./dialog/index.js').index(bot, intents);
require('./dialog/askLanguage.js').askLanguage(bot, builder, i18n);
require('./dialog/askWho.js').askWho(bot, builder, i18n);
require('./dialog/askInfo.js').askInfo(bot, builder, i18n);


