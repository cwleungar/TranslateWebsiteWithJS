# Translated Page Switcher
This is a JavaScript-based solution for displaying a translated version of a web page after all translations have been completed. It provides a smooth transition effect when revealing the translated content.

## Features
Automatically detects the current language code from the URL and applies the appropriate translations.

Hides the page content until all translations are complete to provide a seamless user experience.
Adds a smooth transition effect when revealing the translated content.

Can be easily integrated into your existing web application.

## Usage
To use this functionality, follow these steps:

### Website url settings:
The url should be in format ```https://domain.com/{langauage code}/path```

### Include the JavaScript code in your HTML file:

```
<script src="translate.js"></script>
<link rel="stylesheet" href="translate.css">
```

Add the translate class to any elements on your page that need to be translated. You can also use a class in the format ```translate:<filename>``` to specify a translation for a specific language.
```
<h1 class="translate">Welcome to our website</h1>
<p class="translate:es">Bienvenido a nuestro sitio web</p>
```

### Configure the translation files
put the translation json to ```/static/{language code}/{filename}.json ```.
For all lanugage, the system use default.json as default if no filename is specified in class
The structure inside the translation json is 
```
{
"original text":"translated text", 
"original text $1 $2":"translated $1 text $2" // <p>original text $1 $2,Sam,John</p> --> translated Sam text John
}
```
### Customise css
You can customize the appearance and behavior of the translated page switcher by modifying the CSS styles.

You can also adjust the transition duration and other styling properties as needed.

## Contributing
If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the GitHub repository.

## License
This project is licensed under the MIT License.
