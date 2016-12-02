function askWho (bot, builder, i18n)
{
    bot.dialog('/askWho', [
        function (session) {
            session.send(i18n.__('welcome'));
            builder.Prompts.choice(session, i18n.__('whoAreYou'), i18n.__('refugee') + '|' + i18n.__('benevol') + '|' + i18n.__('other'));
        },
        function (session, results) {
            session.beginDialog('/askInfo');
        }
    ]);
}

module.exports.askWho = askWho;