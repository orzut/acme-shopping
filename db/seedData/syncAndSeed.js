const {
  conn,
  User,
  Product,
  CreditCard,
  Address,
  Order,
  LineItem,
} = require("../");
const { USERS } = require("./seedDataUsers");

const { seedDataProducts } = require("./seedDataProducts");

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });

    //console.log(dataProducts)
    seedDataProducts();

    const lucy = await User.create({
      firstName: "Lucy",
      lastName: "Bar",
      email: "lucy_bar@gmail.com",
      password: "lucy_pw",
      phone: "123-456-7890",
      userType: "admin",
    });
    const createdUsers = await Promise.all(
      USERS.map((user) => User.create(user))
    );
    await CreditCard.create({
      nameOnCard: "Lucy Foo",
      number: "1234123412341234",
      expirationMonth: 4,
      expirationYear: 25,
      pin: 573,
      userId: lucy.id,
    });

    await Address.create({
      apt: "2S",
      street: "3333 Acme str",
      city: "NYC",
      state: "NY",
      zipcode: "12345",
      userId: lucy.id,
    });

    const date = new Date();
    const lucyCart1 = await Order.create({
      userId: lucy.id,
      orderDate: date,
      isCart: true,
    });
    const lucyCart2 = await Order.create({
      userId: lucy.id,
      orderDate: date,
      isCart: true,
    });
    await LineItem.create({
      quantity: 5,
      productId: 1,
      orderId: lucyCart1.id,
    });
    await LineItem.create({
      quantity: 2,
      productId: 3,
      orderId: lucyCart1.id,
    });
    await LineItem.create({
      quantity: 3,
      productId: 7,
      orderId: lucyCart2.id,
    });
    await LineItem.create({
      quantity: 1,
      productId: 6,
      orderId: lucyCart2.id,
    });
<<<<<<< HEAD
    // await LineItem.create({
    //   quantity: 5,
    //   productId: nsync.id,
    //   orderId: lucyCart.id,
    // });
    // await LineItem.create({
    //   quantity: 5,
    //   productId: kendrickLamar.id,
    //   orderId: lucyCart.id,
    // });
=======
>>>>>>> ee5269dcdab7f13164b3e60d0df3feb46cc3b2e1
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed };
