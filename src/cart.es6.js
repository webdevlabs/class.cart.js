/* Pure JS Cart v1.2 by Simeon Lyubenov <lyubenov@gmail.com> www.webdevlabs.com */

'use strict';

class Cart {

    constructor() {
        this.currencySymbol = 'лв';
        this.removeItemTitle = 'премахни';
        this.cartStorage = JSON.parse(sessionStorage.getItem('cart'));
        if (!this.cartStorage) { this.cartStorage = []; }
        this.renderCart();
        document.querySelector('#shoppingCart .cartBtn').addEventListener('click', function(event) {
            if (document.querySelector('#shoppingCart ul').style.display === 'block') {
                document.querySelector('#shoppingCart ul').style.display = 'none';
            } else {
                document.querySelector('#shoppingCart ul').style.display = 'block';
            }
        });
    }

    saveCart() {
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
        this.cartStorage.forEach(function(item) {
            if (item.qty > 1) { itemQtyBox = `${item.qty} x`; } else { itemQtyBox = ''; }
            let li = document.createElement("li");
            li.setAttribute("title", removeItemTitle);
            li.setAttribute("data-price", item.price);
            li.setAttribute("data-itemid", item.id);
            let TplCartItem = `${itemQtyBox} ${item.title} = ${Number(item.price * item.qty).toFixed(2)}${currencySymbol}`;
            li.appendChild(document.createTextNode(TplCartItem));
            li.addEventListener('click', function(event) {
                window.cart.removeItem(item.id);
            });
            document.querySelector('#shoppingCart ul').appendChild(li);
            cartTotal = Number(cartTotal + (Number(item.price) * Number(item.qty)));
        });
        if (cartTotal > 0) {
            document.querySelector('#shoppingCart').style.display = 'block';
            let TplCartTotal = `${cartTotal.toFixed(2)}${currencySymbol}`;
            document.querySelector('#cartTotal').innerHTML = TplCartTotal;
        } else {
            document.querySelector('#shoppingCart').style.display = 'none';
        }
    }

}

document.onreadystatechange = function() {
    if (document.readyState == 'complete') {
        try {
            window.cart = new Cart();
        } catch (err) {
            console.log('CartJS error: ' + err);
        }
    }
};

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