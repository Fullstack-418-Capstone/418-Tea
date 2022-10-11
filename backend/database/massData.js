const productsToCreate = [
    {
        name:'Californian Apricot Tea',
        imgurl:'teabags/apricotfruit.jpg',
        description:'See for yourself why we prefer California Apricot Tea over Georgia Peach Tea',
        stock:49,
        unit:'box',
        type:"bagged",
        price:24
    }, {
        name: 'Asian Green Tea',
        imgurl: 'teabags/greentea.jpg',
        description: "Take a sip of liquid silver",
        stock: 35,
        unit: "canister",
        type: "bagged",
        quantitySold: 312,
        price: 24
    }, {
        name: 'Black Tea',
        imgurl: 'tealeaf/blacktea.jpg',
        description: "Discovered in 17th century China, it's been a classic ever since",
        stock: 35,
        unit: "canister",
        type: "loose",
        quantitySold: 312,
        price: 32,
        stock: 4
    }, {
        name: 'Black Tea',
        imgurl: 'teabags/blacktea.jpg',
        description: "Discovered in 17th century China, it's been a classic ever since",
        stock: 35,
        unit: "canister",
        type: "bagged",
        quantitySold: 312,
        price: 24
    }, {
        name: 'Ehugos Glass Teapot',
        imgurl: 'teapots/navy.jpg',
        description: "Sit back, watch, and KNOW when you're tea is ready",
        stock: 4,
        unit: "each",
        type: "pot",
        price: 32
    }, {
        name: 'Lipton Earl Grey',
        description: "Take a sip of liquid silver",
        stock: 3,
        unit: "box",
        type: "bagged",
        price: 19
    },{
        name: 'Floral Teapot',
        imgurl: 'teapots/floral.jpg',
        description: "Sit back, watch, and never get burned",
        stock: 4,
        unit: "each",
        type: "pot",
        price: 56,
        isActive: false
    }]
    //test comment

  module.exports = {
    productsToCreate
  }