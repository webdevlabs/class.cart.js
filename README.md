# class.cart.js
Simple standalone client-side pure JavaScript shopping cart with browser sessionStorage

# Usage:
## HTML
**add 2 cart button**
```
<button class="add2cart" data-itemid="123" data-title="some product" data-price="12.99">Add 2 cart</button> 
```
**shopping cart div (you can put it anywhere as it's position is fixed and defined in css)**
```
<div id="shoppingCart" data-price="0">
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
