# Binding values from $scope to view

## Two-Way binding `ng-model=`

```html
<input type="text" ng-model="site.input1">
```

Two way binding: Alle Änderungen im scope werden im Inputfeld wiedergegeben und andersrum

>
> `ng-bind` funktioniert nur bei Text-Nodes (One-Way binding)
> 

## One-Way binding `{{varName}}` or `ng-bind=` or `ng-bind-html=`

