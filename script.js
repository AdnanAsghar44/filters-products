const data = [
    {
        id: 1,
        name: "Men T-Shirts",
        img: "https://m.media-amazon.com/images/I/612OCczgZHL._AC_SX569_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 11,
        name: "Men Shirt",
        img: "https://m.media-amazon.com/images/I/91yuQ3m+cvL._AC_SX522_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 2,
        name: "Cap",
        img: "https://m.media-amazon.com/images/I/515atgOif+L._AC_SX679_.jpg",
        price: 40,
        cat: "Dress",
    },
    {
        id: 3,
        name: "Card Memory 128gb",
        img: "https://m.media-amazon.com/images/I/71uZD+qZoEL._AC_SY300_SX300_.jpg",
        price: 200,
        cat: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sport",
    },
    {
        id: 5,
        name: "Game UNO",
        img: "https://m.media-amazon.com/images/I/813J6ld2EJL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        price: 74,
        cat: "Casual",
    },
    {
        id: 6,
        name: "Game",
        img: "https://m.media-amazon.com/images/I/51b6NxAuLGL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        price: 52,
        cat: "Kids",
    },
    {
        id: 7,
        name: "Cloath",
        img: "https://m.media-amazon.com/images/I/81kp4YXksYL._AC_SX466_.jpg",
        price: 50,
        cat: "Kids",
    },
    {
        id: 8,
        name: "Selieve Toy",
        img: "https://m.media-amazon.com/images/I/71FKy8-qCPL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        price: 55,
        cat: "Kids",
    },

];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts
        .map(
            (product) =>
                `
       <div class="product">
          <img
          src=${product.img}
          alt=""
          />
          <span class="name">${product.name}</span>
          <span class="priceText">$${product.price}</span>
        </div>
    `
        )
        .join("");
};

displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();

    if (value) {
        displayProducts(
            data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
        );
    } else {
        displayProducts(data);
    }
});

const setCategories = () => {
    const allCats = data.map((item) => item.cat);
    const categories = [
        "All",
        ...allCats.filter((item, i) => {
            return allCats.indexOf(item) === i;
        }),
    ];

    categoriesContainer.innerHTML = categories
        .map(
            (cat) =>
                `
      <span class="cat">${cat}</span>
    `
        )
        .join("");

    categoriesContainer.addEventListener("click", (e) => {
        const selectedCat = e.target.textContent;

        selectedCat === "All"
            ? displayProducts(data)
            : displayProducts(data.filter((item) => item.cat === selectedCat));
    });
};

const setPrices = () => {
    const priceList = data.map((item) => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "$" + maxPrice;

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "$" + e.target.value;
        displayProducts(data.filter((item) => item.price <= e.target.value));
    });
};

setCategories();
setPrices();