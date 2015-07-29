# Datenmonitoring und Events

## Watches  

Watches werden dazu benutzt, um Änderungen an einer Variable festzustellen und darauf zu reagieren.



### Angular 1.0 Methode

Angular 1.0 unterstützt folgendes:

```js
$scope.title = "Title";

$scope.$watch ("title", function (old, new) {
    ..code executed if $scope.title changes..
});
```

Dieser Syntax kann mit Angular 2.0 und dem Controller as Pattern nicht mehr verwendet werden!

### Angular 2.0 Methode

```js

app.controller ("SiteCtrl", function ($scope) {
    var self = this;
    
    this.title = "title";
    
    $scope.$watch (function () { return self.title }, function (oldVal, newVal) {
        ..code to run if this.title changes..
    });
});

```


## Events

Events sollten die einzige Art sein, mit der Controller untereinander kommunizieren.

Auslösen eines Events:

```js
$broadcast(eventName, data)
```

Alle Events sollten in app.module.js wie folgt dokumentiert werden:

```
// app.js
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Custom events:
 - 'authorization-message' - description of the message
   - { user, role, action } - data format
     - user - a string, which contains the username
     - role - an ID of the role the user has
     - action - specific ation the user tries to perform
     
 ..next event..
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
```