import 'babel-polyfill';
import $ from 'jquery';
import Game from './Game';
import { gameState, gameMode } from './GameVariables'

$(() => {
  let game;

  $('.js-gameCountUp').on('click', ()=> {
    game = new Game({title: 'Count Up', gameMode: gameMode.COUNT_UP});
    game.init();
  });

  $('.js-gameZeroOne').on('click', ()=> {
    game = new Game({title: '01(301)', maxRound: 10, gameMode: gameMode.ZERO_ONE,score: 301});
    game.init();
  });

  $('circle').on('click', (e) => {
    game.hitBoard(e.target);
  });

  $('.js-next').on('click', (e)=> {
    game.nextRound();
  });

});

