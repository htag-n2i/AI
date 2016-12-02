function askLanguage(bot, builder, i18n)
{
    bot.dialog('/askLanguage', [
        function (session) {
            // Prompt the user to select their preferred locale
            builder.Prompts.choice(session, "Hello ! Please, choose your language.", 'العربية|English|Français');
        },
        function (session, results) {
            // Update preferred locale
            var locale;
            switch (results.response.entity) {
                case 'العربية':
                    locale = 'ar';
                    break;
                case 'English':
                    locale = 'en';
                    break;
                case 'Français':
                    locale = 'fr';
                    break;
            }
            session.preferredLocale(locale, function (err) {
                if (!err) {
                    // Locale files loaded
                    i18n.setLocale(locale);
                    //session.endDialog(i18n.__("Your preferred language is now : ") + "%s.", results.response.entity);
                } else {
                    // Problem loading the selected locale
                    session.error(err);
                }
                session.beginDialog('/askWho');
            });
        }
    ]);
}

module.exports.askLanguage = askLanguage;