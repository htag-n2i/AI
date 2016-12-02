function index(bot, intents)
{
    // bot.dialog('/', intents, [
    //     function (session) {
    //         session.beginDialog('/askLanguage');
    //     }
    // ]);

    intents.onBegin(function (session) {
        session.beginDialog('/askLanguage');
    });
}

module.exports.index = index;
