const createNav = () => {
    let nav = document.querySelector('.navbar');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const cartCount = cart.length;
    const wishlistCount = wishlist.length;

    const currentPage = window.location.pathname;

    nav.innerHTML = `
        <div class="nav">
            <a href="/" aria-label="VFShop">
                <img src="../img/logo-green.png" class="brand-logo" role="img" id="brand-logo" title="VFShop" alt="VFShop">
            </a>
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" type="search" aria-label="Search" autofocus="autofocus" placeholder="search brand product">
                    <button class="search-btn" id="search-btn" aria-label="submit search" type="submit" onclick="window.location.href = '/search'">search</button>
                </div>
                <a href="#">
                    <img src="../img/user.png" id="user-img" role="img" alt="User account">
                    <div class="login-logout-popup hide">
                        <p class="account-info">Logged as name</p>
                        <button class="btn" id="user-btn" type="button">Log out</button>
                    </div>
                </a>
                <a id='cart' role="button" href="/cart"><img src="../img/cart.png" title="Cart" alt="Cart"></a>
                ${cartCount === 0  || currentPage === '/cart' ? '' : `<span class="count-badge">${cartCount}</span>`}
                <a id='wishlist' role="button" href="/cart"><img src="../img/wishlist-icon.png" alt="Wishlist"></a>
                ${wishlistCount === 0 || currentPage === '/cart' ? '' : `<span class="count-badge">${wishlistCount}</span>`}
            </div> 
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="/" class="link">home</a></li>
            <li class="link-item"><a href="/women" class="link">women</a></li>
            <li class="link-item"><a href="/men" class="link">men</a></li>
            <li class="link-item"><a href="/shoes" class="link">shoes</a></li>
            <li class="link-item"><a href="/accessories" class="link">accessories</a></li>
            <li class="link-item"><a href="#footer-about" class="link">about</a></li>
        </ul>
    `;
}

createNav();

// login functionality

const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if(user != null) {
        //user is logged in
        popuptext.innerHTML = `Hi, ${user.name}`;
        actionBtn.innerHTML = 'Log out';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
    } else {
        //user is logged out
        popuptext.innerHTML = 'Log in to place order';
        actionBtn.innerHTML = 'Log in';
        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
    }
}
// search box

const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
searchBtn.addEventListener('click', () => {
    if(searchBox.value.length) {
        location.href = `/search/${searchBox.value}`;
    } else {
        location.href = `/search/`;
    }
})

