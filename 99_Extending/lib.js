/**
 *
 * @param data
 * @constructor
 */
function Response (data) {

    this.success = function (data) {

    };

    this.error = function (data) {

    }

}

/**
 *
 * @param url
 * @constructor
 */
function Request (url) {

    this.url = url;

    this.post = function (postData, getData) {
        return new Response();
    };

    this.get = function (getData) {

    };

    this.delete = function (getData) {

    };

    this.put = function (getData) {

    };

    this.delete = function (getData) {

    };
}

/**
 *
 * @constructor
 */
function StubStorefront_SomeController () {

    this.getSomeAction = function ($id, $data) {

    }

}



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

