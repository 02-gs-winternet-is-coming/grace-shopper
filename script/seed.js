"use strict";

const {
  db,
  models: { User, Product, Order, Order_Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  await Promise.all(
    products.map((product) => {
      return Product.create(product)
    })
  )
  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );

  await Promise.all(orders.map((order)=> {
    return Order.create(order)
  }))

  await Promise.all(orderProducts.map((orderProduct)=> {
    return Order_Product.create(orderProduct)
  }))

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`);
  return {
    users,
    products,
    orders
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

const users = [
  {
    username: "lauratest@gmail.com",
    password: "x6!ngL",
    address: "400 Park Avenue",
    isAdmin: true,
    city: "New York",
    state: "NY",
    zipCode: 10012,
  },
  {
    username: "joey-smith@gmail.com",
    password: "kGs7f2b",
    address: "5 Lawerence Lane",
    isAdmin: false,
    city: "Hoboken",
    state: "NJ",
    zipCode: 10012,
  },
  {
    username: "gigitest@gmail.com",
    password: "y7z.S!99",
    address: "999 Highway Jackson",
    isAdmin: false,
    city: "Jackson",
    state: "WY",
    zipCode: 83002,
  },
  {
    username: "helloAdmin@yahoo.com",
    password: "glJs73$.",
    address: "12 5th Avnue",
    isAdmin: false,
    city: "Miami",
    state: "FL",
    zipCode: 40412,
  },
  {
    username: "jojo_smith@hotmail.com",
    password: "91n!jkL",
    address: "101 Main Street",
    isAdmin: false,
    city: "Los Angeles",
    state: "CA",
    zipCode: 90212,
  },
  {
    username: "cuppa@joe.coffee",
    password: "iLik3c0ffe3",
    isAdmin: false,
    address: "3900 Woodland Ave",
    city: "Philadelphia",
    state: "PA",
    zipCode: "19104",
  },
  {
    username: "ellatest@gmail.com",
    password: "1234",
    isAdmin: true,
    address: "1400 John F Kennedy Blvd",
    city: "Philadelphia",
    state: "PA",
    zipCode: "19107",
  },
  {
    username: "sambucus@elder.flower",
    password: "48ghar48!!!",
    isAdmin: false,
    address: "1 Elderberry Way",
    city: "Minneapolis",
    state: "MN",
    zipCode: "55111",
  },
  {
    username: "mayaderen@meshes.afternoon",
    password: "film4lyfe",
    isAdmin: false,
    address: "4444 Celluloid Way",
    city: "Anchorage",
    state: "AK",
    zipCode: "99511",
  },
];

const products = [
  {
    name: "portabella",
    price: 1.99,
    description: "",
    quantity: 5,
  },
  {
    name: "cremini",
    price: 4.99,
    description: "",
    quantity: 1,
  },
  {
    name: "maitake",
    price: 5.99,
    description: "",
    quantity: 5,
  }, {
    name: "button",
    price: 1.99,
    description: "",
    quantity: 2,
  },
  {
    name: "porcini",
    price: 4.99,
    description: "",
    quantity: 10,
  },
  {
    name: "hedgehog",
    price: 2.99,
    description: "",
    quantity: 35,
  },
  {
    name: "morel",
    price: 9.99,
    description: "",
    quantity: 25,
  },
  {
    name: "lobster",
    price: 8.99,
    description: "",
    quantity: 15,
  },
  {
    name: "enoki",
    price: 2.99,
    description: "",
    quantity: 50,
  },
  {
    name: "chanterelle",
    price: 10.99,
    description: "",
    quantity: 1,
  }
]
const orderProducts = [{price: 2.99, quantity: 3, orderId: 1, productId: 1}]
const orders = [{tax: 2.54, shipping: 5.00, shippingMethod: 'USPS', paymentMethod: 'Stripe', status: 'open', userId: 1}, {status: 'open', userId: 3}, {status: 'open', userId: 2}]
