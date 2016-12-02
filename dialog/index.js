function index(bot)
{
    bot.dialog('/', [
        function (session) {
            session.beginDialog('/askLanguage');
        }
    ]);
}

module.exports.index = index;
