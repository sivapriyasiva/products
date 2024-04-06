document.addEventListener("DOMContentLoaded", function () {
  var productsContainer = document.getElementById("products");
  var productListContainer = document.querySelector(".product-list");
  var costListContainer = document.querySelector(".product-list1");
  var totalContainer = document.querySelector(".total");
  var totalAmount = 0;

  function addToCart(productName, productPrice, stockCount, addButton) {
    var stockInfo = document.querySelector(
      ".card .name[data-name='" + productName + "'] + .price + .stock-info .num"
    );
    if (stockInfo) {
      if (stockCount <= 0) {
        return; // Do not add to cart if stock is zero or negative
      }
    }

    var productItem = document.createElement("div");
    productItem.textContent = productName;
    productListContainer.appendChild(productItem);

    var costItem = document.createElement("div");
    var cleanedPrice = parseFloat(productPrice.replace(/[^\d.]/g, ""));
    costItem.textContent = "₹ " + cleanedPrice.toLocaleString();
    totalAmount += cleanedPrice;
    totalContainer.textContent = "₹ " + totalAmount.toLocaleString();
    costListContainer.appendChild(costItem);

    // delete icon
    var deleteIcon = document.createElement("span");
    deleteIcon.classList.add(
      "material-symbols-outlined",
      "delete-icon"
    );
    deleteIcon.textContent = "delete";
    deleteIcon.style.cursor = "pointer";
    deleteIcon.style.color = "gray";
    deleteIcon.style.fontSize = "16px";

    costItem.appendChild(deleteIcon);

    // when user click delete icon then specific row is deleted
    deleteIcon.addEventListener("click", function () {
      totalAmount -= cleanedPrice;
      totalContainer.textContent = "₹ " + totalAmount.toLocaleString();
      costItem.remove();
      productItem.remove();
      if (stockInfo) {
        stockCount++;
        stockInfo.textContent = stockCount;
        if (stockCount < 5) {
          stockInfo.classList.add("blink-red");
        } else {
          stockInfo.classList.remove("blink-red");
        }
        // Revert to Add to Cart button when stock is increased
        addButton.textContent = "Add to Cart";
        addButton.style.backgroundColor = "#007bff";
        addButton.style.color = "white"; 
        addButton.style.cursor = "pointer"; 
        addButton.addEventListener("click", addToCartHandler);
      }
    });

    // Decrease stock count
    stockCount--;
    stockInfo.textContent = stockCount;

    // Change button text to "Out of Stock" when stock is 0
    if (stockCount == 0) {
      addButton.textContent = "Out of Stock";
      addButton.style.backgroundColor = "#DBDBDB";
      addButton.style.border=" 1px solid #C9C9C9";
      addButton.style.fontWeight="bold";
      addButton.style.color = "white";
      addButton.style.cursor = "not-allowed";
      addButton.removeEventListener("click", addToCartHandler);
    }
    

    // blinking effect
    if (stockCount < 5) {
      stockInfo.classList.add("blink-red");
    } else {
      stockInfo.classList.remove("blink-red");
    }
  }

  var productsContainer = document.getElementById("products");
  // User can add HTML code and create new cards
  var products = [
    { name: "Coffee Tables", price: "₹ 4,000", stock: 10 },
    { name: "TV", price: "₹ 8,000", stock: 6 },
    { name: "AC", price: "₹ 10,000", stock: 7 },
    { name: "Bed", price: "₹ 70,000", stock: 9 },
    { name: "Fan", price: "₹ 13,000", stock: 0 }, // Example with stock 0
    { name: "Cobord", price: "₹ 40,00,000", stock: 12 },
    { name: "Micro Oven", price: "₹ 40,000", stock: 8 },
    {name:"Fridge", price:"₹ 50,000", stock:5}
  ];

  // HTML code for product cards
  function generateProductCard(product) {
    return `<div class="card">
                <div class="product-name">
                    <div class="name" data-name="${product.name}">${product.name}</div>
                    <div class="price">${product.price}</div>
                    <div class="stock-info">Stock only <span class="num">${product.stock}</span> items</div>
                </div>
                <div>
                    <div class="add_cart">Add to Cart</div>
                </div>
            </div>`;
  }

  // Inserting product cards into productsContainer
  products.forEach(function (product) {
    var productCard = generateProductCard(product);
    productsContainer.insertAdjacentHTML("beforeend", productCard);
  });

  // Add to Cart function
  function addToCartHandler() {
    var productName =
      this.closest(".card").querySelector(".name").textContent;
    var productPrice =
      this.closest(".card").querySelector(".price").textContent;
    var stockCount = parseInt(this.closest(".card").querySelector(".num").textContent);
    var addButton = this;

    addToCart(productName, productPrice, stockCount, addButton);
  }

  document.querySelectorAll(".add_cart").forEach(function (button) {
    button.addEventListener("click", addToCartHandler);
  });

  // function to filter products based on search input
  function filterProducts() {
    var searchBoxValue = document
      .getElementById("searchBox")
      .value.toLowerCase();

    document
      .querySelectorAll(".product-name")
      .forEach(function (productNameElement) {
        var productName = productNameElement.textContent.toLowerCase();
        var productCard = productNameElement.closest(".card");

        if (productName.includes(searchBoxValue)) {
          productCard.style.display = "flex";
        } else {
          productCard.style.display = "none";
        }
      });
  }

  document
    .getElementById("searchBox")
    .addEventListener("input", filterProducts);
});
