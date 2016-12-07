import 'jquery';

const CLASSES = {
  title: '.js-title',
  log: '.js-log',
  history: '.js-js-history',
};

const DATA_NAME = {
  point: 'point',
  magnification: 'magnification',
};

export default class GameBase {
  constructor(title) {
    this.score = 0;
    this.round = 1;
    this.thisRound = [];
    this.text = {
      title: title || '',
      log: '',
      history: [],
    };
  }

  init() {
    this.score = 0;
    this.round = 1;
    this.thisRound = [];
    this.text = {
      title: '',
      log: '',
      history: [],
    };
  }

  endRound() {
    // 終了判定をして次のラウンド待機してnextRound
  }

  nextRound() {
    this.round += 1;
    this.thisRound = [];
  }

  updateGameTitle() {
    $(CLASSES.title).text(this.text.title);
  }

  updateLog() {
    const text = this.thisRound.join(' / ');
    $(CLASSES.log).text(text);
  }

  updateHistory() {
    const html = this.text.history.join('<br>');
    $(CLASSES.history).html(html);
  }

  pushHistory(roundLog) {
    this.text.history.push(roundLog);
  }

  /**
   *
   * @param elem jquery selector
   * @returns {number}
   */
  static calcScore(elem) {
    const $elem = $(elem);
    const point = $elem.data(DATA_NAME.point) || 0;
    const magnification = $elem.data(DATA_NAME.magnification) || 0;
    return point * magnification;
  }
}
