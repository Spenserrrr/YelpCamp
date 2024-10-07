// File to seed the database with some data
// Run this file with the command: node seeds_db_init/index.js
// Run this file when you want to seed the database with new data
const mongoose = require("mongoose");
const cities = require("./cities");
const imagesArray = require("./images");
const { places, descriptors } = require("./randomTitle");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelpCamp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const authors = ["66d3583c6c43fb33716a920c", "66d36143e4ad57767c5eb19b"]

function getRandomImages(imagesArray) {
    // Copy the original array to avoid modifying it directly
    const arrayCopy = [...imagesArray];
    // Fisher-Yates shuffle algorithm
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    // Return the first two elements
    return arrayCopy.slice(0, 2);
}


const seedDB = async () => {
    // Clear all original data firsts
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const place = cities[random1000]
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: authors[Math.floor(Math.random() * authors.length)],
            location: `${place.city}, ${place.state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut debitis doloribus corporis, porro deleniti facilis, voluptatem a ad iure delectus accusantium magnam maxime iste consectetur incidunt modi. Quis, eligendi sunt?",
            price,
            geometry: {
                type: "Point",
                coordinates: [place.longitude, place.latitude]
            },
            images: getRandomImages(imagesArray),
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
