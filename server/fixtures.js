const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let collection of collections) {
        await mongoose.connection.db.dropCollection(collection.name);
    }

    let users = await User.create(
        {
            username: 'john',
            password: 'password',
            token: '123',
            displayName: 'John Doe',
            phone: '+ 996-555-333-333'
        },
        {
            username: 'jane',
            password: 'password',
            token: '234',
            displayName: 'Jane Doe',
            phone: '+ 996-555-000-000'
        }
    );

    const categories = await Category.create(
        {title: 'Computers'},
        {title: 'Cars'},
        {title: 'Other'}
    );

    await Product.create(
        {
            title: 'Mac',
            price: 2500,
            description: 'Apple Macbook Air',
            category: categories[0]._id,
            user: users[0]._id,
            image: 'mac.jpg'
        },
        {
            title: 'Microsoft',
            price: 2000,
            description: 'Microsoft Surface Pro 7',
            category: categories[0]._id,
            user: users[0]._id,
            image: 'fixtures/microsoft.jpg'
        },
        {
            title: 'Nissan',
            price: 12500,
            description: 'Nissan Ariya EV',
            category: categories[1]._id,
            user: users[0]._id,
            image: 'nissan.jpg'
        },
        {
            title: 'Chevrolet',
            price: 30600,
            description: 'Chevrolet Corvette Stingray',
            category: categories[1]._id,
            user: users[1]._id,
            image: 'chevrolet.jpg'
        },
        {
            title: 'Chair',
            price: 500,
            description: 'Herman Miller Embody chair',
            category: categories[2]._id,
            user: users[1]._id,
            image: 'chair.jpg'
        },
        {
            title: 'Desk',
            price: 500,
            description: 'Stand-only desk',
            category: categories[2]._id,
            user: users[1]._id,
            image: 'desk.jpg'
        },
    );

    await mongoose.connection.close();
};

run().catch(error => {
    mongoose.connection.close();
    throw error;
});