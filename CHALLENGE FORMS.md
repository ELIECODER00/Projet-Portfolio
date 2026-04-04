# 🧩 PROJET : Formulaire d’inscription – Challenge Consulting

## Contexte
Créer une page web contenant un formulaire d’inscription pour une formation.  
Le formulaire doit respecter la liste des champs ci-dessous, avec leurs types, identifiants, placeholders, et un comportement dynamique (domaine → formation).

---

## 1. Structure générale
- Page HTML/CSS/JS responsive, design professionnel.
- Un seul formulaire avec méthode POST (action à définir ultérieurement).
- Bouton de soumission : **« S’inscrire »**.
- Case à cocher obligatoire pour accepter les conditions.

---

## 2. Détail des champs

| Champ | Type d’input | ID | Placeholder / Options | Requis |
|-------|--------------|----|------------------------|--------|
| Nom | `text` | `nom` | « Votre nom » | ✅ |
| Prénom | `text` | `prenom` | « Votre prénom » | ✅ |
| Sexe | `select` | `sexe` | Options : Homme, Femme, Autre | ✅ |
| Date de naissance | `date` | `date_naissance` | (pas de placeholder) | ✅ |
| Téléphone | `tel` | `telephone` | « +33 6 12 34 56 78 » | ✅ |
| WhatsApp | `tel` | `whatsapp` | « Numéro WhatsApp » | ❌ |
| Email | `email` | `email` | « nom@exemple.com » | ✅ |
| Adresse | `text` | `adresse` | « Numéro et rue » | ✅ |
| Ville | `text` | `ville` | « Ville » | ✅ |
| Domaine | `select` | `domaine` | Options : Informatique, Audiovisuel, Graphisme, Sérigraphie | ✅ |
| Formation | `select` | `formation` | Liste dynamique (voir §3) | ✅ |
| Niveau | `radio` (groupe) | `niveau` | Valeurs : Débutant, Intermédiaire, Avancé | ✅ |
| Mode de formation | `radio` (groupe) | `mode_formation` | Valeurs : Présentiel, Distanciel, Hybride | ✅ |
| Horaire | `text` | `horaire` | « Ex : soir, week-end, horaire flexible » | ❌ |
| Objectif | `textarea` | `objectif` | « Pourquoi voulez-vous suivre cette formation ? » | ✅ |
| Comment connu | `select` | `comment_connu` | Options : Facebook, WhatsApp, Ami, Publicité, Autre | ✅ |
| Conditions | `checkbox` | `conditions` | Label : « J’accepte les conditions générales » | ✅ (obligatoire) |

---

## 3. Comportement dynamique (domaine → formation)

Le champ `#formation` se remplit automatiquement en fonction du choix dans `#domaine`.

### Mapping des formations

| Domaine | Options du select `formation` |
|---------|-------------------------------|
| Informatique | Développement Web, Bureautique avancée, Cybersécurité, Data Analyst |
| Audiovisuel | Montage vidéo, Prise de vue, Post-production, Sound Design |
| Graphisme | Photoshop/Illustrator, UI/UX Design, Motion Design, Identité visuelle |
| Sérigraphie | Techniques sérigraphie, Création de motifs, Impression textile, Sérigraphie artisanale |

**Règles :**
- Au chargement, `formation` affiche « Sélectionnez d’abord un domaine » (désactivé).
- À chaque changement de `domaine`, les options se mettent à jour instantanément (JavaScript).
- Si l’utilisateur revient à un domaine déjà choisi, les formations correspondantes réapparaissent.

---

## 4. Validations front-end (JavaScript)

- Vérifier que tous les champs requis sont remplis.
- Email : format valide (ex: `nom@domaine.com`).
- Téléphone : autoriser chiffres, espaces, `+` (minimum 10 chiffres).
- Date de naissance : ne peut pas être postérieure à la date du jour.
- Objectif : au moins 20 caractères.
- Conditions : la case doit être cochée, sinon bloquer l’envoi et afficher un message d’erreur.

Les erreurs doivent s’afficher clairement (sous chaque champ ou en haut du formulaire).

---

## 5. Livrables attendus

- Un fichier `index.html` 
- Un fichier `challengeforms.css` # 
- Code propre, commenté, responsive (mobile + tablette + desktop).
- Pas de dépendances externes lourdes (sauf éventuellement Google Fonts ou Font Awesome).
- Fonctionnement sans rechargement de page pour le champ dynamique.


## 6. Notes de style (indicatives)

- Couleurs : bleu foncé (`#000033`), Jaune  (`#FFCC00`), Blanc (`#FFFFFF`).
- Coins arrondis, ombres douces, police `'Inter', sans-serif`.
- Largeur max du formulaire : 1280px, centré.


## 7. Remarques complémentaires

-inputtel 
- Le champ WhatsApp est optionnel mais doit être présent.
- Le bouton « S’inscrire » doit rester désactivé tant que la case conditions n’est pas cochée (bonne pratique).
- Prévoyez une structure prête à être connectée à un backend (attributs `name` cohérents avec les ID).

---

