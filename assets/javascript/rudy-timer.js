const rudyTimer = () => () => {
  setTimeout(() => {
    alert('Rudy!');
  }, 2000);
};
window.onload = () => 
            document.getElementsByTagName('button')[0].onclick = rudyTimer();

