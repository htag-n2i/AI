function askInfo (bot, builder, i18n)
{
    bot.dialog('/askInfo', [
        function (session) {
            builder.Prompts.text(session, i18n.__('askSomething'));
        },
        function (session, results) {

        }
    ]);
}

module.exports.askInfo = askInfo;