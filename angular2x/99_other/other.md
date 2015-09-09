# Other stuff

## NG-CLOAK - Prevent flickering angular code to be displayed

Um zu Verhindern, dass beim laden der Angular Code z.B. {{}} angezeigt werden, kann dem Element,
dass diesen enthält, die css-klasse "ng-cloak" und die direktive "ng-cloak" gesetzt werden.

```
<div class="ng-cloak" ng-cloak>
</div>
```

In diesem fall ist die Klasse ng-cloak so lange auf `display:hidden` gesetzt, bis dieser Part
gerendert ist.