//Get Products by OrderId

const client = require("./client")
const { getOpenCartByUser } = require("./orders")
const { getUserByUsername } = require("./users")

//Create Orders_Product
//add to cart
const createNewOrdersProduct = async({userId, productId, quantity, price}) => {
    try{
        const {id : orderId } = await getOpenCartByUser(userId)
        const {rows: [newOrder]} = await client.query(`
            INSERT INTO orders_products(
            "orderId", "productId", quantity, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,[orderId, productId, quantity, price])
        return newOrder
    } catch(err){
        console.error(err);
        throw err;
    }
}

//Edit Orders_Product
//change quantity
const editNewOrdersProductQuantity = async({userId, productId, quantity}) => {
    try {
        const {id : orderId } = await getOpenCartByUser(userId);
        const {rows: [editedOrder]} = await client.query(`
            UPDATE orders_products
            SET quantity=$1
            WHERE "orderId"=$2 AND "productId"=$3;
        `,[quantity, orderId, productId]);
        return editedOrder;
    }catch(err){
        console.error(err);
        throw err;
    }
}
//Delete Orders_Product
const deleteOrdersProduct = async({userId, productId}) => {
    try {
        const {id : orderId } = await getOpenCartByUser(userId);
        const {rows: deletedOrder} = await client.query(`
            DELETE FROM orders_products
            WHERE "orderId"=$1 AND "productId"=$2;
        `,[orderId, productId]);
        return deletedOrder;
    }catch(err){
        console.error(err);
        throw err;
    }
}

//get orders_products by userid
const getOpenCartProductsByUserName = async(username) => {
    try { 
        const { id: userId} = await getUserByUsername(username);
        console.log('here is the userid', userId)
        const {id : orderId } = await getOpenCartByUser(userId);
        console.log('here is the orderId', orderId)
        const { rows: cart } = await client.query(`
        SELECT *
        FROM orders_products
        WHERE "orderId"=${orderId};
        `);
        return cart
    } catch(err){
        console.error(err);
        throw err;
    }
}

//get Orders_product by order Id
const getOpenCartProductsByOrderId = async (orderId) => {
    try{
        const products = await client.query(`
        SELECT *
        FROM orders_products
        WHERE "orderId" = $1;
        `, [orderId]);

        return products;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


//Admin Update Price on Open Orders, see products.js for the full call.
const updateOrdersProductPrice = async (orderId, productId, newPrice) => {
    await client.query(`
    UPDATE orders_products
    SET price = $1,
    WHERE "orderId" = $2 AND "productId" = $3;
    `, [newPrice, orderId, productId]);

    console.log('the price has been changed to ', newPrice);
};


module.exports = {
    createNewOrdersProduct,
    editNewOrdersProductQuantity,
    deleteOrdersProduct,
    getOpenCartProductsByUserName,
    getOpenCartProductsByOrderId,
    updateOrdersProductPrice
}