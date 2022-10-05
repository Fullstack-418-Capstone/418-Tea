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

        return rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
} 

//Get User
const getUserByUserId = async(userId) => {
    const { rows } = client.query(`
        SELECT *
        FROM users
        WHERE id = $1
        ;`, [userId]
    )

    return rows[0];
}



//Get All Users


//Edit User by ID


//Delete User by ID


//Admin Update Users for making another person an Admin.


module.export = {
    createUser,
    getUserByUserId
}