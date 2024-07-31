// Get the current URL and extract the language code
const currentUrl = new URL(window.location.href);
const languageCode = currentUrl.pathname.split('/')[1] in ["en","zh"] ? (currentUrl.pathname.split('/')[1] || 'en'):'en'; // Default to 'en' if no language code is present

// Function to load and apply translations
function applyTranslations() {

  // Translate elements with the "translate" class
  document.querySelectorAll('.translate').forEach(element => {
    fetch(`/static/${languageCode}/default.json`)
      .then(response => response.json())
      .then(translations => {
        translate(element,translations);
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
        translate(element,translations);
      })
  });
  document.body.classList.add('translations-complete');

}

function translate(element,translations){
  const originalText = element.textContent.split(',')[0];
        if (translations[originalText] === undefined ){
            console.log('No translation found for:', originalText);
        }
        else{
            let translatedText = translations[originalText];
            const variables = originalText.match(/\$\d+/g);
            if (variables) {
              const temp=element.textContent.split(',')
              variables.forEach((variable, index) => {
                const value = temp[index + 1];
                console.log(value);
                translatedText = translatedText.replace(variable, value);
              });
            }

            element.textContent = translatedText;
        }
}
// Call the applyTranslations function when the page is loaded
window.addEventListener('load', applyTranslations);