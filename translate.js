// Get the current URL and extract the language code
const currentUrl = new URL(window.location.href);
const languageCode = currentUrl.pathname.split('/')[1] in ["en", "zh"] ? (currentUrl.pathname.split('/')[1] || 'en') : 'en'; // Default to 'en' if no language code is present

// Function to load and apply translations
function applyTranslations() {
  // Fetch the translations for the current language
  fetch(`/static/${languageCode}/default.json`)
    .then(response => response.json())
    .then(translations => {
      // Translate all text elements on the page
      document.body.childNodes.forEach(node => {
        translateNode(node, translations);
      });
      document.body.classList.add('translations-complete');
    })
    .catch(error => {
      console.error('Error loading default translation file:', error);
    });
}



function translateNode(node, translations) {
  if (node.nodeType != Node.TEXT_NODE) {
    node.childNodes.forEach(childNode => {
      translateNode(childNode, translations);
    });
    return;
  }


  const originalText = node.textContent.split(';')[0].trim();
  if (translations[originalText] !== undefined) {
    let translatedText = translations[originalText];
    const variables = originalText.match(/\$\d+/g);
    if (variables) {
      const temp = node.textContent.split(';');
      variables.forEach((variable, index) => {
        const value = temp[index + 1].trim();
        translatedText = translatedText.replace(variable, value);
      });
    }
    const translatedNode = document.createElement('span');
    translatedNode.textContent = translatedText;
    node.parentNode.replaceChild(translatedNode, node);
  } else {
    console.log('No translation found for:', originalText);
  }
}

// Call the applyTranslations function when the page is loaded
window.addEventListener('load', applyTranslations);