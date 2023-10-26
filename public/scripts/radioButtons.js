
document.addEventListener("DOMContentLoaded", () => {

  const radioButtons = document.querySelectorAll('input[type="radio"]');

  radioButtons.forEach (radioButton => {
    radioButton.addEventListener('click', function() {
      if (this.checked) {
        this.checked = false;
      }
    });
  });

  document.getElementById('clearButton').addEventListener('click', function() {
    radioButtons.forEach(radioButton => {
      radioButton.checked = false;
    });
  });
});
