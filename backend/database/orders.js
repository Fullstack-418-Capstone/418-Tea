const client = require("./client")

//Create Order
const createOrder = async (userId) => {
    try {
        const { rows: [newOrder] } = await client.query(`
        INSERT INTO orders("userId")
        VALUES ($1)
        RETURNING *;
        `, [userId]);

        return newOrder;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

//Edit Order by Order ID
const editOrderByOrderId = async (orderId, ...fields) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}" = $${ index + 1}`
    ).join(', ');
    try {
        const { rows: [editedOrder] } = await client.query(`
        UPDATE orders
        SET ${setString}
        WHERE "orderId" = ${orderId}
        RETURNING *;
        `, Object.values(fields));
        
        return editedOrder;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

//Get All Orders
const getAllOrders = async () => {
    try{
        const { rows: allOrders } = await client.query(`
        SELECT *
        FROM orders;
        `);

        return allOrders
    } catch(err) {
        console.error(err);
        throw err;
    }

}

//Get Open Orders
const getOpenOrders = async () => {
    try{
        const { rows: openOrders } = await client.query(`
        SELECT *
        FROM orders
        WHERE "isOpen" = true;
        `);
    
        return openOrders
    } catch (err) {
        console.error(err);
        throw err;
    }
}

//Get Orders by UserId (Open and Closed)
const getOrdersbyUserId = async (userId) => {
    try{
        const { rows: orders } = await client.query(`
        SELECT *
        FROM orders
        WHERE "userId" = $1;
        `, [userId]);

        return orders;
    } catch(error) {
        throw error
    }
}

//Get "Cart" by UserId (The active order)
const getOpenCartByUser = async (userId) => {
    try {
        const { rows: openCart } = await client.query(`
        SELECT id
        FROM orders
        WHERE "userId" = $1 AND "isOpen" = true;
        `, [userId]);

        if(openCart.length === 0 ) {
            const cartId = await createOrder(userId);
            return cartId;
        } else {
            return openCart[0];
        }
    } catch(err) {
        console.error(err);
        throw(err);
    }
};

//Delete Order
const deleteOrder = async (orderId) => {
    try{
        const { rows: [deletedOrder] } = await client.query(`
        DELETE FROM orders
        WHERE id = $1
        RETURNING *;
        `, [orderId]);

        return deletedOrder;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

const placeOrder = async(orderId) => {
   // const setString = `"isOpen=$1, "status"=$2`
    
    try{
        const { rows: [order] } = await client.query(`
        UPDATE orders
        SET "isOpen"=false, "status"='ordered'
        WHERE id=${orderId}
        RETURNING *;
        `);
        
        return order

    } catch(err) {
        console.error(err);
        throw err;
    }
}

//Get Order by Status? 

module.exports = {
    createOrder,
    editOrderByOrderId,
    getAllOrders,
    getOpenOrders,
    getOrdersbyUserId,
    getOpenCartByUser,
    deleteOrder,
    placeOrder
};