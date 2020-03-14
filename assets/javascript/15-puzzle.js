const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];

$(document).ready(() => {
  let empty_block = (() => {
    let row = 3, col = 3;

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

  mark_movable_neighbors(empty_block.pos());

  $('#shufflebutton').click(() => {
    const order = random_sequence(16);

    order.forEach((content, idx) => {
      if (content === 16) {
        empty_block.set(Math.floor(idx / 4), idx % 4);
        return;
      }

      position_element($(`.puzzlepiece[data-idx=${content - 1}]`), idx, false);
    });

    mark_movable_neighbors(empty_block.pos());
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
      
      mark_movable_neighbors(pos);

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

  // let random_arr = [];
  // for (let i = 0; i < n; i++) {
  //   const pos = Math.ceil(Math.random() * arr.length) - 1;

  //   random_arr.push(arr[pos]);
  //   arr.splice(pos, 1);
  // }

  let pos = 15;
  for (let i = 0; i < 100; i++) {
    const idx = Math.ceil(Math.random() * arr.length) - 1;
    const tmp = arr[pos];
    arr[pos] = arr[idx];
    arr[idx] = tmp;

    pos = idx;
  }

  return arr;
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

function mark_movable_neighbors(pos) {
  const [r, c] = [Math.floor(pos / 4), pos % 4];

  $('.puzzlepiece').removeClass('movablepiece');

  moves.forEach(move => {
    let new_coordinate = [r + move[0], c + move[1]];
    if (new_coordinate[0] < 0 || new_coordinate[0] > 3 || new_coordinate[1] < 0 || new_coordinate[1] > 3) {
      return;
    }

    const pos = new_coordinate[0] * 4 + new_coordinate[1];
    console.log($(`.puzzlepiece[data-pos=${pos}]`));
    $(`.puzzlepiece[data-pos=${pos}]`).addClass('movablepiece');
  });
}