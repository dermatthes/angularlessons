



var __Gis_ServiceLib = {

    get: function (url, get, post) {

    },


    download: function () {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


};




var ServiceLocator = {

    storefront: {
        SomeController: {
            __url__: rootUrl + "",

            indexAction: {
                __url__: rootUrl + "/~",
                /**
                 *
                 * @param params
                 * @param postData
                 * @return Response
                 */
                post: function (params, postData) {

                },

                link: function (params) {

                }
            }
        }
    }
};

ServiceLocator.storefront.SomeController.indexAction.post().success()

