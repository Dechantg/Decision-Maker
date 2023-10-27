document.addEventListener("DOMContentLoaded", () => {
  const resultsBlock = document.getElementById("resultsBlock");
  const adminBlock = document.getElementById("adminBlock");
  const createPollBlock = document.getElementById("createPollBock");

  resultsBlock.addEventListener ('click', () => {
    const emailUuid = document.getElementById("resultsInput").ariaValueMax;
    if (isValid(emailUuid)) {
      window.location.href = "/results-page";
    } else {
      alert("Invalid Email/UUID.");
    }
  });

  adminBlock.addEventListener('click', () => {
    const emailUuid = document.getElementById("adminInput").value;
    if (isValidAdmin(emailUuid)) {
      window.location.href = "/admin-page";
    } else {
      alert("Invalid Email/UUID.")
    }
  });

  createPollBlock.addEventListener('click', () => {
    window.location.href = "/create-poll";
  });

});
