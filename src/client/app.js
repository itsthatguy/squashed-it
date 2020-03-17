const iframe = document.querySelector('#audio')
const player = document.querySelector('#player')
const content = document.querySelector('.content')
const confetti = document.querySelector('.wrapper')

player.onended = function() {
  setTimeout(() => {
    content.classList.remove('playing');
    confetti.classList.remove('playing');
  }, 1000);
};

var HOST = location.origin.replace(/^http/, 'ws')
var sock = new WebSocket(HOST);
 sock.addEventListener('open', function() {
     console.log('open');
 });

 sock.addEventListener('message', function(e) {
     if (e.data == "playsound") {
        console.log('PLAY SOUND');
        content.classList.add('playing');
        confetti.classList.add('playing');
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
