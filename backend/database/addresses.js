const client = require('./client')

//Create Address
const createAddress = async(address) => {
    const {address1, address2, city, state, zipcode} = address
    try {
        const {rows : [address] } = await client.query(`
            INSERT INTO addresses (address1, address2, city, state, zipcode)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [address1, address2 ? address2 : null, city, state, zipcode ])

        return address
    } catch (error) {
        throw error
    }
}

//Get Address
const getAddressByUserId = async(userId) => {
    try {
        const {rows : [address]} = await client.query(`
            SELECT addresses.*
            FROM users
            JOIN addresses ON users."addressId" = addresses.id
            WHERE users.id = $1;
        `, [userId])
        return address
    } catch (error) {
        throw error
    }
}

//Edit Address
//change name to editAddressByUserId and update function accordingly
const editAddress = async({id, ...fields}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    
    if(setString.length === 0) {
        return;
    }
    try {
        const {rows: [updatedAddress]} = await client.query(`
            UPDATE addresses
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `, Object.values(fields))
        return updatedAddress
    } catch (error) {
        throw error
    }
}

//Delete Address
// const deleteAddress = async(id) => {
//     //USER WILL HAVE TO BE DELETED FIRST
//     try {
//         const {rows: [deletedAddress]} = await client.query(`
//             DELETE FROM addresses
//             WHERE id=$1
//             RETURNING *;
//         `, [id])

//         return deletedAddress
//     } catch (error) {
//         throw error
//     }
// }


module.exports = {
    createAddress,
    getAddressByUserId,
    editAddress,
 //   deleteAddress
}