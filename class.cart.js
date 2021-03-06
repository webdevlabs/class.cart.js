/* Pure JS Cart v1.1 by Simeon Lyubenov <lyubenov@gmail.com> www.webdevlabs.com */

'use strict';

class Cart {

    constructor() {
        // set cart template vars
        this.currencySymbol = 'USD';
        this.removeItemTitle = 'remove from cart';
        // fetch cartStorage object from sessionStorage        
        this.cartStorage = JSON.parse(sessionStorage.getItem('cart'));
        if (!this.cartStorage) { this.cartStorage = []; }
        this.renderCart();
        // attach show/hide cart button        
        document.querySelector('#shoppingCart .cartBtn').addEventListener('click', function(event) {
            if (document.querySelector('#shoppingCart ul').style.display === 'block') {
                document.querySelector('#shoppingCart ul').style.display = 'none';
            } else {
                document.querySelector('#shoppingCart ul').style.display = 'block';
            }
        });
    }

    saveCart() {
        // save cartStorage object to local browser sessionStorage        
        sessionStorage.setItem('cart', JSON.stringify(this.cartStorage));
    }

    addItem(id, price, title) {
        if (this.inCart(id)) {
            this.increaseQty(id);
        } else {
            var item = {
                "id": id,
                "price": price,
                "title": title,
                "qty": '1'
            };
            this.cartStorage.push(item);
        }
        this.saveCart();
        this.renderCart();
    }

    removeItem(id) {
        var i = this.cartStorage.length;
        while (i--) {
            if (arguments.length > 0 && this.cartStorage[i]['id'] === id) {
                if (this.cartStorage[i]['qty'] > 1) {
                    this.cartStorage[i]['qty']--;
                } else {
                    this.cartStorage.splice(i, 1);
                }
            }
        }
        this.saveCart();
        this.renderCart();
    }

    inCart(id) {
        var i = this.cartStorage.length;
        while (i--) {
            if (arguments.length > 0 && this.cartStorage[i]['id'] === id) {
                return true;
            }
        }
    }

    increaseQty(id) {
        var i = this.cartStorage.length;
        while (i--) {
            if (arguments.length > 0 && this.cartStorage[i]['id'] === id) {
                this.cartStorage[i]['qty']++;
            }
        }
    }

    renderCart() {
        var cartTotal = Number('0');
        var itemQtyBox = '';
        var removeItemTitle = this.removeItemTitle;
        var currencySymbol = this.currencySymbol;
        document.querySelector('#shoppingCart ul').innerHTML = '';
        // Render Cart view items from cartStorage object        
        this.cartStorage.forEach(function(item) {
            if (item.qty > 1) { itemQtyBox = `${item.qty} x`; } else { itemQtyBox = ''; }
            let li = document.createElement("li");
            li.setAttribute("title", removeItemTitle);
            li.setAttribute("data-price", item.price);
            li.setAttribute("data-itemid", item.id);
            let TplCartItem = `${itemQtyBox} ${item.title} = ${Number(item.price * item.qty).toFixed(2)}${currencySymbol}`;
            li.appendChild(document.createTextNode(TplCartItem));
            // attach on click remove item from cart            
            li.addEventListener('click', function(event) {
                window.cart.removeItem(item.id);
            });
            document.querySelector('#shoppingCart ul').appendChild(li);
            // increase the cartTotal amount            
            cartTotal = Number(cartTotal + (Number(item.price) * Number(item.qty)));
        });
        if (cartTotal > 0) {
            document.querySelector('#shoppingCart').style.display = 'block';
            let TplCartTotal = `${cartTotal.toFixed(2)}${currencySymbol}`;
            document.querySelector('#cartTotal').innerHTML = TplCartTotal;
        } else {
            // hide cart if no items            
            document.querySelector('#shoppingCart').style.display = 'none';
        }
    }

}

// Create the Cart object when the page is loaded
document.onreadystatechange = function() {
    if (document.readyState == 'complete') {
        try {
            window.cart = new Cart();
        } catch (err) {
            console.log('CartJS error: ' + err);
        }
    }
};

// Attach class .add2cart button functionality
document.body.addEventListener('click', function(e) {
    var t = e.target;
    if (t.classList.contains('add2cart')) {
        window.cart.addItem(
            t.getAttribute('data-itemid'),
            t.getAttribute('data-price'),
            t.getAttribute('data-title')
        );
    }
});
