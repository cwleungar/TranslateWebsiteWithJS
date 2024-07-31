// Get the current URL and extract the language code
const currentUrl = new URL(window.location.href);
const languageCode = currentUrl.pathname.split('/')[1] in ["en","zh"] ? (currentUrl.pathname.split('/')[1] || 'en'):'en'; // Default to 'en' if no language code is present

// Function to load and apply translations
function applyTranslations() {

  // Translate elements with the "translate" class
  document.querySelectorAll('.translate').forEach(element => {
    const originalText = element.textContent;
    fetch(`/static/${languageCode}/default.json`)
      .then(response => response.json())
      .then(translations => {
        if (translations[originalText] === undefined ){
            console.log('No translation found for:', originalText);
        }
        else{
            const translatedText = translations[originalText]
            element.textContent = translatedText;
        }

      })
      .catch(error => {
        console.error('Error loading default translation file:', error);
      });
  });

  // Translate elements with the "translate:filename" class
  document.querySelectorAll('[class^="translate:"]').forEach(element => {
    const className = element.className;
    const filenameMatch = className.match(/translate:(\w+)/);
    const filename = filenameMatch ? filenameMatch[1] : 'default';

    fetch(`/static/${languageCode}/${filename}.json`)
      .then(response => response.json())
      .then(translations => {
        const originalText = element.textContent;
        if (translations[originalText] === undefined ){
            console.log('No translation found for:', originalText);
        }
        else{
            const translatedText = translations[originalText]
            element.textContent = translatedText;
        }
      })
      .catch(error => {
        console.error(`Error loading translation file for ${filename}:`, error);
      });
  });
  document.body.classList.add('translations-complete');

}

// Call the applyTranslations function when the page is loaded
window.addEventListener('load', applyTranslations);