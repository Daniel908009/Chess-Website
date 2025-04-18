# Chess Website

## What is it?
This project is a chess game on a web page written in JavaScript, featuring a fully working PvP mode and a Player vs. Bot mode. It is built using Bootstrap and the p5.js library. I recommend reading the "Bot Explanation" section of this README file to understand where most of the complexity of this project lies. Also if you do not have the time to play an entire game, there is a scenarios menu on the right side of the screen. It contains some presets I used for testing the bot.

Live deployment: https://daniel908009.github.io/Chess-Website/

## Why did I do it?
I never really liked web development, but it is essential for a programmer to know how to make websites. For example, someday I will have to create my own portfolio website, and it would be much easier if I already have experience with HTML, CSS, and JavaScript. I also wanted to create a decision-making algorithm since I am fascinated by them. So, I narrowed my options down to Tic-Tac-Toe, Chess, and Checkers. Since I wanted a more complex and challenging project, I chose chess.

I picked Bootstrap because I have some experience with it and p5.js because I wanted to learn how it works. I heard it’s a good framework that I could use for many other projects.

## How to play
The game is self explanatory, however when playing against the bot the window can freeze for a couple of seconds, this is because web pages can only use one thread and the decision making algorithm can be resource intensive when many pieces are still on the board, for more info about this read the "Bot Explanation" section of this README file.

## Features
- [X] Enemy Bot capable of thinking ahead
- [X] Fully working checkmating logic
- [X] Limiting movement of pieces (removing moves that would put their own king in check)
- [X] Highlighting pieces that can move if the king is in check (blocking, etc.)
- [X] Resizable front end, works even on phones!
- [X] Saving games to local storage
- [X] Exporting and Importing games using a JSON files
- [X] Undo and Redo buttons for PvP mode (not available in PvB because currently, the player could just undo the bot’s move. I am working on a new way to store move history so that undo can work in PvB as well.)
- [X] Checkmating logic – this is the second most overhauled part of the code, right after the bot’s decision-making function.

## Bot Explanation
I started working on the bot when the first playable version of the game was completed. While making the bot, I suffered through the endless hell of recursive functions—seriously, they are absolutely painful to debug.

Over the course of development, I did four complete overhauls of the bot’s logic. This is because I had only tried making this kind of algorithm once before, and it didn’t even work that time. I won’t explain every detail of each overhaul, but you can see them all in the commit history. I made sure to save each version in case someone wants to check them out.

In short, all previous versions of the bot struggled with detecting a good move beyond a recursion depth of one—but for a playable bot, you need at least three. With the final overhaul, I used everything I had learned from the first three attempts and combined it with a new strategy using nodes (this is a class I made—check the code for more details). This approach turned out to be the right one. The nodes worked perfectly to represent each possible move.

Currently, the bot can see three moves ahead (limited due to JavaScript running on a single thread—setting it to seven would crash the browser because at that depth there are around 1,280,000,000 possible moves). The bot uses functions for detecting check, evaluating the board, score tables (which determine the optimal position for each piece), and more.

At the time of writing this README, this is the biggest and most complex thing I have ever built, but there is still room for improvement:

1. Increasing search depth – Right now, the depth is three, with a possibility of four, but I believe I could push it to six by implementing extra optimization techniques.
2. Preventing the page from freezing – The bot currently freezes the entire page while thinking. I have an idea to fix this, but I’m not sure if it’s possible, so I can’t make any promises yet.

## Features of the future
Beyond improving the bot, the site has what I would call a "working UI"—it functions but isn’t particularly polished or engaging, so that needs improvement. I also want to add dark mode because opening the page at 3 A.M. will burn your eyes (source: my eyes).

There is also a known issue with the undo button after castling, which I will fix soon.

## Screenshots
### Each screenshot has a description below it so you can understand what you are seeing.

![image](https://github.com/user-attachments/assets/647109a2-e823-4861-add8-33ac69ec0d9e)

This is how the website looks when opened.

![image](https://github.com/user-attachments/assets/d5e94600-9d6a-4ebe-b64e-a1bd52288519)

This is the menu with all the options, this menu changes dynamicaly based on if the enemy is a bot or a player.
Most of the menu is pretty self explanatory, but just in case. 
The scenarios spinner shows a selection of games saved by the player and some presets that were used in the making of this projects bot.
Export button will download the current game as a JSON file.
Save to browser button will save the game to local storage (basically it will be saved to the browser it self)
Delete all games button will delete all games from local storage, this will not affect the base game scenarios.

![image](https://github.com/user-attachments/assets/b3f7eb72-7ed4-462f-a8f1-56ba603c83f3)

This is the part of the menu that only appears if the enemy is a bot

![image](https://github.com/user-attachments/assets/cb2b6fc2-c067-4fb5-825e-63d895f3710c)

This is how the board looks when the player is in check (the game highlights the pieces that can move and the king)

![image](https://github.com/user-attachments/assets/4b123cab-0e40-4719-85c9-2b6d5f49162a)

When someone wins the current player text will change and a popup will appear.

## How to download and run locally
In case you want to download this web page. I would reccomend picking the latest release in this repository (releases can be seen on the right side of this repository when openning, they are usually named something like v1.0). Then simply click on what you want to download, in most cases this would be the Source code (zip). Then you should Extract the files to where you want them to be. After that you can open the page locally using technologies like VSCode with the live server extension.
 
