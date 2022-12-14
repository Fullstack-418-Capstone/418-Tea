const client = require("./client");
const { createUser } = require("./users");
const { createProduct, getProductById } = require("./products");
const { createNewOrdersProduct, getCartProductsByOrderId } = require("./orders_products");
const { productsToCreate } = require("./massData");
const { placeOrder, getOrdersByOrderId } = require("./orders");
const { createRandomUser } = require('./massProfileData')

const createTables = async () => {
  try {
    await createTableAddresses();
    await createTableUsers();
    await createTableProducts();
    await createTableOrders();
    await createTableOrdersProducts();
  } catch (error) {
    throw error;
  }
};

const dropTables = async () => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS orders_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS addresses;
    DROP TABLE IF EXISTS products;
    `);
  } catch (error) {
    console.error("error dropping tables!");
    throw error;
  }
};

const createTableUsers = async () => {
  try {
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        username VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" boolean DEFAULT false,
        "addressId" INTEGER REFERENCES addresses(id),
        "isActive" boolean DEFAULT true
      );
    `);
  } catch (error) {
    console.error("error during create users table!");
    throw error;
  }
};

const createTableAddresses = async () => {
  try {
    await client.query(`
      CREATE TABLE addresses(
        id SERIAL PRIMARY KEY,
        address1 VARCHAR (255) NOT NULL,
        address2 VARCHAR (255), 
        city VARCHAR(100) NOT NULL,
        state VARCHAR(2) NOT NULL,
        zipcode VARCHAR(10) NOT NULL
      );
    `);
  } catch (error) {
    console.error("error during create addresses table!");
    throw error;
  }
};

const createTableProducts = async () => {
  try {
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(70),
        imgurl VARCHAR(255),
        description TEXT,
        stock INTEGER,
        price INTEGER,
        unit VARCHAR(30),
        type VARCHAR(50),
        "quantitySold" INTEGER DEFAULT 0,
        "isActive" boolean DEFAULT true
      );
    `);
  } catch (error) {
    console.error("error during create products table!");
    throw error;
  }
};

const createTableOrders = async () => {
  try {
    await client.query(`
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        status VARCHAR(32),
        "isOpen" BOOLEAN DEFAULT true
      );
    `);
  } catch (error) {
    console.error("error during create orders table!");
    throw error;
  }
};

const createTableOrdersProducts = async () => {
  try {
    await client.query(`
      CREATE TABLE orders_products(
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER,
        price INTEGER
      );
    `);
  } catch (error) {
    console.error("error during create orders_products table!");
    throw error;
  }
};

/* 

              MAKING TEST DATA
*/
const createInitialUsers = async () => {
  //creates users and addresses for each user
  console.log("starting create initial users");
  const addressOne = {
    address1: "123 Main Street",
    address2: "apt 456",
    city: "Boston",
    state: "MA",
    zipcode: "02108",
  };

  const userOne = {
    username: "IronMan",
    password: "thanksJarvis",
    firstname: "Tony",
    lastname: "Stark",
    email: "theSmartAvenger@gmail.com",
    address: addressOne,
    isAdmin: true,
  };
  const createUserOneResult = await createUser(userOne);
  console.log("result of create user one", createUserOneResult);
  const addressTwo = {
    address1: "250 52nd street ",
    city: "Gotham",
    state: "NJ",
    zipcode: "07015",
  };
  //const { id: idTwo } = await createAddress(addressTwo)
  //assistantDA
  //crispygirl@gmail.com
  const userTwo = {
    username: "assistantDA",
    password: "futureAG",
    firstname: "Rachel",
    lastname: "Dawes",
    email: "crispygirl@gmail.com",
    address: addressTwo,
    isAdmin: false,
  };

  
  const createUserTwoResult = await createUser(userTwo);
  console.log("result of create user Two", createUserTwoResult);
  
  const addressDefault = {
    address1: "9298 S PiCount Lane",
    city: "Circum City",
    state: "NA",
    zipcode: "10101",
  };

  const userGuest = {
    username: "Guest",
    password: 'I am a guest.',
    firstname: 'Gue',
    lastname: 'Ste',
    email: 'IgowhereIplease.gmail.com',
    address: addressDefault,
    isAdmin: false,
  }
  
  const createUserGuestResult = await createUser(userGuest);
  console.log('Result of creating guest user: ', createUserGuestResult)
  console.log("finsihed created three initial users and addresses");
  
  for (let i = 0; i < 50; i++){
    createUser(createRandomUser());
    i++;
  };
  
  const randomUser = await createUser(createRandomUser());
  console.log('I AM THE MOST MAGIC!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', randomUser);

};
const createInitialProducts = async () => {
  console.log("creating initial products...");
  try {
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("Products created:");
    console.log(products);
    console.log("Finished creating initial products");
  } catch (error) {
    console.error("issue creating initial products");
    throw error;
  }
};
const createInitialCarts = async () => {
  console.log("creating initial carts...");
  try {
    const { price: priceOne } = await getProductById(2);
    const { price: priceTwo } = await getProductById(3);
    const addToCartsToCreate = [
      {
        userId: 1,
        productId: 2,
        quantity: 2,
        price: priceOne,
      },
      {
        userId: 1,
        productId: 3,
        quantity: 1,
        price: priceTwo,
      },
      {
        userId: 2,
        productId: 3,
        quantity: 1,
        price: priceTwo,
      },
      {
        userId: 2,
        productId: 4,
        quantity: 1,
        price: priceTwo,
      },
      {
        userId: 2,
        productId: 5,
        quantity: 1,
        price: priceTwo,
      },
    ];

    const addOne = await createNewOrdersProduct(addToCartsToCreate[0]);
    const addTwo = await createNewOrdersProduct(addToCartsToCreate[1]);
    const addThree = await createNewOrdersProduct(addToCartsToCreate[2]);
    const addFour = await createNewOrdersProduct(addToCartsToCreate[3]);
    const addFive = await createNewOrdersProduct(addToCartsToCreate[4]);
    const addedCarts = [addOne, addTwo, addThree, addFour, addFive];
    await placeOrder(2);
    const cartsToCreateTwo = [
      {
        userId: 2,
        productId: 7,
        quantity: 1,
        price: priceTwo,
      },
      {
        userId: 2,
        productId: 12,
        quantity: 3,
        price: priceTwo,
      }
    ]
    await Promise.all(cartsToCreateTwo.map(createNewOrdersProduct))
    await placeOrder(3)

    console.log("carts made:");
    console.log(addedCarts);
    console.log("Finished creating initial carts");
  } catch (error) {
    console.error("issue creating initial carts");
    throw error;
  }
};

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialCarts();
    
  } catch (error) {
    console.error("error rebuilding the db!");
    throw error;
  }
};

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
