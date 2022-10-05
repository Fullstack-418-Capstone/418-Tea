const client = require("./client");
const {createUser} = require ("./users")
const {createAddress} = require ("./addresses")

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
        username VARCHAR(30) NOT NULL,
        password VARCHAR (255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        "isAdmin" boolean DEFAULT false,
        "addressId" INTEGER REFERENCES addresses(id),
        UNIQUE (username, email)
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

const createTableProducts = async() => {
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
        type VARCHAR(50)
      );
    `);
  }catch (error) {
    console.error("error during create products table!");
    throw error;
  }
}

const createTableOrders = async() => {
  try {
    await client.query(`
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        status VARCHAR(32),
        "isOpen" BOOLEAN DEFAULT true
      );
    `);
  }catch (error) {
    console.error("error during create orders table!");
    throw error;
  }
}

const createTableOrdersProducts = async() => {
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
  }catch (error) {
    console.error("error during create orders_products table!");
    throw error;
  }
}

/* 

              MAKING TEST DATA
*/
const createInitialUsers = async() => {
  //creates users and addresses for each user
  console.log('starting create initial users');
  const addressOne = {
    address1: '123 Main Street',
    address2: 'apt 456',
    city: 'Boston',
    state: 'MA',
    zipcode: '02108'
   }
   //const { id: idOne } = await createAddress(addressOne)
   const userOne = {
    username: 'IronMan',
    password: 'thanksJarvis',
    firstname: 'Tony',
    lastname: 'Stark',
    email: 'theSmartAvenger@gmail.com',
    address: addressOne,
    isAdmin: true
   }
  const createUserOneResult = await createUser(userOne)
  console.log('result of create user one', createUserOneResult)
  const addressTwo = {
    address1: '250 52nd street ',
    city: 'Gotham',
    state: 'NJ',
    zipcode: '07015'
   }
   //const { id: idTwo } = await createAddress(addressTwo)
   const userTwo = {
    username: 'assistantDA',
    password: 'futureAG',
    firstname: 'Rachel',
    lastname: 'Dawes',
    email: 'crispygirl@gmail.com',
    address: addressTwo,
    isAdmin: true
   }
   const createUserTwoResult = await createUser(userTwo)
  console.log('result of create user Two', createUserTwoResult)
  console.log('finsihed created two initial users and addresses')
}








const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error("error rebuilding the db!");
    throw error;
  }
};

rebuildDB();