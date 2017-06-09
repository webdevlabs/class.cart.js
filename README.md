# class.cart.js
Simple standalone client-side pure JavaScript (*ECMAScript 6*) shopping cart with browser sessionStorage

# Usage:
## HTML
**add 2 cart button**
```
<button class="add2cart" data-itemid="123" data-title="some product" data-price="12.99">Add 2 cart</button> 
```
**shopping cart div (you can put it anywhere as it's position is fixed and defined in css)**
```
<div id="shoppingCart">
<ul></ul>
<span class="cartBtn">
<i class="glyphicon glyphicon-shopping-cart"></i>
<strong id="cartTotal"></strong>
</span>
</div>
```
**becouse it is standalone you can load it asynchronously**
```
<script src="class.cart.js" async></script>
```
## CSS
```
#shoppingCart {
    display: none;
    position: fixed;
    right: 17px;
    bottom: 0;
    z-index: 9999;
    opacity: 0.8;
    background-color: #ff8040;
    border-radius: 7px;
    min-width: 100px;
    color: black;
}

#shoppingCart ul {
    text-align: left;
    list-style-type: none;
    margin: 10px;
    padding: 0;
    display: none;
}

#shoppingCart ul li,
.cartBtn {
    cursor: pointer;
}

#shoppingCart ul li:hover {
    cursor: pointer;
    color: white;
    text-decoration: line-through;
}
```
## Web Component
**the easiest way to use the shopping cart is with the self contained web component**

*Notice: limited browser support without [polyfill](https://github.com/webcomponents/webcomponentsjs)*

Put the following code into your html head:
```
<link rel="import" href="shopping-cart.component.html">
```
Put the following code into your html body:
```
<shopping-cart></shopping-cart>
```
This will include the class.cart.js + styles + html element which is everything you need in a single file.
