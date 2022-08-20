const {
  conn,
  User,
  Product,
  CreditCard,
  Category,
  Genre,
  Order,
  LineItem,
} = require("../");
const { USERS } = require("./seedDataUsers");
const { CATEGORIES } = require("./seedDataCategories");

const { GENRES } = require("./seedDataGenres");

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });

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
      nameOnCard: "Moe Foo",
      number: "1234123412341234",
      expirationMonth: 4,
      expirationYear: 25,
      pin: 573,
      userId: createdUsers[3].id,
    });

    const [teeShirts, hoodies, albums, hats, posters, accessories] =
      await Promise.all(
        CATEGORIES.map((category) => Category.create({ name: category }))
      );

    const [rock, pop, hipHop, country, electronic, metal, rAndB] =
      await Promise.all(GENRES.map((genre) => Genre.create({ name: genre })));

    //Temporary product seeding for front end development
    const metallica = await Product.create({
      name: "Metallica T-Shirt",
      cost: 5.99,
      image:
        "https://merchbar.imgix.net/product/105/6519/2389400944722/fzj7w7CRMetallica_-_Doris_-_Front.jpg?quality=60&auto=compress,format&w=390&h=390",
      categoryId: teeShirts.id,
      genreId: rock.id,
    });
    const smashingPumpkins = await Product.create({
      name: "Smashing Pumpkins T-Shirt",
      cost: 15.99,
      image:
        "https://merchbar.imgix.net/product/105/6519/4365059915858/KnXhz2RMSmash2.png?quality=60&auto=compress,format&w=390&h=390",
      categoryId: teeShirts.id,
      genreId: rock.id,
    });
    const hendrix = await Product.create({
      name: "Jimi Hendrix T-shirt",
      cost: 8.99,
      image:
        "https://merchbar.imgix.net/product/105/6519/4185688703058/JU8PGZhV55w_0a470b77-592d-4fb8-81b4-e848a4d00b95.png?quality=60&auto=compress,format&w=390&h=390",
      categoryId: teeShirts.id,
      genreId: rock.id,
    });
    const nsync = await Product.create({
      name: "N-Sync T-Shirt",
      cost: 10.99,
      image:
        "https://merchbar.imgix.net/product/105/6519/4184831819858/J5vxYdDg70w_6f27a6e9-3226-4220-92b1-ec237a424f8b.png?quality=60&auto=compress,format&w=390&h=390",
      categoryId: teeShirts.id,
      genreId: pop.id,
    });
    const pinkFloyd = await Product.create({
      name: "Pink Floyd Album",
      cost: 20.99,
      image:
        "https://merchbar.imgix.net/product/vinylized/upc/27/888751842717.jpg?quality=60&auto=compress,format&w=390&h=390",
      categoryId: albums.id,
      genreId: rock.id,
    });
    const kendrickLamar = await Product.create({
      name: "Kendrick Lamar Album",
      cost: 20.99,
      image:
        "https://merchbar.imgix.net/product/4/1616/19226798/T830LL-1540265001-3601x3601-1540264977-007_Kendrick%20Lamar_Good%20Kid,%20M%20A%20A%20D%20City_01.jpg?quality=60&auto=compress,format&w=390&h=390",
      categoryId: albums.id,
      genreId: hipHop.id,
    });

    const date = new Date();
    const lucyCart = await Order.create({
      userId: lucy.id,
      orderDate: date,
    });

    await LineItem.create({
      quantity: 5,
      productId: metallica.id,
      orderId: lucyCart.id,
    });
    await LineItem.create({
      quantity: 5,
      productId: smashingPumpkins.id,
      orderId: lucyCart.id,
    });
    await LineItem.create({
      quantity: 5,
      productId: hendrix.id,
      orderId: lucyCart.id,
    });
    await LineItem.create({
      quantity: 5,
      productId: pinkFloyd.id,
      orderId: lucyCart.id,
    });
    await LineItem.create({
      quantity: 5,
      productId: nsync.id,
      orderId: lucyCart.id,
    });
    await LineItem.create({
      quantity: 5,
      productId: kendrickLamar.id,
      orderId: lucyCart.id,
    });
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed };
