# Was gehört in Controller und was sind Services

## Controller

Controller i.S.v. Angular war ursprünglich eine Funktion, die `$scope` konfiguriert. Seit Angular 2.0 wird
der Controller selbst zum `$scope` und `$scope` sollte nicht mehr benutzt werden.

Beispiel sei der folgende Controller:

```js
angular.module('Goats') 
.controller('GoatsController', ['$scope', '$http', function($scope, $http) { 
    $scope.goat = null;
    $scope.editingGoat = false;
    $scope.goatQuery = null;
    $scope.goats = [];
    
    // Edit a goat database entry
    $scope.editGoat = function(goat) {
        $scope.goat = goat;
        $scope.editingGoat = true;
    };
    
    // Save a goat database entry
    $scope.saveGoat = function() {
        $http.post('/goats', $scope.goat)
            .then(function() {
                $http.get('/goats')
                    .then(function(response) {
                        $scope.goat = null;
                        $scope.goats = response.data;
                        $scope.editingGoat = false;
                    });
            });
    };
    
    // Discard an edit of a goat database entry
    $scope.cancelGoat = function() {
        $scope.editingGoat = false;
    };
    
    // Search the goat database
    $scope.searchGoats = _.debounce(function(query) {
        $http.get('/goats/search/' + query)
            .then(function(response) {
                $scope.goats = response.data;
            });
    }, 300);
    
    // Initially load the goats
    $http.get('/goats')
        .then(function(response) {
            $scope.goats = response.data;
        });
}]);
```

Man sieht direkt, dass hier mindestens zwei Ebenen vermischt wurden:

* __Datenzugriffsebene__: Führt die JSON Requests aus
* __Routing__: 
* __Controller__: Repräsentation der dargestellten Daten und verfügbaren Aktionen.

### Was darf in den Controller

__Grundsatz__ für die Gestaltung der Controller: __Je weniger, destso besser!__ Grund: Der Controller dient als
Referenz, welche Funktionen und Daten zur Verfügung stehen und stellt die Verbindung zwischen Business-Logic (Services) und
View (Template) her. Wird hier zu viel gemacht, geht die Übersichtlichkeit flöten.

* __Darstellungsdaten__: 
    Der Controller sollte lediglich die Daten bereitstellen (als attribut), 
    die im View dargestellt werden.
    
* __Aktionen__: 
    Methodenaufrufe, die direkt durch Benutzerinteraktion ausgeführt werden können.
    
* __Listener__:
    Registrieren von Listenern entweder auf veränderte Attribute mittels $watch() oder auf
    Events mittels $on().

D.h. unser Controller sollte so aussehen:

```js
angular.module('Goats')
.controller('goatsController', ['$state', 'goatsService', 'goats', 'goat',
    function($state, goatsService, goats, goat) {

    this.goat = goat.data;

    this.goatQuery = $state.params.query;
    
    this.goats = goats.data;
    
    this.saveGoat = function() {
        goatsService.saveGoat(this.goat)
            .then(function() {
                $state.go('goats');
            });
    };
    
    this.searchGoats = function(query) {
        if (!query.length) return $state.go('goats');
    
        $state.go('search', {query: query});
    };
}]);

```

### Was darf nicht in den Controller

Der Controller sollte folgendes nicht machen

* __DOM-Manipulation__: 
    D.h. z.B. Klassen oder Styles setzen. Dies kann i.d.R. direkt im Template gemacht werden

