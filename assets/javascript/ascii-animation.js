Object.keys(ANIMATIONS).map((animation) => {
  ANIMATIONS[animation] = ANIMATIONS[animation].split('=====\n');
});

font_size = {
  tiny: 7,
  small: 10,
  medium: 12,
  large: 16,
  extra_large: 24,
  xxl: 32,
};

const animation_box = document.querySelector('.animation-text-area');
const start_button = document.querySelector('#start-button');
const stop_button = document.querySelector('#stop-button');
const animation_select = document.querySelector('.animation-select');
const size_select = document.querySelector('.size-select');
const turbo_checkbox = document.querySelector('.turbo-checkbox');

window.onload = () => {
  let current_animation = 'blank';
  let current_size = 'tiny';
  let turbo = false;
  let delay = 250;
  let animation_interval = null;
  cached_animations = {};
  start_button.onclick = () => {
    if (current_animation == 'custom') {
      ANIMATIONS[current_animation] = animation_box.value.split('=====\n');
    }
    let id = 1;
    const len = ANIMATIONS[current_animation].length;
    animation_interval = setInterval(() => {
      animation_box.value = ANIMATIONS[current_animation][++id % len];
    }, delay);

    start_button.disabled = true;
    stop_button.disabled = false;
    animation_select.disabled = true;
    turbo_checkbox.disabled = true;
  };

  stop_button.onclick = () => {
    clearInterval(animation_interval);
    start_button.disabled = false;
    stop_button.disabled = true;
    animation_select.disabled = false;
    turbo_checkbox.disabled = false;

    if (current_animation == 'custom') {
      animation_box.value = ANIMATIONS[current_animation].join('=====\n');
    }
  }

  animation_select.onchange = (e) => {
    current_animation = e.target.value;
    if (current_animation == 'custom') {
      animation_box.readOnly = false;
      animation_box.value = ANIMATIONS['custom'].join('=====\n');
    } else {
      animation_box.readOnly = true;
      animation_box.value = ANIMATIONS[current_animation][0];
    }

  };

  size_select.onchange = (e) => {
    current_size = e.target.value;
    animation_box.style.fontSize = font_size[current_size] + 'pt';
    
  }

  turbo_checkbox.onchange = (e) => {
    turbo = e.target.checked;

    if (turbo) {
      delay = 50;
    } else {
      delay = 250;
    }
  }
}