var sock = new WebSocket('ws://localhost:8080');
 sock.addEventListener('open', function() {
     console.log('open');
     sock.send('playsound');
 });

 sock.addEventListener('message', function(e) {
     if (e.data == "playsound") {
       console.log('PLAY SOUND');
       new Audio('./dance-party.mp3').play()
     }
    //  sock.close();
 });

 sock.addEventListener('close', function() {
     console.log('close');
 });

document.querySelector('.clickme').addEventListener('click', () => {
  sock.send('playsound');
});
