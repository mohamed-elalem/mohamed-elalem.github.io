function calcTip() {
  const $subtotal = document.getElementById("subtotal");
  const $tip = document.getElementById("tip");
  const $total = document.getElementById("total");
  
  const subtotal_text = $subtotal.value;
  const tip_text = $tip.value;

  if (!isNaN(subtotal_text) && !isNaN(tip_text)) {
    const subtotal = parseFloat(subtotal_text);
    const tip = parseFloat(tip_text);
    const total = subtotal * tip / 100.0
    $total.innerHTML = '$' + (Math.round(total * 100) / 100);
  } else {
    alert("Invalid input!!");
  }
}