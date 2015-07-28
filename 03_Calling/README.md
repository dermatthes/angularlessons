# Calling Angular controller methods


## Selection DOM inside Parameter

This is not allowed:

```html
<button ng-click="addToCart($('#quantity').val())">
```

## Calling a method on controller

Wir können auch methoden direkt im Controller aufrufen.

```js
app.controller ("SomeCtrl", function ($scope) {
    this.someAction = function () {
        ..do something..
    };
});
```

Benutze die `Controller as <name>` - Syntax, um den Controller zugänglich zu machen

```html
<div ng-controller="SomeCtrl as ctrl">
```

danach kann die Methode direkt aufgerufen werden:

```html
<button ng-click="ctrl.someAction()">
```

## Calling a method of another controller

Wird nicht unterstützt und auch nicht gewünscht, da dies eine feste Kopplung zwischen
mehreren Controllern bedeuten würde.

Stattdessen sollte auf `$scope.$broadcast()` und `$scope.$on()` zurückgegriffen werden, um inter-controller
calls Eventbasiert zu realisieren.