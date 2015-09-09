# Formularelemente

## Selectbox

Bei der Benutzung von <select> Elementen sollte die option ng-options genutzt werden. Werden die Options
im Quelltext angegeben, werden diese ggf bei modellängerungen nicht mit gesetzt.

```
this.options = {
    key1: "Value1",
    key2: "Value2"
}
this.selectedKey = "key2";


<select style="margin-right: 10px;" ng-options="key as value for (key, value) in demoCtrl.options" ng-model="demoCtrl.selectedKey">
</select>

```