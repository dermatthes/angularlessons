# 1: Hello World

Der Weg zur ersten Angular-App ist recht kurz:

## Einbinden von Angular-JS

Angular kann/sollte direkt per CDN eingebunden werden. Da script-tags blocking sind und der Browser mit dem 
Rendern wartet, bis diese geladen sind, binden wir unsere Bibliotheken immer im Footer ein:

```
<script language="JavaScript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.js"></script>
```

## App-Verknüprung und Controller festlegen

Wir verbinden das aktuelle HTML-Template mit der App und dem Controller

```
<html ng-app="de.leuffen.helloWorld" ng-controller="SiteCtrl">
```


## App Initialisieren

```js
var app = angular.module("de.leuffen.helloWorld", []);
```

Der Parameter 2 `[]` definiert die Abhängigkeiten. Dieser Parameter **muss** angegeben werden. Sonst startet die App nicht.


## Unser erster Controller

```js

app.controller ("SiteCtrl", function ($scope) {
});

```

Definiert einen neuen Controller `SiteCtrl`. Analysiert per Reflection, wie die Parameter in `function()` heissen
und bindet anhand des Namens die Klassen ein.

`$scope` definiert alle Werte, auf die in den Templates zugegriffen werden kann. Ändere ich etwas an $scope, wirkt
sich die Änderung direkt auf das Template aus.