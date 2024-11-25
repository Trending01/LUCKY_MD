const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1BEd1pEa0RpVGxvVmpDL0UzSFdrZktsOTFVWWpsWjc4dHErbXJNNjEyWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUtkcXhKdlBibjV4N3lPK1ovd2hsZ2xVYis1VXRlNHhDRER5aTUzM3RCVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHR21naFpEaVBha3R0anA0MGhnQ3dITm0wNGgvQUJ5T3R2WUJ3MmhGVkVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTnNadGYyN0pzMU9QTFVhTlVFOGlIa0owMWVYRE9BN2l2L3crQlc5c0F3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktDdlU3MjQ2NUhxdlZkTzRab3RlQy8ycmhVY1VvT0g2M1JQbCtiWGdtVm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJaemlNLzNYak5rUkJzSmR0MEFQLzNzMFJHVkEzeXRLUG9GN3BUZUl5VEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUNsZnIzK25pVEpEb1hQK2w1YlNDay9aVGFXeWRVYU1oTGV4c0ZFRmEzND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFAwVmhJOUlFam4wSzhBekZoYXlUQVhsekE4VGd6VTdEZnNrQVR3ZEUwST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktEeGVYT3U1VWRNcVFOUUMrdkdOV1crQkdlNW5ObUVqNmc3eHdJbkVPd2VtS0xEZndzN1Z1c3U5cWQ4QzdXeFBaQTZyS092YnpoZVpjM3hzd1ZiaWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MSwiYWR2U2VjcmV0S2V5IjoicDRYTFM2R2JWNnFMTnJaRXU3Qy8raFgzZkVjNkQxQklHeE1Ob2ZobTFpdz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1NTc1NjA5MTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTZDMzNEM0JCNUVCOEJDQUYyMTdCMkJEODcyRUZENzYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMjU1MzM4OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzNTU3NTYwOTExQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkM1MkMzQTM3QkRCNzA0QjlERjk2QkJBNjBBMzM5MDYyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzI1NTMzODl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkhsdFktRWZ1VHZDam1MbjRudE9OQlEiLCJwaG9uZUlkIjoiZTY4Y2RlYzktYmQ1Mi00NzA5LTkxZDctODkyZTNjNzBjYzFjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllGSmk1eTdzMHUrMzdKdXFHQjh5U3p6TFl6RT0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmViWklKeWpzVy9zZFlOSXRsVVpvZm9oU1BvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmlVMjVNSEVKM1Zrcm9HR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibHBaSlN1aUhmR1lVeHFZanFoU0xPcVNsQVZ3Ty9KR08weG1kRlVORHpsUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidHN1VkpYTlUrUWhOcndkN1pLb0VGWFl1Q09oR051SmhXWTlIWUF5ZDNJT2hyNzkzNGpjQ2h6Y3AyZm9POXBmRFM0eG9OQzJDUXlBNTRTbUc2SVBvQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IkJFTTBENk9OaWVqMWhmUVhSRXlLUHljZC9ab3VBVnRDK1BmdzA5cnRvM2tvZHFPa0tkWlNZNDI2WHg3N2FKREg2UHM4ZVd2RnRBbG0zU21OckgwTml3PT0ifSwibWUiOnsiaWQiOiIyMzM1NTc1NjA5MTE6MTFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMjAwMjc3NDMyOTM2OTA6MTFAbGlkIiwibmFtZSI6IuKXj+KWrOC1oOC1oOKWrCBUUkVORElORyBCT1NTIOKWrOC1oOC1oOKWrOKXjyJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NTc1NjA5MTE6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmFXU1Vyb2gzeG1GTWFtSTZvVWl6cWtwUUZjRHZ5Ump0TVpuUlZEUTg1VSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyNTUzMzg2LCJsYXN0UHJvcEhhc2giOiIzeFhXWVoiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1SaiJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "233557560911",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://i.imgur.com/ecRS5BQ.jpeg,https://files.catbox.moe/g73xvl.jpeg,https://files.catbox.moe/qh500b.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Dodoma',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
