# LCC Espaces Verts, éléments à fournir avant présentation client

Le site contient **459 marqueurs `[[À CONFIRMER]]`** répartis sur **116 libellés distincts** et **28 pages**.
Aucun chiffre, avis, certification, durée ou prix n'a été inventé.

## Mode présentation, actif aujourd'hui

Le site tourne en mode présentation. Les 459 marqueurs restent dans le code source mais ne s'affichent plus, pour que le client voie une maquette propre.

- Deux interrupteurs, en haut de `assets/js/main.js`. Les deux sont indépendants et rien n'a été supprimé du code source.
- `MASQUER_A_CONFIRMER`, à passer à `false` pour réafficher les 459 marqueurs entourés d'une pastille couleur écorce.
- `MASQUER_REALISATIONS`, à passer à `false` le jour où les chantiers réels arrivent. Tant qu'il vaut `true`, la page réalisations renvoie vers l'accueil, les liens qui y mènent disparaissent, et les sections chantiers de l'accueil, des 9 pages service et des 12 pages ville sont masquées. Une galerie de cadres vides dessert plus qu'elle ne montre. L'entrée correspondante de `sitemap.xml` est en commentaire, à rétablir en même temps.
- Ce qui deviendrait vide ou bancal sans sa valeur disparaît aussi : les lignes de tableau, les trois cartes d'avis et leur section entière, les sections hébergement et directeur de la publication des mentions légales.
- Les blocs concernés portent l'attribut `data-en-attente` dans le HTML. Ils partent en entier, une phrase amputée serait pire qu'une section absente.
- Les 28 pages sont en `noindex, nofollow` et `robots.txt` est en `Disallow: /`. **Les deux sont à rouvrir le jour de la vraie mise en ligne**, la marche à suivre figure en commentaire dans les deux fichiers.

Colonne **Bloquant** :
- **Oui** = ne peut pas être montré en l'état à un prospect ni mis en ligne.
- **Non** = le site reste présentable, l'information enrichit la page.

## Données reçues et déjà intégrées

| Donnée | Valeur en place | Portée |
| --- | --- | --- |
| Nom commercial | LCC Espaces Verts | 218 occurrences, 28 pages |
| Téléphone | 06 41 59 80 54, lien `tel:+33641598054` | 236 occurrences |
| SIREN | 490 985 520 | Pied de page de chaque page, mentions légales |
| SIRET du siège | 490 985 520 00033 | Mentions légales |
| Début d'activité | 2006 | Accueil, entreprise |
| Volume annuel | Plus de 220 chantiers par an | Accueil, entreprise |
| Activité de l'année | Plus de 160 interventions depuis janvier | Accueil, entreprise |
| Prestation ajoutée | Débroussaillage et manutention | Page service, 9 menus, formulaire |
| Logo | Emblème détouré du fichier fourni | En-tête et pied de page des 28 pages, favicon |
| Exploitant | Cédric Larme | Mentions légales, confidentialité, données structurées |
| Forme juridique | Entrepreneur individuel | Pied de page des 28 pages, mentions légales |
| Immatriculation au RNE | 31 juillet 2026 | Mentions légales |

Le nom de domaine `lcc-espacevert.fr` a été déduit du nouveau nom et appliqué aux balises canoniques, aux données structurées, au sitemap et à robots.txt. **Il n'a pas été fourni et doit être vérifié comme réservé avant la mise en ligne.**

---

## 1. Identité légale de l'entreprise

| Élément | Où | Occurrences | Bloquant |
| --- | --- | --- | --- |
| Numéro de TVA intracommunautaire | Mentions légales | 1 | Non |
| Médiateur de la consommation retenu | Mentions légales | 1 | Oui |

Réglés par l'attestation INPI du 31 juillet 2026 : forme juridique, directeur de la publication, ville d'immatriculation. L'entreprise étant une entreprise individuelle, la ligne capital social et la mention RCS ont été retirées, elles ne s'appliquent pas.

**Trois contradictions restent à lever avec l'artisan, voir la fin de ce document.**

## 2. Coordonnées

| Élément | Où | Occurrences | Bloquant |
| --- | --- | --- | --- |
| Adresse e-mail de contact | Pied de page et bloc coordonnées de chaque page | 53 | Oui |
| Adresse e-mail dédiée aux demandes RGPD | Politique de confidentialité | 1 | Oui |
| Accueil possible au siège et créneaux | Contact | 1 | Non |
| Disponibilité en dehors des horaires, nuit et dimanche | Contact, urgence tempête | 2 | Oui |
| Délai moyen de rappel après une demande | Contact | 1 | Non |
| Durée de validité d'un devis | Contact, pages service | 2 | Non |
| Rayon d'intervention au-delà de la métropole | Accueil, zones d'intervention | 3 | Non |
| Communes de périphérie à traiter en priorité | Accueil, zones d'intervention | 2 | Non |

Les autres coordonnées sont déjà en place et identiques partout : LCC Espaces Verts, 1 avenue de Bellevue, 33700 Mérignac, 06 41 59 80 54, du lundi au samedi de 7h30 à 19h.

## 3. Assurance et qualifications

| Élément | Où | Occurrences | Bloquant |
| --- | --- | --- | --- |
| Assureur et numéro de contrat en responsabilité civile professionnelle | Pied de page de chaque page, entreprise, pages service | 41 | Oui |
| Étendue et couverture géographique de la garantie | Mentions légales, entreprise | 2 | Oui |
| Certification d'élagueur grimpeur de l'équipe | Accueil, entreprise, pages service | 6 | Oui |
| Certificat de spécialisation taille et soins aux arbres | Entreprise | 1 | Oui |
| Habilitations travail en hauteur | Entreprise | 1 | Oui |
| Autorisation de conduite de nacelle | Démontage, entreprise | 2 | Non |
| Autorisations de conduite des engins de broyage et de rognage | Débroussaillage, dessouchage | 2 | Non |
| Habilitation électrique et intervention près des réseaux | Urgence tempête | 1 | Oui |
| Qualification en diagnostic de l'arbre, visuel ou instrumenté | Soins et diagnostic | 1 | Oui |
| Parcours du gérant et formation suivie | Accueil, entreprise | 2 | Non |
| Nombre de personnes dans l'équipe | Entreprise | 1 | Non |

## 4. Photographies

Des photographies de banque d'images libres de droits ont été posées à votre demande, pour que la maquette se présente avec de vraies images. Chacune porte la mention visible « Photo d'illustration ». **Aucune ne montre un chantier de LCC Espaces Verts.** Elles sont destinées à être remplacées par vos propres photos.

Toutes les pages affichent désormais au moins une photo. Les seuls emplacements encore vides concernent les chantiers réels, qu'une photo d'illustration ne peut pas représenter sans tromper le visiteur. Ces emplacements sont aujourd'hui masqués avec les sections chantiers, voir la section 5.

| Élément | Où | État | Bloquant |
| --- | --- | --- | --- |
| Bandeau panoramique de la page d'accueil | Accueil | Illustration en place | Oui |
| Visuels des lignes de service dépliables | Accueil | Illustration en place | Oui |
| Portrait vertical de la section entreprise | Accueil | Illustration en place | Oui |
| Bandeau panoramique de chaque page service | 9 pages service | Illustration en place | Oui |
| Portrait du geste métier de chaque page service | 9 pages service | Illustration en place | Oui |
| Bandeau panoramique de chaque page ville | 12 pages ville | Illustration en place | Oui |
| Bandeau panoramique de la page zones | Zones d'intervention | Illustration en place | Oui |
| Portrait du gérant en hauteur, harnais visible | Entreprise | Illustration en place | Oui |
| Photo d'équipe devant le camion | Entreprise | Illustration en place | Non |
| Paires avant et après pour chaque chantier | Réalisations, accueil, pages ville | À fournir, masqué | Oui |
| Photos de matériel, broyeur, rogneuse, nacelle | Entreprise, pages service | À fournir | Non |

Format attendu : WebP, 1600 pixels de large pour les panoramiques, 800 pixels pour les carrés, 800 pixels de large sur 1000 de haut pour les portraits, moins de 300 Ko par fichier. Prévoir un texte alternatif décrivant l'essence, le geste et la commune.

Réserves sur les illustrations en place, à corriger dès que vos photos arrivent.

| Page | Écart entre la photo et le texte |
| --- | --- |
| Abattage | Opérateur au sol sans corde de traction, alors que le texte décrit ce matériel |
| Taille de haies | Lamier seul, sans opérateur |
| Dessouchage | Rogneuse seule, sans opérateur |
| Évacuation | Copeaux éjectés visibles, mais pas les branches engagées dans la goulotte |
| Zones d'intervention | Grumier chargé de rondins, pas une benne de déchets verts. Cette photo suggère un matériel plus lourd que le vôtre, c'est la première à remplacer |
| Entreprise, bandeau équipe | Ramassage de feuilles en automne, pas un chantier d'élagage |
| Bruges, Eysines | Arbres en repos végétatif, sans feuilles |
| Pessac, Saint-Médard | Pins sylvestres et non maritimes, silhouette proche mais essence différente |

Les textes alternatifs des 12 bandeaux ville décrivent la scène réellement photographiée, sans nommer d'essence non vérifiée ni de lieu. Ils sont à réécrire avec la commune et l'essence exactes le jour où vos photos les remplacent.

Une seule marque subsiste, l'emblème Husqvarna sur le casque de la page débroussaillage. Il mesure une douzaine de pixels à l'affichage et désigne un fabricant d'outillage, pas un concurrent. Tous les autres logos et plaques d'immatriculation ont été écartés au recadrage ou par rejet de l'image.

Une fois vos photos livrées, retirez la mention « Photo d'illustration » du balisage et remplacez les textes alternatifs, qui décrivent aujourd'hui la scène générique et non votre chantier.

## 5. Chantiers et réalisations

| Élément | Où | Occurrences | Bloquant |
| --- | --- | --- | --- |
| Commune de chaque chantier présenté | Accueil, réalisations | 33 | Oui |
| Essence, hauteur, diamètre, linéaire, durée | Toutes les fiches chantier | 174 | Oui |
| Détail réel des deux chantiers de chaque page ville | 12 pages ville | 12 | Oui |
| Accord écrit des propriétaires pour la publication | Réalisations | 1 | Oui |
| Modèle d'autorisation de publication | Réalisations | 1 | Non |
| Délai réel d'intervention en urgence | Accueil, urgence, réalisations | 5 | Oui |

Les intitulés de chantier actuellement en place sont des libellés génériques et crédibles. Ils devront être remplacés par les vrais chantiers.

En attendant, tout ce qui présente des chantiers est masqué par `MASQUER_REALISATIONS`, y compris la page réalisations. Le contenu est intact dans le code source.

## 6. Avis clients

| Élément | Où | Occurrences | Bloquant |
| --- | --- | --- | --- |
| Texte des avis, à reprendre mot pour mot depuis la fiche Google Business | Accueil | 3 | Oui |
| Prénom de l'auteur de l'avis | Accueil | 3 | Oui |
| Commune et nature de l'intervention citée | Accueil | 3 | Oui |
| Note globale et nombre d'avis | Accueil | 1 | Oui |

**Aucun avis n'a été rédigé.** Les trois emplacements sont vides et signalés. Inventer un avis client expose à une sanction pour pratique commerciale trompeuse.

## 7. Matériel

| Élément | Où | Bloquant |
| --- | --- | --- |
| Tronçonneuses, longueurs de guide, treuil, coins, cordes de traction | Abattage | Non |
| Cordes de rétention et charge admissible, poulies, descendeur | Démontage | Non |
| Modèle de rogneuse, largeur de passage, mini-pelle | Dessouchage | Non |
| Profondeur atteinte par la rogneuse sous le niveau du sol | Dessouchage | Non |
| Taille-haies, perche télescopique, échafaudage roulant | Taille de haies | Non |
| Débroussailleuses portées, type de broyeur, engin porteur | Débroussaillage | Non |
| Diamètre maximal de branche admis par le broyeur, benne, fendeuse | Évacuation | Non |
| Nacelle en propre ou louée, hauteur de travail | Entreprise, démontage, soins, urgence | Non |
| Filière de dépôt des déchets verts et volume transportable | Évacuation | Non |

## 8. Prix

| Élément | Où | Occurrences | Bloquant |
| --- | --- | --- | --- |
| Fourchettes indicatives par prestation | 9 pages service | 9 | Non |
| Majoration éventuelle en urgence | Urgence tempête | 1 | Non |
| Tarif d'une visite de diagnostic | Soins et diagnostic | 1 | Non |

Chaque page service explique déjà **ce qui fait varier le prix**, sans avancer de montant. Publier des fourchettes reste un choix commercial.

## 9. Règles locales, à vérifier avant publication

Ces mentions décrivent des contraintes réelles mais leur périmètre exact doit être confirmé auprès des services concernés. Une erreur ici engagerait la responsabilité de l'entreprise.

| Élément | Commune | Bloquant |
| --- | --- | --- |
| Périmètre des servitudes aéronautiques de dégagement | Mérignac, Le Haillan | Oui |
| Périmètre du site patrimonial remarquable et autorisation de voirie | Bordeaux | Oui |
| Secteur protégé autour de la Cité Frugès | Pessac | Oui |
| Périmètre et contenu de l'obligation de débroussaillement | Saint-Médard-en-Jalles | Oui |
| Périmètre de la réserve naturelle des marais et règles riveraines | Bruges | Oui |
| Arbres et alignements protégés au PLUi | Blanquefort, Le Bouscat, Talence | Oui |
| Règles d'entretien des berges des jalles | Eysines | Oui |
| Régime applicable à l'Eau Bourde et interlocuteur compétent | Gradignan | Oui |
| Emprise des secteurs alluviaux | Villenave-d'Ornon | Non |
| Règles de mitoyenneté rappelées par la mairie | Le Haillan | Non |
| Coordonnées du service urbanisme | Les 12 communes | Non |
| Lien vers le guichet urbanisme de Bordeaux Métropole | Zones d'intervention | Non |
| Usages locaux applicables en matière de plantations | Taille de haies | Non |
| Règles de brûlage des végétaux | Saint-Médard-en-Jalles, débroussaillage | Non |
| Prise en charge ou non des démarches en mairie par l'entreprise | Abattage | Non |

## 10. Hébergement et données personnelles

| Élément | Où | Bloquant |
| --- | --- | --- |
| Raison sociale, adresse et téléphone de l'hébergeur | Mentions légales | Oui |
| Service de messagerie et outil de gestion des devis, avec localisation | Politique de confidentialité | Oui |
| Durée de conservation des demandes sans suite | Politique de confidentialité | Oui |
| Mesures de sécurité en place chez l'hébergeur | Politique de confidentialité | Non |
| Ajout éventuel d'un outil de statistiques | Politique de confidentialité | Non |
| Date de mise en ligne | Mentions légales, politique de confidentialité | Non |

Le site ne dépose aujourd'hui **aucun cookie**. Aucun bandeau de consentement n'est donc nécessaire. Ajouter un outil de mesure d'audience changerait cette situation.

---

## Contradictions entre l'attestation INPI et le site

L'attestation du 31 juillet 2026 apporte trois informations qui ne concordent pas avec le contenu en place. **Aucune n'a été tranchée**, le site est resté en l'état sur ces points.

| Sur l'attestation | Sur le site | Conséquence |
| --- | --- | --- |
| Code APE 8121Z, nettoyage courant des bâtiments | 28 pages d'élagage et de soins aux arbres | L'activité déclarée ne correspond pas au métier présenté |
| Début d'activité 01/08/2026 | Élagueur depuis 2006, plus de 220 chantiers par an, plus de 160 interventions depuis janvier | Antériorité et volumes invérifiables en l'état |
| Nom commercial LCC | LCC Espaces Verts | Le nom déposé est plus court que celui affiché |

Le SIREN 490 985 520 a été attribué vers 2006, et l'attestation porte la mention « Données issues de la reprise des données ». L'ancienneté de 2006 est donc plausible, la date du 31/07/2026 pouvant n'être que celle de la reprise au registre national. Cela demande confirmation avant publication.

## Points bloquants, résumé

Sept ensembles empêchent une mise en ligne en l'état.

1. Nom de domaine réellement réservé, en remplacement de `lcc-espacevert.fr` qui a été déduit.
2. Les trois contradictions ci-dessus, en particulier le code APE.
3. Adresse e-mail de contact.
4. Assureur et numéro de contrat en responsabilité civile professionnelle.
5. Certifications et habilitations réelles de l'équipe.
6. Photographies de vos chantiers, avant et après, avec accord des propriétaires, en remplacement des photos d'illustration.
7. Avis clients réels, repris mot pour mot depuis la fiche Google Business, et coordonnées de l'hébergeur.

## Ce qui est déjà figé et cohérent sur les 28 pages

- Nom, adresse, téléphone et horaires strictement identiques partout.
- Un seul H1 par page, titre et description uniques sur chacune des 28 pages.
- Aucun lien interne cassé, aucune page orpheline, minimum trois liens entrants par page.
- Chaque page service renvoie vers six communes et deux services voisins.
- Chaque page ville renvoie vers les neuf services et deux communes limitrophes.
- Aucun tiret cadratin ni demi-cadratin dans le texte visible.
- Aucun deux-points dans un titre, aucun titre en capitales.
- Vert profond limité à trois blocs sur la page d'accueil.
- Formulaire refusant l'envoi sans la case de consentement cochée.
- Aucun débordement horizontal à 375 pixels de large, sur les 28 pages.
- Toutes les images se chargent, aux formats WebP, avec dimensions déclarées et chargement différé.
- En mode présentation, aucun marqueur visible, aucune virgule ni puce orpheline, aucune phrase amputée, sur les 28 pages.
