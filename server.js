const app = require("./app");
const { conn, User, Product, CreditCard, Category } = require("./db");
const { USERS } = require("./db/seed-data-users");

const setUp = async () => {
  try {
    await conn.sync({ force: true });

    await User.create({
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
      nameOnCard: "Moe Foo",
      number: "1234123412341234",
      expirationMonth: 4,
      expirationYear: 25,
      pin: 573,
      userId: createdUsers[3].id,
    });

    await Promise.all([
      Category.create({ name: "Tee Shirts" }),
      Category.create({ name: "Hoodies" }),
      Category.create({ name: "Albums" }),
      Category.create({ name: "Hats" }),
      Category.create({ name: "Posters" }),
      Category.create({ name: "Accessories" }),
    ]);
    // const foo = await Product.create({ name: "foo" });
    // const bar = await Product.create({ name: "bar" });
    // await lucy.addToCart({ product: foo, quantity: 3 });
    // await lucy.addToCart({ product: bar, quantity: 4 });
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

setUp();
