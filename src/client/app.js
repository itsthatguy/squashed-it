const iframe = document.querySelector('#audio');
const player = document.querySelector('#player');
const content = document.querySelector('.content');
const confetti = document.querySelector('.wrapper');

player.onended = function() {
  setTimeout(() => {
    content.classList.remove('playing');
    confetti.classList.remove('playing');
  }, 1000);
};

function WebSocketClient() {
  this.autoReconnectInterval = 5000;
}

let HOST = location.origin.replace(/^http/, 'ws');
WebSocketClient.prototype.open = function() {
  this.ws = new WebSocket(HOST);

  this.ws.addEventListener('open', () => {
    console.log('WebSocketClient: Open');
    this.heartbeat = setInterval(() => this.ws.send('heartbeat'), 5000);
  });

  this.ws.addEventListener('message', e => {
    if (e.data == 'playsound') {
      console.log('PLAY SOUND');
      content.classList.add('playing');
      confetti.classList.add('playing');
      player.volume = 1;
      player.play();
    }
  });

  this.ws.addEventListener('close', e => {
    switch (e.code) {
      case 1000: // CLOSE_NORMAL
        console.log('WebSocket: closed');
        break;
      default:
        // Abnormal closure
        clearInterval(this.heartbeat);
        this.reconnect(e);
        break;
    }
  });
};

WebSocketClient.prototype.reconnect = function(e) {
  console.log(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`, e);
  let that = this;
  setTimeout(() => {
    console.log('WebSocketClient: reconnecting...');
    that.open();
  }, this.autoReconnectInterval);
};

WebSocketClient.prototype.send = function(...args) {
  this.ws.send(...args);
};

const websocket = new WebSocketClient();
websocket.open();

document.querySelector('.clickme').addEventListener('click', () => {
  websocket.send('playsound');
});

player.volume = 0;
