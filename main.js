// Learning Code
// Functions in JS
// function alertFunction(){
//     alert("Hello")
// }

// HTML tag selections
// document.getElementById("greeting").innerHTML = "Hello World"
// QuerySelector used to select tag with css class
// document.querySelector("p#weather").innerHTML = "New Value"
// Add class
// document.querySelector("p#weather").classList.add("redbg");
// Remove class
// document.querySelector("p#weather").classList.remove("redbg");
// Toggle class
// document.querySelector("p#weather").classList.toggle("redbg");
// Events in JS
// document.querySelector("p#weather").addEventListener("click", function(){
// alert("P tag is clicked")
// })

// Project Code Starts Here
// Gallery Image Data
const galleryImages = [
    {
        "src": "./assets/gallery/image1.jpg",
        "alt": "Thumbnail Image 1"
    },
    {
        "src": "./assets/gallery/image2.jpg",
        "alt": "Thumbnail Image 2"
    },
    {
        "src": "./assets/gallery/image3.jpg",
        "alt": "Thumbnail Image 3"
    }
]

const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
]

const weatherAPIKey = "8897ef6f14c9aeec3ed26ae653fa0c87"
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`

// Menu Section
function menuHandler() {

    // This event handler handles opening of navbar
    document.querySelector("#open-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    // This event handler handles closing of navbar
    document.querySelector("#close-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

// Greeting section
// celsius to fahrehniet calculator function
function celsiusToFahr(temperature) {
    return (temperature * 9 / 5) + 32
}

// fahrenheit to celsius calculator function
function fahrToCelsius(temperature) {
    return (temperature - 32) / 1.8
}

// Greeting Handler: Handles the header greeting text
function greetingHandler() {

    let currentHour = new Date().getHours() // Get currnt hour of time

    // Set greeting message according to time
    const greetingText = currentHour === 0 && currentHour < 12 ? "Good Morning!" :
        currentHour >= 12 && currentHour < 17 ? "Good Afternoon!" :
            currentHour >= 17 && currentHour < 20 ? "Good Evening!" :
                "Welcome!"

}

// Handles the timer shown in the header
function clockHandler() {

    // setInterval updates the time every second(1000)
    setInterval(function () {
        let localTime = new Date()

        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, "0")
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, "0")
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, "0")
    }, 1000)
}

// Gallery Section
function galleryHandler() {

    // Select the default selected image
    let mainImg = document.querySelector("#gallery > img")
    // set image source and alternate text
    mainImg.src = galleryImages[0].src
    mainImg.alt = galleryImages[0].alt

    // Select thumbnails class which will contain multiple images
    let thumbnails = document.querySelector("#gallery .thumbnails")

    // generate an image element for each image in galleryImage Data
    galleryImages.forEach(function (image, index) {
        let thumb = document.createElement("img")
        thumb.src = image.src
        thumb.alt = image.alt
        thumb.dataset.arrayIndex = index
        thumb.dataset.selected = index === 0 ? true : false;

        // handles the thumbnail on click and sets as main image .i.e. selected image
        thumb.addEventListener("click", function (event) {
            let selectedIndex = event.target.dataset.arrayIndex
            let selectedImage = galleryImages[selectedIndex]
            mainImg.src = selectedImage["src"]
            mainImg.alt = selectedImage["alt"]

            // set 'selected' property of all images to false
            thumbnails.querySelectorAll("img").forEach(function (img) {
                img.dataset.selected = false
            })

            // set clicked image 'selected' property to true
            event.target.dataset.selected = true
        })

        // Add the image element generated to the thumbnails div as child container
        thumbnails.appendChild(thumb)
    })
}

// Products Section

function populateProducts(productList) {

    // select products-area class
    let productsSection = document.querySelector(".products-area")
    productsSection.textContent = ""

    productList.forEach(function (product, index) {

        // create a product element of class product-item
        let productElem = document.createElement("div")
        productElem.classList.add("product-item")

        // Add the element attributes of the product item
        let productImg = document.createElement("img")
        productImg.src = product.image
        productImg.alt = product.title

        // Create product details 
        let productDetails = document.createElement("div")
        productDetails.classList.add("product-details")

        let productTitle = document.createElement("h3")
        productTitle.classList.add("product-title")
        productTitle.textContent = product.title

        let productAuthor = document.createElement("p")
        productAuthor.classList.add("product-author")
        productAuthor.textContent = product.author

        let productPriceTitle = document.createElement("p")
        productPriceTitle.classList.add("price-title")
        productPriceTitle.textContent = "Price"

        let productPrice = document.createElement("p")
        productPrice.classList.add("product-price")
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2).toString() : "Free"

        productDetails.append(productTitle)
        productDetails.append(productAuthor)
        productDetails.append(productPriceTitle)
        productDetails.append(productPrice)


        // Add the child HTML elements to product element
        productElem.append(productImg)
        productElem.append(productDetails)

        // Add the product element to parent div
        productsSection.append(productElem)

    })
}

function productHandler() {


    let paidProducts = products.filter(function (product) {
        if (product.price != 0) {
            return product
        }
    })

    let freeProducts = products.filter(function (product) {
        if (product.price == 0 || !product.price) {
            return product
        }
    })

    let paidItemCount = paidProducts.length
    let freeItemCount = freeProducts.length
    let allProductsCount = products.length

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = allProductsCount
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeItemCount
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidItemCount
    populateProducts(products)
    let filter = document.querySelector(".products-filter")
    filter.addEventListener("click", function (e) {
        if (e.target.id === "paid") {
            populateProducts(paidProducts)
        }
        else if (e.target.id === "free") {
            populateProducts(freeProducts)
        }
        else if (e.target.id === "all") {
            populateProducts(products)
        }
    })
}

// Footer section
let text = new Date().getFullYear()
document.querySelector("footer").textContent = `${text} - All Rights Reserved By Jai Irkal`

function weatherHandler() {

    navigator.geolocation.getCurrentPosition(function (position) {

        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let URL = weatherAPIURL
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherAPIKey)
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let currentHour = new Date().getHours() // Get currnt hour of time

                // Set greeting message according to time
                const greetingText = currentHour === 0 && currentHour < 12 ? "Good Morning!" :
                    currentHour >= 12 && currentHour < 17 ? "Good Afternoon!" :
                        currentHour >= 17 && currentHour < 20 ? "Good Evening!" :
                            "Welcome!"
                const condition = data.weather[0].description
                const location = data.name
                let temperature = data.main.temp
                console.log(condition, location, temperature)

                let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1).toString()}°C outside.`
                let fahrText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1).toString()}°F outside.`

                document.querySelector("#greeting").innerHTML = greetingText
                document.querySelector("#weather").innerHTML = celsiusText

                // Query selector for displaying greeting for celsius and fahrenhiet
                document.querySelector(".weather-group").addEventListener("click", function (event) {
                    if (event.target.id == "fahr") {
                        let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1).toString()}°F outside.`
                        document.querySelector("#weather").innerHTML = fahrText
                    } else {
                        document.querySelector("#weather").innerHTML = celsiusText
                    }
                })
        }).catch(err => {
            document.querySelector("p#weather").innerHTML = "Unable to get weather info. Try again later."
        })
    })
}

// On Page Load 
menuHandler()
// greetingHandler()
weatherHandler()
clockHandler()
galleryHandler()
productHandler()