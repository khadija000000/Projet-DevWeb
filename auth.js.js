document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // INSCRIPTION
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value,
      };

      try {
        const res = await fetch("http://localhost:5001/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (res.ok) {
          // Connexion automatique après inscription
          const loginRes = await fetch("http://localhost:5001/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, password: user.password }),
          });

          const data = await loginRes.json();
          if (loginRes.ok) {
            localStorage.setItem("session", JSON.stringify(data));
            if (data.token) {
              localStorage.setItem("token", data.token);
            } else {
              console.error("Token manquant dans la réponse de connexion");
            }
            window.location.href = "test.html";
          } else {
            alert("Erreur lors de la connexion automatique : " + (data.error || "Erreur inconnue"));
          }
        } else {
          const errorData = await res.json();
          alert("Erreur d'inscription : " + (errorData.error || "Erreur inconnue"));
        }
      } catch (err) {
        console.error("Erreur réseau lors de l'inscription :", err);
        alert("Erreur réseau lors de l'inscription ! Vérifiez votre connexion ou si le serveur est démarré.");
      }
    });
  }

  // CONNEXION
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const res = await fetch("http://localhost:5001/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("session", JSON.stringify(data));
          if (data.token) {
            localStorage.setItem("token", data.token);
          } else {
            console.error("Token manquant dans la réponse de connexion");
          }
          console.log("Connexion réussie, redirection vers test.html...");
          window.location.href = "test.html";
        } else {
          alert("❌ Erreur : " + (data.error || "Email ou mot de passe incorrect"));
        }
      } catch (err) {
        console.error("Erreur réseau lors de la connexion :", err);
        alert("Erreur réseau lors de la connexion ! Vérifiez votre connexion ou si le serveur est démarré.");
      }
    });
  }
});

// Déconnexion
function logout() {
  // Supprimer les infos stockées
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Rediriger vers la page de connexion
  window.location.href = "login.html";
}
