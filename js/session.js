document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("session"));
  if (!user || user.role !== "organizer") {
    alert("Accès réservé aux organisateurs.");
    window.location.href = "login.html";
  }
});
