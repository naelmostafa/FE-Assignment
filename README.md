# FE-Assignment

[Chess-Game](https://chess-game-5e2a6.web.app/)

This project is a web-based chess game that consists of two iframes representing two players. The game allows players to make moves on their respective boards, and the moves are synchronized between the iframes using the postMessage API. The project is implemented using Angular and the ngx-chess-board library for rendering the chess boards.

## Getting Started

To get started with the project, follow the instructions below:

Clone the repository to your local machine.
Install the dependencies by running the command: npm install.
Start the development server by running the command: npm start.
Open your browser and navigate to the specified URL (e.g., <http://localhost:4200>) to access the application.

## Game Instructions

- The main page of the application (`/mainpage`) contains two iframes representing the two players.

- Each player can make moves on their respective board by interacting with the chess pieces.

- When a player makes a move, it is synchronized with the other player's board in real-time.

- The second board is rotated so that black is facing the player.

- The boards are disabled according to the current turn. When it's white's turn, the second board is disabled, and when it's black's turn, the first board is disabled.

- If a checkmate occurs, an alert is displayed to announce the end of the game. The players can click "Create new game" to reset the board and start a new game.

- If the browser is closed before the game ends, the current game state is stored in the local storage.

- The state is automatically loaded when the page is reopened, allowing the players to resume the previous unfinished game.

- Communication between the main page and the iframes is done using the postMessage API.

- Local storage is used only for storing the game state between sessions and should not be used for communication.
