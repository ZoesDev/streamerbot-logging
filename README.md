# streamerbot-logging
Side project for [Streamer.bot](https://streamer.bot) to log my chat to mysql using Nodejs and Streamerbots Websockets this is semi hacky as I do not have docker or any scripts setup to make it easier yet.

## Use at your own risk
As I consider this code still as a 0.0.2 alpha code and as such things may change and break on you while I am working on adding new features to the code or fixing bugs. hoepfully someday I will have it 100% for my use case with a search and anylatics setup like I am wanting

## Getting started

1. Install [Streamer.bot](https://streamer.bot), and connect it to Twitch.
2. Turn on the Websocket Server:
   ![image](https://github.com/user-attachments/assets/525b2405-ff56-4bdb-a45b-3936b95f7b4f)
3. Install Nodejs 22.x or newer (tested on 22 and 23)
4. clone repository to a directory to run
5. copy env-example to .env and update parameters to your infromation for streamerbot and database info
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `youtubeChat` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `source` varchar(11) DEFAULT NULL,
  `timestamp` varchar(45) DEFAULT NULL,
  `channelid` varchar(30) DEFAULT NULL,
  `liveChatID` varchar(128) DEFAULT NULL,
  `userid` varchar(128) DEFAULT NULL,
  `userurl` varchar(256) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `subscriber` varchar(5) DEFAULT NULL,
  `verified` varchar(5) DEFAULT NULL,
  `message` varchar(501) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

```
run with node index.js from console.





### Configs

Here is the parameters, defaults and what they are for

| Config  | default value | description | notes |
| ------------- | ------------- | ------------- | ------------- |
| streamerbotHost  | 127.0.0.1  | IP to use to connect to streamerbot   | Can be left as default if on the same computer   |
| streamerbotPort | 8080  | Port to use to connect ot streamerbot  | can be left default if you didnt need to change it in setup  |
| streamerbotPassword | NULL  | Password  | Not currently used in code  |
| mysqlHost | 127.0.0.1  | default IP of MYSQL server  | change to the IP/URL of Mysql Server  |
| mysqlUser | user  | Username to connect with  |   |
| mysqlPassword | password  | Password to connect with  |  |
| mysqlDatabase | chatlogs  | Database name  |  |
| Debug | false  | Content  | debug more enabled  | Not used currently |
| ignoredUsers | ['user1','user2']  | USers to not log form  | THis is used to not log you or your streamerbot. can add more users if you have ones you dont want to log for |
