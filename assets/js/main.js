/* ==========================================================================
   Wesley Élagage — script commun
   Aucune dépendance externe
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     En-tête compacte au défilement
     ------------------------------------------------------------------ */
  var entete = document.querySelector("[data-entete]");
  if (entete) {
    var compacter = function () {
      entete.classList.toggle("est-compacte", window.scrollY > 20);
    };
    compacter();
    window.addEventListener("scroll", compacter, { passive: true });
  }

  /* ------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------ */
  var burger = document.querySelector("[data-burger]");
  var menuMobile = document.querySelector("[data-menu-mobile]");

  if (burger && menuMobile) {
    burger.addEventListener("click", function () {
      var ouvert = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!ouvert));
      menuMobile.classList.toggle("est-ouvert", !ouvert);
    });

    menuMobile.querySelectorAll("[data-sous-menu-mobile]").forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        var cible = document.getElementById(bouton.getAttribute("aria-controls"));
        if (!cible) return;
        var ouvert = bouton.getAttribute("aria-expanded") === "true";
        bouton.setAttribute("aria-expanded", String(!ouvert));
        cible.classList.toggle("est-ouvert", !ouvert);
      });
    });
  }

  /* ------------------------------------------------------------------
     Sous-menu du bureau, ouverture au clic et au clavier
     ------------------------------------------------------------------ */
  var declencheurs = document.querySelectorAll("[data-sous-menu]");
  declencheurs.forEach(function (bouton) {
    var panneau = document.getElementById(bouton.getAttribute("aria-controls"));
    if (!panneau) return;

    bouton.addEventListener("click", function (evenement) {
      evenement.preventDefault();
      var ouvert = bouton.getAttribute("aria-expanded") === "true";
      bouton.setAttribute("aria-expanded", String(!ouvert));
      panneau.classList.toggle("est-ouvert", !ouvert);
    });
  });

  document.addEventListener("click", function (evenement) {
    declencheurs.forEach(function (bouton) {
      var panneau = document.getElementById(bouton.getAttribute("aria-controls"));
      if (!panneau) return;
      if (!bouton.parentNode.contains(evenement.target)) {
        bouton.setAttribute("aria-expanded", "false");
        panneau.classList.remove("est-ouvert");
      }
    });
  });

  document.addEventListener("keydown", function (evenement) {
    if (evenement.key !== "Escape") return;
    declencheurs.forEach(function (bouton) {
      var panneau = document.getElementById(bouton.getAttribute("aria-controls"));
      if (panneau && panneau.classList.contains("est-ouvert")) {
        bouton.setAttribute("aria-expanded", "false");
        panneau.classList.remove("est-ouvert");
        bouton.focus();
      }
    });
  });

  /* ------------------------------------------------------------------
     Accordéons, une seule ligne ouverte à la fois
     Sert aux services de l'accueil et aux questions fréquentes
     ------------------------------------------------------------------ */
  function initAccordeon(racine) {
    var boutons = racine.querySelectorAll("[data-accordeon-bouton]");

    boutons.forEach(function (bouton) {
      var panneau = document.getElementById(bouton.getAttribute("aria-controls"));
      if (!panneau) return;

      bouton.addEventListener("click", function () {
        var ouvert = bouton.getAttribute("aria-expanded") === "true";

        boutons.forEach(function (autre) {
          var autrePanneau = document.getElementById(autre.getAttribute("aria-controls"));
          if (!autrePanneau) return;
          autre.setAttribute("aria-expanded", "false");
          autrePanneau.classList.remove("est-ouvert");
        });

        if (!ouvert) {
          bouton.setAttribute("aria-expanded", "true");
          panneau.classList.add("est-ouvert");
        }
      });
    });
  }

  document.querySelectorAll("[data-accordeon]").forEach(initAccordeon);

  /* ------------------------------------------------------------------
     Filtres des réalisations
     ------------------------------------------------------------------ */
  var zoneFiltres = document.querySelector("[data-filtres]");
  if (zoneFiltres) {
    var chantiers = document.querySelectorAll("[data-chantier]");
    var boutonsFiltre = zoneFiltres.querySelectorAll("[data-filtre]");

    boutonsFiltre.forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        var choix = bouton.getAttribute("data-filtre");

        boutonsFiltre.forEach(function (autre) {
          autre.setAttribute("aria-pressed", String(autre === bouton));
        });

        chantiers.forEach(function (chantier) {
          var services = (chantier.getAttribute("data-chantier") || "").split(" ");
          var visible = choix === "tout" || services.indexOf(choix) !== -1;
          chantier.classList.toggle("est-masque", !visible);
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Formulaire de devis, validation en direct et envoi sans rechargement
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-formulaire]").forEach(function (formulaire) {
    var confirmation = formulaire.parentNode.querySelector("[data-confirmation]");

    var messages = {
      nom: "Indiquez votre nom et votre prénom.",
      telephone: "Indiquez un numéro de téléphone à 10 chiffres.",
      email: "Indiquez une adresse e-mail valide.",
      commune: "Indiquez la commune du chantier.",
      intervention: "Choisissez la nature de l'intervention.",
      description: "Décrivez votre demande en quelques mots.",
      consentement: "Vous devez accepter le traitement de vos données pour envoyer la demande."
    };

    function zoneErreur(champ) {
      var groupe = champ.closest(".champ") || champ.closest(".case").parentNode;
      return groupe ? groupe.querySelector("[data-erreur]") : null;
    }

    function valider(champ) {
      var nom = champ.getAttribute("name");
      var valeur = (champ.value || "").trim();
      var erreur = "";

      if (champ.type === "checkbox") {
        if (champ.required && !champ.checked) erreur = messages[nom] || "Ce champ est obligatoire.";
      } else if (champ.required && valeur === "") {
        erreur = messages[nom] || "Ce champ est obligatoire.";
      } else if (nom === "telephone" && valeur !== "") {
        var chiffres = valeur.replace(/[^0-9+]/g, "");
        if (chiffres.replace(/\D/g, "").length < 10) erreur = messages.telephone;
      } else if (champ.type === "email" && valeur !== "") {
        if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valeur)) erreur = messages.email;
      } else if (nom === "nom" && valeur !== "" && valeur.length < 3) {
        erreur = messages.nom;
      } else if (nom === "description" && valeur !== "" && valeur.length < 10) {
        erreur = messages.description;
      }

      var affichage = zoneErreur(champ);
      if (affichage) affichage.textContent = erreur;
      champ.setAttribute("aria-invalid", erreur ? "true" : "false");

      return erreur === "";
    }

    var champs = formulaire.querySelectorAll("input, select, textarea");

    champs.forEach(function (champ) {
      if (champ.type === "file" || champ.type === "submit") return;

      var evenement = champ.type === "checkbox" || champ.tagName === "SELECT" ? "change" : "blur";
      champ.addEventListener(evenement, function () { valider(champ); });

      champ.addEventListener("input", function () {
        if (champ.getAttribute("aria-invalid") === "true") valider(champ);
      });
    });

    formulaire.addEventListener("submit", function (evenement) {
      evenement.preventDefault();

      var valide = true;
      var premierFautif = null;

      champs.forEach(function (champ) {
        if (champ.type === "file" || champ.type === "submit") return;
        if (!champ.required && !(champ.value || "").trim()) return;
        if (!valider(champ)) {
          valide = false;
          if (!premierFautif) premierFautif = champ;
        }
      });

      if (!valide) {
        if (confirmation) confirmation.classList.remove("est-visible");
        if (premierFautif) premierFautif.focus();
        return;
      }

      formulaire.reset();
      champs.forEach(function (champ) {
        champ.setAttribute("aria-invalid", "false");
        var affichage = zoneErreur(champ);
        if (affichage) affichage.textContent = "";
      });

      if (confirmation) {
        confirmation.classList.add("est-visible");
        confirmation.setAttribute("tabindex", "-1");
        confirmation.focus();
      }
    });
  });

  /* ------------------------------------------------------------------
     Année en cours dans le pied de page
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-annee]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
})();
