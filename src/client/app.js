var HOST = location.origin.replace(/^http/, 'ws')
var sock = new WebSocket(HOST);
 sock.addEventListener('open', function() {
     console.log('open');
 });

 sock.addEventListener('message', function(e) {
     if (e.data == "playsound") {
       console.log('PLAY SOUND');
       new Audio('./dance-party.mp3').play()
     }
 });

 sock.addEventListener('close', function() {
     console.log('close');
 });

document.querySelector('.clickme').addEventListener('click', () => {
  sock.send('playsound');
});
