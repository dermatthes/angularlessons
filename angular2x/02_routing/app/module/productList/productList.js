

angular.module("module.productList", ["ngRoute"])
    .config (function ($routeProvider) {
        $routeProvider
            .when ("/list", {
                reloadOnSearch: false,
                contentUrl: "app/module/productList/productList.tpl.html",
            });
    })

    .controller("ProductListCtrl", function () {

    });