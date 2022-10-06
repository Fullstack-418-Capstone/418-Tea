const client = require('./client')

//Create Product
const createProduct = async({name, imgurl, description, stock, price, unit, type}) => {
    try {
        const {rows: [product]} = await client.query(`
            INSERT INTO products (name, imgurl, description, stock, price, unit, type)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [name, imgurl ? imgurl : null, description, stock, price, unit, type])

        return product
    } catch (error) {
        throw error
    }
}

//Get Product Details
const getProductById = async(id) => {
    try {
        const {rows : [product]} = await client.query(`
            SELECT *
            FROM products
            WHERE id=$1;
        `, [id])

        return product
    } catch (error) {
        throw error
    }
}

//Get All Products 
const getAllProducts = async() => {
    try {
        const {rows: products} = await client.query(`
            SELECT *
            FROM products;
        `)

        return products
    } catch (error) {
        throw error
    }
}

//Get Products by Type // change to getActiveProductsByType
const getProductsByType = async(type) => {
    try {
        const {rows: products} = await client.query(`
            SELECT *
            FROM products
            WHERE type=${type};
        `)

        return products
    } catch (error) {
        throw error
    }
}

//Edit Product
const editProductById = async({id, ...fields}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    
    if(setString.length === 0) {
        return;
    }
    try {
        const {rows: [updatedProduct]} = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields))

        return updatedProduct
    } catch (error) {
        throw error
    }
}

//Delete Product //      S H O U L D    B E    I N A C T I V E
const deleteProduct = async(id) => {
    try {
        const {rows: [deletedProduct]} = await client.query(`
            DELETE FROM products
            WHERE id=$1
            RETURNING *;
        `, [id])

        return deletedProduct
    } catch (error) {
        throw error
    }
    //this function is untested
}


module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    getProductsByType,
    editProductById,
    deleteProduct
}