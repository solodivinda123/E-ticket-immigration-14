# Guide de Personnalisation du PDF E-TICKET

## 🎨 Comment Personnaliser Votre Document PDF

### 1. **Changer les Couleurs**

Dans `script.js`, lignes 470-473, modifiez ces variables :

```javascript
// Couleurs actuelles
const primaryColor = [30, 60, 114];     // Bleu foncé
const secondaryColor = [102, 126, 234]; // Bleu
const accentColor = [16, 185, 129];     // Vert
const textColor = [30, 41, 59];         // Gris foncé

// Exemples de couleurs alternatives :
// Rouge/Or (Thème National)
const primaryColor = [139, 0, 0];       // Rouge foncé
const secondaryColor = [255, 215, 0];   // Or

// Vert (Thème Nature)
const primaryColor = [34, 139, 34];     // Vert forêt
const secondaryColor = [50, 205, 50];   // Vert lime
```

### 2. **Modifier les Textes**

**En-tête (lignes 485-495) :**
```javascript
doc.text('E-TICKET', pageWidth/2, 25, { align: 'center' });
doc.text('République Démocratique du Congo', pageWidth/2, 40, { align: 'center' });
```

**Section Validité (lignes 580-585) :**
```javascript
doc.text('DOCUMENT VALIDE', pageWidth/2, validityY + 15, { align: 'center' });
doc.text('Ce document est valide pour l\'entrée et la sortie en République démocratique du Congo.', pageWidth/2, validityY + 30, { align: 'center' });
```

**Pied de Page (lignes 600-610) :**
```javascript
doc.text('GOUVERNEMENT DE LA RDC CONGO', pageWidth/2, footerY + 15, { align: 'center' });
doc.text('Direction Générale de Migration (DGM)', pageWidth/2, footerY + 30, { align: 'center' });
```

### 3. **Changer la Mise en Page**

**Marges (ligne 475) :**
```javascript
const margin = 20; // Augmentez pour plus d'espace, diminuez pour moins
```

**Position du contenu (ligne 500) :**
```javascript
const contentY = 70; // Plus haut = 60, plus bas = 80
```

### 4. **Ajouter des Sections**

Après la section validité, ajoutez :

```javascript
// Nouvelle section
const newSectionY = validityY + 60;
doc.setFillColor(248, 250, 252);
doc.roundedRect(margin, newSectionY, pageWidth - 2 * margin, 40, 8, 8, 'F');

doc.setTextColor(100, 116, 139);
doc.setFontSize(12);
doc.setFont('helvetica', 'bold');
doc.text('NOUVELLE SECTION', margin + 10, newSectionY + 15);

doc.setTextColor(textColor[0], textColor[1], textColor[2]);
doc.setFontSize(10);
doc.setFont('helvetica', 'normal');
doc.text('Votre texte ici', margin + 10, newSectionY + 25);
```

### 5. **Changer les Polices**

**Tailles disponibles :**
```javascript
doc.setFontSize(8);   // Petit
doc.setFontSize(10);  // Normal
doc.setFontSize(12);  // Moyen
doc.setFontSize(14);  // Grand
doc.setFontSize(16);  // Très grand
doc.setFontSize(28);  // Énorme
```

**Styles disponibles :**
```javascript
doc.setFont('helvetica', 'normal');   // Normal
doc.setFont('helvetica', 'bold');     // Gras
doc.setFont('helvetica', 'italic');   // Italique
```

### 6. **Exemples Pratiques**

**Thème Rouge/Or :**
```javascript
const primaryColor = [139, 0, 0];       // Rouge foncé
const secondaryColor = [255, 215, 0];   // Or
const accentColor = [220, 20, 60];      // Rouge vif
```

**Design Minimaliste :**
```javascript
const primaryColor = [64, 64, 64];      // Gris foncé
const secondaryColor = [128, 128, 128]; // Gris moyen
const accentColor = [169, 169, 169];    // Gris clair
```

### 7. **Conseils**

1. **Sauvegardez** votre version actuelle avant de modifier
2. **Testez** après chaque modification
3. **Vérifiez** que le PDF s'affiche correctement
4. **Utilisez** des couleurs contrastées pour la lisibilité

### 8. **Structure du Code**

La fonction `downloadPDF()` est organisée ainsi :
- Lignes 442-450 : Récupération des données
- Lignes 452-460 : Vérification jsPDF
- Lignes 462-470 : Création du document
- Lignes 472-480 : Configuration
- Lignes 482-490 : Définition des couleurs
- Lignes 492-600 : En-tête
- Lignes 502-580 : Contenu principal
- Lignes 582-620 : Sections spéciales
- Lignes 622-650 : Pied de page
- Lignes 652-660 : Sauvegarde

### 9. **Débogage**

Ajoutez ces lignes pour déboguer :
```javascript
console.log('Couleur primaire:', primaryColor);
console.log('Position Y:', contentY);
console.log('Largeur page:', pageWidth);
```

### 10. **Prochaines Étapes**

1. Choisissez vos couleurs
2. Modifiez les textes
3. Ajustez la mise en page
4. Testez le résultat
5. Demandez de l'aide si nécessaire !

---

**Besoin d'aide ?** Dites-moi ce que vous voulez modifier spécifiquement ! 