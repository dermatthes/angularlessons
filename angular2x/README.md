# Angular 2.0 aware best practice

## Aufbauorganisation und Definition des Projekts

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

### Directory structure

Keep data together:

* __One file module-policy__: There is no practical solution to map names to files. So we put everything used by one module
  into one file.
  
* __Kein Ermessensspielraum für Namespace__: Es sollte nicht im ermessen des Programmierers liegen, ob ein
  Modul global, Ressource oder ähnliches ist. Deshalb gibt es eine klare Verzeichnisstrukur mit klaren Regeln,
  welche Datei wo hin gehört.
  
* __Die Hauptdatei `<modname>.js` trägt den Namen des parent-Vereichnis.__ Dies klingt zunächst doppelt-gemoppelt, hat 
  jedoch folgenden Grund: Die Alternative wäre nämlich, die Hauptdatei immer `module.js` o.ä. zu nennen - 
  Allerdings kann das zu Problemen mit der IDE führen, da diese normalerweise nur den Dateinamen (ohne Verzeichnis) 
  in der Schnellansicht anzeigen. Außerdem zeigt auch GIT in der Schnellansicht die Änderungen nur per Dateinamen an.

* __Singular für alle Namen__: Wie bei Modellen werden auch hier alle Namen im Singular formuliert. Das hat
  drei Gründe: Erstens sollte man sich auf eines von beiden festlegen. Zweitens sehen die namespaces besser aus und
  sind meisst sogar einen buchstaben kürzer: Beispiel: "service.MusicService" liest sich besser als "services.MusicService".
  Drittens: Die Pluralform lässt sich oft schlechter tippen: "service" vs. "services", "module" vs "modules" und 
  z.T. sind Sonderformen zu beachten: "child" vs. "children"

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
------------ css/ .............................. CSS used by main site.
```

### Eindeutige Abbildung Namespace <=> Dateisystem

Jedes Modul und jeder Service __muss__ vom Namespace 1:1 auf das Dateisystem abbildbar sein.

Beispiel:

module.main.service.searchService => /app/module/main/service/searchService.js


### Defining Modules

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


### Services (global)

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


## Best-Practice

### Das Hauptmodul `module.main`

Es gibt keine Initialisierungdatei. Es wird lediglich das Hauptmodul `module.main` der Controller
`MainCtrl` aufgerufen.

```html
<html ng-app="module.main" ng-controller="MainCtrl as main">
...
</html>
```

### `$scope` sollte nicht mehr genutzt werden

Die Nutzung von `$scope` wird in Angular 2.0 deprecated sein. Stattdessen wird `this` genutzt, um Daten
an den View zu senden.

Beispiel:

```js
this.title = "newSiteTitle";
```

Im Template wird die `controller as` Konstruktion genutzt:

```html
<html ng-controller="SiteCtrl as site">
    <head>
       <title>{{site.title}}</title>
    </head>
```

### Setzen von Werten im Parent-Scope

Im Gegensatz zur nutzung von `$scope` können auf diese Weise keine Methoden/Werte im paren-Scope
gesetzt werden. Soll z.B. der titel auch von ChildCtrl aus geändert werden können, so muss der
Title vorher als Service zu definieren:

Es kann sich lohnen, hier eine PageService anzulegen, der alle Bereiche einer Seite abdeckt.

### $watch() - Ausdrücke vermeiden

Click-Events usw. sollten auf Methods im Controller mappen:

```
this.clickXy = function () {
}
```

Im Template

```
<a ng-click="clickXy()">Click me</a>
```

### Keine-DOM-Manipulation vom Controller aus

Das Template sollte vom Controller nicht per DOM-Manipulation aus modifiziert werden. (z.B. indem
jQuery genutzt wird, um Klassen umzubiegen).
 


