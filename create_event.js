document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("eventForm");
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");

  // Remplissage si modification
  if (eventId) {
    try {
      const res = await fetch(`http://localhost:5001/api/events/${eventId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const event = await res.json();

      if (res.ok) {
        document.getElementById("title").value = event.title || "";
        document.getElementById("description").value = event.description || "";
        document.getElementById("date").value = event.date || "";
        document.getElementById("time").value = event.time || "";
        document.getElementById("location").value = event.location || "";
        document.getElementById("category").value = event.category || "";
        document.getElementById("organizer").value = event.organizer || "";
        document.getElementById("guests").value = (event.guests || []).join(", ");
       
        if (event.audience) {
          const audienceRadio = document.querySelector(`input[name="audience"][value="${event.audience}"]`);
          if (audienceRadio) audienceRadio.checked = true;
        }
      } else {
        alert("Erreur lors du chargement de l'événement.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau lors du chargement.");
    }
  }

  form.onsubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Vous devez être connecté !");
      return;
    }

    const eventData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      location: document.getElementById("location").value,
      category: document.getElementById("category").value,
      organizer: document.getElementById("organizer").value,
      audience: document.querySelector('input[name="audience"]:checked')?.value || "",
      guests: document.getElementById("guests").value.split(",").map(s => s.trim()),
      
    };

    const method = eventId ? "PUT" : "POST";
    const endpoint = eventId
      ? `http://localhost:5001/api/events/${eventId}`
      : `http://localhost:5001/api/events`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (res.ok) {
        alert(eventId ? "✅ Événement modifié avec succès !" : "✅ Événement créé avec succès !");
        window.location.href = "test.html";
      } else {
        const errorData = await res.json();
        alert("❌ Erreur : " + (errorData.error || "Impossible d'enregistrer l'événement"));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Erreur réseau !");
    }
  };
});
