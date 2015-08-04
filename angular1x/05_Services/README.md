# Services

Services dienen dazu, gleiche Daten in mehreren Controllern verfügbar zu machen.

## Cross-Controller dependency

Folgendes funktioniert nicht und ist auch nicht gewünscht:

```js
app.controller ("CartCtrl", function () {
    this.addToCart = function (sku) {
        ..add this to cart..
    }
};


// NOT WORKING --------------------------++
//                                       ||
//                                       \/
app.controller ("SiteCtrl", function (CartCtrl) {
    this.addToCart = function (sku) {
        CartCtrl.addToCart(sku); 
    }
});
```

Grund: Damit würden harte Abhänigkeiten zwischen Controller bestehen. Es sollte aber solche
Abhängigkeiten nicht geben.

## Service als Lösung

Lösung: Es wird ein Service definiert, der die Funktion des Warenkorbs übernimmt. Dieser
Service kann dann von beiden Controllern per DI angefordert werden.



