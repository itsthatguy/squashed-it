const iframe = document.querySelector('#audio')
const player = document.querySelector('#player')

var HOST = location.origin.replace(/^http/, 'ws')
var sock = new WebSocket(HOST);
 sock.addEventListener('open', function() {
     console.log('open');
 });

 sock.addEventListener('message', function(e) {
     if (e.data == "playsound") {
        console.log('PLAY SOUND');
        player.volume = 1
        player.play()
     }
 });

 sock.addEventListener('close', function() {
     console.log('close');
 });

document.querySelector('.clickme').addEventListener('click', () => {
  sock.send('playsound');
});

iframe.volume = 0
player.volume = 0

setInterval(() => sock.send('heartbeat'), 5000)
