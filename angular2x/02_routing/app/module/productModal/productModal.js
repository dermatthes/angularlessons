

angular.module("module.productModal", ["ngRoute"])


    .config (function ($routeProvider) {
        $routeProvider
            .when ("/product/:productId", {
                modalUrl: "app/module/productModal/modal.tpl.html"
            })

    })

    .controller ("ProductModalCtrl", function ($scope, $routeParams) {
        console.log ("Active:", $routeParams);
        this.prodData = $routeParams.productId;

        $scope.$watch (function () { return $routeParams}, function () {console.log("routeparams change")}, true);

    });