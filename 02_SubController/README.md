# Vererbung zwischen SubControllern

Wichtigste Regel: Variablen, die im eltern-Scope initialisiert wurden, könnnen aus einem Child-Controller
geändert oder überschrieben werden. 

Falls sie überschrieben werden (nicht nur Wert geändert), wird der Scope geklont.

> Achtung: Bei allen Variablennamen gilt: Groß/Kleinschreibung beachten.

## Wert schreiben

Im Hauptscope sei folgendes gegeben:

```js
$scope.site = {
    title: "Mein titel"
};
```

Im Unterscope wird nun folgendes gemacht:

```js
$scope.site.title = "Neuer titel";
```
=> Führt nicht zu einem Clone. Stattdessen ist "Neuer Titel" auch im Parent-Scope gesetzt.

Wird jedoch

```js
$scope.site = {
    title: "Mein neuer Titel"
};
```
Gesetzt, bleibt der Wert "Mein Titel" im Parent-Controller enthalten. "Mein neuer Titel" ist nur im childScope und
allen Scopes darunter verfügbar.