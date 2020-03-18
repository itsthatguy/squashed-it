console.log(`App.js loaded: ${new Date().getTime()}`);
import WebSocketClient from './WebSocketClient.js';
import StateMachine from './StateMachine.js';

export default class App {
  constructor () {
    StateMachine.bindApp(this);
    this.player = document.querySelector('#player');
    this.content = document.querySelector('.content');
    this.confetti = document.querySelector('.wrapper');
    this.holdPlease = document.querySelector('.hold-please');
    this.clickme = document.querySelector('.clickme');
    this.users = document.querySelector('.users');

    this.player.volume = 0;

    this.player.onended = function() {
      setTimeout(() => StateMachine.stopPlaying(), 1000);
    };

    this.websocket = new WebSocketClient(location.origin);
    this.websocket.open();

    this.clickme.addEventListener('click', this.playSound);
  }

  playSound = () => {
    this.websocket.send('playsound');
  }

  destroy () {
    this.clickme.removeEventListener('click', this.playSound);
    this.player.onended = null;
  }
}
