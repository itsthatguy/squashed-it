console.log("StateMachine: Loaded.");
class StateMachine {
  constructor() {
    this.app = null;
    this.reloading = false;
  }

  bindApp (app) {
    this.app = app;
  }

  startPlaying () {
    this.app.content.classList.add('playing');
    this.app.confetti.classList.add('playing');

    this.app.player.volume = 1;
    this.app.player.play();
  }

  stopPlaying () {
    this.app.content.classList.remove('playing');
    this.app.confetti.classList.remove('playing');
  }

  startHolding () {
    this.app.holdPlease.classList.add('holding');
  }

  stopHolding () {
    this.app.holdPlease.classList.add('done');
    setTimeout(() => this.app.holdPlease.classList.remove('done', 'holding'), 1600);
  }

  // cache-busting javascript
  reload () {
    console.log('StateMachine: JS Reloading...');
    this.reloading = false;

    const body = document.getElementsByTagName('body')[0];
    const oldScript = document.querySelector('script');
    body.removeChild(oldScript);
    this.app.destroy();

    const script = document.createElement('script');
    script.src = `js/index.js?butts=${new Date().getTime()}`;
    body.appendChild(script);

    console.log('StateMachine: JS Reloaded.');
  }
}

export default new StateMachine()
