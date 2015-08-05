# Angular 2.0 aware best practise

Folgende Ziele werden verfolgt:

* __Klare Dateizuordnung__: Ein Modul / Service muss anhand seines Namens eindeutig auf eine
  Datei abbildbar sein. 
  
* __Gruppierungsfunktion__: Zusammenhängende Teile sollen zusammen bleiben: Ein Template, das ausschließlich
  in einem Modul genutzt wird, soll auch im gleichen Verzeichnis liegen. Erstens, um es schneller zu finden,
  zweitens um sich schneller einen Überblick über den Funktionsumfang verschaffen zu können. Es wird daher nicht
  funktional gruppliert sondern modular.
  
* __Große Dateien__: Ausschließlich innerhalb eines Modules genutzte services etc. sollten, insoweit sie 
  überschaubar bleiben, innerhalb der Hauptdatei definiert werden. Dies verhindert das Splitting in viele
  kleine Dateien und fördert die Übersichtlichkeit, da auf einem Blick (optimalerweise) alle genutzten
  Controller und Services sowie die Konfiguration ersichtlich wird.

## Directory structure

Keep data together:

* There is no practical solution to map names to files. So we put everything used by one module
  into one file.
  
* Die Hauptdatei `<modname>.js` trägt den Namen des parent-Vereichnis. Dies klingt zunächst doppelt-gemoppelt, hat 
  jedoch folgenden Grund: Die Alternative wäre nämlich, die Hauptdatei immer `module.js` o.ä. zu nennen - 
  Allerdings kann das zu Problemen mit der IDE führen, da diese normalerweise nur den Dateinamen (ohne Verzeichnis) 
  in der Schnellansicht anzeigen. Außerdem zeigt auch GIT in der Schnellansicht die Änderungen nur per Dateinamen an.

```
---- app/
-------- module/ ............................... Custom controllers
------------ mod1/ ............................. Each module in a dedicated folder
---------------- mod1.js ..................... All JavaScript code is concentrated in one module.js
---------------- template.tpl.html ............. Templates are located close to the code
---------------- style.css ..................... Even css is located here
------------ mod2/
---------------- mod2.js
---------------- template.tpl.html
-------- service/ .............................. All services (used by more than one controller) are located in this folder
------------ service1.js ....................... One file per service / factory
------------ service2.js
-------- directive/ ............................ Custome directives go here
------------ directive1/ ....................... One directory per directive
---------------- directive1.js ................. All code in one js-file
---------------- template1.tpl.js .............. Templates located close to the js
-------- lib/ .................................. 3rd Party libraries
-------- asset/
------------ css/ .............................. CSS used by the main module
------------ 
---- app.route.js .............................. The main Routes
---- app.module.js ............................. Initialisiation of the main Module, etc.
```


## Defining Modules

Modules sind Kompostitionen aus Controllern, Configurations und Services. Sie sind die Darstellung
der Daten.

> Modules bezeichnet hier etwas anderes als ein angular.module(), welches lediglich
> einen Namespace bezeichnet

 werden immer unter separaetem Namespace definiert und tragen das Suffix 'Ctrl'.

Controller liegen unter `app/module/<modname>/<modname>.js` und wird wie folgt aufgebaut:

```js
angular.module ("module.<modname>", [])
    .config(function ($routeProvider) {
        ..some route config..
    })
    
    .controller ("SomeCtrl", function () {
        ..code..
    })
    
    .controller ("NextCtrl", function () {
        ..code..
    });
```

Sollte die Datei zu groß werden, können Services, die ausschließlich von diesem Modul
konsumiert werden auch unter dessen Namespace als eigene Datei gespeichert werden:


## Services (global)

Wird ein Service von mehr als einem Modul genutzt, ist dieser unterhalb des Namesapce
`service.` anzulegen.

Im Gegensatz zur Definition von Controllern, ist ein Service __immer__ als eigenständige
Klasse (`function ServiceName ()`) zu definieren und dem Module per factory zu übergeben.

Diskussion:
* __Warum eigenständige Klasse?__: Services können per DI in Controllern oder anderen Services aufgerufen werden.
  Die Definition als eigenständige Klasse ermöglicht der IDE die Code-Completion.

Ein Beispiel:

```js

function SomeService (param) {
    ..some code..
}

angular.module ("service.<serviceName>", []).factory ("SomeService", function () { return new SomeService() });

```




