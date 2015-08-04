# Directory structure

Wie sollte ein Angular-Projekt aufgebaut sein, damit es möglichst einfach zu warten ist und
per Classloader automatisch geladen werden kann?

## Best Practise

Es bietet sich eine Aufteilung nach Funktionsbereichen an um dem Suchen von unterschiedlichen
Teilen eines Widgets in mehreren Vereichnissen vorzubeugen.

```
app/
----- shared/   // acts as reusable components or partials of our site
---------- sidebar/
--------------- sidebarDirective.js
--------------- sidebarView.html
---------- article/
--------------- articleDirective.js
--------------- articleView.html
----- components/   // each component is treated as a mini Angular app
---------- home/
--------------- homeController.js
--------------- homeService.js
--------------- homeView.html
---------- blog/
--------------- blogController.js
--------------- blogService.js
--------------- blogView.html
----- app.module.js
----- app.routes.js
assets/
----- img/      // Images and icons for your app
----- css/      // All styles and style related files (SCSS or LESS files)
----- js/       // JavaScript files written for your app that are not for angular
----- libs/     // Third-party libraries such as jQuery, Moment, Underscore, etc.
index.html

```


###