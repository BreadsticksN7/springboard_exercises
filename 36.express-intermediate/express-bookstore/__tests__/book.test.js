process.env.NODE_ENV = 'test'
const request = require('supertest');

const app = require('../app');
const db = require('../db');

let book;

beforeEach(async () => {
  let result = await db.query(`
    INSERT INTO
      books (isbn, amazon_url,author,language,pages,publisher,title,year)
      VALUES(
        '123432122',
        'https://amazon.com/taco',
        'Elie',
        'English',
        100,
        'Nothing publishers',
        'my first book', 2008)
      RETURNING isbn`);
  
  book = result.rows[0].isbn
});

describe('GET /books', function() {
  test('Gets a list of books', async function() {
    const results = await request(app).get('/books');
    const books = results.body.books;
    expect(books[0]).toHaveProperty('isbn');
  });
});

describe('GET /books/:isbn', function() {
  test('Get book by ISBN', async function() {
    const results = await request(app).get(`/books/${book}`);
    expect(results.body.book.isbn).toBe('123432122');
    expect(results.body.book.publisher).toBe('Nothing publishers');
  });
});

describe('POST /books', function() {
  test('Post a new book', async function() {
    const newBook = await request(app)
    .post('/books')
    .send({
        isbn: '1234',
        author: 'Superman',
        language: 'English',
        pages: 5,
        publisher: 'Self-published',
        title: "I can fly but you can't!",
        year: 1999
    });
    expect(newBook.statusCode).toBe(201);
    expect(newBook.body.book).toHaveProperty('isbn');
  });
  test('Prevent creation when missing required items', async function() {
    const results = await request(app)
    .post('/books')
    .send({ year: 1999 });
    expect(results.statusCode).toBe(400);
  });
});

describe('PUT /books/:isbn', function() {
  test('Update a book by ISBN', async function() {
    const results = await request(app)
    .put(`/books/${book}`)
    .send({
      author: 'Bob',
      language: 'English',
      pages: 100,
      title: 'My First Book',
      year: 2008
    });
    expect(results.statusCode).toBe(200);
    expect(results.body.book.author).toBe('Bob');
  });
  test('Prevent update when missing required items', async function() {
    const results = await request(app)
    .put(`/books/${book}`)
    .send({ year: 2000 });
    expect(results.statusCode).toBe(400);
  });
});

describe('DELETE /books/:isbn', function() {
  test('Delete book by ISBN', async function() {
    const results = await request(app).delete(`/books/${book}`);
    expect(results.statusCode).toBe(200);
    expect(results.body).toEqual({message: "Book deleted"});
  });
});



afterEach(async function() {
  await db.query('DELETE FROM BOOKS');
});

afterAll(async function() {
  await db.end()
});