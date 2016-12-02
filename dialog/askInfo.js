function askInfo (bot, builder, i18n)
{
    bot.dialog('/askInfo', [
        function (session) {
            builder.Prompts.text(session, i18n.__('askSomething'));
        },
        function (session, args, next) {
            // Process optional entities received from LUIS
            var match;
            if (args) 
            {
                match = builder.EntityRecognizer.findBestMatch(args.response);
            }
            
            // Prompt for task name
            if (!match) 
            {
                builder.Prompts.text(session, i18n.__('askSomething'));
            } 
            else 
            {
                next({ response: match });
            }
        }
    ]);
}

module.exports.askInfo = askInfo;