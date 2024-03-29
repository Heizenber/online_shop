const bcrypt = require("bcryptjs");
const db = require("../data/database");


class User {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.fullname;
    this.address = {
      street: data.street,
      postalcode: data.postal,
      city: data.city,
    };
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async existsAlready() {
    const existingUser =  await this.getUserWithSameEmail();
    return (existingUser) ? true : false;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    await db.getDb().collection("users").insertOne({
        email: this.email,
        password: hashedPassword,
        name: this.name,
        address: this.address,
        
    });
  };

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;