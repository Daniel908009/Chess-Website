# Chess Website

## What is it?
This project is a chess game on a web page written in Javascript with a fully working PvP mode and Player vs Bot mode made using Bootstrap and p5js libraries. I reccomend reading the Bot explanation section of this README.md file to understand where most of the complexity of this project is.

## Why did I do it?
I never really liked web development, but it is essential for programmer to know how to make websites, for example some day I will have to make my own portfolio website and it would be much easier if I already have experience with HTML, CSS and JS. I also wanted to make some decision making algorithm, since I am fascinated by those. So I had narrowed it down to these options: Tic Tac Toe, Chess, Checkers. Since I felt like doing a more complicated and bigger project I chose the chess. I picked Bootstrap since I have some experience with it and p5js since I wanted to know how it works, because I could use it for a bunch of other projects and I heard its a good framework.

## Features
- [X] Enemy Bot
- [X] Fully working checkmating
- [X] Limiting movement of pieces (basically removing the moves that would put their own king in check)
- [X] Highlighting pieces that can move if the king is in check (blocking, etc.)
- [X] Resizable front end, works even on phones!
- [X] Saving games to local storage
- [X] Exporting and Importing games using a JSON files
- [X] Undo and Redo buttons for PvP mode (they are not in PvB because currently the player could just make the move for the bot using undo, I am working on making a new way of storing the history of moves, so that it could work in PvB)
- [X] Checkmating logic, this is the second most overhauled part of the code, right after the bot decision making function

## Bot explanation
I started to work on the bot when the first playable version of the game existed. While making the bot I suffered from the endless hell of recursive functions, seriously though, they are absolutely painfull to debug. Over the course of making this site I did 4 complete overhauls of the way the bot worked, this is because I have only tried making this kind of bot once and it didnt even work that time. I wont explain all the details of each overhaul, but you can see them all in the commits. I made sure to save each one in case someone wants to check it out. But in short. All bots except of the last one suffered from problems with detecting a good move at a deeper level than 1, for a playable bot you need at least 3. With the final overhaul I used everything I learned from the first 3 and combined it with my new strategy of using nodes (this is a class I made, for more info look at the code). This strategy turned out to be right, the nodes worked perfectly to represent each possible move, currently the bot can see 3 moves ahead (this is limited because web pages only use one thread, so if I for example set it to 7, it would crash the browser, this is because at level 7 there is around 1 280 000 000 possible moves) and uses functions for detecting checking, evaluating the board, score tables(these bassicaly determine where each pieces optimal possition is), etc. I think its already the biggest and most complicated thing I have done as of writting this README, but there is room for improvements. First is the depth of the search. Currently its 3 with a possibility of 4, however I think I could get it up to 6 if I implement some extra computing power saving logic. Secondly the bot freezes the entire page when its deciding the next move. I have an idea how to fix it, but I am not surre if its possible, so I cant make any promisses yet.

## Features of the future
Apart from the bot improvements I could make. The site has what I would call a "working UI". It isnt that good or engaging, so that needs some improvements. I also want to add a dark mode, since if you open the web page at 3 A.M. you will go blind, source: my eyes.

## Screenshots
### Each screenshot has a description under it, just so you know what you are seeing