
function Response (data) {

    this.success = function (data) {

    };

    this.error = function (data) {

    }

}


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


function CartService () {

    this.cartItemData = [];

    this.addItem = function ($id) {

    };

    this.rmItem = function ($id) {

    };

    this.sync = function () {

    }

}