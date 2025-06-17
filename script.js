let cart = [];
function showCartToast(msg = 'Produto adicionado ao carrinho!') {
    const toast = document.getElementById('cart-toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
}
function addToCart(nome, preco) {
    const item = cart.find(i => i.nome === nome);
    if (item) {
        item.qtd += 1;
    } else {
        cart.push({ nome, preco, qtd: 1 });
    }
    updateCartCount();
    if (document.getElementById('cartModal').classList.contains('active')) {
        renderCart();
    }
    showCartToast();
}
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.reduce((acc, item) => acc + item.qtd, 0);
}
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
        total += item.preco * item.qtd;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.nome} <span class="cart-qtd">x${item.qtd}</span></span>
            <span>R$ ${(item.preco * item.qtd).toFixed(2)}</span>
            <div class="cart-remove-group" style="display: flex; flex-direction: row; align-items: center; gap: 0; margin-left: 0.2em; min-width: 70px;">
                <div style="display: flex; align-items: center; background: #222; border-radius: 5px; padding: 0;">
                    <input type="number" min="1" max="${item.qtd}" value="1" class="input-remover-qtd" aria-label="Quantidade a remover" style="width: 38px; font-size: 0.85em; padding: 0.15em 0.3em; border: none; background: transparent; color: #ff7f1f;">
                    <button class="remove-item remove-qtd-btn" style="padding: 0.2em 0.4em 0.2em 0.2em; font-size: 0.95em; background: none; color: #ff7f1f; border: none; box-shadow: none; outline: none; margin-left: 0.25em;">✖</button>
                </div>
            </div>
        `;
        // Botão de remover quantidade
        const btnRemoveQtd = div.querySelector('.remove-qtd-btn');
        btnRemoveQtd.onclick = function() {
            const input = div.querySelector('.input-remover-qtd');
            let qtdRemover = parseInt(input.value) || 1;
            if (qtdRemover >= item.qtd) {
                cart.splice(idx, 1);
            } else {
                item.qtd -= qtdRemover;
            }
            updateCartCount();
            renderCart();
            showCartToast('Quantidade removida do carrinho!');
        };
        cartItems.appendChild(div);
    });
    document.getElementById('cartTotal').textContent = `Total: R$ ${total.toFixed(2)}`;
    // Exibe o botão 'Comprar' só se houver itens no carrinho
    const btnComprar = document.querySelector('.btn-finalizar-compra');
    if (btnComprar) btnComprar.remove();
    if (cart.length > 0) {
        const btn = document.createElement('button');
        btn.className = 'btn-finalizar-compra';
        btn.textContent = 'Comprar';
        btn.onclick = function() { window.location.href = 'compra.html'; };
        document.getElementById('cartModal').appendChild(btn);
    }
}
document.getElementById('openCart').onclick = function() {
    renderCart();
    document.getElementById('cartModal').classList.add('active');
};
document.getElementById('closeCart').onclick = function() {
    document.getElementById('cartModal').classList.remove('active');
};
// Botão para mostrar/ocultar categorias
const btnToggle = document.getElementById('toggleCategorias');
const asideCategorias = document.getElementById('asideCategorias');
const btnCloseCategorias = document.getElementById('closeCategorias');
// Inicialmente aside escondido
let asideVisivel = false;
function setMenuIcon(isOpen) {
    if (isOpen) {
        btnToggle.innerHTML = `<img src="data:image/svg+xml;utf8,<svg width='32' height='32' xmlns='http://www.w3.org/2000/svg'><line x1='8' y1='8' x2='24' y2='24' stroke='black' stroke-width='4' stroke-linecap='round'/><line x1='24' y1='8' x2='8' y2='24' stroke='black' stroke-width='4' stroke-linecap='round'/></svg>" alt="Fechar" />`;
        btnToggle.classList.add('active');
    } else {
        btnToggle.innerHTML = `<img src="data:image/svg+xml;utf8,<svg width='32' height='32' xmlns='http://www.w3.org/2000/svg'><rect x='4' y='6' width='24' height='5' rx='2.5' fill='black'/><rect x='4' y='14' width='24' height='5' rx='2.5' fill='black'/><rect x='4' y='22' width='24' height='5' rx='2.5' fill='black'/></svg>" alt="Menu" />`;
        btnToggle.classList.remove('active');
    }
}
setMenuIcon(false);
btnToggle.onclick = function() {
    asideVisivel = !asideVisivel;
    if (asideVisivel) {
        asideCategorias.classList.remove('aside-escondido');
        setMenuIcon(true);
    } else {
        asideCategorias.classList.add('aside-escondido');
        setMenuIcon(false);
    }
};
btnCloseCategorias.onclick = function() {
    asideVisivel = false;
    asideCategorias.classList.add('aside-escondido');
    setMenuIcon(false);
};
