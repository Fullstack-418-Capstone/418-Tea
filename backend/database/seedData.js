const client = require("./client");

const createTables = async () => {
  try {
    await createTableAddress();
    await createTableUsers();
  } catch (error) {
    throw error;
  }
};

const dropTables = async () => {
  try {
    await client.query(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS addresses;
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
                firstname varchar(50) NOT NULL,
                lastname varchar(50) NOT NULL,
                username varchar(30) NOT NULL,
                password varchar (255) NOT NULL,
                email varchar(255) NOT NULL,
                isadmin boolean DEFAULT false,
                address INTEGER REFERENCES addresses(id),
                UNIQUE (username, email)
            );
        `);
  } catch (error) {
    console.error("error creating the users table!");
    throw error;
  }
};

const createTableAddress = async () => {
  try {
    await client.query(`
            CREATE TABLE addresses(
                id SERIAL PRIMARY KEY,
                address1 varchar (255) NOT NULL,
                address2 varchar (255), 
                city varchar(100) NOT NULL,
                state varchar(2) NOT NULL,
                zipcode varcher(10) NOT NULL
            );
        `);
  } catch (error) {
    console.error("error during creater address table");
    throw error;
  }
};

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
  } catch (error) {
    console.error("error rebuilding the db!");
    throw error;
  }
};
