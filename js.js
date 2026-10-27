
const products = [
  {
    id: 1,
    name: "Pure Cleanse",
    category: "Limpeza",
    price: 69.90,
    description: "Um começo delicado para seu ritual de cuidado."
  },
  {
    id: 2,
    name: "Golden Glow Serum",
    category: "Sérum",
    price: 129.90,
    description: "Um sérum para complementar sua rotina."
  },
  {
    id: 3,
    name: "Midnight Renewal",
    category: "Sérum",
    price: 149.90,
    description: "Um toque especial para seu ritual noturno."
  },
  {
    id: 4,
    name: "Velvet Moisture",
    category: "Hidratante",
    price: 99.90,
    description: "Hidratação para seu ritual diário."
  },
  {
    id: 5,
    name: "Silk Face Cream",
    category: "Hidratante",
    price: 119.90,
    description: "Cuidado com uma textura cremosa."
  },
  {
    id: 6,
    name: "Daily Shield SPF",
    category: "Proteção solar",
    price: 89.90,
    description: "Produto demonstrativo da categoria solar."
  }
];

const productGrid = document.querySelector("#product-grid");
const categoryFilter = document.querySelector("#category-filter");
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");

let cart = [];

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderProducts(category = "Todos") {
  productGrid.replaceChildren();

  const filtered = category === "Todos"
    ? products
    : products.filter(product => product.category === category);

  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const art = document.createElement("div");
    art.className = "product-art";

    const bottle = document.createElement("span");
    bottle.textContent = product.name.toUpperCase();
    art.appendChild(bottle);

    const info = document.createElement("div");
    info.className = "product-info";

    const categoryText = document.createElement("p");
    categoryText.className = "product-category";
    categoryText.textContent = product.category;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.className = "add-button";
    button.textContent = "Adicionar à sacola";
    button.addEventListener("click", () => addToCart(product.id));

    info.append(categoryText, name, description, price, button);
    card.append(art, info);
    productGrid.appendChild(card);
  });
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  renderCart();
}

function changeQuantity(id, change) {
  const item = cart.find(entry => entry.id === id);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.id !== id);
  }

  renderCart();
}

function renderCart() {
  cartItems.replaceChildren();

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  cartCount.textContent = totalQuantity;

  let total = 0;

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-cart";
    empty.textContent = "Sua sacola está vazia. Explore nossa coleção!";
    cartItems.appendChild(empty);
  }

  cart.forEach(item => {
    const product = products.find(entry => entry.id === item.id);

    if (!product) return;

    total += product.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("div");

    const name = document.createElement("strong");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = formatPrice(product.price * item.quantity);

    details.append(name, price);

    const controls = document.createElement("div");
    controls.className = "quantity-controls";

    const decrease = document.createElement("button");
    decrease.textContent = "−";
    decrease.setAttribute("aria-label", `Diminuir ${product.name}`);
    decrease.addEventListener("click", () => changeQuantity(product.id, -1));

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const increase = document.createElement("button");
    increase.textContent = "+";
    increase.setAttribute("aria-label", `Aumentar ${product.name}`);
    increase.addEventListener("click", () => changeQuantity(product.id, 1));

    controls.append(decrease, quantity, increase);
    row.append(details, controls);
    cartItems.appendChild(row);
  });

  cartTotal.textContent = formatPrice(total);
}

document.querySelector("#open-cart").addEventListener("click", () => {
  renderCart();
  cartDialog.showModal();
});

document.querySelector("#close-cart").addEventListener("click", () => {
  cartDialog.close();
});

categoryFilter.addEventListener("change", () => {
  renderProducts(categoryFilter.value);
});

document.querySelector("#checkout").addEventListener("click", () => {
  alert(
    "Esta é uma demonstração da Glow Skin. " +
    "Nenhum pedido ou pagamento real foi realizado."
  );
});

renderProducts();
renderCart();
