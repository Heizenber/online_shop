const bcrypt = require("bcryptjs");
const db = require("../data/database");


class User {
  constructor(email, password, fullname, street, postalcode, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalcode: postalcode,
      city: city,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const db = getDb();
    await db.collection("users").insertOne({
        email: this.email,
        password: this.hashedPassword,
        name: this.name,
        address: this.address,
        
    });
  };
}

module.exports = User;