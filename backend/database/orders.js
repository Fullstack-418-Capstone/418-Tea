const client = require("./client")

//Create Order
const createOrder = async (userId) => {
    try {
        const { rows: newOrder } = await client.query(`
        INSERT INTO orders("userId")
        VALUE $1;
        `, [userId]);

        return newOrder;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

//Edit Order

//Get All Orders

//Get Open Orders by UserId

//Get "Cart" by UserId (The active order)
const getOpenCartByUser = async (userId) => {
    try {
        const { rows: openCart } = await client.query(`
        SELECT IFNULL(id)
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

//Delete Order?

//Get Order by Status? 

module.exports = {
    createOrder,
    getOpenCartByUser
}