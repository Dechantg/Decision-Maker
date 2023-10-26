document.addEventListener("DOMContentLoaded", () => {

  const pollForm = document.getElementById("pollForm");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", (event) => {
    // Gather all selected radio buttons
    const selectedRadioButtons = document.querySelectorAll('input[type="radio"]:checked');

    // Check for duplicate selections within rows and columns
    const rowChoices = new Map();
    const colChoices = new Map();

    for (const radioButton of selectedRadioButtons) {
      const row = radioButton.getAttribute("data-row");
      const col = radioButton.getAttribute("data-col");

      if (rowChoices.has(row) || colChoices.has(col)) {
        alert("You may only select one option per row and column.");
        event.preventDefault(); // Prevent form submission
        return;
      }

      rowChoices.set(row, radioButton.value);
      colChoices.set(col, radioButton.value);
    }
    const userEmail = document.cookie.split("; ")
      .find(cookie => cookie.startsWith("userEmail="))
      ?.split("=")[1];

    // Check if the user has already voted using the hasVoted function
    const hasVotedResult = await hasVoted(userEmail);

    if (hasVotedResult) {
      alert("You have already voted and cannot vote again.");
      event.preventDefault();
    }

    });

    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", () => {
      // Reset the form to clear all choices
      pollForm.reset();
    });
});
