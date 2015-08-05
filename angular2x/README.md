# Angular 2.0 aware best practise

## Directory structure

Keep data together:

* There is no practical solution to map names to files. So we put everything used by one module
  into one file.
  


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

```
```

## Services (global)

Wird ein Service von mehr als einem Modul genutzt, ist dieser unterhalb des Namesapce
`service.` anzulegen.

Im Gegensatz zur Definition von Controllern, ist ein Service __immer__ als eigenständige
Klasse (`function ServiceName ()`) zu definieren und dem Module per factory zu übergeben.

Ein Beispiel:

```js

function SomeService (param) {
    ..some code..
}

angular.module ("service.<serviceName>", []).service ("SomeService", SomeService);

```




