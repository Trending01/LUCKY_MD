const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0ZGZXJzd2t6bFQ0N0dld3BoR0QzQ0N2UkVOcExZVVJkcGtNaGZmMzJWUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUNuekwvY0xiakMxU2xmS0pxMU5MYnlKOTkzL3pHcm9tRTNlekl0YWFVWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrT3FWUUVkQmgzSS9LenZPUk1OemI3M1pXL2kxSnNEMFlyS2oxenA3NTI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxZ3lIWXBnOWtQajF0YmtBbzFtMW4xbXlVQzhUb1h6RDI1ZWNaVWtyc0RNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFPQWFWTlBpM0pvR1U0T0lBeXMzV0pqT0Y5MkZmczFlOTNnbEtOdlFqa289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1haXFUU3lBeGROZy9QRUFBNnNlbDhmUVlNZEVzUDYrNCt5TWdSZkNiMFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0Myclk1WFFBaDNlbHNaYUdjdTFHWnZoSGczS3FmNmxyb2U0d0hzU1RYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTZRWWt3NEE3b2V6b2NucVMxUGs4RkJHRUpVVC9QVE1rdFo5VmFHcC9ROD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndjemxMZ29JZ25zV20vV3BpTDBTZWh2KzQ0VWVzTWwzY0g5eVF5dGFzV1gyV09pTGFNTHJxRnppZ0o1UXZ5WUdnUWltdFpYOFNIRjVYUlhhNGZ6ZGp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiJpZXBlQ20zR2hraUtWeTNhUU1FTHB0V205QkdwbGI3ekY1TDQzdU5ER2xrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU1NzU2MDkxMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUI5RjE3NkI3NEZBMTI3NUM1OSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM5MDM1ODY1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNPS0o1dm9HRU1xcG5yMEdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJkUU12VHQ1bGZCMWlDZTc1VkM0V2ZobURxbC8xdDJHRHV2Q2xSbFFpVEN3PSIsImFjY291bnRTaWduYXR1cmUiOiJnOUxsQ25JTWRrY3dtQ2oxMGptK1BDcFNOZVpmbnZEMWphQ3NFQlJVUkxzbEJnelRrTmEvd0dWb09kY3Y0cDg3T29jVnpFU0tvQUNWaTVBeVBTZDBnUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiL3hYdmY5c2kzTEY3SEkxWCtHTVhLTTZadko3UzFwRzkvaTJaaXlDb2Q4R0NLTWFIUU9UV1c3RmVhRFkxTllKejZRK1ZoNHo1WXVuamdxMGhLSW8xZ2c9PSJ9LCJtZSI6eyJpZCI6IjIzMzU1NzU2MDkxMTozMkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEyODU4NzYyOTg5MTgzNDozMkBsaWQiLCJuYW1lIjoi4peP4pas4LWg4LWg4pasIFRSRU5ESU5HIEJPU1Mg4pas4LWg4LWg4pas4pePIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzU1NzU2MDkxMTozMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYVURMMDdlWlh3ZFlnbnUrVlF1Rm40Wmc2cGY5YmRoZzdyd3BVWlVJa3dzIn19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczOTAzNTg2MywibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUI0QUFBZUMifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "Trending Boss",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233557560911",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Viewed by Trending Boss',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

