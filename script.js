const body = document.querySelector("body");
const hamburger = document.querySelector(".hamburger");
const navMobile = document.querySelector(".nav-mobile");
const bodyOverlay = document.querySelector(".body-overlay");
const exitBtn = document.querySelector(".exit-btn");
const overlay = document.querySelector(".overlay");
let params = new URLSearchParams(window.location.search);

//Phone Hamburger open and close ----------------------------------------------------------------
hamburger.addEventListener("click", function(){
    navMobile.classList.toggle("open");
    body.classList.toggle("scroll-lock")
    bodyOverlay.classList.toggle("overlay-toggle");
    exitBtn.classList.toggle("displayBlock");
});





exitBtn.addEventListener("click",function(){
    navMobile.classList.toggle("open");
    body.classList.toggle("scroll-lock")
    bodyOverlay.classList.toggle("overlay-toggle");
    exitBtn.classList.toggle("displayBlock");
});

//--------------------------------------------------------------------------------------------------



//index.html => Create dinamic Products from json script---------------------------------------------------

//destination Div
const specialsContainer = document.querySelector(".Specials-Container");


//Products Array
    let productsArr = JSON.parse(localStorage.getItem("productsArr")) || [];
    let  cart_productsArr = JSON.parse(localStorage.getItem("cart_productsArr")) || [];


if (specialsContainer !== null)
{

   fetch('/json/Special-products.json')
  .then(response => response.json())
  .then(products => {

    products.forEach(product => {
        //Create elements
        let card_div  = document.createElement("div");
        let image_wishlist  = document.createElement("img");
        let image_product  = document.createElement("img");
        let description  = document.createElement("h5");
        let div_price  = document.createElement("div");
        let price = document.createElement("h4");
        let lowerDiv = document.createElement("div");
        let fastBuying = document.createElement("div");
        let AddToCart = document.createElement("img");

        //Init Classes
        card_div.classList.add("card");
        image_wishlist.classList.add("product-wishlist");
        div_price.classList.add("product-price");
        fastBuying.classList.add("special-fast-buying"); 
        AddToCart.classList.add("special-add-to-cart");
        lowerDiv.classList.add("lowerDiv");

        card_div.addEventListener("mouseover", function() {
            lowerDiv.classList.add("fade");
        }); 

        card_div.addEventListener("mouseout", () => {
            lowerDiv.classList.remove("fade");
        });

        //Init Text and source from json
        image_wishlist.src = "Img/wishlistPic.svg";
        image_product.src = product.img;
        description.innerText = product.h5;
        price.innerText = product.price;
        

        // arrange styles
        fastBuying.innerText = "קנייה מהירה"
        AddToCart.src = "Img/cartPic.svg";



        lowerDiv.append(fastBuying,AddToCart);
        div_price.append(price);
        card_div.append(image_wishlist,image_product,description,div_price,lowerDiv);
        specialsContainer.append(card_div);


        // click the wishlist pic -- save product data in localstorage
        image_wishlist.addEventListener("click", function(){
            image_wishlist.src = "Img/heart-solid-full.svg";
            productsArr.push({
                brand: product.brand,
                img: product.img,
                price: product.price,
                name: product.name,
                type: product.type,
                for: product.for
            })
            localStorage.setItem("productsArr", JSON.stringify(productsArr));


        });
        //--------------------------------------------------------------------

    })

  })

  .catch(error => {
    console.error('שגיאה:', error);
  });

}
//-----------------------------------------------------------------------------------------











//Create Wishlist from localstorage -------------------------------------------------------

// Destination Div
const wishlistContainer = document.querySelector(".wishlist-container");
 
if (wishlistContainer !== null)
{


 productsArr.forEach((product, index) =>{
 console.log(index);
const hr = document.createElement("hr")
hr.style.height = "1px";
hr.style.width = "60%";
hr.style.border = "none";
hr.style.borderTop = "1px solid #ccc";
wishlistContainer.appendChild(hr);

// Create Component
const component = document.createElement("div");
component.className = "component";



// ----------- Left Side -----------
const leftContainer = document.createElement("div");
leftContainer.className = "component-left-container";

// image
const img = document.createElement("img");
img.src = product.img;

// info div
const info = document.createElement("div");
info.className = "Product-Info";

const span1 = document.createElement("span");
span1.textContent = product.brand;
span1.style.fontSize = "12px";

const h2 = document.createElement("h2");
h2.textContent = product.name;

const span2 = document.createElement("span");
span2.textContent = product.type;
span2.style.color = "#6e6e6e";
span2.style.fontSize = "14px";

const span3 = document.createElement("span");
span3.textContent = product.for;
span3.style.color = "#a9a9a9";
span3.style.fontSize = "12px";

//append
info.append(span1, h2, span2, span3);
leftContainer.append(img, info);

// ----------- right side -----------
const rightContainer = document.createElement("div");
rightContainer.className = "Toss-to-Cart";

const h3 = document.createElement("h3");
h3.textContent = product.price;

const stockInfo = document.createElement("span");
stockInfo.textContent = "In Stock, Ready to ship";
stockInfo.style.color = "#4aa511";
stockInfo.style.fontSize = "14px";

const btn = document.createElement("div");
btn.className = "btn-add-To-Cart";
btn.textContent = "Add to cart";



//add to cartArr
btn.addEventListener("click",function(){
     cart_productsArr.push(productsArr[index]);
     productsArr.splice(index,1);
     localStorage.setItem("productsArr", JSON.stringify(productsArr));
     localStorage.setItem("cart_productsArr",JSON.stringify(cart_productsArr));
     location.reload();
});


const removeBtn = document.createElement("div");
removeBtn.className = "removeBtn";
removeBtn.textContent = "Remove";


removeBtn.addEventListener("click",function(){
     productsArr.splice(index,1);
     localStorage.setItem("productsArr", JSON.stringify(productsArr));
     location.reload();
});

//append
rightContainer.append(h3, stockInfo, btn,removeBtn);
component.append(leftContainer, rightContainer);


wishlistContainer.appendChild(component);
});
}
//------------------------------------------------------------------------




















//Create Cart from localstorage -------------------------------------------------------

// Destination Div
const cartContainer = document.querySelector(".cart-container");

if (cartContainer !== null)
{
localStorage.setItem("Total_Price", Number(localStorage.getItem("Total_Price")) + 0);



const component_header_div = document.createElement("div")
component_header_div.classList.add("component_header_div");
cartContainer.append(component_header_div);

cart_productsArr.forEach((product, index) =>{
console.log(index);

cart_productsArr[index].price = cart_productsArr[index].price.replace(/[^\d]/g, "");
localStorage.setItem("Total_Price",Number(localStorage.getItem("Total_Price")) + Number( cart_productsArr[index].price));

const hr = document.createElement("hr")
hr.style.height = "1px";
hr.style.width = "100%";
hr.style.border = "none";
hr.style.borderTop = "1px solid #ccc";
cartContainer.appendChild(hr);


// Create Component
const component = document.createElement("div");
component.className = "component";
component.style.width = "100%";
component.style.padding = "10px 20px";


// ----------- Left Side -----------
const leftContainer = document.createElement("div");
leftContainer.className = "component-left-container";

// image
const img = document.createElement("img");
img.src = product.img;

// info div
const info = document.createElement("div");
info.className = "Product-Info";

const span1 = document.createElement("span");
span1.textContent = product.brand;
span1.style.fontSize = "12px";

const h2 = document.createElement("h2");
h2.textContent = product.name;

const span2 = document.createElement("span");
span2.textContent = product.type;
span2.style.color = "#6e6e6e";
span2.style.fontSize = "14px";

const span3 = document.createElement("span");
span3.textContent = product.for;
span3.style.color = "#a9a9a9";
span3.style.fontSize = "12px";

//append
info.append(span1, h2, span2, span3);
leftContainer.append(img, info);

// ----------- right side -----------
const rightContainer = document.createElement("div");
rightContainer.className = "cart-right-container";
const QuantitySelect = document.createElement("select");


for (let i = 1; i <= 10; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    QuantitySelect.appendChild(option);
}

QuantitySelect.classList.add("quantitySelect");

const removeBtn = document.createElement("div");
removeBtn.className = "removeBtn";
removeBtn.textContent = "Remove";
removeBtn.style.width  = "100px"


removeBtn.addEventListener("click",function(){
     cart_productsArr.splice(index,1);
     localStorage.setItem("cart_productsArr", JSON.stringify(cart_productsArr));
     location.reload();
});



rightContainer.append(QuantitySelect,removeBtn);

const h3 = document.createElement("h3");
h3.textContent = product.price;

//append
component.append(leftContainer, rightContainer);


cartContainer.append(component);



});


// init prices

Innerprice1 = document.querySelector(".Innerprice-1");
Innerprice1.innerText = localStorage.getItem("Total_Price");


InnerSprice2 = document.querySelector(".InnerSprice-2");
InnerSprice2.innerText = "0";


InnerTprice = document.querySelector(".InnerTprice");
InnerTprice.innerText = localStorage.getItem("Total_Price");


localStorage.setItem("Total_Price", 0);


}
//------------------------------------------------------------------------



















//categories ----------------------------------------------------------------------------

// Destination Div
const CatProductsContainer = document.querySelector(".CatProducts-container");
if (CatProductsContainer !== null)
{
   const catTopPic = document.querySelector(".cat-top");

   fetch('/json/cat-top-pics.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
        console.log(product.productType)
        if (params.get("Name") == product.productType)
        {   
            console.log("here!")       
            catTopPic.style.backgroundImage = `url("${product.img}")`;
        }
    
    })
  })

    // get Section name to h1 from params
    const catName = document.querySelector(".cat-name"); 
    catName.innerText = params.get("Name")


   fetch('/json/cat-products.json')
  .then(response => response.json())
  .then(products => {




      products[params.get("cat")].forEach((product,index) => {
        //Create elements
        let card_div  = document.createElement("div");
        let image_wishlist  = document.createElement("img");
        let image_product  = document.createElement("img");
        let description  = document.createElement("h5");
        let div_price  = document.createElement("div");
        let price = document.createElement("h4");
        let lowerDiv = document.createElement("div");
        let fastBuying = document.createElement("div");
        let AddToCart = document.createElement("img");

        //Init Classes
        card_div.classList.add("card");
        image_wishlist.classList.add("product-wishlist");
        div_price.classList.add("product-price");
        fastBuying.classList.add("special-fast-buying"); 
        AddToCart.classList.add("special-add-to-cart");
        lowerDiv.classList.add("lowerDiv");

        card_div.addEventListener("mouseover", function() {
            lowerDiv.classList.add("fade");
        }); 

        card_div.addEventListener("mouseout", () => {
            lowerDiv.classList.remove("fade");
        });

        //Init Text and source from json
        image_wishlist.src = "Img/wishlistPic.svg";
        image_product.src = product.img;
        description.innerText = product.h5;
        price.innerText = product.price;
        

        // arrange styles
        fastBuying.innerText = "קנייה מהירה"
        AddToCart.src = "Img/cartPic.svg";



        lowerDiv.append(fastBuying,AddToCart);
        div_price.append(price);
        card_div.append(image_wishlist,image_product,description,div_price,lowerDiv);
        CatProductsContainer.append(card_div);


        AddToCart.addEventListener("click",function(){
            cart_productsArr.push(products[params.get("cat")][index]);
            localStorage.setItem("cart_productsArr",JSON.stringify(cart_productsArr));
            location.reload();
        })

        


        // click the wishlist pic -- save product data in localstorage
        image_wishlist.addEventListener("click", function(){
            image_wishlist.src = "Img/heart-solid-full.svg";
            productsArr.push({
                brand: product.brand,
                img: product.img,
                price: product.price,
                name: product.name,
                type: product.type,
                for: product.for
            })
            localStorage.setItem("productsArr", JSON.stringify(productsArr));


        });
        //--------------------------------------------------------------------

    })

  })

  .catch(error => {
    console.error('שגיאה:', error);
  });
}


// ------------------------------------------------------------------------------------------












