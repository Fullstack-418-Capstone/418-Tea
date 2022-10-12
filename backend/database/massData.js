const productsToCreate = [
    {
        name:'Californian Apricot Tea',
        imgurl:'teabags/apricotfruit.jpg',
        description:'See for yourself why we prefer California Apricot Tea over Georgia Peach Tea',
        stock:49,
        unit:'box',
        type:"bagged",
        price:24
    } , {
        name: 'Antique Japanese Tea Cups',
        imgurl: 'teacups/japaneseteacup.jpg',
        description: 'Classic antique Japanese tea cups for all types of collectors',
        stock: 8,
        unit: 'set of 3',
        type: 'cup',
        quantitySold: 9,
        price: 75
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
    } , {
        name: 'Clear Teapot',
        imgurl: 'teapots/clear.jpg',
        description: "For when you want to see the magic happen.",
        stock: 37,
        unit: "each",
        type: "pot",
        quantitySold: 21,
        price: 50
    } , {
        name: 'Pink Teapot',
        imgurl: 'teapots/pink.jpg',
        description: 'A basic pink teapot',
        stock: 1,
        unit: 'each',
        type: 'pot',
        price: 42
    } , {
        name: 'Yellow Teapot',
        imgurl: 'teapots/yellow.jpg',
        description: 'A fabulous yellow teapot. Much better than any pink one',
        stock: 5,
        unit: 'each',
        type: 'pot',
        quantitySold: 100,
        price: 52
    } , {
        name: 'Garden Grove Teacup',
        imgurl: 'teacups/bluefloralcup.JPG',
        description: 'A calming cup for a calming tea',
        stock: 32,
        unit: 'each',
        type: 'cup',
        quantitySold: 4,
        price: 13
    } , {
        name: 'Spode Blue Italian Jumbo Cup and Saucer',
        imgurl: 'teacups/bluesceniccup.JPG',
        description: 'Drinking from this transports you to better times',
        stock: 4,
        unit: 'each',
        type: 'cup',
        quantitySold: 8,
        price: 9,
        isActive: false
    } , {
        name: 'Vintage Style Cup and Saucer',
        imgurl: 'teacups/blackgoldcup.jpg',
        description: 'Bringing class back to the room',
        stock: 42,
        unit: 'each',
        type: 'cup',
        price: 25
    } , {
        name: 'Royal Albert Pink Cheeky Teacup',
        imgurl: 'teacups/pinkcup.JPG',
        description: 'Adding sass to every teatime',
        stock: 37,
        unit: 'each',
        type: 'cup',
        price: 7
    }, {
        name: 'DaGiBayCn 20 PCS Tea Set',
        imgurl: 'teasets/greenteaset.JPG',
        description: 'A classic and classy teaset for your next teaparty',
        stock: 10,
        unit: 'set',
        type: 'set',
        price: 307
    } , {
        name: 'Almond Blossoms Inspireed Tea Set',
        imgurl: 'teasets/almondteaset.jpg',
        description: 'For those who love almonds, but cannot eat them',
        stock: 3,
        unit: 'set',
        type: 'set',
        quantitySold: 3,
        price: 276
    } , {
        name: 'Vintage Turkish Teapot Set for 6',
        imgurl: 'teasets/turkishset.JPG',
        description: 'Perfect for when you want to show off your Turkish heritage and love tea',
        stock: 6,
        unit: 'set',
        type: 'set',
        quantitySold: 2,
        price: 418
    } , {
        name: 'Vintage English Tea Set',
        imgurl: 'teasets/englishteaset.jpg',
        description: 'A beautifully marbled set to show off a new level of sophistication',
        stock: 1,
        unit: 'set',
        type: 'set',
        quantitySold: 6,
        price: 360
    } , {
        name: 'Kid Connection 18-Piece Tea Set',
        imgurl: 'teasets/kiddyset.jpg',
        description: 'A perfect present for a precocious pretty princess',
        stock: 2,
        unit: 'set',
        type: 'set',
        price: 28
    } , {
        name: 'Chamomile Tea',
        imgurl: 'tealeaf/chamomileleaf.jpg',
        description: 'Hard to spell but easy to drink',
        stock: 198,
        unit: 'canister',
        type: 'loose',
        quantitySold: 9264,
        price: 19
    } , {
        name: 'Cinnamon Apple Tea',
        imgurl: 'tealeaf/cinnamonapple.jpg',
        description: 'Frutiy and spiced mixed into one',
        stock: 283,
        unit: 'canister',
        type: 'loose',
        quantitySold: 832,
        price: 12
    } , {
        name: 'Ginger Chai Tea',
        imgurl: 'tealeaf/gingerchai.jpg',
        description: 'A tea to help you get your chi in balance',
        stock: 12,
        unit: 'canister',
        type: 'loose',
        quantitySold: 828,
        price: 12
    } , {
        name: 'Goldenbud Tea',
        imgurl: 'tealeaf/goldenbud.jpg',
        description: 'Get ready to bloom into pure gold',
        stock: 837,
        unit: 'canister',
        type: 'loose',
        quantitySold: 392,
        price: 18
    } , {
        name: 'Green Tea',
        imgurl: 'tealeaf/greentea.jpg',
        description: 'A refreshing way to start the day',
        stock: 618,
        unit: 'canister',
        type: 'loose',
        quantitySold: 76,
        price: 6
    } , {
        name: 'Jasmine Green Tea',
        imgurl: 'tealeaf/jasminegreentea.jpg',
        description: 'Adding a hint of jasmine to your normal green tea',
        stock: 612,
        unit: 'canister',
        type: 'loose',
        quantitySold: 90,
        price: 7
    } , {
        name: 'Lemon Gingersnap Tea',
        imgurl: 'tealeaf/lemongingersnap.jpg',
        description: 'A little bit of Christmas spirit all year round',
        stock: 183,
        unit: 'canister',
        type: 'loose',
        quantitySold: 1,
        price: 9
    } , {
        name: 'Lemongrass Tea',
        imgurl: 'tealeaf/lemongrass.jpg',
        description: 'Vibrant and flavorful for the whole family',
        stock: 376,
        unit: 'canister',
        type: 'loose',
        quantitySold: 210,
        price: 6
    } , {
        name: 'Oolong Tea',
        imgurl: 'tealeaf/oolong.jpg',
        description: 'A tea only for tea lovers; nobody else knows how to say it',
        stock: 189,
        unit: 'canister',
        type: 'loose',
        quantitySold: 10,
        price: 19
    } , {
        name: 'Organic Ginger Tea',
        imgurl: 'tealeaf/organicgingertea.jpg',
        description: '100% organic ginger, not to be confused with gingerbread',
        stock: 28,
        unit: 'canister',
        type: 'loose',
        quantitySold: 182,
        price: 16
    } , {
        name: 'Organic Red Berry Tea',
        imgurl: 'tealeaf/organicredberry.jpg',
        description: 'Made out of red berries, but it is unknown if it is strawberries, raspberries, cherries or blueberries if the creator was colorblind',
        stock: 532,
        unit: 'canister',
        type: 'loose',
        quantitySold: 83,
        price: 18
    } , {
        name: 'Hibiscus Flower Tea',
        imgurl: 'teabags/hibiscus.jpg',
        description: 'Channel the tropics with this fresh and fragrant tea',
        stock: 812,
        unit: 'box',
        type: 'bagged',
        price: 14
    } , {
        name: "PauD'arco Tea",
        imgurl: "teabags/pauD'arco.jpg",
        description: 'The favorite tea of every Pau in the world',
        stock: 82,
        unit: 'box',
        type: 'bagged',
        quantitySold: 23,
        price: 14
    } , {
        name: 'Crystal White Tea',
        imgurl: 'teabags/whitetea.jpg',
        description: 'Crystal clear and refreshing as new snow',
        stock: 38,
        unit: 'box',
        type: 'bagged',
        price: 13
    } , {
        name: 'Yerbamate Tea',
        imgurl: 'teabags/yerbamate.webp',
        description: 'The best tea from Yerbamate you will find anywhere',
        stock: 1000,
        unit: 'box',
        type: 'bagged',
        price: 20
    } , {
        name: 'Classic English Tea',
        imgurl: 'teabags/englishbreakfast.jpg',
        description: 'The capstone of any good English breakfast',
        stock: 253,
        unit: 'box',
        type: 'bagged',
        price: 12
    } , {
        name: 'Sweet Tri Tea',
        imgurl: 'tealeaf/tritea.jpg',
        description: 'The best tea made from a tree',
        stock: 1,
        unit: 'box',
        type: 'bagged',
        price: 1000000
    }]

  module.exports = {
    productsToCreate
  }