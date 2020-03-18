import StateMachine from './StateMachine.js';

class WebSocketClient {
  constructor (url) {
    this.HOST = url.replace(/^http/, 'ws');
    this.autoReconnectInterval = 5000;
    this.reconnecting = false;
  }

  open () {
    this.ws = new WebSocket(this.HOST);

    this.ws.onopen = this.onopen;
    this.ws.onmessage = this.onmessage;
    this.ws.onclose = this.onclose;
  }

  onopen = () => {
    console.log(`WebSocketClient: Open ${new Date()}`);

    if (this.reconnecting) {
      this.reconnecting = false;
      this.destroy();
      StateMachine.reload();
      return StateMachine.stopHolding();
    } else {
      this.heartbeat = setInterval(() => this.ws.send('heartbeat'), 5000);
    }
  }

  onclose = e => {
    switch (e.code) {
      case 1000:
        // CLOSE_NORMAL
        console.log('WebSocket: Closed');
        break;

      default:
        // Abnormal closure
        clearInterval(this.heartbeat);
        StateMachine.startHolding();
        this.reconnect(e);
        break;
    }
  }

  send = (...args) => this.ws.send(...args)

  onmessage = e => {
    if (e.data == 'playsound') return StateMachine.startPlaying()
    try {
      const data = JSON.parse(e.data);
      if (data.event == "CLIENTS") {
        return StateMachine.updateUsers(data.count);
      }
    } catch (error) {
      console.error(error);
    }
  }

  reconnect (e) {
    console.log(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`, e);
    let that = this;
    setTimeout(() => {
      console.log('WebSocketClient: Attempting Reconnect...');
      this.reconnecting = true;
      that.open();
    }, this.autoReconnectInterval);
  }

  destroy () {
    this.ws.close(1000, 'Recovered from Reconnection.');
    this.ws.onclose = null;
    this.ws.onmessage = null;
    this.ws.onopen = null;
    this.ws = null;
  }
}

export default WebSocketClient;
