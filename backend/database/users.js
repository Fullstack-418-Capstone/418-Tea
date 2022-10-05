const client = require("./client")
const { createAddress } = require("./addresses")

//Create User
const createUser = async ({ username, password, firstname, lastname, email, address, isAdmin}) => {
    try {
        const {id: userAddressId} = await createAddress(address);
    
        const { rows } = await client.query(`
        INSERT INTO users(
            firstname, 
            lastname, 
            username, 
            password, 
            email, 
            "addressId",
            isadmin
        ) VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        ;`, [
            firstname,
            lastname,
            username,
            password,
            email,
            userAddressId,
            isAdmin
        ])

        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
} 

//Get User
const getUserByUserId

const getUserByUsername

//Get All Users
const getAllUsers

//Edit User
const editUser(id, edit stuff)

//Delete User
const deleteUser(id)

//Admin Update Users for making another person an Admin.
const updateAdmin

module.export = {
    createUser
}