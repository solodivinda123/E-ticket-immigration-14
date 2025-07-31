// DOM Elements
const formModal = document.getElementById('formModal');
const successModal = document.getElementById('successModal');
const requestTypeModal = document.getElementById('requestTypeModal');
const eticketFormPage = document.getElementById('eticketFormPage');
const eticketApplicationForm = document.getElementById('eticketApplicationForm');
const eticketApplicationFormStep2 = document.getElementById('eticketApplicationFormStep2');
const eticketApplicationFormStep3 = document.getElementById('eticketApplicationFormStep3');
const exigencesModal = document.getElementById('exigencesModal');
const languageSelect = document.getElementById('languageSelect');
const eticketForm = document.getElementById('eticketForm');

// Check if all required elements are found
console.log('Initializing DOM elements...');
console.log('eticketApplicationForm:', eticketApplicationForm);
console.log('eticketApplicationFormStep2:', eticketApplicationFormStep2);
console.log('eticketApplicationFormStep3:', eticketApplicationFormStep3);
console.log('successModal:', successModal);

// Modal functionality
function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add mobile-specific handling
        if (window.innerWidth <= 768) {
            document.body.classList.add('modal-open');
            // Prevent viewport issues on mobile
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
            }
        }
        
        // Update progress bar
        setTimeout(() => {
            initializeProgressBar();
        }, 50);
        
        console.log('Modal opened:', modal.id);
    } else {
        console.error('Modal element not found');
    }
}

function closeModal() {
    formModal.style.display = 'none';
    successModal.style.display = 'none';
    requestTypeModal.style.display = 'none';
    eticketFormPage.style.display = 'none';
    eticketApplicationForm.style.display = 'none';
    eticketApplicationFormStep2.style.display = 'none';
    eticketApplicationFormStep3.style.display = 'none';
    exigencesModal.style.display = 'none';
    
    // Close confirmation modal
    const confirmationModal = document.getElementById('confirmationPageModal');
    if (confirmationModal) {
        confirmationModal.style.display = 'none';
    }
    
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
    
    // Restore viewport for mobile
    if (window.innerWidth <= 768) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
    }
}

function closeSuccessModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}

function closeFormPage() {
    eticketFormPage.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}

function closeApplicationForm() {
    eticketApplicationForm.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}

// Form functionality
function openForm() {
    // Redirect directly to 1 class.html
    window.location.href = '1 class.html';
}

function openNewTicket() {
    // Redirect to 1 class.html
    window.location.href = '1 class.html';
}

function openPreviousTicket() {
    closeModal();
    // Show a modal for previous ticket functionality
    setTimeout(() => {
        showPreviousTicketModal();
    }, 300);
}

function openApplicationForm() {
    console.log('Opening application form...');
    closeFormPage();
    setTimeout(() => {
        openModal(eticketApplicationForm);
        console.log('Application form should be visible now');
        
        // Initialize mobile handling after modal is open
        setTimeout(() => {
            initializeMobileFormHandling();
            updateProgressBar(1);
            initializeApplicationForm();
            console.log('Step 1 initialization completed');
        }, 100);
    }, 300);
}

function showPreviousTicketModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Créer à partir d'un précédent eTicket</h2>
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #667eea; margin-bottom: 1rem;"></i>
                <p>Cette fonctionnalité permet de créer un nouveau eTicket en utilisant les informations d'un eTicket précédent.</p>
                <div style="margin-top: 2rem;">
                    <input type="text" placeholder="Numéro de référence du eTicket précédent" 
                           style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; margin-bottom: 1rem;">
                    <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Rechercher et Copier
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Toggle switch functionality
function initializeToggleSwitch() {
    const toggleSwitch = document.getElementById('travelCompanion');
    const toggleText = document.querySelector('.toggle-text');
    
    if (toggleSwitch && toggleText) {
        toggleSwitch.addEventListener('change', function() {
            toggleText.textContent = this.checked ? 'OUI' : 'NON';
        });
    }
}

// Application form functionality
function initializeApplicationForm() {
    // Stopover toggle buttons
    const stopoverButtons = document.querySelectorAll('.toggle-btn');
    stopoverButtons.forEach(button => {
        button.addEventListener('click', function() {
            stopoverButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Travel type radio buttons
    const travelOptions = document.querySelectorAll('.travel-option input[type="radio"]');
    travelOptions.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove active class from all labels
            document.querySelectorAll('.travel-label').forEach(label => {
                label.classList.remove('active');
            });
            // Add active class to selected label
            if (this.checked) {
                this.nextElementSibling.classList.add('active');
            }
        });
    });

    // Form submission
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        console.log('Application form found, setting up submit listener');
        
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submit event triggered');
            
            // Get form data
            const formData = new FormData(applicationForm);
            const data = Object.fromEntries(formData);
            console.log('Form data:', data);
            
            // Validate form
            if (!validateApplicationForm(data)) {
                console.log('Form validation failed');
                return;
            }
            
            // Navigate to step 2
            console.log('Step 1 completed, navigating to step 2');
            openApplicationFormStep2();
        });
        
        // Also add direct click handler to SUIVANT button for redundancy
        const suivantButton = applicationForm.querySelector('.btn-primary');
        if (suivantButton) {
            console.log('SUIVANT button found, adding click listener');
            suivantButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('SUIVANT button clicked directly');
                
                // Get form data
                const formData = new FormData(applicationForm);
                const data = Object.fromEntries(formData);
                console.log('Form data from button click:', data);
                
                // Validate form
                if (!validateApplicationForm(data)) {
                    console.log('Form validation failed on button click');
                    return;
                }
                
                // Navigate to step 2
                console.log('Step 1 completed via button click, navigating to step 2');
                openApplicationFormStep2();
            });
        } else {
            console.error('SUIVANT button not found');
        }
    } else {
        console.error('Application form not found');
    }
}

// Validate application form
function validateApplicationForm(data) {
    const requiredFields = ['homeAddress', 'residenceCountry', 'city'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Veuillez remplir le champ ${field === 'homeAddress' ? 'ADRESSE DU DOMICILE' : 
                   field === 'residenceCountry' ? 'PAYS DE RESIDENCE' :
                   field === 'city' ? 'VILLE' : field}`);
            return false;
        }
    }
    
    // Check if travel type is selected
    const travelType = document.querySelector('input[name="travelType"]:checked');
    if (!travelType) {
        alert('Veuillez sélectionner un type de voyage.');
        return false;
    }
    
    return true;
}

// Test function to open application form (for debugging)
function testOpenApplicationForm() {
    console.log('Testing application form opening...');
    const modal = document.getElementById('eticketApplicationForm');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Application form opened successfully');
    } else {
        console.error('Application form modal not found');
    }
}

// Test function to open step 2 form (for debugging)
function testOpenStep2Form() {
    console.log('Testing step 2 form opening...');
    const modal = document.getElementById('eticketApplicationFormStep2');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Step 2 form opened successfully');
    } else {
        console.error('Step 2 form modal not found');
    }
}

// Form page form submission
function initializeFormPageForm() {
    const formPageForm = document.getElementById('eticketFormPageForm');
    const validerButton = document.querySelector('#eticketFormPageForm .btn-primary');
    
    if (formPageForm) {
        formPageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted - opening application form');
            openApplicationForm();
        });
    }
    
    // Also add direct click handler to Valider button
    if (validerButton) {
        validerButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Valider button clicked - opening application form');
            openApplicationForm();
        });
    }
}

// Validate form page form
function validateFormPageForm(data) {
    // Validate reCAPTCHA
    if (!data.recaptcha) {
        alert('Veuillez confirmer que vous n\'êtes pas un robot.');
        return false;
    }
    
    return true;
}

// Change form page language
function changeFormLanguage(lang) {
    const currentLang = translations[lang];
    if (!currentLang) return;
    
    // Update form page content
    const formPageForm = document.getElementById('eticketFormPageForm');
    if (formPageForm) {
        // Update form title
        document.querySelector('.form-header h2').innerHTML = `<i class="fas fa-question-circle"></i> ${currentLang.formTitle}`;
        
        // Update form notice
        document.querySelector('.form-notice p').textContent = currentLang.formNotice;
        
        // Update form labels
        const labels = formPageForm.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = currentLang.travelCompanionQuestion;
        
        // Update form buttons
        const formButtons = formPageForm.querySelectorAll('.btn');
        if (formButtons[0]) formButtons[0].textContent = currentLang.submit;
        if (formButtons[1]) formButtons[1].textContent = currentLang.cancel;
        
        // Update notice section
        const noticeTitle = document.querySelector('.notice-content h3');
        const noticeText = document.querySelector('.notice-content p');
        if (noticeTitle) noticeTitle.textContent = currentLang.noticeTitle;
        if (noticeText) noticeText.textContent = currentLang.noticeText;
    }
    
    // Store language preference
    localStorage.setItem('selectedLanguage', lang);
    
    // Show notification
    showLanguageNotification(lang);
}

function consultTicket() {
    alert('Fonctionnalité de consultation en cours de développement. Veuillez utiliser le formulaire pour créer un nouveau E-TICKET.');
}

function openDigitalTraveler() {
    alert('Redirection vers la page du voyageur numérique...');
    // In a real application, this would redirect to the digital traveler page
}

// Form submission
eticketForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(eticketForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Generate ticket number
    const ticketNumber = generateTicketNumber();
    document.getElementById('ticketNumber').textContent = ticketNumber;
    
    // Close form modal and open success modal
    closeModal();
    openModal(successModal);
    
    // Reset form
    eticketForm.reset();
    
    // Log the submission (in real app, this would be sent to server)
    console.log('E-TICKET submitted:', data);
});

// Form validation
function validateForm(data) {
    const requiredFields = ['firstName', 'lastName', 'passport', 'nationality', 'travelDate', 'purpose'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Veuillez remplir le champ ${field === 'firstName' ? 'Prénom' : 
                   field === 'lastName' ? 'Nom' : 
                   field === 'passport' ? 'Numéro de passeport' :
                   field === 'nationality' ? 'Nationalité' :
                   field === 'travelDate' ? 'Date de voyage' :
                   field === 'purpose' ? 'Motif du voyage' : field}`);
            return false;
        }
    }
    
    // Validate passport number (basic validation)
    if (data.passport.length < 6) {
        alert('Le numéro de passeport doit contenir au moins 6 caractères.');
        return false;
    }
    
    // Validate travel date (must be future date)
    const travelDate = new Date(data.travelDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (travelDate <= today) {
        alert('La date de voyage doit être dans le futur.');
        return false;
    }
    
    return true;
}

// Generate ticket number
function generateTicketNumber() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    return `ET-${year}-${random}`;
}

// Download PDF functionality
function downloadPDF() {
    try {
    const ticketNumber = document.getElementById('ticketNumber').textContent;
        const currentDate = new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        
        // Check if jsPDF is available
        if (typeof window.jspdf === 'undefined') {
            console.error('jsPDF library not loaded');
            alert('Erreur: Bibliothèque PDF non chargée. Veuillez recharger la page.');
            return;
        }
        
        // Create PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Set document properties
        doc.setProperties({
            title: 'E-TICKET RDC Congo',
            subject: 'Document de voyage électronique',
            author: 'Gouvernement RDC Congo',
            creator: 'Direction Générale de Migration'
        });
        
        // Page dimensions
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        
        // Colors - Professional dark blue theme like Dominican Republic
        const headerBlue = [25, 50, 95]; // Dark blue for header
        const accentBlue = [40, 80, 150]; // Medium blue for accents
        const textColor = [0, 0, 0]; // Black text
        const labelColor = [50, 50, 50]; // Dark gray for labels
        
        // ===== HEADER SECTION =====
        // Header background
        doc.setFillColor(headerBlue[0], headerBlue[1], headerBlue[2]);
        doc.rect(0, 0, pageWidth, 35, 'F');
        
        // Left side - Coat of arms placeholder and E-TICKET
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('E-TICKET', 25, 22);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('RÉPUBLIQUE DÉMOCRATIQUE DU CONGO', 25, 30);
        
        // Right side - Government branding
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('GOBIERNO DE LA', pageWidth - 25, 15, { align: 'right' });
        doc.text('RÉPUBLIQUE DÉMOCRATIQUE DU CONGO', pageWidth - 25, 22, { align: 'right' });
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('MIGRATION', pageWidth - 25, 30, { align: 'right' });
        
        // ===== MAIN CONTENT AREA =====
        const contentY = 45;
        const contentHeight = pageHeight - 120; // Leave space for footer
        
        // Background for main content
        doc.setFillColor(255, 255, 255);
        doc.rect(margin, contentY, pageWidth - 2 * margin, contentHeight, 'F');
        
        // Vertical divider line
        const dividerX = pageWidth / 2;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.setLineDashPattern([2, 2], 0);
        doc.line(dividerX, contentY, dividerX, contentY + contentHeight);
        doc.setLineDashPattern([], 0);
        
        // ===== LEFT COLUMN - PERSONAL INFORMATION =====
        const leftColumnX = margin + 10;
        const leftColumnWidth = dividerX - margin - 20;
        let currentY = contentY + 15;
        
        // Personal Information Section
        doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        
        // Application Code
        doc.text('CODE DE DEMANDE:', leftColumnX, currentY);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFont('helvetica', 'normal');
        doc.text(ticketNumber, leftColumnX, currentY + 8);
        currentY += 20;
        
        // Names
        doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.text('NOMS:', leftColumnX, currentY);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFont('helvetica', 'normal');
        doc.text('Jean Pierre Mukendi', leftColumnX, currentY + 8);
        currentY += 20;
        
        // Passport Number
        doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.text('NUMÉRO DE PASSEPORT:', leftColumnX, currentY);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFont('helvetica', 'normal');
        doc.text('CD123456789', leftColumnX, currentY + 8);
        currentY += 20;
        
        // Nationality
        doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.text('PAYS DE NATIONALITÉ: CONGO', leftColumnX, currentY);
        currentY += 20;
        
        // Issue Date
        doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.text('DATE D\'ÉMISSION:', leftColumnX, currentY);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFont('helvetica', 'normal');
        doc.text(currentDate, leftColumnX, currentY + 8);
        currentY += 20;
        
        // Migration Type
        doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.text('MIGRATION: ENTRÉE', leftColumnX, currentY);
        currentY += 20;
        
        // Flight Date
        doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.text('DATE DE VOL:', leftColumnX, currentY);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFont('helvetica', 'normal');
        doc.text('15/01/2025', leftColumnX, currentY + 8);
        
        // ===== RIGHT COLUMN - QR CODE AND FLIGHT INFO =====
        const rightColumnX = dividerX + 10;
        const rightColumnWidth = pageWidth - dividerX - margin - 10;
        
        // QR Code Section
        const qrSize = 50;
        const qrX = rightColumnX + (rightColumnWidth - qrSize) / 2;
        const qrY = contentY + 20;
        
        // QR Code background
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10, 3, 3, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(1);
        doc.roundedRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10, 3, 3, 'S');
        
        // QR Code with real generation
        try {
            // Create QR code data
            const qrData = `E-TICKET:${ticketNumber}|DATE:${currentDate}|VALIDATION:RDCCONGO2025`;
            
            // Generate QR code using QRCode library
            if (typeof QRCode !== 'undefined') {
                // Create canvas for QR code
                const canvas = document.createElement('canvas');
                QRCode.toCanvas(canvas, qrData, {
                    width: qrSize * 2, // Higher resolution
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                }, function (error) {
                    if (!error) {
                        // Convert canvas to image and add to PDF
                        const imgData = canvas.toDataURL('image/png');
                        doc.addImage(imgData, 'PNG', qrX, qrY, qrSize, qrSize);
                    } else {
                        // Fallback to styled placeholder
                        createStyledQRPlaceholder(doc, qrX, qrY, qrSize, qrData);
                    }
                });
            } else {
                // Fallback: Create a styled QR code placeholder
                createStyledQRPlaceholder(doc, qrX, qrY, qrSize, qrData);
            }
        } catch (error) {
            // Fallback: Create a styled QR code placeholder
            createStyledQRPlaceholder(doc, qrX, qrY, qrSize, `E-TICKET:${ticketNumber}`);
        }
        
        // QR Code description
        doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('CODE QR D\'USAGE EXCLUSIF', rightColumnX, qrY + qrSize + 15, { align: 'center' });
        doc.text('POUR VALIDATION DOUANIÈRE.', rightColumnX, qrY + qrSize + 22, { align: 'center' });
        
        // Flight Details Box
        const flightBoxY = qrY + qrSize + 40;
        const flightBoxHeight = 30;
        
        doc.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
        doc.roundedRect(rightColumnX, flightBoxY, rightColumnWidth, flightBoxHeight, 3, 3, 'F');
        
        // Flight Number
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('NUMÉRO DE VOL', rightColumnX + 10, flightBoxY + 8);
        doc.setFont('helvetica', 'normal');
        doc.text('AF1234', rightColumnX + 10, flightBoxY + 18);
        
        // Airline Name
        doc.setFont('helvetica', 'bold');
        doc.text('NOM DE LA COMPAGNIE AÉRIENNE', rightColumnX + 80, flightBoxY + 8);
        doc.setFont('helvetica', 'normal');
        doc.text('Air France', rightColumnX + 80, flightBoxY + 18);
        
        // ===== BOTTOM SECTION - COMPANIONS =====
        const companionsY = contentY + contentHeight - 60;
        
        // Companions Header
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('ACCOMPAGNANTS', margin + 10, companionsY);
        
        // Companions Table Header
        const tableY = companionsY + 10;
        doc.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
        doc.roundedRect(margin, tableY, pageWidth - 2 * margin, 15, 2, 2, 'F');
        
        // Table Headers
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('NUMÉRO DE PASSEPORT', margin + 10, tableY + 8);
        doc.text('PAYS DE NATIONALITÉ', margin + 80, tableY + 8);
        doc.text('NOMS', margin + 150, tableY + 8);
        
        // Table Content (empty rows for now)
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, tableY + 15, pageWidth - 2 * margin, 20, 2, 2, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin, tableY + 15, pageWidth - 2 * margin, 20, 2, 2, 'S');
        
        // ===== FOOTER =====
        const footerY = pageHeight - 25;
        doc.setFillColor(headerBlue[0], headerBlue[1], headerBlue[2]);
        doc.rect(0, footerY, pageWidth, 25, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Document officiel de la République Démocratique du Congo', pageWidth/2, footerY + 8, { align: 'center' });
        doc.text('Direction Générale de Migration (DGM) - Direction Générale des Douanes (DGA)', pageWidth/2, footerY + 16, { align: 'center' });
        
        // Save the PDF
        doc.save(`E-TICKET-${ticketNumber}.pdf`);
        
        alert('Document PDF professionnel téléchargé avec succès!');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    }
}

// Helper function to create a styled QR code placeholder
function createStyledQRPlaceholder(doc, x, y, size, data) {
    // Create a professional QR code placeholder with pattern
    const cellSize = size / 25; // 25x25 grid
    
    // Background
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, size, size, 2, 2, 'F');
    
    // QR Code pattern (simplified)
    doc.setFillColor(0, 0, 0);
    
    // Corner patterns (top-left, top-right, bottom-left)
    const corners = [
        [x + cellSize * 2, y + cellSize * 2, 7, 7],
        [x + size - cellSize * 9, y + cellSize * 2, 7, 7],
        [x + cellSize * 2, y + size - cellSize * 9, 7, 7]
    ];
    
    corners.forEach(([cx, cy, w, h]) => {
        // Outer square
        doc.roundedRect(cx, cy, w * cellSize, h * cellSize, 1, 1, 'F');
        // Inner square
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(cx + cellSize, cy + cellSize, (w - 2) * cellSize, (h - 2) * cellSize, 1, 1, 'F');
        // Center square
        doc.setFillColor(0, 0, 0);
        doc.roundedRect(cx + cellSize * 2, cy + cellSize * 2, (w - 4) * cellSize, (h - 4) * cellSize, 1, 1, 'F');
    });
    
    // Add some random data cells to simulate QR code
    const dataCells = [
        [x + cellSize * 12, y + cellSize * 4],
        [x + cellSize * 14, y + cellSize * 6],
        [x + cellSize * 8, y + cellSize * 8],
        [x + cellSize * 16, y + cellSize * 10],
        [x + cellSize * 6, y + cellSize * 12],
        [x + cellSize * 18, y + cellSize * 14],
        [x + cellSize * 10, y + cellSize * 16],
        [x + cellSize * 12, y + cellSize * 18],
        [x + cellSize * 14, y + cellSize * 20]
    ];
    
    dataCells.forEach(([cx, cy]) => {
        doc.setFillColor(0, 0, 0);
        doc.roundedRect(cx, cy, cellSize, cellSize, 0.5, 0.5, 'F');
    });
    
    // Add QR code text overlay
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.text('QR', x + size/2, y + size + 5, { align: 'center' });
}

// Language system
const translations = {
    fr: {
        // Header
        title: "E-TICKET - RDC Congo",
        republic: "RDC CONGO",
        
        // Hero Section
        heroTitle: "Bienvenue sur la page d'accueil E-TICKET, le site d'immigration pour entrer et sortir sur le territoire de la RDC Congo",
        formButton: "FORMULAIRE D'E-TICKET",
        consultButton: "CONSULTER LE E-TICKET",
        
        // Request Type Modal
        requestTypeTitle: "Quel type de demande souhaitez-vous formuler?",
        newTicketButton: "Nouveau billet électronique",
        previousTicketButton: "Créer à partir d'un précédent eTicket",
        previousTicketModalTitle: "Créer à partir d'un précédent eTicket",
        previousTicketDescription: "Cette fonctionnalité permet de créer un nouveau eTicket en utilisant les informations d'un eTicket précédent.",
        previousTicketPlaceholder: "Numéro de référence du eTicket précédent",
        searchAndCopyButton: "Rechercher et Copier",
        
        // What is E-TICKET Section
        whatIsTitle: "Qu'est-ce que le E-TICKET?",
        whatIsText1: "Le E-TICKET est un document électronique obligatoire pour tous les voyageurs entrant ou sortant du territoire de la RDC Congo. Il s'agit d'un système moderne et sécurisé qui remplace les anciens formulaires papier.",
        whatIsText2: "Ce document est requis par la Direction Générale de Migration (DGM) et la Direction Générale des Douanes (DGA) conformément à la loi 285-04 sur la migration et à la résolution 000-2023.",
        whatIsText3: "Cliquez ici pour accéder à la page du voyageur numérique:",
        digitalTraveler: "Voyageur Numérique",
        
        // Instructions Section
        instructionsTitle: "Instructions pour faire votre demande",
        
        // Card 1
        card1Title: "Faire une demande",
        card1Step1: "Cliquez sur le bouton Demande de billet électronique",
        card1Step2: "Remplissez les informations demandées",
        card1Step3: "Cliquez sur la touche Entrée",
        card1Step4: "Si vous avez déjà une candidature, cliquez sur accès et saisissez votre numéro de candidature",
        
        // Card 2
        card2Title: "Dans le formulaire",
        card2Step1: "Notez bien votre référence de dossier. Ce numéro et votre question de sécurité vous permettront d'accéder à votre formulaire à tout moment",
        card2Step2: "Remplissez correctement les informations demandées",
        card2Step3: "Le formulaire de Déclaration en Douanes est obligatoire pour les personnes majeures (18+)",
        
        // Card 3
        card3Title: "Formulaire complété",
        card3Step1: "Un E-TICKET avec un code QR sera émis",
        card3Step2: "Cliquez sur la touche Téléchargez PDF si vous voulez sauvegarder une copie sur votre appareil",
        
        // Footer
        government: "GOUVERNEMENT DE LA RDC CONGO",
        migration: "MIGRATION",
        copyright: "© 2025 DIRECTION GÉNÉRALE DE MIGRATION",
        rights: "Tous droits réservés.",
        
        // Form
        formTitle: "Formulaire E-TICKET",
        firstName: "Prénom",
        lastName: "Nom",
        passport: "Numéro de passeport",
        nationality: "Nationalité",
        travelDate: "Date de voyage",
        purpose: "Motif du voyage",
        submit: "Soumettre",
        cancel: "Annuler",
        
        // Form options
        selectNationality: "Sélectionnez votre nationalité",
        france: "France",
        usa: "États-Unis",
        canada: "Canada",
        spain: "Espagne",
        germany: "Allemagne",
        
        selectPurpose: "Sélectionnez le motif",
        tourism: "Tourisme",
        business: "Affaires",
        family: "Visite familiale",
        transit: "Transit",
        
        // Success modal
        successTitle: "E-TICKET Généré avec Succès!",
        downloadPDF: "Télécharger PDF",
        close: "Fermer",

        // Form Page
        formNotice: "Veuillez remplir tous les champs obligatoires (*) et confirmer que vous n'êtes pas un robot.",
        travelCompanionQuestion: "Avez-vous un accompagnant de voyage?",
        formTitle: "Formulaire E-TICKET",
        noticeTitle: "Avis important",
        noticeText: "Veuillez noter que le formulaire E-TICKET est un document électronique obligatoire pour l'entrée et la sortie du territoire de la RDC Congo. Il est requis par la Direction Générale de Migration (DGM) et la Direction Générale des Douanes (DGA) conformément à la loi 285-04 sur la migration et à la résolution 000-2023.",
        recaptchaText: "J'accepte les conditions d'utilisation et la politique de confidentialité.",

        // Application Form
        generalInformation: "INFORMATION GENERALE",
        mandatoryFields: "Les champs marqués d'un astérisque rouge sont obligatoires (*)",
        homeAddress: "ADRESSE DU DOMICILE",
        residenceCountry: "PAYS DE RESIDENCE",
        city: "VILLE",
        stateRegion: "ETAT/REGION (ex: Kinshasa)",
        postalCode: "CODE POSTAL",
        stopoverQuestion: "Avez-vous fait une escale dans un autre pays?",
        entryDominican: "Entrée de la république démocratique du congo",
        departureDominican: "Départ de la république démocratique du congo",
        next: "SUIVANT",

        // Reference Section
        referenceTitle: "REFERENCE DE DOSSIER :",
        referenceDescription: "Voici votre code d'application pour accéder à nouveau à votre formulaire.",
        logoutLink: "DECONNEXION",

        // Step 2 Form
        migrationData: "DONNEES MIGRATOIRES",
        personalInformation: "INFORMATION PERSONNELLE",
        accommodationPurpose: "HÉBERGEMENT / MOTIF DE SÉJOUR",
        travelDetails: "DÉTAILS DU VOYAGE",
        mainPassenger: "PASSAGER PRINCIPAL",
        firstName: "PRENOMS",
        lastName: "NOM DE FAMILLE",
        dateOfBirth: "Date de naissance",
        gender: "Genre",
        placeOfBirth: "LIEU DE NAISSANCE",
        passportNumber: "NÚMERO DO PASSAPORTE",
        confirmPassportNumber: "CONFIRMEZ LE NUMERO DE PASSEPORT",
        maritalStatus: "ETAT CIVIL",
        portOfEmbarkation: "Port d'embarquement",
        portOfArrival: "Port d'arrivée",
        airlineName: "NOM DE LA COMPAGNIE AERIENNE",
        travelDate: "DATE DU VOYAGE",
        flightNumber: "NUMERO DE VOL",
        reason: "Raison",
        stayDuration: "DUREE DU SEJOUR",
        goBack: "REVENIR EN ARRIERE"
    },
    
    en: {
        // Header
        title: "E-TICKET - DRC Congo",
        republic: "DRC CONGO",
        
        // Hero Section
        heroTitle: "Welcome to the E-TICKET homepage, the immigration site for entering and exiting the territory of DRC Congo",
        formButton: "E-TICKET FORM",
        consultButton: "CONSULT E-TICKET",
        
        // Request Type Modal
        requestTypeTitle: "What type of request do you wish to make?",
        newTicketButton: "New electronic ticket",
        previousTicketButton: "Create from a previous eTicket",
        previousTicketModalTitle: "Create from a previous eTicket",
        previousTicketDescription: "This feature allows you to create a new eTicket using information from a previous eTicket.",
        previousTicketPlaceholder: "Reference number of the previous eTicket",
        searchAndCopyButton: "Search and Copy",
        
        // What is E-TICKET Section
        whatIsTitle: "What is E-TICKET?",
        whatIsText1: "The E-TICKET is a mandatory electronic document for all travelers entering or exiting the territory of DRC Congo. It is a modern and secure system that replaces old paper forms.",
        whatIsText2: "This document is required by the General Directorate of Migration (DGM) and the General Directorate of Customs (DGA) in accordance with Law 285-04 on migration and Resolution 000-2023.",
        whatIsText3: "Click here to access the digital traveler page:",
        digitalTraveler: "Digital Traveler",
        
        // Instructions Section
        instructionsTitle: "Instructions for making your request",
        
        // Card 1
        card1Title: "Make a request",
        card1Step1: "Click on the Electronic ticket request button",
        card1Step2: "Fill in the requested information",
        card1Step3: "Click the Enter key",
        card1Step4: "If you already have an application, click access and enter your application number",
        
        // Card 2
        card2Title: "In the form",
        card2Step1: "Note your file reference. This number and your security question will allow you to access your form at any time",
        card2Step2: "Fill in the requested information correctly",
        card2Step3: "The Customs Declaration form is mandatory for adults (18+)",
        
        // Card 3
        card3Title: "Form completed",
        card3Step1: "An E-TICKET with a QR code will be issued",
        card3Step2: "Click the Download PDF button if you want to save a copy on your device",
        
        // Footer
        government: "GOVERNMENT OF DRC CONGO",
        migration: "MIGRATION",
        copyright: "© 2025 GENERAL DIRECTORATE OF MIGRATION",
        rights: "All rights reserved.",
        
        // Form
        formTitle: "E-TICKET Form",
        firstName: "First Name",
        lastName: "Last Name",
        passport: "Passport Number",
        nationality: "Nationality",
        travelDate: "Travel Date",
        purpose: "Purpose of Travel",
        submit: "Submit",
        cancel: "Cancel",
        
        // Form options
        selectNationality: "Select your nationality",
        france: "France",
        usa: "United States",
        canada: "Canada",
        spain: "Spain",
        germany: "Germany",
        
        selectPurpose: "Select purpose",
        tourism: "Tourism",
        business: "Business",
        family: "Family Visit",
        transit: "Transit",
        
        // Success modal
        successTitle: "E-TICKET Generated Successfully!",
        downloadPDF: "Download PDF",
        close: "Close",

        // Form Page
        formNotice: "Please fill in all required (*) fields and confirm that you are not a robot.",
        travelCompanionQuestion: "Do you have a travel companion?",
        formTitle: "E-TICKET Form",
        noticeTitle: "Important Notice",
        noticeText: "Please note that the E-TICKET form is a mandatory electronic document for entry and exit from the territory of the DRC Congo. It is required by the General Directorate of Migration (DGM) and the General Directorate of Customs (DGA) in accordance with Law 285-04 on migration and Resolution 000-2023.",
        recaptchaText: "I accept the terms of use and privacy policy.",

        // Application Form
        generalInformation: "GENERAL INFORMATION",
        mandatoryFields: "Fields marked with a red asterisk are mandatory (*)",
        homeAddress: "HOME ADDRESS",
        residenceCountry: "COUNTRY OF RESIDENCE",
        city: "CITY",
        stateRegion: "STATE/REGION (ex: Kinshasa)",
        postalCode: "POSTAL CODE",
        stopoverQuestion: "Did you make a stopover in another country?",
        entryDominican: "Entry to the Democratic Republic of Congo",
        departureDominican: "Departure from the Democratic Republic of Congo",
        next: "NEXT",

        // Reference Section
        referenceTitle: "APPLICATION REFERENCE :",
        referenceDescription: "Here is your application code to access your form again.",
        logoutLink: "LOGOUT",

        // Step 2 Form
        migrationData: "MIGRATION DATA",
        personalInformation: "PERSONAL INFORMATION",
        accommodationPurpose: "ACCOMMODATION / PURPOSE OF STAY",
        travelDetails: "TRAVEL DETAILS",
        mainPassenger: "MAIN PASSENGER",
        firstName: "FIRST NAMES",
        lastName: "LAST NAME",
        dateOfBirth: "Date of birth",
        gender: "Gender",
        placeOfBirth: "PLACE OF BIRTH",
        passportNumber: "PASSPORT NUMBER",
        confirmPassportNumber: "CONFIRM PASSPORT NUMBER",
        maritalStatus: "MARITAL STATUS",
        portOfEmbarkation: "Port of embarkation",
        portOfArrival: "Port of arrival",
        airlineName: "AIRLINE NAME",
        travelDate: "TRAVEL DATE",
        flightNumber: "FLIGHT NUMBER",
        reason: "Reason",
        stayDuration: "DURATION OF STAY",
        goBack: "GO BACK"
    },
    
    es: {
        // Header
        title: "E-TICKET - RDC Congo",
        republic: "RDC CONGO",
        
        // Hero Section
        heroTitle: "Bienvenido a la página de inicio E-TICKET, el sitio de inmigración para entrar y salir del territorio de RDC Congo",
        formButton: "FORMULARIO E-TICKET",
        consultButton: "CONSULTAR E-TICKET",
        
        // Request Type Modal
        requestTypeTitle: "¿Qué tipo de solicitud desea formular?",
        newTicketButton: "Nuevo billete electrónico",
        previousTicketButton: "Crear a partir de un eTicket anterior",
        previousTicketModalTitle: "Crear a partir de un eTicket anterior",
        previousTicketDescription: "Esta función le permite crear un nuevo eTicket usando información de un eTicket anterior.",
        previousTicketPlaceholder: "Número de referencia del eTicket anterior",
        searchAndCopyButton: "Buscar y Copiar",
        
        // What is E-TICKET Section
        whatIsTitle: "¿Qué es E-TICKET?",
        whatIsText1: "El E-TICKET es un documento electrónico obligatorio para todos los viajeros que entran o salen del territorio de RDC Congo. Es un sistema moderno y seguro que reemplaza los antiguos formularios en papel.",
        whatIsText2: "Este documento es requerido por la Dirección General de Migración (DGM) y la Dirección General de Aduanas (DGA) de acuerdo con la Ley 285-04 sobre migración y la Resolución 000-2023.",
        whatIsText3: "Haga clic aquí para acceder a la página del viajero digital:",
        digitalTraveler: "Viajero Digital",
        
        // Instructions Section
        instructionsTitle: "Instrucciones para hacer su solicitud",
        
        // Card 1
        card1Title: "Hacer una solicitud",
        card1Step1: "Haga clic en el botón Solicitud de billete electrónico",
        card1Step2: "Complete la información solicitada",
        card1Step3: "Haga clic en la tecla Entrar",
        card1Step4: "Si ya tiene una solicitud, haga clic en acceso e ingrese su número de solicitud",
        
        // Card 2
        card2Title: "En el formulario",
        card2Step1: "Anote su referencia de archivo. Este número y su pregunta de seguridad le permitirán acceder a su formulario en cualquier momento",
        card2Step2: "Complete correctamente la información solicitada",
        card2Step3: "El formulario de Declaración de Aduanas es obligatorio para adultos (18+)",
        
        // Card 3
        card3Title: "Formulario completado",
        card3Step1: "Se emitirá un E-TICKET con código QR",
        card3Step2: "Haga clic en el botón Descargar PDF si desea guardar una copia en su dispositivo",
        
        // Footer
        government: "GOBIERNO DE RDC CONGO",
        migration: "MIGRACIÓN",
        copyright: "© 2025 DIRECCIÓN GENERAL DE MIGRACIÓN",
        rights: "Todos los derechos reservados.",
        
        // Form
        formTitle: "Formulario E-TICKET",
        firstName: "Nombre",
        lastName: "Apellido",
        passport: "Número de pasaporte",
        nationality: "Nacionalidad",
        travelDate: "Fecha de viaje",
        purpose: "Propósito del viaje",
        submit: "Enviar",
        cancel: "Cancelar",
        
        // Form options
        selectNationality: "Seleccione su nacionalidad",
        france: "Francia",
        usa: "Estados Unidos",
        canada: "Canadá",
        spain: "España",
        germany: "Alemania",
        
        selectPurpose: "Seleccione propósito",
        tourism: "Turismo",
        business: "Negocios",
        family: "Visita familiar",
        transit: "Tránsito",
        
        // Success modal
        successTitle: "¡E-TICKET Generado con Éxito!",
        downloadPDF: "Descargar PDF",
        close: "Cerrar",

        // Form Page
        formNotice: "Por favor, complete todos los campos obligatorios (*) y confirme que no es un robot.",
        travelCompanionQuestion: "¿Tiene un acompañante de viaje?",
        formTitle: "Formulario E-TICKET",
        noticeTitle: "Aviso importante",
        noticeText: "Por favor, tenga en cuenta que el formulario E-TICKET es un documento electrónico obligatorio para la entrada y salida del territorio de la RDC Congo. Es requerido por la Dirección General de Migración (DGM) y la Dirección General de Aduanas (DGA) de acuerdo con la Ley 285-04 sobre migración y la Resolución 000-2023.",
        recaptchaText: "Acepto los términos de uso y la política de privacidad.",

        // Application Form
        generalInformation: "INFORMACIÓN GENERAL",
        mandatoryFields: "Los campos marcados con un asterisco rojo son obligatorios (*)",
        homeAddress: "DIRECCIÓN DEL DOMICILIO",
        residenceCountry: "PAÍS DE RESIDENCIA",
        city: "CIUDAD",
        stateRegion: "ESTADO/REGIÓN (ej: Kinshasa)",
        postalCode: "CÓDIGO POSTAL",
        stopoverQuestion: "¿Hizo una escala en otro país?",
        entryDominican: "Entrada a la República Democrática del Congo",
        departureDominican: "Salida de la República Democrática del Congo",
        next: "SIGUIENTE",

        // Reference Section
        referenceTitle: "REFERENCIA DE DOSSIER :",
        referenceDescription: "Aquí está su código de aplicación para acceder a su formulario de nuevo.",
        logoutLink: "CERRAR SESIÓN",

        // Step 2 Form
        migrationData: "DATOS MIGRATORIOS",
        personalInformation: "INFORMACIÓN PERSONAL",
        accommodationPurpose: "ALOJAMIENTO / MOTIVO DE ESTANCIA",
        travelDetails: "DETALLES DEL VIAJE",
        mainPassenger: "PASAJERO PRINCIPAL",
        firstName: "NOMBRES",
        lastName: "APELLIDO",
        dateOfBirth: "Fecha de nacimiento",
        gender: "Género",
        placeOfBirth: "LUGAR DE NACIMIENTO",
        passportNumber: "NÚMERO DE PASAPORTE",
        confirmPassportNumber: "CONFIRMAR NÚMERO DE PASAPORTE",
        maritalStatus: "ESTADO CIVIL",
        portOfEmbarkation: "Puerto de embarque",
        portOfArrival: "Puerto de llegada",
        airlineName: "NOMBRE DE LA COMPAÑÍA AÉREA",
        travelDate: "FECHA DEL VIAJE",
        flightNumber: "NÚMERO DE VUELO",
        reason: "Motivo",
        stayDuration: "DURACIÓN DE LA ESTANCIA",
        goBack: "VOLVER ATRÁS"
    }
};

// Language switching function
function changeLanguage(lang) {
    const currentLang = translations[lang];
    if (!currentLang) return;
    
    // Update page title
    document.title = currentLang.title;
    
    // Update header
    document.querySelector('.logo-text p').textContent = currentLang.republic;
    
    // Update hero section
    document.querySelector('.hero-right h2').textContent = currentLang.heroTitle;
    document.querySelector('.btn-primary').innerHTML = `<i class="fas fa-file-alt"></i> ${currentLang.formButton}`;
    document.querySelector('.btn-secondary').innerHTML = `<i class="fas fa-search"></i> ${currentLang.consultButton}`;
    
    // Update request type modal
    const requestTypeModal = document.getElementById('requestTypeModal');
    if (requestTypeModal) {
        requestTypeModal.querySelector('h2').textContent = currentLang.requestTypeTitle;
        requestTypeModal.querySelector('.btn-primary').innerHTML = `<i class="fas fa-plus-circle"></i> ${currentLang.newTicketButton}`;
        requestTypeModal.querySelector('.btn-secondary').innerHTML = `<i class="fas fa-copy"></i> ${currentLang.previousTicketButton}`;
    }
    
    // Update previous ticket modal content
    const previousTicketModal = document.getElementById('previousTicketModal');
    if (previousTicketModal) {
        previousTicketModal.querySelector('h2').textContent = currentLang.previousTicketModalTitle;
        previousTicketModal.querySelector('p').textContent = currentLang.previousTicketDescription;
        previousTicketModal.querySelector('input[type="text"]').placeholder = currentLang.previousTicketPlaceholder;
        previousTicketModal.querySelector('.btn-primary').textContent = currentLang.searchAndCopyButton;
    }
    
    // Update what is E-TICKET section
    document.querySelector('.what-is-eticket h2').textContent = currentLang.whatIsTitle;
    const whatIsParagraphs = document.querySelectorAll('.what-is-eticket p');
    whatIsParagraphs[0].textContent = currentLang.whatIsText1;
    whatIsParagraphs[1].textContent = currentLang.whatIsText2;
    whatIsParagraphs[2].textContent = currentLang.whatIsText3;
    document.querySelector('.btn-orange').innerHTML = `<i class="fas fa-hand-point-up"></i> ${currentLang.digitalTraveler}`;
    
    // Update instructions section
    document.querySelector('.instructions h2').textContent = currentLang.instructionsTitle;
    
    // Update instruction cards
    const cards = document.querySelectorAll('.instruction-card');
    cards[0].querySelector('h3').textContent = currentLang.card1Title;
    cards[1].querySelector('h3').textContent = currentLang.card2Title;
    cards[2].querySelector('h3').textContent = currentLang.card3Title;
    
    // Update card steps
    const card1Steps = cards[0].querySelectorAll('li');
    card1Steps[0].innerHTML = `<strong>${currentLang.card1Step1}</strong>`;
    card1Steps[1].innerHTML = `<strong>${currentLang.card1Step2}</strong>`;
    card1Steps[2].innerHTML = `<strong>${currentLang.card1Step3}</strong>`;
    card1Steps[3].innerHTML = `<strong>${currentLang.card1Step4}</strong>`;
    
    const card2Steps = cards[1].querySelectorAll('li');
    card2Steps[0].innerHTML = `<strong>${currentLang.card2Step1}</strong>`;
    card2Steps[1].innerHTML = `<strong>${currentLang.card2Step2}</strong>`;
    card2Steps[2].innerHTML = `<strong>${currentLang.card2Step3}</strong>`;
    
    const card3Steps = cards[2].querySelectorAll('li');
    card3Steps[0].innerHTML = `<strong>${currentLang.card3Step1}</strong>`;
    card3Steps[1].innerHTML = `<strong>${currentLang.card3Step2}</strong>`;
    
    // Update footer
    const footerParagraphs = document.querySelectorAll('.footer-right p');
    footerParagraphs[0].textContent = currentLang.government;
    document.querySelector('.footer-right h3').textContent = currentLang.migration;
    
    const footerBottomParagraphs = document.querySelectorAll('.footer-bottom p');
    footerBottomParagraphs[0].textContent = currentLang.copyright;
    footerBottomParagraphs[1].textContent = currentLang.rights;
    
    // Update form (if modal is open)
    const formModal = document.getElementById('formModal');
    if (formModal && formModal.style.display === 'block') {
        updateFormLanguage(lang);
    }

    // Update form page (if form page is open)
    const eticketFormPage = document.getElementById('eticketFormPage');
    if (eticketFormPage && eticketFormPage.style.display === 'block') {
        changeFormLanguage(lang);
    }
    
    // Store language preference
    localStorage.setItem('selectedLanguage', lang);
    
    // Show notification
    showLanguageNotification(lang);
}

// Update form language
function updateFormLanguage(lang) {
    const currentLang = translations[lang];
    if (!currentLang) return;
    
    // Update form title
    document.querySelector('#formModal h2').textContent = currentLang.formTitle;
    
    // Update form labels
    const labels = document.querySelectorAll('#formModal label');
    labels[0].textContent = currentLang.firstName;
    labels[1].textContent = currentLang.lastName;
    labels[2].textContent = currentLang.passport;
    labels[3].textContent = currentLang.nationality;
    labels[4].textContent = currentLang.travelDate;
    labels[5].textContent = currentLang.purpose;
    
    // Update form buttons
    const formButtons = document.querySelectorAll('#formModal .btn');
    formButtons[0].textContent = currentLang.submit;
    formButtons[1].textContent = currentLang.cancel;
    
    // Update nationality options
    const nationalitySelect = document.getElementById('nationality');
    nationalitySelect.options[0].text = currentLang.selectNationality;
    nationalitySelect.options[1].text = currentLang.france;
    nationalitySelect.options[2].text = currentLang.usa;
    nationalitySelect.options[3].text = currentLang.canada;
    nationalitySelect.options[4].text = currentLang.spain;
    nationalitySelect.options[5].text = currentLang.germany;
    
    // Update purpose options
    const purposeSelect = document.getElementById('purpose');
    purposeSelect.options[0].text = currentLang.selectPurpose;
    purposeSelect.options[1].text = currentLang.tourism;
    purposeSelect.options[2].text = currentLang.business;
    purposeSelect.options[3].text = currentLang.family;
    purposeSelect.options[4].text = currentLang.transit;
}

// Change application form language
function changeAppLanguage(lang) {
    const currentLang = translations[lang];
    if (!currentLang) return;
    
    // Update application form content
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        // Update form title
        document.querySelector('.form-section h2').textContent = currentLang.generalInformation || 'INFORMATION GENERALE';
        
        // Update mandatory notice
        document.querySelector('.mandatory-notice').textContent = currentLang.mandatoryFields || 'Les champs marqués d\'un astérisque rouge sont obligatoires (*)';
        
        // Update form labels
        const labels = applicationForm.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = (currentLang.homeAddress || 'ADRESSE DU DOMICILE') + ' *';
        if (labels[1]) labels[1].textContent = (currentLang.residenceCountry || 'PAYS DE RESIDENCE') + ' *';
        if (labels[2]) labels[2].textContent = (currentLang.city || 'VILLE') + ' *';
        if (labels[3]) labels[3].textContent = currentLang.stateRegion || 'ETAT/REGION (ex: Kinshasa)';
        if (labels[4]) labels[4].textContent = currentLang.postalCode || 'CODE POSTAL';
        if (labels[5]) labels[5].textContent = currentLang.stopoverQuestion || 'Avez-vous fait une escale dans un autre pays?';
        
        // Update travel type options
        const travelLabels = document.querySelectorAll('.travel-label span');
        if (travelLabels[0]) travelLabels[0].textContent = currentLang.entryDominican || 'Entrée de la république démocratique du congo';
        if (travelLabels[1]) travelLabels[1].textContent = currentLang.departureDominican || 'Départ de la république démocratique du congo';
        
        // Update form button
        const submitButton = applicationForm.querySelector('.btn-primary');
        if (submitButton) submitButton.textContent = currentLang.next || 'SUIVANT';
    }
    
    // Update reference section
    const referenceTitle = document.getElementById('referenceTitle');
    const referenceDescription = document.getElementById('referenceDescription');
    const logoutLink = document.getElementById('logoutLink');
    
    if (referenceTitle) referenceTitle.textContent = currentLang.referenceTitle || 'REFERENCE DE DOSSIER :';
    if (referenceDescription) referenceDescription.textContent = currentLang.referenceDescription || 'Voici votre code d\'application pour accéder à nouveau à votre formulaire.';
    if (logoutLink) logoutLink.textContent = currentLang.logoutLink || 'DECONNEXION';
    
    // Store language preference
    localStorage.setItem('selectedLanguage', lang);
    
    // Show notification
    showLanguageNotification(lang);
}

// Show language change notification
function showLanguageNotification(lang) {
    const langNames = {
        'fr': 'Français',
        'en': 'English',
        'es': 'Español'
    };
    
    showNotification(`Language changed to ${langNames[lang]}`);
}

// Enhanced language selector functionality
function initializeLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    languageSelect.value = savedLanguage;
    
    // Apply saved language
    changeLanguage(savedLanguage);
    
    // Add event listener
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        changeLanguage(selectedLanguage);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Determine background color based on type
    let backgroundColor;
    switch(type) {
        case 'error':
            backgroundColor = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
            break;
        case 'success':
            backgroundColor = 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)';
            break;
        case 'warning':
            backgroundColor = 'linear-gradient(135deg, #ffd43b 0%, #fcc419 100%)';
            break;
        default:
            backgroundColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
        style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
    `;
    document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
            document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Event listeners for modals
window.addEventListener('click', function(e) {
    if (e.target === formModal) {
        closeModal();
    }
    if (e.target === successModal) {
        closeSuccessModal();
    }
    if (e.target === eticketFormPage) {
        closeFormPage();
    }
    if (e.target === eticketApplicationForm) {
        closeApplicationForm();
    }
    if (e.target === eticketApplicationFormStep2) {
        closeApplicationFormStep2();
    }
    if (e.target === eticketApplicationFormStep3) {
        closeApplicationFormStep3();
    }
    if (e.target === exigencesModal) {
        closeExigencesModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeSuccessModal();
        closeFormPage();
        closeApplicationForm();
        closeApplicationFormStep2();
        closeApplicationFormStep3();
        closeExigencesModal();
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('no-loading')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add hover effects to instruction cards
document.querySelectorAll('.instruction-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add form field animations
document.querySelectorAll('.form-group input, .form-group select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add enhanced button interactions
function addButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Add focus effects for accessibility
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(255,255,255,0.5)';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Add ripple effect styles
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('E-TICKET Application loaded successfully!');
    
    // Check if all modals are properly loaded
    console.log('Form page modal:', document.getElementById('eticketFormPage'));
    console.log('Application form modal:', document.getElementById('eticketApplicationForm'));
    console.log('Application form step 2 modal:', document.getElementById('eticketApplicationFormStep2'));
    console.log('Application form step 3 modal:', document.getElementById('eticketApplicationFormStep3'));
    
    // Initialize language system
    initializeLanguageSelector();
    
    // Add enhanced button interactions
    addButtonInteractions();
    addRippleStyles();
    
    // Add some interactive elements
    addInteractiveElements();

    // Initialize toggle switch
    initializeToggleSwitch();

    // Initialize form page form submission
    initializeFormPageForm();

    // Initialize application form functionality
    initializeApplicationForm();
    
    // Initialize form page with proper French text
    initializeFormPageLanguage();
    
    console.log('All initializations complete');
});

// Add interactive elements
function addInteractiveElements() {
    // Add click animation to phone illustration
    const phoneScreen = document.querySelector('.phone-screen');
    if (phoneScreen) {
        phoneScreen.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Add checklist interaction
    const checklistItems = document.querySelectorAll('.checklist-item');
    checklistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#4CAF50';
                this.classList.add('checked');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '#ccc';
                this.classList.remove('checked');
            }
        });
    });
    
    // Add traveler animation on hover
    const travelers = document.querySelectorAll('.traveler');
    travelers.forEach(traveler => {
        traveler.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        traveler.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Add form auto-save functionality
let formData = {};

eticketForm.addEventListener('input', function(e) {
    const field = e.target.name;
    const value = e.target.value;
    
    if (field) {
        formData[field] = value;
        localStorage.setItem('eticketFormData', JSON.stringify(formData));
    }
});

// Load saved form data on page load
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('eticketFormData');
    if (savedData) {
        formData = JSON.parse(savedData);
        Object.keys(formData).forEach(field => {
            const input = document.querySelector(`[name="${field}"]`);
            if (input) {
                input.value = formData[field];
            }
        });
    }
});

// Clear saved data after successful submission
function clearSavedData() {
    localStorage.removeItem('eticketFormData');
    formData = {};
} 

// Initialize form page with proper French text
function initializeFormPageLanguage() {
    // Set default language to French
    const formLanguageSelect = document.getElementById('formLanguageSelect');
    if (formLanguageSelect) {
        formLanguageSelect.value = 'fr';
    }
    
    // Ensure form content is in French
    const formPageForm = document.getElementById('eticketFormPageForm');
    if (formPageForm) {
        // Set form title
        const formTitle = document.querySelector('.form-header h2');
        if (formTitle) {
            formTitle.innerHTML = '<i class="fas fa-question-circle"></i> Formulaire d\'E-TICKET';
        }
        
        // Set form notice
        const formNotice = document.querySelector('.form-notice p');
        if (formNotice) {
            formNotice.textContent = 'Les champs marqués d\'un astérisque rouge sont obligatoires (*)';
        }
        
        // Set form labels
        const labels = formPageForm.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = 'Voyagez vous accompagné d\'une autre personne?';
        
        // Set form buttons
        const formButtons = formPageForm.querySelectorAll('.btn');
        if (formButtons[0]) formButtons[0].textContent = 'Valider';
        if (formButtons[1]) formButtons[1].textContent = 'Annuler';
        
        // Set notice section
        const noticeTitle = document.querySelector('.notice-content h3');
        const noticeText = document.querySelector('.notice-content p');
        if (noticeTitle) noticeTitle.textContent = 'Remarquer';
        if (noticeText) noticeText.textContent = 'Assurez-vous de saisir le numéro de passeport et la nationalité tels qu\'ils apparaissent sur votre passeport avec lequel vous allez voyager';
    }
} 



function closeApplicationFormStep2() {
    if (eticketApplicationFormStep2) {
        eticketApplicationFormStep2.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
    }
}

function closeApplicationFormStep3() {
    const step3Modal = document.getElementById('eticketApplicationFormStep3');
    if (step3Modal) {
        step3Modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
    }
}

function openExigencesModal() {
    console.log('openExigencesModal called');
    if (exigencesModal) {
        exigencesModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeExigencesModal() {
    if (exigencesModal) {
        exigencesModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function copyExigences() {
    const exigencesText = `EXIGENCES E-TICKET

Le gouvernement de la RDC CONGO et SERVICE D'IMMIGRATION délivre un document en ligne appelé e-Ticket, conçu pour suivre les touristes qui entrent et sortent du pays. Toute personne souhaitant visiter la RDC CONGO doit remplir deux formulaires de demande. Ces formulaires sont les suivants :

Pass d'arrivée (utilisé à l'entrée du pays)
Pass de départ (utilisé à la sortie du pays)

Le pass délivré par le gouvernement de la RDC CONGO est une exigence légale, et toute personne ne s'en procurant pas risque de ne pas être autorisée à entrer ou à sortir du pays. Si un visiteur connaît les dates de son arrivée et de son départ de la RDC CONGO, il peut utiliser une seule demande pour les deux passes.

Veuillez noter :
Le billet électronique (e-Ticket) ne remplace pas un visa. Si vous êtes citoyen d'un pays qui nécessite un visa pour entrer en RDC CONGO, vous devez obtenir à la fois un e-Ticket et un visa. Ces documents devront être présentés au service d'immigration et de sécurité à l'entrée et à la sortie du pays.

📋 DOCUMENTS REQUIS:
• Passeport valide (minimum 6 mois de validité)
• Photo d'identité récente (format 3x4 cm)
• Billet d'avion aller-retour ou de sortie
• Justificatif d'hébergement au Congo
• Preuve de ressources financières suffisantes

💰 FRAIS:
• E-Ticket principal: $50 USD
• Visiteurs supplémentaires: $0 USD
• Paiement par VISA, Mastercard, Wave, M-Pesa

⏰ DÉLAIS:
• Demande: 72h avant le voyage
• Traitement: 24-48h
• Validité: 90 jours

⚠️ IMPORTANT:
• Tous les champs marqués (*) sont obligatoires
• Vérifiez vos informations avant soumission
• Gardez une copie de votre e-Ticket
• Présentez le document à l'arrivée et la sortie

🔒 SÉCURITÉ:
• Paiement sécurisé SSL
• Données protégées
• Service officiel du gouvernement`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(exigencesText).then(() => {
            showNotification('Exigences copiées avec succès !', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(exigencesText);
        });
    } else {
        fallbackCopyTextToClipboard(exigencesText);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showNotification('Exigences copiées avec succès !', 'success');
    } catch (err) {
        showNotification('Erreur lors de la copie', 'error');
    }
    document.body.removeChild(textArea);
}

function openExigencesInfoModal() {
    const modal = document.getElementById('exigencesInfoModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeExigencesInfoModal() {
    const modal = document.getElementById('exigencesInfoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function goBackToStep1() {
    closeApplicationFormStep2();
    openApplicationForm();
}

function handleSuivantClick(event) {
    event.preventDefault();
    console.log('handleSuivantClick called');
    
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        // Get form data
        const formData = new FormData(applicationForm);
        const data = Object.fromEntries(formData);
        console.log('Form data from onclick:', data);
        
        // Validate form
        if (!validateApplicationForm(data)) {
            console.log('Form validation failed in onclick');
            return false;
        }
        
        // Navigate to step 2 using new navigation function
        console.log('Step 1 completed via onclick, navigating to step 2');
        goToStep2();
        return false;
    } else {
        console.error('Application form not found in onclick');
        return false;
    }
}

function openApplicationFormStep2() {
    console.log('openApplicationFormStep2 called');
    console.log('eticketApplicationFormStep2 element:', eticketApplicationFormStep2);
    
    closeApplicationForm();
    console.log('First form closed');
    
    if (eticketApplicationFormStep2) {
        console.log('Opening step 2 form');
        eticketApplicationFormStep2.style.display = 'block';
        document.body.style.overflow = 'hidden';
        initializeApplicationFormStep2();
        console.log('Step 2 form should be visible now');
    } else {
        console.error('eticketApplicationFormStep2 element not found');
    }
}

function initializeApplicationFormStep2() {
    // Populate date dropdowns
    populateDateDropdowns();
    
    // Initialize toggle buttons
    initializeToggleButtons();
    
    // Initialize form submission
    const formStep2 = document.getElementById('applicationFormStep2');
    if (formStep2) {
        formStep2.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateApplicationFormStep2()) {
                // Move to step 3 (Customs Information)
                console.log('Step 2 form submitted successfully');
                goToStep3();
            }
        });
    }
}

function populateDateDropdowns() {
    // Populate year dropdowns (current year - 100 to current year + 10)
    const currentYear = new Date().getFullYear();
    const yearSelects = ['birthYear', 'travelYear'];
    
    yearSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            for (let year = currentYear - 100; year <= currentYear + 10; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                select.appendChild(option);
            }
        }
    });
    
    // Populate day dropdowns (1-31)
    const daySelects = ['birthDay', 'travelDay'];
    daySelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            for (let day = 1; day <= 31; day++) {
                const option = document.createElement('option');
                option.value = day.toString().padStart(2, '0');
                option.textContent = day;
                select.appendChild(option);
            }
        }
    });
    
    // Populate birth place dropdown with countries
    const birthPlaceSelect = document.getElementById('birthPlace');
    if (birthPlaceSelect) {
        const countries = [
            'Afghanistan', 'Afrique du Sud', 'Albanie', 'Algérie', 'Allemagne', 'Andorre', 'Angola', 'Arabie Saoudite', 'Argentine', 'Arménie', 'Australie', 'Autriche', 'Azerbaïdjan', 'Bahamas', 'Bahreïn', 'Bangladesh', 'Barbade', 'Belgique', 'Bénin', 'Bhoutan', 'Biélorussie', 'Birmanie', 'Bolivie', 'Bosnie-Herzégovine', 'Botswana', 'Brésil', 'Brunei', 'Bulgarie', 'Burkina Faso', 'Burundi', 'Cambodge', 'Cameroun', 'Canada', 'Cap-Vert', 'Chili', 'Chine', 'Chypre', 'Colombie', 'Comores', 'Congo', 'Corée du Nord', 'Corée du Sud', 'Costa Rica', 'Côte d\'Ivoire', 'Croatie', 'Cuba', 'Danemark', 'Djibouti', 'Égypte', 'Émirats arabes unis', 'Équateur', 'Érythrée', 'Espagne', 'Estonie', 'États-Unis', 'Éthiopie', 'Fidji', 'Finlande', 'France', 'Gabon', 'Gambie', 'Géorgie', 'Ghana', 'Grèce', 'Guinée', 'Guinée-Bissau', 'Guinée équatoriale', 'Guyana', 'Haïti', 'Honduras', 'Hongrie', 'Inde', 'Indonésie', 'Irak', 'Iran', 'Irlande', 'Islande', 'Israël', 'Italie', 'Jamaïque', 'Japon', 'Jordanie', 'Kazakhstan', 'Kenya', 'Kirghizistan', 'Kiribati', 'Koweït', 'Laos', 'Lesotho', 'Lettonie', 'Liban', 'Libéria', 'Libye', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Macédoine', 'Madagascar', 'Malaisie', 'Malawi', 'Maldives', 'Mali', 'Malte', 'Maroc', 'Maurice', 'Mauritanie', 'Mexique', 'Moldavie', 'Monaco', 'Mongolie', 'Monténégro', 'Mozambique', 'Namibie', 'Népal', 'Nicaragua', 'Niger', 'Nigeria', 'Norvège', 'Nouvelle-Zélande', 'Oman', 'Ouganda', 'Ouzbékistan', 'Pakistan', 'Panama', 'Papouasie-Nouvelle-Guinée', 'Paraguay', 'Pays-Bas', 'Pérou', 'Philippines', 'Pologne', 'Portugal', 'Qatar', 'République centrafricaine', 'République démocratique du Congo', 'République dominicaine', 'République tchèque', 'Roumanie', 'Royaume-Uni', 'Russie', 'Rwanda', 'Saint-Marin', 'Salomon', 'Sénégal', 'Serbie', 'Seychelles', 'Sierra Leone', 'Singapour', 'Slovaquie', 'Slovénie', 'Somalie', 'Soudan', 'Sri Lanka', 'Suède', 'Suisse', 'Suriname', 'Swaziland', 'Syrie', 'Tadjikistan', 'Tanzanie', 'Tchad', 'Thaïlande', 'Togo', 'Tonga', 'Trinité-et-Tobago', 'Tunisie', 'Turkménistan', 'Turquie', 'Ukraine', 'Uruguay', 'Vanuatu', 'Vatican', 'Venezuela', 'Vietnam', 'Yémen', 'Zambie', 'Zimbabwe'
        ];
        
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.toLowerCase().replace(/\s+/g, '-');
            option.textContent = country;
            birthPlaceSelect.appendChild(option);
        });
    }
}

function initializeToggleButtons() {
    const toggleGroups = document.querySelectorAll('.toggle-buttons');
    
    toggleGroups.forEach(group => {
        const buttons = group.querySelectorAll('.toggle-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this group
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    });
}

function validateApplicationFormStep2() {
    console.log('Validating step 2 form...');
    const requiredFields = [
        'firstName', 'lastName', 'gender', 'phone', 'email', 'confirmEmail',
        'birthDate', 'birthCountry', 'address', 'ticketType', 'accommodation',
        'stayDays', 'travelPurpose', 'departureAirport', 'arrivalDate',
        'arrivalAirport', 'airline', 'flightNumber', 'sports'
    ];
    
    let isValid = true;
    const missingFields = [];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
            missingFields.push(fieldId);
        } else if (field) {
            field.style.borderColor = '#ddd';
        }
    });
    
    // Check radio button groups
    const radioGroups = ['stopovers', 'customsThirdParty', 'currency', 'owner', 'animals', 'taxGoods'];
    radioGroups.forEach(groupName => {
        const radioButtons = document.querySelectorAll(`input[name="${groupName}"]`);
        const checked = Array.from(radioButtons).some(radio => radio.checked);
        if (!checked) {
            isValid = false;
            missingFields.push(groupName);
        }
    });
    
    // Check checkboxes
    const checkboxes = ['terms', 'truth'];
    checkboxes.forEach(checkboxName => {
        const checkbox = document.querySelector(`input[name="${checkboxName}"]`);
        if (checkbox && !checkbox.checked) {
        isValid = false;
            missingFields.push(checkboxName);
    }
    });
    
    console.log('Step 2 validation result:', isValid);
    if (!isValid) {
        console.log('Missing fields:', missingFields);
        alert('Veuillez remplir tous les champs obligatoires.');
    }
    
    return isValid;
}

function changeAppLanguageStep2(lang) {
    // Update form title
    const formTitle = document.querySelector('#eticketApplicationFormStep2 h2');
    if (formTitle) {
        formTitle.innerHTML = translations[lang].migrationData + ' <i class="fas fa-question-circle"></i>';
    }
    
    // Update mandatory notice
    const mandatoryNotice = document.querySelector('#eticketApplicationFormStep2 .mandatory-notice');
    if (mandatoryNotice) {
        mandatoryNotice.textContent = translations[lang].mandatoryFields;
    }
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('#eticketApplicationFormStep2 .form-section-group h3');
    if (sectionTitles[0]) sectionTitles[0].textContent = translations[lang].personalInformation;
    if (sectionTitles[1]) sectionTitles[1].textContent = translations[lang].accommodationPurpose;
    if (sectionTitles[2]) sectionTitles[2].textContent = translations[lang].travelDetails;
    
    // Update labels
    const labels = document.querySelectorAll('#eticketApplicationFormStep2 label');
    if (labels.length > 0) {
        labels.forEach((label, index) => {
            const labelText = label.textContent;
            if (labelText.includes('PRENOMS')) {
                label.textContent = translations[lang].firstName + ' *';
            } else if (labelText.includes('NOM DE FAMILLE')) {
                label.textContent = translations[lang].lastName + ' *';
            } else if (labelText.includes('Date de naissance')) {
                label.textContent = translations[lang].dateOfBirth + ' *';
            } else if (labelText.includes('Genre')) {
                label.textContent = translations[lang].gender + ' *';
            } else if (labelText.includes('LIEU DE NAISSANCE')) {
                label.textContent = translations[lang].placeOfBirth + ' *';
            } else if (labelText.includes('NÚMERO DO PASSAPORTE')) {
                label.textContent = translations[lang].passportNumber + ' *';
            } else if (labelText.includes('CONFIRMEZ LE NUMERO DE PASSEPORT')) {
                label.textContent = translations[lang].confirmPassportNumber + ' *';
            } else if (labelText.includes('ETAT CIVIL')) {
                label.textContent = translations[lang].maritalStatus + ' *';
            } else if (labelText.includes('Port d\'embarquement')) {
                label.textContent = translations[lang].portOfEmbarkation + ' *';
            } else if (labelText.includes('Port d\'arrivée')) {
                label.textContent = translations[lang].portOfArrival + ' *';
            } else if (labelText.includes('NOM DE LA COMPAGNIE AERIENNE')) {
                label.textContent = translations[lang].airlineName + ' *';
            } else if (labelText.includes('DATE DU VOYAGE')) {
                label.textContent = translations[lang].travelDate + ' *';
            } else if (labelText.includes('NUMERO DE VOL')) {
                label.textContent = translations[lang].flightNumber + ' *';
            } else if (labelText.includes('Raison')) {
                label.textContent = translations[lang].reason + ' *';
            } else if (labelText.includes('DUREE DU SEJOUR')) {
                label.textContent = translations[lang].stayDuration;
            }
        });
    }
    
    // Update buttons
    const buttons = document.querySelectorAll('#eticketApplicationFormStep2 .btn');
    if (buttons.length > 0) {
        buttons.forEach(button => {
            if (button.textContent.includes('REVENIR EN ARRIERE')) {
                button.textContent = translations[lang].goBack;
            } else if (button.textContent.includes('SUIVANT')) {
                button.textContent = translations[lang].next;
            } else if (button.textContent.includes('PASSAGER PRINCIPAL')) {
                button.textContent = translations[lang].mainPassenger;
            }
        });
    }
    
    // Update reference section
    const referenceTitle = document.getElementById('referenceTitleStep2');
    const referenceDescription = document.getElementById('referenceDescriptionStep2');
    const logoutLink = document.getElementById('logoutLinkStep2');
    
    if (referenceTitle) referenceTitle.textContent = translations[lang].referenceTitle;
    if (referenceDescription) referenceDescription.textContent = translations[lang].referenceDescription;
    if (logoutLink) logoutLink.textContent = translations[lang].logoutLink;
} 

function changeExigencesLanguage(lang) {
    const exigencesText = document.querySelector('#exigencesModal .exigences-text');
    if (!exigencesText) return;
    const translations = {
        fr: `<p>Le gouvernement de la RDC CONGO et SERVICE D'IMMIGRATION délivre un document en ligne appelé e-Ticket, conçu pour suivre les touristes qui entrent et sortent du pays. Toute personne souhaitant visiter la RDC CONGO doit remplir deux formulaires de demande. Ces formulaires sont les suivants :</p><ul><li><strong>Pass d'arrivée</strong> (utilisé à l'entrée du pays)</li><li><strong>Pass de départ</strong> (utilisé à la sortie du pays)</li></ul><p>Le pass délivré par le gouvernement de la RDC CONGO est une exigence légale, et toute personne ne s'en procurant pas risque de ne pas être autorisée à entrer ou à sortir du pays. Si un visiteur connaît les dates de son arrivée et de son départ de la RDC CONGO, il peut utiliser une seule demande pour les deux passes.</p><div class='important-notice'><h3><i class='fas fa-exclamation-triangle'></i> Veuillez noter :</h3><p>Le billet électronique (e-Ticket) ne remplace pas un visa. Si vous êtes citoyen d'un pays qui nécessite un visa pour entrer en RDC CONGO, vous devez obtenir à la fois un e-Ticket et un visa. Ces documents devront être présentés au service d'immigration et de sécurité à l'entrée et à la sortie du pays.</p></div>`,
        en: `<p>The government of the DRC CONGO and the IMMIGRATION SERVICE issue an online document called the e-Ticket, designed to track tourists entering and leaving the country. Anyone wishing to visit the DRC CONGO must complete two application forms. These forms are as follows:</p><ul><li><strong>Arrival Pass</strong> (used when entering the country)</li><li><strong>Departure Pass</strong> (used when leaving the country)</li></ul><p>The pass issued by the government of the DRC CONGO is a legal requirement, and anyone who does not obtain one may not be allowed to enter or leave the country. If a visitor knows the dates of their arrival and departure from the DRC CONGO, they can use a single application for both passes.</p><div class='important-notice'><h3><i class='fas fa-exclamation-triangle'></i> Please note:</h3><p>The electronic ticket (e-Ticket) does not replace a visa. If you are a citizen of a country that requires a visa to enter the DRC CONGO, you must obtain both an e-Ticket and a visa. These documents must be presented to immigration and security services upon entry and exit from the country.</p></div>`,
        es: `<p>El gobierno de la RDC CONGO y el SERVICIO DE INMIGRACIÓN emiten un documento en línea llamado e-Ticket, diseñado para rastrear a los turistas que entran y salen del país. Cualquier persona que desee visitar la RDC CONGO debe completar dos formularios de solicitud. Estos formularios son los siguientes:</p><ul><li><strong>Pase de llegada</strong> (utilizado al entrar al país)</li><li><strong>Pase de salida</strong> (utilizado al salir del país)</li></ul><p>El pase emitido por el gobierno de la RDC CONGO es un requisito legal, y cualquier persona que no lo obtenga puede no ser autorizada a entrar o salir del país. Si un visitante conoce las fechas de su llegada y salida de la RDC CONGO, puede utilizar una sola solicitud para ambos pases.</p><div class='important-notice'><h3><i class='fas fa-exclamation-triangle'></i> Tenga en cuenta:</h3><p>El billete electrónico (e-Ticket) no reemplaza una visa. Si usted es ciudadano de un país que requiere visa para ingresar a la RDC CONGO, debe obtener tanto un e-Ticket como una visa. Estos documentos deberán ser presentados a los servicios de inmigración y seguridad al entrar y salir del país.</p></div>`
    };
    exigencesText.innerHTML = translations[lang] || translations['fr'];
} 

// Show/hide companion passport input based on toggle
function initializeCompanionPassportToggle() {
    var travelCompanion = document.getElementById('travelCompanion');
    var companionGroup = document.querySelector('.companion-passport-group');
    if (!travelCompanion || !companionGroup) return;
    function updateCompanionInput() {
        if (travelCompanion.checked) {
            companionGroup.style.display = 'block';
        } else {
            companionGroup.style.display = 'none';
        }
    }
    travelCompanion.addEventListener('change', updateCompanionInput);
    updateCompanionInput();
}

// Call this after DOMContentLoaded or after the form is rendered
window.addEventListener('DOMContentLoaded', function() {
    initializeCompanionPassportToggle();
});

// Mobile form handling
function initializeMobileFormHandling() {
    // Handle mobile form scrolling
    const applicationFormBody = document.querySelector('.application-form-body');
    const formActions = document.querySelector('.application-form-body .form-actions');
    
    if (applicationFormBody && formActions) {
        // Ensure button is always visible on mobile
        if (window.innerWidth <= 768) {
            // Add scroll event listener to ensure button visibility
            applicationFormBody.addEventListener('scroll', function() {
                const scrollTop = applicationFormBody.scrollTop;
                const scrollHeight = applicationFormBody.scrollHeight;
                const clientHeight = applicationFormBody.clientHeight;
                
                // If user is near bottom, ensure button is visible
                if (scrollHeight - scrollTop - clientHeight < 100) {
                    formActions.style.opacity = '1';
                }
            });
            
            // Ensure proper spacing for mobile
            applicationFormBody.style.paddingBottom = '140px';
        }
    }
}

// Progress bar management functions
function updateProgressBar(currentStep) {
    console.log('Updating progress bar for step:', currentStep);
    
    // Get the current modal's progress bar
    const currentModal = document.querySelector('.application-form-modal[style*="display: block"]');
    if (!currentModal) {
        console.log('No current modal found');
        return;
    }
    
    const progressBar = currentModal.querySelector('.progress-bar');
    if (!progressBar) {
        console.log('No progress bar found in current modal');
        return;
    }
    
    console.log('Found progress bar:', progressBar);
    
    // Remove all active and completed classes
    const allSteps = progressBar.querySelectorAll('.progress-step');
    const allLines = progressBar.querySelectorAll('.progress-line');
    
    allSteps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    allLines.forEach(line => {
        line.classList.remove('completed');
    });
    
    // Add appropriate classes based on current step
    if (currentStep >= 1) {
        const step1 = progressBar.querySelector('.progress-step:nth-child(1)');
        if (step1) {
            step1.classList.add('active');
            console.log('Added active class to step 1');
        }
    }
    
    if (currentStep >= 2) {
        const step1 = progressBar.querySelector('.progress-step:nth-child(1)');
        const step2 = progressBar.querySelector('.progress-step:nth-child(3)');
        const line1 = progressBar.querySelector('.progress-line:nth-child(2)');
        
        if (step1) {
            step1.classList.remove('active');
            step1.classList.add('completed');
            console.log('Added completed class to step 1');
        }
        if (step2) {
            step2.classList.add('active');
            console.log('Added active class to step 2');
        }
        if (line1) {
            line1.classList.add('completed');
            console.log('Added completed class to line 1');
        }
    }
    
    if (currentStep >= 3) {
        const step1 = progressBar.querySelector('.progress-step:nth-child(1)');
        const step2 = progressBar.querySelector('.progress-step:nth-child(3)');
        const step3 = progressBar.querySelector('.progress-step:nth-child(5)');
        const line1 = progressBar.querySelector('.progress-line:nth-child(2)');
        const line2 = progressBar.querySelector('.progress-line:nth-child(4)');
        
        if (step1) step1.classList.add('completed');
        if (step2) {
            step2.classList.remove('active');
            step2.classList.add('completed');
            console.log('Added completed class to step 2');
        }
        if (step3) {
            step3.classList.add('active');
            console.log('Added active class to step 3');
        }
        if (line1) line1.classList.add('completed');
        if (line2) {
            line2.classList.add('completed');
            console.log('Added completed class to line 2');
        }
    }
    
    console.log('Progress bar update completed');
}

function initializeProgressBar() {
    // Set initial state based on current modal
    const currentModal = document.querySelector('.application-form-modal[style*="display: block"]');
    if (currentModal) {
        if (currentModal.id === 'eticketApplicationForm') {
            updateProgressBar(1);
        } else if (currentModal.id === 'eticketApplicationFormStep2') {
            updateProgressBar(2);
        } else if (currentModal.id === 'eticketApplicationFormStep3') {
            updateProgressBar(3);
        }
    }
}

// Enhanced form navigation functions
function goToStep2() {
    console.log('Going to step 2...');
    closeApplicationForm();
    setTimeout(() => {
        openModal(eticketApplicationFormStep2);
        setTimeout(() => {
            initializeMobileFormHandling();
            updateProgressBar(2);
            initializeApplicationFormStep2();
            console.log('Step 2 navigation completed');
        }, 100);
    }, 300);
}

function goToStep3() {
    console.log('Going to step 3...');
    closeApplicationFormStep2();
    setTimeout(() => {
        openModal(eticketApplicationFormStep3);
        setTimeout(() => {
            initializeMobileFormHandling();
            updateProgressBar(3);
            initializeStep3Form();
            console.log('Step 3 navigation completed');
        }, 100);
    }, 300);
}

function goBackToStep1() {
    console.log('Going back to step 1...');
    closeApplicationFormStep2();
    setTimeout(() => {
        openModal(eticketApplicationForm);
        setTimeout(() => {
            initializeMobileFormHandling();
            updateProgressBar(1);
        }, 100);
    }, 300);
}

function goBackToStep2() {
    console.log('Going back to step 2...');
    closeApplicationFormStep3();
    setTimeout(() => {
        openModal(eticketApplicationFormStep2);
        setTimeout(() => {
            initializeMobileFormHandling();
            updateProgressBar(2);
        }, 100);
    }, 300);
}

// Step 3 form submission handler
function handleStep3Submit(event) {
    event.preventDefault();
    console.log('Step 3 form submitted');
    
    if (validateStep3Form()) {
        console.log('Step 3 form is valid, proceeding to confirmation page');
        openConfirmationPage();
    } else {
        console.log('Step 3 form validation failed');
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
    }
    
            return false;
        }
        


// Confirmation Page Functions
function openConfirmationPage() {
    // Close current modal
        closeApplicationFormStep3();
    
    // Populate confirmation fields with form data
    populateConfirmationFields();
    
    // Open confirmation modal
        setTimeout(() => {
        const confirmationModal = document.getElementById('confirmationPageModal');
        if (confirmationModal) {
            openModal(confirmationModal);
            // Update progress bar to show step 3 as active
            updateConfirmationProgressBar();
        }
        }, 300);
}

function updateConfirmationProgressBar() {
    // Ensure step 3 is shown as active in confirmation page
    const progressSteps = document.querySelectorAll('#confirmationPageModal .progress-step');
    const progressLines = document.querySelectorAll('#confirmationPageModal .progress-line');
    
    // Mark steps 1 and 2 as completed
    if (progressSteps[0]) progressSteps[0].classList.add('completed');
    if (progressSteps[1]) progressSteps[1].classList.add('completed');
    if (progressSteps[2]) progressSteps[2].classList.add('active');
    
    // Mark progress lines as completed
    if (progressLines[0]) progressLines[0].classList.add('completed');
    if (progressLines[1]) progressLines[1].classList.add('completed');
}

function populateConfirmationFields() {
    // Get form data from step 2
    const firstName = document.getElementById('firstName')?.value || '';
    const lastName = document.getElementById('lastName')?.value || '';
    const gender = document.getElementById('gender')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const birthDate = document.getElementById('birthDate')?.value || '';
    const address = document.getElementById('address')?.value || '';
    const city = document.getElementById('city')?.value || '';
    const homeCountry = document.getElementById('homeCountry')?.value || '';
    const passportNumber = document.getElementById('passportNumber')?.value || '';
    const passportCountry = document.getElementById('passportCountry')?.value || '';
    const civilStatus = document.getElementById('civilStatus')?.value || '';
    const occupation = document.getElementById('occupation')?.value || '';
    const travelPurpose = document.getElementById('travelPurpose')?.value || '';
    const arrivalDate = document.getElementById('arrivalDate')?.value || '';
    const arrivalAirport = document.getElementById('arrivalAirport')?.value || '';
    const airline = document.getElementById('airline')?.value || '';
    const flightNumber = document.getElementById('flightNumber')?.value || '';
    const accommodation = document.getElementById('accommodation')?.value || '';
    const stayDays = document.getElementById('stayDays')?.value || '';

    // Get form data from step 1
    const homeAddress = document.getElementById('homeAddress')?.value || '';
    const residenceCountry = document.getElementById('residenceCountry')?.value || '';
    const stateRegion = document.getElementById('stateRegion')?.value || '';
    const postalCode = document.getElementById('postalCode')?.value || '';

    // Populate confirmation fields
    document.getElementById('confirmFirstName').textContent = firstName;
    document.getElementById('confirmLastName').textContent = lastName;
    document.getElementById('confirmGender').textContent = gender === 'M' ? 'Masculin' : gender === 'F' ? 'Féminin' : '';
    document.getElementById('confirmPhone').textContent = phone;
    document.getElementById('confirmEmail').textContent = email;
    document.getElementById('confirmBirthDate').textContent = birthDate;
    document.getElementById('confirmAddress').textContent = address || homeAddress;
    document.getElementById('confirmCity').textContent = city;
    document.getElementById('confirmCountry').textContent = homeCountry || residenceCountry;
    document.getElementById('confirmPassport').textContent = passportNumber;
    document.getElementById('confirmPassportCountry').textContent = passportCountry;
    document.getElementById('confirmCivilStatus').textContent = getCivilStatusText(civilStatus);
    document.getElementById('confirmOccupation').textContent = occupation;
    document.getElementById('confirmTravelPurpose').textContent = getTravelPurposeText(travelPurpose);
    document.getElementById('confirmArrivalDate').textContent = arrivalDate;
    document.getElementById('confirmArrivalAirport').textContent = arrivalAirport;
    document.getElementById('confirmAirline').textContent = airline;
    document.getElementById('confirmFlightNumber').textContent = flightNumber;
    document.getElementById('confirmAccommodation').textContent = accommodation;
    document.getElementById('confirmStayDays').textContent = stayDays;
}

function getCivilStatusText(status) {
    const statusMap = {
        'single': 'Célibataire',
        'married': 'Marié(e)',
        'divorced': 'Divorcé(e)',
        'widowed': 'Veuf/Veuve'
    };
    return statusMap[status] || status;
}

function getTravelPurposeText(purpose) {
    const purposeMap = {
        'tourism': 'Tourisme',
        'business': 'Affaires',
        'family': 'Famille',
        'medical': 'Médical',
        'education': 'Éducation',
        'transit': 'Transit'
    };
    return purposeMap[purpose] || purpose;
}

function closeConfirmationPage() {
    const confirmationModal = document.getElementById('confirmationPageModal');
    if (confirmationModal) {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
    }
}

function goBackToStep3() {
    closeConfirmationPage();
    setTimeout(() => {
        openModal(eticketApplicationFormStep3);
    }, 300);
}

function proceedToFinalStep() {
    // Close confirmation page
    closeConfirmationPage();
    
    // Show success modal or proceed to final step
            setTimeout(() => {
                openModal(successModal);
        generateTicketNumber();
    }, 300);
}

function changeConfirmationLanguage(lang) {
    const titles = {
        fr: {
            title: "CONFIRMEZ VOS DÉTAILS",
            instruction: "Veuillez vérifier toutes les informations avant de continuer",
            personalInfo: "INFORMATIONS PERSONNELLES",
            travelInfo: "INFORMATIONS DE VOYAGE",
            back: "RETOUR",
            next: "SUIVANT"
        },
        en: {
            title: "CONFIRM YOUR DETAILS",
            instruction: "Please verify all information before continuing",
            personalInfo: "PERSONAL INFORMATION",
            travelInfo: "TRAVEL INFORMATION",
            back: "BACK",
            next: "NEXT"
        },
        es: {
            title: "CONFIRME SUS DETALLES",
            instruction: "Por favor verifique toda la información antes de continuar",
            personalInfo: "INFORMACIÓN PERSONAL",
            travelInfo: "INFORMACIÓN DE VIAJE",
            back: "ATRÁS",
            next: "SIGUIENTE"
        }
    };

    const currentLang = titles[lang] || titles.fr;
    
    // Update title and instruction
    const titleElement = document.querySelector('#confirmationPageModal h2');
    if (titleElement) titleElement.textContent = currentLang.title;
    
    const instructionElement = document.querySelector('#confirmationPageModal .confirmation-instruction');
    if (instructionElement) instructionElement.textContent = currentLang.instruction;
    
    // Update section headers
    const personalInfoHeader = document.querySelector('#confirmationPageModal .confirmation-group h3');
    if (personalInfoHeader) personalInfoHeader.textContent = currentLang.personalInfo;
    
    // Update buttons
    const backButton = document.querySelector('#confirmationPageModal .btn-secondary');
    if (backButton) backButton.textContent = currentLang.back;
    
    const nextButton = document.querySelector('#confirmationPageModal .btn-primary');
    if (nextButton) nextButton.textContent = currentLang.next;
}

// Step 3 Form Functions
function initializeStep3Form() {
    console.log('Initializing Step 3 form...');
    
    // Initialize radio buttons
    initializeRadioButtons();
    
    // Initialize checkboxes
    initializeCheckboxes();
    
    // Initialize form validation
    initializeStep3Validation();
    
    // Set up form submission
    const form = document.getElementById('applicationFormStep3');
    if (form) {
        form.addEventListener('submit', handleStep3Submit);
    }
    
    console.log('Step 3 form initialized successfully');
}

function initializeRadioButtons() {
    const radioGroups = document.querySelectorAll('#applicationFormStep3 .radio-group');
    
    radioGroups.forEach(group => {
        const radioButtons = group.querySelectorAll('input[type="radio"]');
        
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                // Remove active class from all labels in this group
                const labels = group.querySelectorAll('.radio-label');
                labels.forEach(label => label.classList.remove('active'));
                
                // Add active class to selected label
                if (this.checked) {
                    this.closest('.radio-label').classList.add('active');
                }
            });
        });
    });
}

function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll('#applicationFormStep3 input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.checkbox-label');
            if (this.checked) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    });
}

function initializeStep3Validation() {
    const form = document.getElementById('applicationFormStep3');
    if (!form) return;
    
    // Add real-time validation
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('change', function() {
            validateField(this);
        });
        
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const fieldContainer = field.closest('.form-group');
    const errorElement = fieldContainer.querySelector('.field-error');
    
    // Remove existing error
    if (errorElement) {
        errorElement.remove();
    }
    
    // Validate required fields
    if (field.hasAttribute('required')) {
        let isValid = true;
        
        if (field.type === 'radio') {
            const radioGroup = field.closest('.radio-group');
            const checkedRadio = radioGroup.querySelector('input[type="radio"]:checked');
            isValid = checkedRadio !== null;
        } else if (field.type === 'checkbox') {
            isValid = field.checked;
        } else {
            isValid = field.value.trim() !== '';
        }
        
        if (!isValid) {
            showFieldError(fieldContainer, 'Ce champ est obligatoire');
        }
    }
    
    // Validate number fields
    if (field.type === 'number' && field.value !== '') {
        const value = parseFloat(field.value);
        if (isNaN(value) || value < 0) {
            showFieldError(fieldContainer, 'Veuillez entrer un nombre valide');
        }
    }
}

function showFieldError(container, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    container.appendChild(errorElement);
}

function validateStep3Form() {
    const form = document.getElementById('applicationFormStep3');
    if (!form) return false;
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Clear all existing errors
    const existingErrors = form.querySelectorAll('.field-error');
    existingErrors.forEach(error => error.remove());
    
    // Validate each required field
    requiredFields.forEach(field => {
        let fieldValid = true;
        
        if (field.type === 'radio') {
            const radioGroup = field.closest('.radio-group');
            const checkedRadio = radioGroup.querySelector('input[type="radio"]:checked');
            fieldValid = checkedRadio !== null;
        } else if (field.type === 'checkbox') {
            fieldValid = field.checked;
        } else {
            fieldValid = field.value.trim() !== '';
        }
        
        if (!fieldValid) {
            const fieldContainer = field.closest('.form-group');
            showFieldError(fieldContainer, 'Ce champ est obligatoire');
            isValid = false;
        }
    });
    
    return isValid;
}

function handleStep3Submit(event) {
    event.preventDefault();
    
    if (validateStep3Form()) {
        console.log('Step 3 form is valid, proceeding to confirmation page');
        openConfirmationPage();
    } else {
        console.log('Step 3 form validation failed');
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
    }
}

function changeAppLanguageStep3(lang) {
    const translations = {
        fr: {
            title: "INFORMATION DE DOUANNE",
            mandatory: "Les champs marqués d'un astérisque rouge (*) sont obligatoires",
            customsDeclaration: "DÉCLARATION EN DOUANE",
            prohibitedItems: "ARTICLES INTERDITS",
            commercialGoods: "MARCHANDISES COMMERCIALES",
            personalEffects: "EFFETS PERSONNELS",
            additionalInfo: "INFORMATIONS COMPLÉMENTAIRES",
            termsConditions: "CONDITIONS ET DÉCLARATIONS",
            back: "RETOUR",
            next: "SUIVANT",
            // Form field labels
            declaredGoods: "Transportez-vous des marchandises ou objets soumis à déclaration ? *",
            currency: "Transportez-vous des devises ou instruments de paiement dépassant 10 000 USD ? *",
            animals: "Transportez-vous des animaux vivants, plantes ou produits alimentaires ? *",
            taxGoods: "Transportez-vous des biens soumis à la taxe ? *",
            weapons: "Transportez-vous des armes, munitions ou explosifs ? *",
            drugs: "Transportez-vous des drogues, substances psychotropes ou médicaments sans ordonnance ? *",
            counterfeit: "Transportez-vous des objets de contrefaçon ou des produits illégaux ? *",
            commercialGoodsQuestion: "Transportez-vous des marchandises à des fins commerciales ? *",
            goodsValue: "Valeur totale estimée des marchandises transportées (USD)",
            goodsDescription: "Description des marchandises principales",
            personalEffectsValue: "Valeur totale de vos effets personnels (USD)",
            luggageCount: "Nombre de bagages transportés",
            additionalInfoField: "Informations supplémentaires à déclarer",
            unaccompaniedMinors: "Voyagez-vous avec des mineurs non accompagnés ?",
            customsTerms: "J'ai lu et j'accepte les conditions de déclaration en douane. *",
            truthDeclaration: "Je déclare que toutes les informations fournies sont exactes et complètes. *",
            complianceDeclaration: "Je m'engage à respecter toutes les réglementations douanières de la RDC. *",
            yes: "Oui",
            no: "Non",
            selectOption: "Sélectionnez",
            luggageOptions: {
                "1": "1 bagage",
                "2": "2 bagages",
                "3": "3 bagages",
                "4": "4 bagages",
                "5+": "5+ bagages"
            }
        },
        en: {
            title: "CUSTOMS INFORMATION",
            mandatory: "Fields marked with a red asterisk (*) are mandatory",
            customsDeclaration: "CUSTOMS DECLARATION",
            prohibitedItems: "PROHIBITED ITEMS",
            commercialGoods: "COMMERCIAL GOODS",
            personalEffects: "PERSONAL EFFECTS",
            additionalInfo: "ADDITIONAL INFORMATION",
            termsConditions: "TERMS AND CONDITIONS",
            back: "BACK",
            next: "NEXT",
            // Form field labels
            declaredGoods: "Are you transporting goods or items subject to declaration? *",
            currency: "Are you transporting currency or payment instruments exceeding 10,000 USD? *",
            animals: "Are you transporting live animals, plants or food products? *",
            taxGoods: "Are you transporting goods subject to tax? *",
            weapons: "Are you transporting weapons, ammunition or explosives? *",
            drugs: "Are you transporting drugs, psychotropic substances or prescription drugs? *",
            counterfeit: "Are you transporting counterfeit items or illegal products? *",
            commercialGoodsQuestion: "Are you transporting goods for commercial purposes? *",
            goodsValue: "Total estimated value of transported goods (USD)",
            goodsDescription: "Description of main goods",
            personalEffectsValue: "Total value of your personal effects (USD)",
            luggageCount: "Number of luggage transported",
            additionalInfoField: "Additional information to declare",
            unaccompaniedMinors: "Are you traveling with unaccompanied minors?",
            customsTerms: "I have read and accept the customs declaration conditions. *",
            truthDeclaration: "I declare that all information provided is accurate and complete. *",
            complianceDeclaration: "I commit to respect all customs regulations of the DRC. *",
            yes: "Yes",
            no: "No",
            selectOption: "Select",
            luggageOptions: {
                "1": "1 luggage",
                "2": "2 luggage",
                "3": "3 luggage",
                "4": "4 luggage",
                "5+": "5+ luggage"
            }
        },
        es: {
            title: "INFORMACIÓN DE ADUANAS",
            mandatory: "Los campos marcados con un asterisco rojo (*) son obligatorios",
            customsDeclaration: "DECLARACIÓN DE ADUANAS",
            prohibitedItems: "ARTÍCULOS PROHIBIDOS",
            commercialGoods: "MERCANCÍAS COMERCIALES",
            personalEffects: "EFECTOS PERSONALES",
            additionalInfo: "INFORMACIÓN ADICIONAL",
            termsConditions: "TÉRMINOS Y CONDICIONES",
            back: "ATRÁS",
            next: "SIGUIENTE",
            // Form field labels
            declaredGoods: "¿Transporta mercancías u objetos sujetos a declaración? *",
            currency: "¿Transporta divisas o instrumentos de pago que excedan 10,000 USD? *",
            animals: "¿Transporta animales vivos, plantas o productos alimenticios? *",
            taxGoods: "¿Transporta bienes sujetos a impuestos? *",
            weapons: "¿Transporta armas, municiones o explosivos? *",
            drugs: "¿Transporta drogas, sustancias psicotrópicas o medicamentos sin receta? *",
            counterfeit: "¿Transporta objetos falsificados o productos ilegales? *",
            commercialGoodsQuestion: "¿Transporta mercancías con fines comerciales? *",
            goodsValue: "Valor total estimado de las mercancías transportadas (USD)",
            goodsDescription: "Descripción de las mercancías principales",
            personalEffectsValue: "Valor total de sus efectos personales (USD)",
            luggageCount: "Número de equipajes transportados",
            additionalInfoField: "Información adicional a declarar",
            unaccompaniedMinors: "¿Viaja con menores no acompañados?",
            customsTerms: "He leído y acepto las condiciones de declaración de aduanas. *",
            truthDeclaration: "Declaro que toda la información proporcionada es precisa y completa. *",
            complianceDeclaration: "Me comprometo a respetar todas las regulaciones aduaneras de la RDC. *",
            yes: "Sí",
            no: "No",
            selectOption: "Seleccionar",
            luggageOptions: {
                "1": "1 equipaje",
                "2": "2 equipajes",
                "3": "3 equipajes",
                "4": "4 equipajes",
                "5+": "5+ equipajes"
            }
        }
    };

    const currentLang = translations[lang] || translations.fr;
    
    // Update main title
    const titleElement = document.querySelector('#eticketApplicationFormStep3 h2');
    if (titleElement) {
        titleElement.innerHTML = `<i class="fas fa-shield-alt"></i> ${currentLang.title}`;
    }
    
    // Update mandatory notice
    const mandatoryElement = document.querySelector('#eticketApplicationFormStep3 .mandatory-notice');
    if (mandatoryElement) {
        mandatoryElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${currentLang.mandatory}`;
    }
    
    // Update section headers
    const sectionHeaders = document.querySelectorAll('#eticketApplicationFormStep3 .form-subsection h3');
    sectionHeaders.forEach((header, index) => {
        const icon = header.querySelector('i');
        const iconClass = icon ? icon.className : '';
        
        switch(index) {
            case 0: // Customs Declaration
                header.innerHTML = `<i class="${iconClass}"></i> ${currentLang.customsDeclaration}`;
                break;
            case 1: // Prohibited Items
                header.innerHTML = `<i class="${iconClass}"></i> ${currentLang.prohibitedItems}`;
                break;
            case 2: // Commercial Goods
                header.innerHTML = `<i class="${iconClass}"></i> ${currentLang.commercialGoods}`;
                break;
            case 3: // Personal Effects
                header.innerHTML = `<i class="${iconClass}"></i> ${currentLang.personalEffects}`;
                break;
            case 4: // Additional Information
                header.innerHTML = `<i class="${iconClass}"></i> ${currentLang.additionalInfo}`;
                break;
            case 5: // Terms and Conditions
                header.innerHTML = `<i class="${iconClass}"></i> ${currentLang.termsConditions}`;
                break;
        }
    });
    
    // Update form labels
    updateFormLabels(currentLang);
    
    // Update buttons
    const backButton = document.querySelector('#eticketApplicationFormStep3 .btn-secondary');
    if (backButton) backButton.innerHTML = `<i class="fas fa-arrow-left"></i> ${currentLang.back}`;
    
    const nextButton = document.querySelector('#eticketApplicationFormStep3 .btn-primary');
    if (nextButton) nextButton.innerHTML = `<i class="fas fa-arrow-right"></i> ${currentLang.next}`;
    
    // Update radio button texts
    const radioTexts = document.querySelectorAll('#eticketApplicationFormStep3 .radio-text');
    radioTexts.forEach(text => {
        if (text.textContent === 'Oui' || text.textContent === 'Yes' || text.textContent === 'Sí') {
            text.textContent = currentLang.yes;
        } else if (text.textContent === 'Non' || text.textContent === 'No') {
            text.textContent = currentLang.no;
        }
    });
    
    // Update select options
    const luggageSelect = document.querySelector('#eticketApplicationFormStep3 select[name="luggageCount"]');
    if (luggageSelect) {
        const options = luggageSelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.value === '') {
                option.textContent = currentLang.selectOption;
            } else if (currentLang.luggageOptions[option.value]) {
                option.textContent = currentLang.luggageOptions[option.value];
            }
        });
    }
    
    console.log(`Step 3 language changed to: ${lang}`);
}

function updateFormLabels(translations) {
    // Update all form labels based on their name attributes
    const formLabels = document.querySelectorAll('#eticketApplicationFormStep3 .form-group label');
    
    formLabels.forEach(label => {
        const input = label.querySelector('input, textarea, select');
        if (!input) return;
        
        const fieldName = input.name;
        let newLabel = '';
        
        switch(fieldName) {
            case 'declaredGoods':
                newLabel = translations.declaredGoods;
                break;
            case 'currency':
                newLabel = translations.currency;
                break;
            case 'animals':
                newLabel = translations.animals;
                break;
            case 'taxGoods':
                newLabel = translations.taxGoods;
                break;
            case 'weapons':
                newLabel = translations.weapons;
                break;
            case 'drugs':
                newLabel = translations.drugs;
                break;
            case 'counterfeit':
                newLabel = translations.counterfeit;
                break;
            case 'commercialGoods':
                newLabel = translations.commercialGoodsQuestion;
                break;
            case 'goodsValue':
                newLabel = translations.goodsValue;
                break;
            case 'goodsDescription':
                newLabel = translations.goodsDescription;
                break;
            case 'personalEffectsValue':
                newLabel = translations.personalEffectsValue;
                break;
            case 'luggageCount':
                newLabel = translations.luggageCount;
                break;
            case 'additionalInfo':
                newLabel = translations.additionalInfoField;
                break;
            case 'unaccompaniedMinors':
                newLabel = translations.unaccompaniedMinors;
                break;
        }
        
        if (newLabel) {
            label.textContent = newLabel;
        }
    });
    
    // Update checkbox texts
    const checkboxTexts = document.querySelectorAll('#eticketApplicationFormStep3 .checkbox-text');
    checkboxTexts.forEach(text => {
        if (text.textContent.includes('conditions de déclaration en douane')) {
            text.textContent = translations.customsTerms;
        } else if (text.textContent.includes('informations fournies sont exactes')) {
            text.textContent = translations.truthDeclaration;
        } else if (text.textContent.includes('réglementations douanières')) {
            text.textContent = translations.complianceDeclaration;
        }
    });
    
    // Update placeholders
    const textareas = document.querySelectorAll('#eticketApplicationFormStep3 textarea');
    textareas.forEach(textarea => {
        if (textarea.name === 'goodsDescription') {
            textarea.placeholder = translations.goodsDescription + '...';
        } else if (textarea.name === 'additionalInfo') {
            textarea.placeholder = translations.additionalInfoField + '...';
        }
    });
}

function openVoyageurPage() {
    console.log('openVoyageurPage called');
    window.location.href = 'exigences-modal.html';
}

