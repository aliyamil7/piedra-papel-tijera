type Move = "piedra" | "papel" | "tijera";

type GameState = {
  currentGame: {
    playerMove: Move | null;
    computerMove: Move | null;
  };
  score: {
    player: number;
    computer: number;
  };
  gameWinner: GameWinner;
};

type RoundResult = "player" | "computer" | "draw";

type GameWinner = "player" | "computer" | null;

type State = {
  data: GameState;
  getState: () => GameState;
  setState: (newState: GameState) => void;
  setPlayerMove: (move: Move) => void;
  generateComputerMove: () => void;
  playRound: () => RoundResult;
  resetGame: () => void;
};

export const state: State = {
  data: {
    currentGame: {
      playerMove: null,
      computerMove: null,
    },
    score: {
      player: 0,
      computer: 0,
    },
    gameWinner: null,
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
  },

  setPlayerMove(move) {
    const currentState = this.getState();
    currentState.currentGame.playerMove = move;

    this.setState(currentState);
  },

  generateComputerMove() {
    const moves: Move[] = ["piedra", "papel", "tijera"];

    const ramdonIndex = Math.floor(Math.random() * moves.length);

    const computerMove = moves[ramdonIndex];

    const currentState = this.getState();

    currentState.currentGame.computerMove = computerMove;

    this.setState(currentState);
  },

  playRound() {
    const currentState = this.getState();

    if (currentState.gameWinner) {
      throw new Error("El juego ya terminó");
    }

    const player = currentState.currentGame.playerMove;
    const computer = currentState.currentGame.computerMove;

    if (!player || !computer) {
      throw new Error("Faltan jugadas para jugar la ronda");
    }

    let result: RoundResult;

    if (player === computer) {
      result = "draw";
    } else if (
      (player === "piedra" && computer === "tijera") ||
      (player === "papel" && computer === "piedra") ||
      (player === "tijera" && computer === "papel")
    ) {
      result = "player";
      currentState.score.player += 1;
    } else {
      result = "computer";
      currentState.score.computer += 1;
    }

    if (currentState.score.player === 3) {
      currentState.gameWinner = "player";
    }

    if (currentState.score.computer === 3) {
      currentState.gameWinner = "computer";
    }

    this.setState(currentState);

    return result;
  },

  resetGame() {
    this.data = {
      currentGame: {
        playerMove: null,
        computerMove: null,
      },
      score: {
        player: 0,
        computer: 0,
      },
      gameWinner: null,
    };
  },
};
