const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const feedbackContainer = document.getElementById("feedback");

const totalPriceContainer = document.getElementById("totalPrice")

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 5000,
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 1000,
  },
  {
    id: 5,
    name: "Headphones",
    price: 500,
  },
];

const cart = [];

products.forEach(function (product) {
  // <div class="product-row">
  //     <p>Laptop - Rs. 50000</p>
  //     <button>Add to cart</button>
  //   </div>

  // const productRow = `
  // <div class="product-row">
  //   <p>${product.name} - Rs. ${product.price}</p>
  //   <button>Add to cart</button>
  // </div>
  // `
  // productsContainer.insertAdjacentHTML('beforeend',productRow)
  const { id, name, price } = product;
  const productDiv = document.createElement("div");
  productDiv.className = "product-row";
  productDiv.innerHTML = `
  <p>${name} - Rs. ${price}</p>
  <button onClick={addCart(${id})}>Add to cart</button>
  `;
  productsContainer.appendChild(productDiv);
});

function addCart(id) {
  // console.log(id)
  const isProductAdded = cart.some((product) => product.id === id);
  if (isProductAdded) {
    // feedbackContainer.textContent=`Item is already added to the cart`
    userFeedback(`Item is already added to the cart`, "error");

    return;
  }
  const productToAdd = products.find(function (product) {
    return product.id === id;
  });

  cart.push(productToAdd);
  renderCartDetails()

  // feedbackContainer.textContent=`${productToAdd.name} is added to the cart`
  userFeedback(`${productToAdd.name} is added to the cart`, "success");
}

function renderCartDetails() {
  cartContainer.innerHTML=``
  cart.forEach(function (product) {
    const cartDiv = document.createElement("div");
    cartDiv.className = "product-row";
    cartDiv.innerHTML = `
  <p>${product.name} - Rs. ${product.price}</p>
  <button onClick={removeFromCart(${product.id})}>Remove</button>
  `;
    cartContainer.appendChild(cartDiv);
  });
  totalCounter()
}

function totalCounter(){
  let totalPrice = 0
  cart.forEach(function(product){
    totalPrice+=product.price
  })
  // console.log(totalPrice)
  totalPriceContainer.textContent=`Rs. ${totalPrice}`
}

function removeFromCart(id) {
  console.log(id);
   const product = cart.find((product)=>product.id == id)
  // console.log(product)
   userFeedback(`${product.name} is removed from the cart`,'error')
  const deleteElementIndex=cart.findIndex((product)=>product.id ==id)
  const updatedCart = cart.splice(deleteElementIndex,1)
  console.log(updatedCart);
 
  renderCartDetails()
 
}

let timerId;
function userFeedback(msg, type) {
  clearTimeout(timerId);
  feedbackContainer.style.display = "block";
  if (type === "success") {
    feedbackContainer.style.color = "green";
  } else if (type === "error") {
    feedbackContainer.style.color = "red";
  }
  feedbackContainer.textContent = msg;

  timerId = setTimeout(function () {
    feedbackContainer.style.display = "none";
  }, 3000);
}


function clearCart(){
  cart.length=0
  renderCartDetails()
  userFeedback('Cart is cleared','success')
}

function sortByPrice(){
  cart.sort((prod1,prod2)=>prod1.price - prod2.price)
   renderCartDetails()
}


