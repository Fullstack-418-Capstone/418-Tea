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

//Get Products by Type
const getProductsByType = async(type) => {
    try {
        const {rows: products} = await client.query(`
            SELECT *
            FROM products
            WHERE type=$1;
        `, [type])

        return products
    } catch (error) {
        throw error
    }
}

//Edit Product
const editProduct = async(id, ...fields) => {
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
            WHERE ${id}
            RETURNING *;
        `, Object.values(fields))

        return updatedProduct
    } catch (error) {
        throw error
    }
}

//Delete Product
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
}


module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    getProductsByType,
    editProduct,
    deleteProduct
}