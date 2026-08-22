/* ==========================================================================
   LCC Espaces Verts, script commun
   Aucune dépendance externe
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Mode présentation client

     Masque les marqueurs à confirmer et tout ce qui deviendrait vide
     sans eux. Rien n'est supprimé du code source, seul l'affichage change.

     Passer cette constante à false pour revoir les 459 marqueurs.
     ------------------------------------------------------------------ */
  var MASQUER_A_CONFIRMER = true;

  /* ------------------------------------------------------------------
     Masquage des réalisations

     L'entreprise n'a pas encore fourni ses chantiers. Une galerie de
     cadres vides dessert plus qu'elle ne montre, donc tout ce qui
     présente des chantiers disparaît : la page réalisations et ses liens,
     et les sections chantiers de l'accueil, des pages service et des
     pages commune.

     Passer cette constante à false le jour où les chantiers arrivent.
     Le contenu est intact dans le code source, rien n'a été supprimé.
     ------------------------------------------------------------------ */
  var MASQUER_REALISATIONS = true;

  /* ------------------------------------------------------------------
     Envoi des demandes de devis

     Les formulaires sont relayés par Web3Forms, qui reçoit la demande
     et la transmet par courriel à l'entreprise. La clé d'accès est
     publique par construction : elle circule dans le code de la page,
     comme le prévoit le service. Elle n'ouvre aucun accès en lecture,
     elle ne fait qu'autoriser un dépôt vers une boîte déjà définie.
     ------------------------------------------------------------------ */
  var CLE_WEB3FORMS = "a7de7f20-4106-418c-8cca-7a005c71981c";
  var API_WEB3FORMS = "https://api.web3forms.com/submit";

  /* ------------------------------------------------------------------
     Pièce jointe

     Web3Forms ne transmet les fichiers que sur son offre payante. Sur
     l'offre gratuite, une photo jointe serait perdue en silence, donc
     le champ est masqué et désactivé plutôt qu'affiché pour rien.

     Passer cette constante à true le jour de l'abonnement. Le champ est
     intact dans le code des 24 formulaires, rien n'a été supprimé.
     ------------------------------------------------------------------ */
  var PIECE_JOINTE_ACTIVE = false;

  if (MASQUER_REALISATIONS) {
    // La page réalisations n'a plus de raison d'être sans ses chantiers.
    // Elle annoncerait des filtres et des avant-après absents. Un visiteur
    // qui arrive par un lien direct est renvoyé à l'accueil, sans passer
    // par l'historique pour que le bouton retour reste utilisable.
    if (/\/realisations\/$/.test(window.location.pathname)) {
      window.location.replace("../");
      return;
    }

    // Toute section qui contient une grille de chantiers part en entier,
    // titre et filtres compris.
    document.querySelectorAll(".grille-chantiers").forEach(function (grille) {
      var section = grille.closest("section");
      if (section) section.hidden = true;
    });

    // Puis les liens qui y mènent, sinon le menu pointerait vers une page
    // que plus rien n'alimente. On masque le porteur du lien, pas seulement
    // le lien, pour ne pas laisser de puce ni de séparateur orphelin.
    document.querySelectorAll('a[href$="realisations/"]').forEach(function (lien) {
      var porteur = lien.closest("li, p") || lien;
      porteur.hidden = true;
    });
  }

  if (MASQUER_A_CONFIRMER) {
    // 0. Certains blocs ne tiennent que par leurs marqueurs, comme la section
    //    hébergement des mentions légales. Sans eux il resterait un titre nu
    //    ou une phrase amputée. Ils sont signalés dans le HTML et partent
    //    en entier, avant même le traitement des marqueurs.
    document.querySelectorAll("[data-en-attente]").forEach(function (bloc) {
      bloc.hidden = true;
    });

    // 1. Chaque marqueur disparaît. Une ligne de tableau de valeurs ou une
    //    carte d'avis n'a plus de sens sans sa valeur, elle part en entier.
    document.querySelectorAll(".a-confirmer").forEach(function (marqueur) {
      if (marqueur.closest("[data-en-attente]")) return;

      var porteur = marqueur.closest("li, .avis");
      if (porteur) {
        porteur.hidden = true;
        return;
      }
      var parent = marqueur.parentElement;

      // Dans un bloc d'adresse, le marqueur suit une étiquette du type
      // "Adresse e-mail" sur sa propre ligne. Sans sa valeur, l'étiquette
      // resterait seule, on retire donc la ligne entière.
      var aRetirer = [];
      var precedent = marqueur.previousSibling;
      while (precedent && precedent.nodeName !== "BR") {
        aRetirer.push(precedent);
        precedent = precedent.previousSibling;
      }
      var etiquette = aRetirer
        .map(function (noeud) {
          return noeud.textContent;
        })
        .join("")
        .trim();
      if (precedent && etiquette && etiquette.split(/\s+/).length <= 4) {
        aRetirer.forEach(function (noeud) {
          noeud.parentNode.removeChild(noeud);
        });
        precedent.parentNode.removeChild(precedent);
      }

      marqueur.remove();
      if (!parent.textContent.trim()) {
        parent.hidden = true;
        return;
      }

      // Le marqueur était souvent encadré de virgules, comme dans
      // « LCC Espaces Verts, forme juridique, SIREN ». Sans lui il resterait
      // « LCC Espaces Verts, , SIREN ». On recolle les nœuds de texte
      // séparés par le marqueur, puis on réduit la ponctuation en double.
      parent.normalize();
      Array.prototype.forEach.call(parent.childNodes, function (noeud) {
        if (noeud.nodeType !== 3) return;
        var propre = noeud.nodeValue
          .replace(/,(\s*,)+/g, ",")
          .replace(/\s+([,.;])/g, "$1")
          .replace(/([,;])\s*\./g, ".");
        if (propre !== noeud.nodeValue) noeud.nodeValue = propre;
      });
    });

    // 2. Une liste dont toutes les lignes sont masquées laisserait une marge.
    //    Et si seules les dernières partent, la ligne restante garderait sa
    //    puce de séparation, on la marque pour que la feuille de style la retire.
    document.querySelectorAll("ul, ol, dl").forEach(function (liste) {
      var visibles = Array.prototype.filter.call(liste.children, function (ligne) {
        return !ligne.hidden;
      });
      if (!visibles.length) {
        liste.hidden = true;
        return;
      }
      if (visibles.length !== liste.children.length) {
        visibles[visibles.length - 1].classList.add("est-dernier-visible");
      }
    });

    // 3. Les trois avis sont entièrement en attente. Les garder afficherait
    //    des cartes à cinq étoiles sans texte, ce qui reviendrait à inventer
    //    une note. Toute la section part.
    var grilleAvis = document.querySelector(".grille-avis");
    if (grilleAvis && !grilleAvis.querySelector(".avis:not([hidden])")) {
      var sectionAvis = grilleAvis.closest("section");
      if (sectionAvis) {
        sectionAvis.hidden = true;
      }
    }
  }

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
  if (!PIECE_JOINTE_ACTIVE) {
    document.querySelectorAll('[data-formulaire] input[type="file"]').forEach(function (champ) {
      var groupe = champ.closest(".champ") || champ;
      groupe.hidden = true;
      // Désactivé, donc absent de l'envoi. Un champ seulement masqué
      // resterait dans les données et partirait vide.
      champ.disabled = true;
    });

    // La politique de confidentialité annonce la photo parmi les données
    // recueillies. Tant que le champ n'existe pas, cette annonce est fausse.
    document.querySelectorAll("[data-piece-jointe]").forEach(function (element) {
      element.hidden = true;
    });
  }

  document.querySelectorAll("[data-formulaire]").forEach(function (formulaire) {
    var confirmation = formulaire.parentNode.querySelector("[data-confirmation]");
    var bouton = formulaire.querySelector('button[type="submit"]');
    var libelleBouton = bouton ? bouton.textContent : "";

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

    // Zone d'état de l'envoi, créée à la demande. Elle sert à dire que
    // l'envoi est en cours, puis à annoncer un échec. Le succès garde son
    // bloc de confirmation, déjà présent dans le code de chaque page.
    function zoneEnvoi() {
      var pied = formulaire.querySelector(".formulaire__pied") || formulaire;
      var bloc = pied.querySelector("[data-envoi]");
      if (!bloc) {
        bloc = document.createElement("p");
        bloc.className = "formulaire__envoi";
        bloc.setAttribute("data-envoi", "");
        bloc.setAttribute("role", "status");
        pied.appendChild(bloc);
      }
      return bloc;
    }

    function etatEnvoi(texte, echec) {
      var bloc = zoneEnvoi();
      bloc.textContent = texte || "";
      bloc.classList.toggle("formulaire__envoi--echec", Boolean(echec));
    }

    // Le numéro affiché en haut de page, plutôt qu'une copie dans le script
    // qui finirait par diverger le jour d'un changement de ligne.
    function numeroSecours() {
      var lien = document.querySelector('a[href^="tel:"]');
      return lien ? lien.textContent.trim() : "";
    }

    function objet(donnees) {
      var morceaux = [];
      if (donnees.get("urgence")) morceaux.push("URGENCE");
      morceaux.push("Demande de devis");
      if (donnees.get("intervention")) morceaux.push(String(donnees.get("intervention")));
      if (donnees.get("commune")) morceaux.push(String(donnees.get("commune")));
      return morceaux.join(", ");
    }

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
        etatEnvoi("");
        if (premierFautif) premierFautif.focus();
        return;
      }

      var donnees = new FormData(formulaire);
      donnees.append("access_key", CLE_WEB3FORMS);
      donnees.append("from_name", "Site LCC Espaces Verts");
      donnees.append("subject", objet(donnees));
      // La page d'origine, pour savoir depuis quel service ou quelle
      // commune la demande a été envoyée.
      donnees.append("page", window.location.href);

      // Une pièce jointe impose l'envoi en multipart. Sans fichier, le
      // service attend du JSON, qui est aussi le chemin qu'il documente.
      var fichier = false;
      donnees.forEach(function (valeur) {
        if (valeur instanceof File && valeur.size > 0) fichier = true;
      });

      var requete = fichier
        ? { method: "POST", headers: { Accept: "application/json" }, body: donnees }
        : {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(Object.fromEntries(donnees))
          };

      if (confirmation) confirmation.classList.remove("est-visible");
      etatEnvoi("Envoi en cours.");
      if (bouton) {
        bouton.disabled = true;
        bouton.textContent = "Envoi en cours";
      }

      function rendreLeBouton() {
        if (!bouton) return;
        bouton.disabled = false;
        bouton.textContent = libelleBouton;
      }

      fetch(API_WEB3FORMS, requete)
        .then(function (reponse) {
          if (!reponse.ok) throw new Error("Réponse " + reponse.status);
          return reponse.json();
        })
        .then(function (resultat) {
          if (!resultat || resultat.success !== true) throw new Error("Envoi refusé");

          rendreLeBouton();
          etatEnvoi("");
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
        })
        .catch(function () {
          rendreLeBouton();
          // Le formulaire n'est pas vidé : la personne retrouve sa saisie
          // et peut réessayer sans tout retaper.
          var numero = numeroSecours();
          etatEnvoi(
            "L'envoi a échoué. Réessayez dans un instant" +
              (numero ? ", ou appelez le " + numero : "") + ".",
            true
          );
          zoneEnvoi().setAttribute("tabindex", "-1");
          zoneEnvoi().focus();
        });
    });
  });

  /* ------------------------------------------------------------------
     Année en cours dans le pied de page
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-annee]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
})();
