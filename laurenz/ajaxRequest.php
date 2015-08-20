<?php
$input = file_get_contents("php://input");
if (strlen($input) > 0) {
    $_POST = json_decode($input, TRUE);
    if (isset($_POST["msg"])) {
        header("content-type: text/json");
        echo json_encode(["success" => TRUE, "recvdMsg" => $_POST["msg"]]);
        exit;
    }
}

?>

<!DOCTYPE html>
<html ng-app="ajaxApp" ng-controller="MainCtrl as main">
<head lang="en">
    <meta charset="UTF-8">
    <title>AJAX Requests</title>
    <script language="JavaScript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.js"></script>

    <script type="text/javascript">
        var app = angular.module("ajaxApp", []);

        app.controller("MainCtrl", ["$http", function($http) {
            var self = this;

            // Simple POST request example (passing data) :
            $http.post('<?=$_SERVER["SCRIPT_NAME"]?>', {msg:'hello word!'}).
                then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log("No error.", response);

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Got error!", response);
                });

        }]);
    </script>

</head>
<body>
</body>
</html>
