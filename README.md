# streamerbot-logging
Side project for [Streamer.bot](https://streamer.bot) to log my chat to mysql using Nodejs and Streamerbots Websockets this is semi hacky as I do not have docker or any scripts setup to make it easier yet.


## Getting started

1. Install [Streamer.bot](https://streamer.bot), and connect it to Twitch.
2. Turn on the Websocket Server:
   ![image](https://github.com/user-attachments/assets/525b2405-ff56-4bdb-a45b-3936b95f7b4f)
3. Install Nodejs 22.x or newer (tested on 22 and 23)
4. clone repository to a directory to run
5. copy env-example to .env
6. setup mysql database and user as normal.
7. create table
```
CREATE TABLE `twitchChat` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `source` varchar(11) DEFAULT NULL,
  `timestamp` varchar(45) DEFAULT NULL,
  `channel` varchar(30) DEFAULT NULL,
  `userid` int(128) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `displayname` varchar(30) DEFAULT NULL,
  `role` int(1) DEFAULT NULL,
  `subscriber` varchar(5) DEFAULT NULL,
  `subscribertier` varchar(5) DEFAULT NULL,
  `hasbits` varchar(6) DEFAULT NULL,
  `monthssubscribed` int(11) DEFAULT NULL,
  `bits` int(11) DEFAULT NULL,
  `ishighighted` varchar(5) DEFAULT NULL,
  `isreply` varchar(5) DEFAULT NULL,
  `fristmessage` varchar(5) DEFAULT NULL,
  `returningchatter` varchar(6) DEFAULT NULL,
  `emotes` varchar(256) DEFAULT NULL,
  `message` varchar(501) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```
run with node index.js from console.