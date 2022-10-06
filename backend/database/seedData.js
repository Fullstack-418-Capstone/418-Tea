const client = require("./client");
const {createUser, getUserByUsername, getAllUsers, editUserById, deleteUserById} = require("./users")
const {createProduct, getProductById, editProductById, getProductsByType} = require("./products");
const { createNewOrdersProduct, getOpenCartProductsByUserName } = require("./orders_products");
const { getOpenCartByUser } = require("./orders");
const { getAddressByUserId, editAddress } = require("./addresses");

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
        "isActive" boolean DEFAULT true,
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
        type VARCHAR(50),
        "isActive" boolean DEFAULT true
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
    isAdmin: false
   }
   const createUserTwoResult = await createUser(userTwo)
  console.log('result of create user Two', createUserTwoResult)
  console.log('finsihed created two initial users and addresses')
}
const createInitialProducts = async()  => {
  console.log('creating initial products...');
  try {
    const productsToCreate = [
      {
        name: 'Asian Green Tea',
        imgurl: '456url',
        description: "Take a sip of liquid silver",
        stock: 35,
        unit: "canister",
        type: "loose",
        price: 24
    },{
      name: 'Ehugos Glass Teapot',
      imgurl: '123url',
      description: "Sit back, watch, and KNOW when you're tea is ready",
      stock: 4,
      unit: "each",
      type: "pot",
      price: 32
    }, {
      name: 'Lipton Earl Grey',
      description: "Take a sip of liquid silver",
      stock: 3,
      unit: "box",
      type: "bagged",
      price: 19
    },{
      name: 'Ehugos Silicone Teapot',
      imgurl: '123url',
      description: "Sit back, watch, and never get burned",
      stock: 4,
      unit: "each",
      type: "pot",
      price: 56
    }]
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("Products created:")
    console.log(products)
    console.log("Finished creating initial products")  
  } catch (error){
    console.error('issue creating initial products');
    throw error;
  }  
}
const createInitialCarts = async() => {
  console.log('creating initial carts...');
  try {
    const {price: priceOne} = await getProductById(2)
    const {price: priceTwo} = await getProductById(3)
    const addToCartsToCreate = [
      {
        userId: 1,
        productId: 2,
        quantity: 2,
        price: priceOne
      }, {
        userId: 1,
        productId: 3,
        quantity: 1,
        price: priceTwo
      }, {
        userId: 2,
        productId:3,
        quantity:1,
        price: priceTwo
      }
    ]
   // const  addedCarts = await Promise.all(cartsToCreate.map(createNewOrdersProduct))
    const addOne = await createNewOrdersProduct(addToCartsToCreate[0])
   //console.log('addOne', addOne)
    const addTwo = await createNewOrdersProduct(addToCartsToCreate[1])
    const addThree = await createNewOrdersProduct(addToCartsToCreate[2])
    const addedCarts = [addOne, addTwo, addThree]
    console.log('carts made:')
    console.log(addedCarts)
    console.log("Finished creating initial carts")
  }catch (error){
    console.error('issue creating initial carts');
    throw error;
  } 
}




const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialCarts();
    console.log(await getProductById(1))
    const editedProduct = await editProductById({id:1, stock: 400})
    console.log(await getProductById(1))


  } catch (error) {
    console.error("error rebuilding the db!");
    throw error;
  }
};

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());