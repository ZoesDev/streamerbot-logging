import { StreamerbotClient } from '@streamerbot/client';
import mysql from 'mysql2/promise';
import 'dotenv/config';

// List of usernames to ignore
const ignoredUsers = process.env.ignoredUsers;
const ignoredIds = process.env.ignoredIds;
// Create a new client with default options
const client = new StreamerbotClient({
    host: process.env.streamerbotHost,
    port: process.env.streamerbotPort,
    autoReconnect: true,
    retries: -1,

});

//Creating the connection to the database
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

client.on('Twitch.ChatMessage', ({ data, timeStamp, event }) => {
   const username = data.message.username;

    //Check if the username is in the ignored list
    if (ignoredUsers.includes(username)) {
        return; // Skip logging for ignored users
    }
    //Log the message to the database
    pool.query(
        "INSERT INTO twitchChat (`source`, `timestamp`, `channel`, `userid`, `username`, `displayname`, `role`, `subscriber`, `subscribertier`, `monthssubscribed`, `hasbits`, `bits`, `ishighighted`, `isreply`, `fristmessage`, `returningchatter`, `message`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            event.source,
            timeStamp,
            data.message.channel,
            data.message.userId,
            data.message.username,
            data.message.displayName,
            data.message.role,
            data.message.subscriber,
            data.message.subscriptionTier,
            data.message.monthsSubscribed,
            data.message.hasBits,
            data.message.bits,
            data.message.isHighlighted,
            data.isReply,
            data.firstMessage,
            data.message.returningChatter,
            data.message.message,
        ],
        function (error, results, fields) {
            if (error) throw error;
        }
    );
});

client.on('YouTube.Message', ({ data }) => {
    const userid = data.message.userid;

    //Check if the username is in the ignored list
    if (ignoredIds.includes(data.user.id)) {
        return; // Skip logging for ignored users
    }
   //Log the message to the database
   pool.query(
    "INSERT INTO youtubeChat (`source`, `timestamp`, `channelid`, `liveChatID`, `userid`, `userurl`, `name`, `subscriber`, `verified`, `message`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
        'Youtube',
        data.publishedAt,
        data.broadcast.channelId,
        data.broadcast.liveChatId,
        data.user.id,
        data.user.url,
        data.user.name,
        data.user.isSponsor,
        data.user.isVerified,
        data.message,
    ],
    function (error, results, fields) {
        if (error) throw error;
    }
);
});
