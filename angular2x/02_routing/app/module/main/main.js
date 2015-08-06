


angular.module ("module.main", ["ngRoute", "module.productModal", "module.productList"])
    .config (function ($routeProvider) {
        $routeProvider
            .otherwise ({
                modalUrl: null,
                contentUrl: null
            });
    })

    .controller ("MainCtrl", function ($scope, $route) {
        var self = this;

        this.contentUrl = null;
        this.modalUrl = null;

        $scope.$watch (
            function () {return $route},
            function () {
                console.log("Route changed", $route.current);
                if ( ! $route.current)
                    return;
                var cur = $route.current;

                // Die Modal-Url ändert sich direkt. Bzw. verschwindet auch wieder, sobald sich die URL ändert
                self.modalUrl = cur.modalUrl;

                // Content bleib wie er ist, wenn nicht explizit ein anderes Template gewählt wurde.
                if (cur.contentUrl != null) {
                    self.contentUrl = cur.contentUrl;
                }
            },
            true
        );

    });