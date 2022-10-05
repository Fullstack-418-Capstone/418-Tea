const client = require('./client')

//Create Address
const createAddress = async(address) => {
    const {address1, address2, city, state, zipcode} = address
    try {
        const {rows : [address] } = await client.query(`
            INSERT INTO addresses (address1, address2, city, state, zipcode)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `, [address1, address2 ? address2 : null, city, state, zipcode ])

        return address
    } catch (error) {
        throw error
    }
}

//Get Address
const getAddress = async(userId) => {
    try {
        const {rows : [address]} = await client.query(`
            SELECT addresses.*
            FROM users
            JOIN addresses ON users.address = addresses.id
            WHERE users.id = $1
        `, [userId])

        return address
    } catch (error) {
        throw error
    }
}

//Edit Address

//Delete Address


module.exports = {
    createAddress,
    getAddress
}