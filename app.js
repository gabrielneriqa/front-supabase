const productList = document.querySelector("#products");
const addProductForm = document.querySelector("#add-product-form");
const updateProductForm = document.querySelector("#update-product-form");
const updateProductId = document.querySelector("#update-id");
const updateProductName = document.querySelector("#update-name");
const updateProductPrice = document.querySelector("#update-price");

async function fetchProducts() {
  const response = await fetch("http://18.231.215.67:3000/products");
  const products = await response.json();

  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${product.name} - $${product.price}</span>`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      await deleteProduct(product.id);
      await fetchProducts();
    });

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => {
      updateProductId.value = product.id;
      updateProductName.value = product.name;
      updateProductPrice.value = product.price;
    });

    li.appendChild(deleteButton);
    li.appendChild(updateButton);
    productList.appendChild(li);
  });
}

addProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = addProductForm.elements["name"].value;
  const price = addProductForm.elements["price"].value;
  await addProduct(name, price);
  addProductForm.reset();
  await fetchProducts();
});

updateProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = updateProductId.value;
  const name = updateProductName.value;
  const price = updateProductPrice.value;
  await updateProduct(id, name, price);
  updateProductForm.reset();
  await fetchProducts();
});

async function addProduct(name, price) {
  const response = await fetch("http://18.231.215.67:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });
  return response.json();
}

async function updateProduct(id, name, price) {
  const response = await fetch(`http://18.231.215.67:3000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });
  return response.json();
}

async function deleteProduct(id) {
  const response = await fetch(`http://18.231.215.67:3000/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

fetchProducts();
