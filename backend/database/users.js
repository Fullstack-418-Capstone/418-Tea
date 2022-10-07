const client = require("./client")
const { createAddress } = require("./addresses")

//Create User
const createUser = async ({ username, password, firstname, lastname, email, address, isAdmin}) => {
    try {
        const {id: userAddressId} = await createAddress(address);
        const { rows: [newUser] } = await client.query(`
        INSERT INTO users(
            firstname, 
            lastname, 
            username, 
            password, 
            email, 
            "addressId",
            "isAdmin"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
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
        
        return newUser;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

//Get User
//change this to include address
const getUserByUserId = async(userId) => {
    try{
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        JOIN addresses
        ON users."addressId" = addresses."id"
        WHERE users.id=$1
        ;`, [userId]
        )
        
        return user;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

//Get User by Username
const getUserByUsername = async (username) => {
    try{
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        JOIN addresses
        ON users."addressId" = addresses."id"
        WHERE username=$1;
        `, [username]);
    
        return user;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

//Get All Users
const getAllUsers = async() => {
    try{
        const { rows: allUsers } = await client.query(`
        SELECT *
        FROM users
        JOIN addresses
        ON users."addressId" = addresses."id";
        `);
        
        return allUsers;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

//Edit User by ID
const editUserById = async ({userId, ...fields}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}" = $${ index + 1}`
    ).join(', ');
    
    if (setString.length === 0) return;

    try{
        const { rows: [updatedUser] } = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE id = ${userId}
            RETURNING *;
            `, Object.values(fields)
            );

        return updatedUser;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

//Admin Update Users for making another person an Admin.
const updateToAdminById = async(userId) =>{
    try{
        const { rows: updatedUser } = await client.query(`
        UPDATE users
        SET "isAdmin" = true
        WHERE id = $1;
        `, [userId]);

        return updatedUser;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

const setUserToInactiveById = async(userId) => {
    try{
        const { rows: inactiveUser } = await client.query(`
        UPDATE users
        SET "isActive" = false
        WHERE id = $1;
        `, [userId]);

        return inactiveUser;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
//Delete User (by ID)
// const deleteUserById = async(userId) => {
//     try{
//         const { rows: [deletedUser] } = await client.query(`
//             DELETE FROM users
//             WHERE id = $1
//             RETURNING *;
//             `, [userId]
//         );

//         return deletedUser;
//     } catch(err) {
//         console.error(err);
//         throw err;
//     }
// };



module.exports = {
    createUser,
    getUserByUserId,
    getUserByUsername,
    getAllUsers,
    editUserById,
    updateToAdminById,
    setUserToInactiveById,
    //deleteUserById
}