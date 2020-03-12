$(document).ready(() => {
  let game_began = false;

  const restart = function() {
    game_began = false;
    $('.boundary').css({backgroundColor: '#eeeeee'});
  }

  $('#start').click(() => {
    game_began = true;
  });

  $('.boundary').mouseenter((e) => {
    if (game_began === false) {
      return;
    }
    
    $(e.target).css({backgroundColor: 'red'});
    setTimeout(() => {
      alert('You lost the game');
      restart();
    }, 200);
  });

  $('#end').mouseenter(() => {
    if (game_began === false) {
      return;
    }

    $('.boundary').css({backgroundColor: 'green'});
    setTimeout(() => {
      alert('You won the game');
      restart();
    }, 200);
  });
});