const client = require("./client");

const createTables = async () => {
  try {
    await createTableAddresses();
    await createTableUsers();
    await createTableProducts();
    await createTableCarts();
    await createTableOrders();
    await createTableOrderedProducts();
  } catch (error) {
    throw error;
  }
};

const dropTables = async () => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS ordered_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS carts;
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
        isadmin boolean DEFAULT false,
        address INTEGER REFERENCES addresses(id),
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
const createTableCarts = async() => {
  try {
    await client.query(`
      CREATE TABLE carts(
        userid INTEGER REFERENCES users(id),
        productid INTEGER REFERENCES products(id),
        quantity INTEGER
      );
    `);
  }catch (error) {
    console.error("error during create carts table!");
    throw error;
  }
}
//making user id reference users table //ADDING status
const createTableOrders = async() => {
  try {
    await client.query(`
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        userid INTEGER REFERENCES users(id),
        status VARCHAR(32)
      );
    `);
  }catch (error) {
    console.error("error during create orders table!");
    throw error;
  }
}
//review if these should be unique
const createTableOrderedProducts = async() => {
  try {
    await client.query(`
      CREATE TABLE ordered_products(
        id SERIAL PRIMARY KEY,
        orderid INTEGER REFERENCES orders(id),
        productid INTEGER REFERENCES products(id),
        quantity INTEGER,
        price INTEGER
      );
    `);
  }catch (error) {
    console.error("error during create ordered_products table!");
    throw error;
  }
}

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
  } catch (error) {
    console.error("error rebuilding the db!");
    throw error;
  }
};
