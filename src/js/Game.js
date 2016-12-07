import $ from 'jquery';
import { gameState, gameMode } from './GameVariables'


const CLASSES = {
  title: '.js-title',
  history: '.js-history',
  roundScore: '.js-roundScore',
  round: '.js-round',
  score: '.js-score',
  roundNumber: '.js-roundNumber'
};

const DATA_NAME = {
  point: 'point',
  magnification: 'magnification'
};

export default class Game {
  constructor(overrideState = {}) {
    this.DEFAULT_STATE = {
      gamestate: gameState.PLAYING,
      score: 0,
      round: 1,
      roundScores: [],
      title: '',
      history: [],
      maxRound: 8,
      gameMode: gameMode.COUNT_UP,
      roundStartScore: 0,
    };

    this.$history = $(CLASSES.history);
    this.$title = $(CLASSES.title);
    this.$roundScore = $(CLASSES.roundScore);
    this.$score = $(CLASSES.score);
    this.$round = $(CLASSES.round);
    this.$roundNumber = $(CLASSES.roundNumber);
    this.overrideState = overrideState;
    this.state = Object.assign({}, this.DEFAULT_STATE, this.overrideState);
  }

  init() {
    this.render();
  }

  /**
   *
   * @param elem jquery selector
   */
  hitBoard(elem) {
    if (this.state.roundScores.length === 3) {
      return;
    }

    if (this.state.gameState === gameState.WAITING_NEXTGAME) return;

    const $elem = $(elem);
    const point = Number($elem.data(DATA_NAME.point) || 0);
    const magnification = Number($elem.data(DATA_NAME.magnification) || 0);
    const score = point * magnification;
    this.addScore(score)
  }

  /**
   * add score
   * @param score number finished calc board score
   */
  addScore(score) {
    this.state.gameMode === gameMode.COUNT_UP ? this.state.score += score : this.state.score -= score;
    this.state.roundScores.push(score);
    this.render();

    if (this.state.gameMode === gameMode.ZERO_ONE && this.state.score === 0) this.endGame();
    if (this.state.gameMode === gameMode.ZERO_ONE && this.state.score < 0) this.nextRound(true);
  }

  nextRound(isBreak = false) {
    this.updateGameState();
    if (this.state.gameState === gameState.WAITING_NEXTGAME) return;

    // zero one break
    if (isBreak) {
      this.state.score = this.state.roundStartScore;
    } else {
      this.state.round += 1;
      this.state.history.push(this.$round.clone());
    }

    this.state.roundScores = [];
    this.render();
    this.state.roundStartScore = this.state.score;
  }

  updateGameState() {
    if (this.state.gameState === gameState.WAITING_NEXTGAME) return;
    if (this.state.round === this.state.maxRound) {
      this.endGame();
    }
  }

  endGame() {
    if (this.state.gameState === gameState.WAITING_NEXTGAME) return;

    this.state.history.push(this.$round.clone());
    this.updateHistory();
    this.$round.html('Game End');
    this.state.gameState = gameState.WAITING_NEXTGAME;
  }

  render() {
    this.updateGameTitle();
    this.updateRound();
    this.updateScore();
    this.updateRoundScore();
    this.updateHistory();
  }

  updateGameTitle() {
    this.$title.text(this.state.title);
  }

  updateRound() {
    this.$roundNumber.text(this.state.round);
  }

  updateScore() {
    this.$score.text(this.state.score);
  }

  updateRoundScore() {
    const html = this.state.roundScores.join('&ensp;/&ensp;');
    this.$roundScore.html(html);
  }

  updateHistory() {
    let html = '';
    this.state.history.forEach(($elem)=> {
      html += $elem.html();
    });
    this.$history.html(html);
  }

  clearHistory() {
    this.$history.empty();
  }
}
