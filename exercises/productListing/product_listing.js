const JSONFILENAME = "product_listing.json";

const calculateDiscount = (fullPrice, percentage) => {
  let discount = fullPrice * (percentage / 100);
  let finalFullPrice = fullPrice - discount;
  // Round price to 2 decimal places
  return finalFullPrice.toFixed(2);
};

const createElements = () => {
  const container = document.createElement("div");
  const imgContainer = document.createElement("div");
  const textContainer = document.createElement("div");
  const img = document.createElement("img");
  const priceText = document.createElement("p");
  const productNameText = document.createElement("p");
  const justInOrBestSeller = document.createElement("p");

  return [
    container,
    imgContainer,
    textContainer,
    img,
    priceText,
    productNameText,
    justInOrBestSeller,
  ];
};

const checkProductDiscount = (discount, price, priceText, percentageText) => {
  if (discount) {
    priceText.innerHTML = `${calculateDiscount(price, discount)} \
            <span class="discount">${price} \
            </span>`;
    percentageText = document.createElement("p");
    percentageText.className = "percentage";
    percentageText.innerHTML = `${discount}% Off!`;
  } else {
    priceText.textContent = `${price}`;
  }
  return percentageText;
};

const checkIfProductJustInOrBestSeller = (justIn, bestSeller, justInOrBestSeller) => {
  if (justIn) {
    justInOrBestSeller.className = "just-in";
    justInOrBestSeller.innerHTML = "Just In";
  } else if (bestSeller) {
    justInOrBestSeller.className = "bestseller";
    justInOrBestSeller.innerHTML = "Bestseller";
  }
};

const addProductDetailsToDom = (
  justInOrBestSeller,
  productNameText,
  priceText,
  percentageText,
  img,
  imgContainer,
  textContainer,
  container,
  gridContainer
) => {
  textContainer.appendChild(justInOrBestSeller);
  textContainer.appendChild(productNameText);
  textContainer.appendChild(priceText);
  if (percentageText) {
    textContainer.appendChild(percentageText);
  }
  imgContainer.appendChild(img);
  container.appendChild(imgContainer);
  container.appendChild(textContainer);
  gridContainer.appendChild(container);
};

const createProductDetails = (
  productNameText,
  name,
  img,
  imgSrc,
  priceText,
  discount,
  price,
  percentageText,
  justIn,
  bestSeller,
  justInOrBestSeller
) => {
  productNameText.textContent = name;
  productNameText.className = "product-name";
  img.setAttribute("src", imgSrc);
  img.setAttribute("alt", name);
  priceText.className = "price";

  percentageText = checkProductDiscount(
    discount,
    price,
    priceText,
    percentageText
  );

  checkIfProductJustInOrBestSeller(justIn, bestSeller, justInOrBestSeller);

  return percentageText;
};

const updateUI = data => {
  const gridContainer = document.getElementById("grid-container");
  data.forEach(product => {
    // Get product details
    const { name, price, imgSrc, discount, justIn, bestSeller } = product;

    const [
      container,
      imgContainer,
      textContainer,
      img,
      priceText,
      productNameText,
      justInOrBestSeller,
    ] = createElements();
    let percentageText;

    percentageText = createProductDetails(
      productNameText,
      name,
      img,
      imgSrc,
      priceText,
      discount,
      price,
      percentageText,
      justIn,
      bestSeller,
      justInOrBestSeller
    );

    addProductDetailsToDom(
      justInOrBestSeller,
      productNameText,
      priceText,
      percentageText,
      img,
      imgContainer,
      textContainer,
      container,
      gridContainer
    );
  });
};

const getProducts = async () => {
  try {
    const response = await fetch(JSONFILENAME);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the JSON data and return the data
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return null;
  }
}

const handleNoData = () => {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = "Error fetching data.";

    div.appendChild(p);
    main.appendChild(div);
}

// Must be wrapped in an async because of the await keyword
// Use Immediately Invoked Function Expression
(async () => {
    const data = await getProducts();
    if (!data) {
        handleNoData();
    } else {
        updateUI(data);
    }
})();
