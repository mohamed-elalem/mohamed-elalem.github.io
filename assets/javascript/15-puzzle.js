$(document).ready(() => {
  let empty_block = (() => {
    let row = 3;
    let col = 3;

    return {
      row: () => row,
      col: () => col,
      set: (r, c) => {
        console.log(r, c);
        row = r;
        col = c;
      },
      pos: () => row * 4 + col,
    };
  })();

  $('#puzzlearea div').addClass('puzzlepiece');
  $('.puzzlepiece').css({display: 'inline-block'});
  $('#puzzlearea div').each(function(idx, elem) {
    $(elem).attr('data-idx', idx);
    position_element(elem, idx, true);
  });

  $('#shufflebutton').click(() => {
    const order = random_sequence(15);

    order.forEach((content, idx) => {
      position_element($(`.puzzlepiece[data-idx=${content - 1}]`), idx, false);
    }); 
  });

  $('.puzzlepiece').click((e) => {
    const elem = e.target;
    const pos = parseInt($(e.target).attr('data-pos'));
    const new_pos = empty_block.pos();
    const [r, c] = [Math.floor(pos / 4), pos % 4];
    const [nr, nc] = [empty_block.row(), empty_block.col()];
    if (Math.abs(r - nr) + Math.abs(c - nc) == 1) {
      empty_block.set(r, c);
      position_element(elem, new_pos);

      if (checkWin()) {
        setTimeout(() => {
          alert('You won!!!');
        }, 500);
      }
    }
  })
});

function position_element(elem, idx, backgroundPosition) {
  const row = Math.floor(idx / 4), col = idx % 4;
  const rowPixels = `${row * 100}px`, colPixels = `${col * 100}px`;
  let styles = {top: rowPixels, left: colPixels};
  if (backgroundPosition === true) {
    $(elem).css({backgroundPosition: `-${colPixels} -${rowPixels}`})
  } 
  $(elem).animate(styles);
  $(elem).attr('data-pos', idx);
}

function random_sequence(n) {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }

  let random_arr = [];
  for (let i = 0; i < n; i++) {
    const pos = Math.ceil(Math.random() * arr.length) - 1;

    random_arr.push(arr[pos]);
    arr.splice(pos, 1);
  }

  return random_arr;
}

function checkWin() {
  let pieces = 15;
  $('.puzzlepiece').each(function(idx, elem) {
    if ($(elem).attr('data-pos') === $(elem).attr('data-idx')) {
      pieces--;
    }
  });

  return pieces === 0;
}
