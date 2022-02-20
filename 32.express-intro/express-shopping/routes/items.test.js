process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
let items = require('../shopDB');

let pizza = { name: "Pizza", price: 9.99 };

beforeEach(function() {
    items.push(pizza);
});
afterEach(function(){
    items.length = 0;
});

describe('GET /items', function(){
    test('Get items', async function(){
        const results = await request(app).get(`/items`);
        expect(results.statusCode).toBe(200);
        expect(results.body).toEqual({ items: [pizza]});
    });
});

describe('Get /items/:name', function(){
    test('Get specific item', async function(){
        const results = await request(app).get(`/items/${pizza.name}`);
        expect(results.statusCode).toBe(200);
        expect(results.body).toEqual({ item: pizza});
    });

    test('Respond with 404 when item not found', async function(){
        const results = await request(app).get(`/items/0`);
        expect(results.statusCode).toBe(404);
    });
});

describe('POST /items', function(){
    test('Create an item', async function(){
        const results = await request(app)
        .post(`/items`)
        .send({ name: "Salad", price: 3.99 });
        expect(results.statusCode).toBe(201);
        expect(results.body).toEqual({ item: { name: 'Salad', price: 3.99 }});
    });
});

describe('PATCH /items/:name', function(){
    test('Change an item', async function(){
        const results = await request(app)
        .patch(`/items/${pizza.name}`)
        .send({ name: 'Cheese', price: 2.99 });
        expect(results.statusCode).toBe(200);
        expect(results.body).toEqual({ item: { name: 'Cheese', price: 2.99 }});
    });
});

describe('Delete /items/:name', function(){
    test('Delete an item', async function(){
        const results = await request(app).delete(`/items/${pizza.name}`);
        expect(results.statusCode).toBe(200);
        expect(results.body).toEqual({ message: 'Item deleted' });
    });
});