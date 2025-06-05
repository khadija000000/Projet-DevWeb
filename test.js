document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("session"));
  const eventsContainer = document.getElementById("events-container");
  const actionBar = document.getElementById("action-bar");
  const userDisplay = document.getElementById("userDisplay");
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");
  const categoryFilter = document.getElementById("category-filter");
  const dateFilter = document.getElementById("date-filter");

  if (user) {
    userDisplay.textContent = `Connecté(e) en tant que ${user.username} (${user.role})`;
    loginButton.style.display = "none";
    logoutButton.style.display = "inline-block";

    if (user.role === "organizer") {
      actionBar.innerHTML = `
        <button class="btn" onclick="window.location.href='create_event.html'">➕ Créer un événement</button>
      `;
    }
  } else {
    userDisplay.textContent = "Non connecté(e)";
    loginButton.style.display = "inline-block";
    logoutButton.style.display = "none";
  }

  async function loadEvents() {
    try {
      const res = await fetch("http://localhost:5001/api/events");
      if (!res.ok) throw new Error("Erreur lors du chargement des événements");

      const events = await res.json();
      const user = JSON.parse(localStorage.getItem("session"));

      const filteredEvents = events.filter(event => {
        const categoryMatch = categoryFilter.value === "all" || event.category === categoryFilter.value;
        const dateMatch = !dateFilter.value || event.date === dateFilter.value;
        return categoryMatch && dateMatch;
      });

      eventsContainer.innerHTML = filteredEvents.length
        ? filteredEvents.map(event => {
            const isCreator = user && user.role === "organizer" && event.creator_id === user.id;
            return `
              <div class="event-card">
                <h3>${event.title}</h3>
                <p><strong>Date :</strong> ${event.date}</p>
                <p><strong>Catégorie :</strong> ${event.category}</p>
                <a href="event.html?id=${event.id}" class="btn">Voir les détails</a>
                ${isCreator ? `
                  <button class="btn btn-edit" onclick="editEvent(${event.id})">Modifier</button>
                  <button class="btn btn-delete" onclick="deleteEvent(${event.id})">Supprimer</button>
                ` : ""}
              </div>
            `;
          }).join('')
        : "<p>Aucun événement trouvé.</p>";
    } catch (err) {
      console.error(err);
      eventsContainer.innerHTML = "<p>Erreur lors du chargement des événements.</p>";
    }
  }

  async function deleteEvent(id) {
    const user = JSON.parse(localStorage.getItem("session"));
    if (!confirm("Voulez-vous vraiment supprimer cet événement ?")) return;

    try {
      const res = await fetch(`http://localhost:5001/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const result = await res.json();
      if (res.ok) {
        alert("Événement supprimé");
        await loadEvents();
      } else {
        alert(result.error || "Erreur lors de la suppression");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  }

  function editEvent(id) {
    window.location.href = `create_event.html?id=${id}`;
  }

  loadEvents();
  categoryFilter.addEventListener("change", loadEvents);
  dateFilter.addEventListener("change", loadEvents);

  //  Expose les fonctions globalement car appelées depuis le HTML dynamique
  window.deleteEvent = deleteEvent;
  window.editEvent = editEvent;
});
