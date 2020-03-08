const decorate_btn = document.querySelector('#bigger-decoration');
const bling_checkbox = document.querySelector('#bling');

decorate_btn.onclick = (() => {
  let font_size = 12;
  let delta = 0;
  const decorated_text = document.querySelector('#decorated-text');
  setInterval(() => {
    font_size += delta;
    decorated_text.style.fontSize = font_size + 'pt';
  }, 500);

  return () => {
    delta += 2;  
  }
})();

bling_checkbox.onchange = () => {
  const checked = bling_checkbox.checked;
  const decorated_text = document.querySelector('#decorated-text');

  if (checked) {
    decorated_text.style.fontWeight = 'bold';
    decorated_text.style.textDecoration = 'underline';
    decorated_text.style.color = 'green';
  } else {
    decorated_text.style.fontWeight = 'normal';
    decorated_text.style.textDecoration = 'none';
    decorated_text.style.color = 'black';
  }
};