# ITS_CHAD_BOT
Twitch chat-bot written in Typescript.

# Bot Commands

| Command                  | Description                                                               | Required Permission  |
|--------------------------|---------------------------------------------------------------------------|----------------------|
| !debug printlog          | Print the chat-log.                                                       | Streamer or Mod      |
| !debug clear             | Clear the chat-log.                                                       | Streamer or Mod      |
| !debug printconfig       | Print the config.                                                         | Streamer or Mod      |
| !debug banbots           | Ban bots specified in ```./config/twitch_bots.txt```.                     | Streamer or Mod      |
| !nuke \<word> \<minutes> | Ban users who used a specified word in the specified number of minutes.   | Streamer or Mod      |

# Disclaimer

This bot only stores the last hour of chat-logs.

# How to run
Requires: [Node JS](https://nodejs.org/en/)

1. Open a terminal in the bot's path.
2. Run the following command: ```npm install```
3. [Create ```.env``` in your bot's path.](#config)
4. [Configure](#config) the bot.
4. Run using the desired Run Command(s):

# Run Commands
| Run Command      | Description                                 |
|------------------|---------------------------------------------|
| npm start        | Compile and Run Bot                         |
| npm run compile  | Compile                                     |
| npm run bot      | Run without Compiling                       |
| npm run dev      | Compile and Run Bot                         |
| npm run dev-host | Compile and Run Bot and Run Webserver       |
| npm run host     | Run Bot and Run Webserver without Compiling |

# <a name="config"></a>Config File

```./config/blacklisted_phrases.txt``` - Line separated phrases to blacklist.

```./config/whitelisted_symbols.txt``` - No separator needed, symbols to whitelist.

```./config/twitch_bots.txt``` - Line separated usernames to ban.

# <a name=".env"></a>Creating the Environment File

```
bot_username = "my_bot_username"
bot_oauth_token = "oauth_token_no_prefix"
channels = "channel1 channel2 channel3"
```

The OAuth Token **does not** need the ```oauth:``` prefix.

The channels list should be space separated.

# <a name="createcmds"></a>Creating New Commands

1. Navigate to ```./src/commands/```
2. Create a Typescript file ```command.ts```
3. Implement the ```ICommand``` interface:

```typescript
    import tmi = require('tmi.js');
    export class command implements ICommand {
        name: string = "command";
        hasPermission(channel: string, tags: tmi.ChatUserstate): boolean {
            return true;
        }
        run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
            console.log(tags.username + " used the new command!");
        }
    }
```
4. Register the command in the command registry: ```./src/commandRegistry.ts```

```typescript
    import { command } from "./commands/command";

    ...
    registerCommand(new command());
```

5. Done!  Your command is now registered.

# License
**ITS_CHAD_BOT** is licensed under the MIT License.  Dependencies are under their respective licenses.
