const {
  conn,
  User,
  Product,
  CreditCard,
  Category,
  Genre,
  Address,
  Order,
  LineItem
} = require('../')
const { USERS } = require('./seedDataUsers')
const { CATEGORIES } = require('./seedDataCategories')
const { GENRES } = require('./seedDataGenres')
const { seedDataProducts } = require('./seedDataProducts')

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true })

    //console.log(dataProducts)
    seedDataProducts()

    await User.create({
      firstName: 'Lucy',
      lastName: 'Bar',
      email: 'lucy_bar@gmail.com',
      password: 'lucy_pw',
      phone: '123-456-7890',
      userType: 'admin'
    })
    const createdUsers = await Promise.all(USERS.map(user => User.create(user)))
    await CreditCard.create({
      nameOnCard: 'Lucy Foo',
      number: '1234123412341234',
      expirationMonth: 4,
      expirationYear: 25,
      pin: 573,
      userId: lucy.id
    })

    await Address.create({
      apt: '2S',
      street: '3333 Acme str',
      city: 'NYC',
      state: 'NY',
      zipcode: '12345',
      userId: lucy.id
    })

    const date = new Date()
    const lucyCart = await Order.create({
      userId: lucy.id,
      orderDate: date
    })

    await LineItem.create({
      quantity: 5,
      productId: metallica.id,
      orderId: lucyCart.id
    })
    await LineItem.create({
      quantity: 5,
      productId: smashingPumpkins.id,
      orderId: lucyCart.id
    })
    await LineItem.create({
      quantity: 5,
      productId: hendrix.id,
      orderId: lucyCart.id
    })
    await LineItem.create({
      quantity: 5,
      productId: pinkFloyd.id,
      orderId: lucyCart.id
    })
    await LineItem.create({
      quantity: 5,
      productId: nsync.id,
      orderId: lucyCart.id
    })
    await LineItem.create({
      quantity: 5,
      productId: kendrickLamar.id,
      orderId: lucyCart.id
    })
  } catch (ex) {
    console.log(ex)
  }
}

module.exports = { syncAndSeed }
