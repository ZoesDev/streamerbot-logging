import { StreamerbotClient } from '@streamerbot/client';
import mysql from 'mysql2/promise';
import 'dotenv/config';


// Create a new client with default options
const client = new StreamerbotClient({
    host: process.env.streamerbotHost,
    port: process.env.streamerbotPort,
    subscribe: "*",
});


// Creating the connection to database
const pool = mysql.createPool({
    host: process.env.mysqlHost,
    user: process.env.mysqlUser,
    password: process.env.mysqlPassword,
    database: process.env.mysqlDatabase,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });


// Subscription will automatically be added to client with your listener function
client.on('Twitch.ChatMessage', ({ data,timeStamp,event }) => {

    pool.query("INSERT INTO twitchChat (`source`, `timestamp`, `channel`, `userid`, `username`, `displayname`, `role`, `subscriber`, `subscribertier`, `monthssubscribed`,`hasbits`, `bits`, `ishighighted`, `isreply`,`fristmessage`, `returningchatter`, `message`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [event.source,timeStamp,data.message.channel,data.message.userId,data.message.username,data.message.displayName,data.message.role,data.message.subscriber,data.message.subscriptionTier,data.message.monthsSubscribed,data.message.hasBits,data.message.bits,data.message.isHighlighted,data.isReply,data.firstMessage,data.message.returningChatter,data.message.message],
        function (error, results, fields) {
                if (error) throw error;
    });
  });
