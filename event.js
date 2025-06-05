document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("event-detail");
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");

  if (!eventId) {
    container.innerHTML = "<p>ID de l'événement manquant.</p>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:5001/api/events/${eventId}`);
    if (!res.ok) throw new Error("Erreur lors de la récupération de l'événement");

    const event = await res.json();

    container.innerHTML = `
      <div class="event-container">
        <div class="event-details">
          <h2>${event.title}</h2>
          <p><strong>Description :</strong> ${event.description || "N/A"}</p>
          <p><strong>Date :</strong> ${event.date}</p>
          <p><strong>Heure :</strong> ${event.time}</p>
          <p><strong>Lieu :</strong> ${event.location}</p>
          <p><strong>Catégorie :</strong> ${event.category}</p>
          <p><strong>Public :</strong> ${event.audience}</p>
          <p><strong>Organisateur :</strong> ${event.organizer}</p>
          <p><strong>Invités :</strong> ${event.guests || "Aucun"}</p>
          
          <a href="test.html" class="btn">← Retour</a>
       
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Erreur lors du chargement de l'événement.</p>";
  }
});

function showForm() {
  alert("Fonction d'inscription à implémenter !");
}
