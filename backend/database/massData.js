const productsToCreate = [
    {
      name: 'Asian Green Tea',
      imgurl: 'tealeaf/greentea.jpg',
      description: "Take a sip of liquid silver",
      stock: 35,
      unit: "canister",
      type: "loose",
      price: 24
  },{
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

  module.exports = {
    productsToCreate
  }