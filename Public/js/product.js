const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider");

let activeImageSlide = 0;

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        const altText = item.getAttribute('alt');
        productImageSlide.setAttribute('alt', altText);
        activeImageSlide = i;
    })
})

// toggle size button

const sizeBtns = document.querySelectorAll('.size-radio-btn');
let checkedBtn = 0; //current selected button
let size;

sizeBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;
        size = item.innerHTML;
    })
    return size;
})

const setData = (data) => {
    let title = document.querySelector('title');

    // setup the image
    productImages.forEach((img, i) => {
        if(data.images[i]) {
            img.src = data.images[i];
            img.alt = `${data.name.trim()}`;
        } else {
            img.style.display = 'none';
        }
    })
    productImages[0].click();

    //setup size buttons
    sizeBtns.forEach(item => {
        if (!data.sizes.includes(item.innerHTML)){
            item.style.display = 'none';
        }
    })

    //setting up texts
    const name = document.querySelector('.product-brand');
    const shortDes = document.querySelector('.product-short-des');
    const des = document.querySelector('.des');

    title.innerHTML += " ";
    title.innerHTML += name.innerHTML = data.name;
    shortDes.innerHTML = data.shortDes;
    des.innerHTML = data.des || "" ;

    // pricing
    const sellPrice = document.querySelector('.product-price');
    const actualPrice = document.querySelector('.product-actual-price');
    const discount = document.querySelector('.product-discount');

    sellPrice.innerHTML = `$${data.sellPrice}`;
    actualPrice.innerHTML = `$${data.actualPrice}`;
    discount.innerHTML = `( ${data.discount}% off )`;

    // wishlist and card button
    const wishlistBtn = document.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', () => {
        wishlistBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', data, size);
    })

    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
        cartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', data, size);
    })
 }

//Fetch data
const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json' }),
        body: JSON.stringify({id: productId})
    })
    .then(res => res.json())
    .then(data => {
        setData(data);
        getProducts(data.tags[1]).then(data => createProductSlider(data, '.similar-products', 'Similar Products'))
    })
    .catch(err => {
        console.log("fetchProductData!", err)
        // location.replace('/404');
    });
}

let productId = null;
const pathname = location.pathname;
if (pathname.startsWith('/products/')) {
    productId = decodeURI(location.pathname.split('/').pop());
    // productId = decodeURI(location.pathname.split('/').pop()).replace(/\D/g, '');
}
if (productId !== null) {
    fetchProductData();
}