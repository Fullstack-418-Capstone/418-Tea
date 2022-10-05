const client = require('./client')

//Create Address
const createAddress = async(address) => {
    const {address1, address2, city, state, zipcode} = address
    try {
        const {rows: {id} } = await client.query(`
            INSERT INTO addresses (address1, address2, city, state, zipcode)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `, [address1, address2 ? address2 : null, city, state, zipcode ])

        return id
    } catch (error) {
        throw error
    }
}

//Get Address

//Edit Address

//Delete Address