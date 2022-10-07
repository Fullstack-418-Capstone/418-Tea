const client = require('./client')
const { getOpenOrders } = require('./orders')
const { getCartProductsByOrderId, updateOrdersProductPrice } = require('./orders_products')

//Create Product
const createProduct = async({name, imgurl, description, stock, price, unit, type, isActive}) => {
    if(isActive === undefined){isActive = true}
    try {
        const {rows: [product]} = await client.query(`
            INSERT INTO products (name, imgurl, description, stock, price, unit, type, "isActive")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [name, imgurl ? imgurl : null, description, stock, price, unit, type, isActive])

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

//get All Active Products
const getAllActiveProducts = async() => {
    try{
        const {rows: activeProducts} = await client.query(`
        SELECT *
        FROM products
        WHERE "isActive" = true;
        `);

        return activeProducts;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

//Get Products by Type // change to getActiveProductsByType
const getActiveProductsByType = async(type) => {
    try {
        const {rows: products} = await client.query(`
            SELECT *
            FROM products
            WHERE type=$1 AND "isActive" = true;
        `, [type])

        return products
    } catch (error) {
        throw error
    }
}

//Edit Product and update the cost in open orders of the orders_products if cost is edited.
const editProductById = async({id, ...fields}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    
    if(setString.length === 0) {
        return;
    }

    if(fields.price) {
        const newPrice = fields.price;
        const openOrdersArr = await getOpenOrders();

        for (let i = 0; i < openOrdersArr.length; i++) {
            const openOrderId = openOrdersArr[i].id

            const productsArr = await getCartProductsByOrderId(openOrderId);

            for(let j = 0; j < productsArr.length; j++) {
                if(productsArr[j].productId === id){
                    await updateOrdersProductPrice(openOrderId, id, newPrice);
                }
            }
        }
    };
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

//setProductToInactiveById
const setProductToInactiveById = async(productId) => {
    try{
        const { rows: [inactiveProduct] } = await client.query(`
        UPDATE products
        SET "isActive" = $1
        WHERE id = $2;
        `, [false, productId]);

        return inactiveProduct;
    } catch(err) {
        console.error(err)
    }
}
const setProductToActiveById = async(productId) => {
    try{
        const { rows: [inactiveProduct] } = await client.query(`
        UPDATE products
        SET "isActive" = $1
        WHERE id = $2;
        `, [true, productId]);

        return inactiveProduct;
    } catch(err) {
        console.error(err)
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
    getAllActiveProducts,
    getActiveProductsByType,
    editProductById,
    setProductToInactiveById,
    setProductToActiveById,
    deleteProduct
}