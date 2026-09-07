/* ========================================
   CHALLENGE CONSULTING - LOGIQUE FORMULAIRE
   ======================================== */

// NOTE: This file was updated to integrate EmailJS for sending the form by email.
// Replace the placeholders YOUR_EMAILJS_USER_ID, YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
// with values from your EmailJS account: https://www.emailjs.com/

// ========== MAPPING DES FORMATIONS ==========
const formationsMap = {
    informatique: [
        { value: 'dev-web', label: 'Développement Web' },
        { value: 'bureautique', label: 'Bureautique avancée' },
        { value: 'cybersecurite', label: 'Cybersécurité' },
        { value: 'data-analyst', label: 'Data Analyst' }
    ],
    audiovisuel: [
        { value: 'montage-video', label: 'Montage vidéo' },
        { value: 'prise-vue', label: 'Prise de vue' },
        { value: 'post-production', label: 'Post-production' },
        { value: 'sound-design', label: 'Sound Design' }
    ],
    graphisme: [
        { value: 'photoshop-illustrator', label: 'Photoshop/Illustrator' },
        { value: 'ui-ux', label: 'UI/UX Design' },
        { value: 'motion-design', label: 'Motion Design' },
        { value: 'identite-visuelle', label: 'Identité visuelle' }
    ],
    serigraphie: [
        { value: 'techniques-serigraphie', label: 'Techniques sérigraphie' },
        { value: 'creation-motifs', label: 'Création de motifs' },
        { value: 'impression-textile', label: 'Impression textile' },
        { value: 'serigraphie-artisanale', label: 'Sérigraphie artisanale' }
    ]
};

// ========== ÉLÉMENTS DU FORMULAIRE ==========
const form = document.getElementById('inscriptionForm');
const domaineSelect = document.getElementById('domaine');
const formationSelect = document.getElementById('formation');
const objectiveTextarea = document.getElementById('objectif');
const charCount = document.getElementById('charCount');
const conditionsCheckbox = document.getElementById('conditions');
const submitBtn = document.getElementById('submitBtn');
const erreurGlobale = document.getElementById('erreurGlobale');

// ========== ÉVÉNEMENTS ==========

// Changer domaine → mettre à jour formations
domaineSelect.addEventListener('change', updateFormations);

// Compter caractères du textarea
objectiveTextarea.addEventListener('input', updateCharacterCount);

// Valider conditions pour activer bouton
conditionsCheckbox.addEventListener('change', updateSubmitButtonState);
form.addEventListener('input', updateSubmitButtonState);
form.addEventListener('change', updateSubmitButtonState);

// Soumettre formulaire
form.addEventListener('submit', handleFormSubmit);

// ========== FONCTIONS ==========

/**
 * Mettre à jour les formations en fonction du domaine sélectionné
 */
function updateFormations() {
    const selectedDomain = domaineSelect.value;
    
    // Réinitialiser le select formation
    formationSelect.innerHTML = '';
    
    if (!selectedDomain) {
        // Si aucun domaine : désactiver et afficher message
        formationSelect.disabled = true;
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Sélectionnez d\'abord un domaine';
        formationSelect.appendChild(option);
        clearErrorFor('formation');
    } else {
        // Si domaine : activer et remplir les formations
        formationSelect.disabled = false;
        
        // Option vide par défaut
        const optionVide = document.createElement('option');
        optionVide.value = '';
        optionVide.textContent = '-- Sélectionnez une formation --';
        formationSelect.appendChild(optionVide);
        
        // Ajouter les formations du domaine
        const formations = formationsMap[selectedDomain] || [];
        formations.forEach(formation => {
            const option = document.createElement('option');
            option.value = formation.value;
            option.textContent = formation.label;
            formationSelect.appendChild(option);
        });
        
        clearErrorFor('formation');
    }
}

/**
 * Mettre à jour le compteur de caractères
 */
function updateCharacterCount() {
    const count = objectiveTextarea.value.length;
    charCount.textContent = count;
    
    // Ajouter/retirer classe si moins de 20 caractères
    if (count < 20 && count > 0) {
        objectiveTextarea.classList.add('erreur');
    } else {
        objectiveTextarea.classList.remove('erreur');
    }
}

/**
 * Mettre à jour l'état du bouton soumettre
 */
function updateSubmitButtonState() {
    const isConditionsChecked = conditionsCheckbox.checked;
    
    // Désactiver bouton si conditions non cochées
    submitBtn.disabled = !isConditionsChecked;
}

/**
 * Valider le formulaire
 */
function validateForm() {
    let isValid = true;
    const errors = {};
    
    // Réinitialiser les messages d'erreur
    document.querySelectorAll('.erreur-field').forEach(el => el.textContent = '');
    erreurGlobale.style.display = 'none';
    document.querySelectorAll('.erreur').forEach(el => el.classList.remove('erreur'));
    
    // CHAMPS REQUIS SIMPLES
    const fieldsSimples = [
        { id: 'nom', message: 'Le nom est requis' },
        { id: 'prenom', message: 'Le prénom est requis' },
        { id: 'sexe', message: 'Le sexe est requis' },
        { id: 'date_naissance', message: 'La date de naissance est requise' },
        { id: 'telephone', message: 'Le téléphone est requis' },
        { id: 'email', message: 'L\'email est requis' },
        { id: 'adresse', message: 'L\'adresse est requise' },
        { id: 'ville', message: 'La ville est requise' },
        { id: 'domaine', message: 'Le domaine est requis' },
        { id: 'formation', message: 'La formation est requise' },
        { id: 'comment_connu', message: 'Veuillez indiquer comment vous nous avez connu' }
    ];
    
    fieldsSimples.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element.value.trim()) {
            isValid = false;
            errors[field.id] = field.message;
            markFieldError(field.id, field.message);
        }
    });
    
    // VALIDATION EMAIL
    const emailField = document.getElementById('email');
    if (emailField.value && !isValidEmail(emailField.value)) {
        isValid = false;
        errors['email'] = 'Veuillez entrer une adresse email valide';
        markFieldError('email', 'Veuillez entrer une adresse email valide');
    }
    
    // VALIDATION TÉLÉPHONE
    const telephoneField = document.getElementById('telephone');
    if (telephoneField.value && !isValidPhone(telephoneField.value)) {
        isValid = false;
        errors['telephone'] = 'Le téléphone doit contenir au moins 10 chiffres';
        markFieldError('telephone', 'Le téléphone doit contenir au moins 10 chiffres');
    }
    
    // VALIDATION WHATSAPP (optionnel mais si rempli, doit être valide)
    const whatsappField = document.getElementById('whatsapp');
    if (whatsappField.value && !isValidPhone(whatsappField.value)) {
        isValid = false;
        errors['whatsapp'] = 'Le numéro WhatsApp doit contenir au moins 10 chiffres';
        markFieldError('whatsapp', 'Le numéro WhatsApp doit contenir au moins 10 chiffres');
    }
    
    // VALIDATION DATE DE NAISSANCE
    const dateField = document.getElementById('date_naissance');
    if (dateField.value && !isValidDate(dateField.value)) {
        isValid = false;
        errors['date_naissance'] = 'La date ne peut pas être postérieure à aujourd\'hui';
        markFieldError('date_naissance', 'La date ne peut pas être postérieure à aujourd\'hui');
    }
    
    // VALIDATION NIVEAU (radio requis)
    const niveauRadios = document.querySelectorAll('input[name="niveau"]');
    if (![...niveauRadios].some(radio => radio.checked)) {
        isValid = false;
        errors['niveau'] = 'Veuillez sélectionner un niveau';
        showErrorForRadioGroup('niveau', 'Veuillez sélectionner un niveau');
    }
    
    // VALIDATION MODE DE FORMATION (radio requis)
    const modeRadios = document.querySelectorAll('input[name="mode_formation"]');
    if (![...modeRadios].some(radio => radio.checked)) {
        isValid = false;
        errors['mode_formation'] = 'Veuillez sélectionner un mode de formation';
        showErrorForRadioGroup('mode_formation', 'Veuillez sélectionner un mode de formation');
    }
    
    // VALIDATION OBJECTIF (minimum 20 caractères)
    if (objectiveTextarea.value.length < 20) {
        isValid = false;
        errors['objectif'] = 'L\'objectif doit contenir au moins 20 caractères';
        markFieldError('objectif', 'L\'objectif doit contenir au moins 20 caractères');
    }
    
    // VALIDATION CONDITIONS (checkbox requise)
    if (!conditionsCheckbox.checked) {
        isValid = false;
        errors['conditions'] = 'Vous devez accepter les conditions générales';
        markFieldError('conditions', 'Vous devez accepter les conditions générales');
    }
    
    // Afficher erreur globale s'il y a des erreurs
    if (!isValid) {
        const errorCount = Object.keys(errors).length;
        erreurGlobale.textContent = `⚠️ ${errorCount} erreur(s) détectée(s). Veuillez corriger le formulaire.`;
        erreurGlobale.style.display = 'block';
        
        // Scroller vers le haut
        erreurGlobale.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    return isValid;
}

/**
 * Marquer un champ comme ayant une erreur
 */
function markFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('erreur');
        const errorSpan = field.parentElement.querySelector('.erreur-field');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
}

/**
 * Afficher erreur pour groupe de radio
 */
function showErrorForRadioGroup(groupName, message) {
    const radios = document.querySelectorAll(`input[name="${groupName}"]`);
    if (radios.length > 0) {
        const container = radios[0].closest('.form-group');
        if (container) {
            const errorSpan = container.querySelector('.erreur-field');
            if (errorSpan) {
                errorSpan.textContent = message;
            }
        }
    }
}

/**
 * Effacer l'erreur d'un champ
 */
function clearErrorFor(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('erreur');
        const errorSpan = field.parentElement.querySelector('.erreur-field');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }
}

/**
 * Valider format email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valider format téléphone
 */
function isValidPhone(phone) {
    // Enlever les espaces, tirets, points et +
    const cleaned = phone.replace(/[\s\-+.]/g, '');
    // Vérifier qu'il y a au moins 10 chiffres
    return cleaned.length >= 10 && /^\d+$/.test(cleaned);
}

/**
 * Valider date de naissance
 */
function isValidDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    
    // Réinitialiser l'heure pour comparaison correcte
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    return selectedDate <= today;
}

/**
 * Gérer la soumission du formulaire
 * Now integrates EmailJS to send the form by email. Configure EmailJS with your
 * user ID, service ID and template ID (placeholders below).
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Valider le formulaire
    if (!validateForm()) {
        return;
    }
    
    // Désactiver le bouton pour éviter envois multiples
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    // EmailJS integration
    // Make sure to replace these placeholders with your actual EmailJS values
    const EMAILJS_USER_ID = 'YOUR_EMAILJS_USER_ID';
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

    // If EmailJS is not loaded, fallback to success message with console log
    if (typeof emailjs === 'undefined' || !emailjs.sendForm) {
        console.warn('EmailJS non chargé. Vérifiez que le script CDN est inclus dans index.html');
        console.log('Formulaire soumis (simulation):', new FormData(form));
        showSuccessMessage();
        // Réinitialiser bouton
        submitBtn.disabled = !conditionsCheckbox.checked;
        submitBtn.textContent = "S'inscrire";
        return;
    }

    // Initialise EmailJS si nécessaire
    if (emailjs.init && EMAILJS_USER_ID !== 'YOUR_EMAILJS_USER_ID') {
        try {
            emailjs.init(EMAILJS_USER_ID);
        } catch (e) {
            // init may already have been called; ignore
        }
    }

    // Envoyer le formulaire via EmailJS
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage();
        }, (err) => {
            console.error('FAILED...', err);
            erreurGlobale.textContent = '❌ Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.';
            erreurGlobale.style.display = 'block';
            erreurGlobale.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .finally(() => {
            // Réinitialiser le bouton
            submitBtn.disabled = !conditionsCheckbox.checked;
            submitBtn.textContent = "S'inscrire";
        });
}

/**
 * Afficher message de succès
 */
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'erreur-message'; // Réutiliser style mais changé
    successDiv.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
    successDiv.style.borderColor = '#4CAF50';
    successDiv.style.color = '#4CAF50';
    successDiv.textContent = '✅ Votre inscription a été enregistrée avec succès ! Nous vous contacterons bientôt.';
    
    // Insérer au début du formulaire
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroller vers le message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Enlever le message après 5 secondes
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'état du bouton
    updateSubmitButtonState();
    
    // Initialiser les formations (vides par défaut)
    updateFormations();
    
    // Optionnel: initialiser EmailJS si l'ID utilisateur est fourni
    if (typeof emailjs !== 'undefined' && emailjs.init) {
        // Note: replace the placeholder with your actual EmailJS user ID if you want init to run here.
        const EMAILJS_USER_ID = 'YOUR_EMAILJS_USER_ID';
        if (EMAILJS_USER_ID !== 'YOUR_EMAILJS_USER_ID') {
            try { emailjs.init(EMAILJS_USER_ID); } catch (e) { /* ignore */ }
        }
    }
    
    console.log('✅ Formulaire Challenge Consulting initialisé');
});
