/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthorsController from "#controllers/authors_controller";
import BooksController from "#controllers/books_controller";
import ReviewsController from "#controllers/reviews_controller";
import router from "@adonisjs/core/services/router";

router.get('api/authors',[AuthorsController, 'getAll'])
router.post('api/authors',[AuthorsController, 'create'])
router.put('api/authors/:id',[AuthorsController, 'update'])
router.delete('api/authors/:id', [AuthorsController, 'remove'])

router.get('api/books',[BooksController, 'getAll'])
router.post('api/books',[BooksController, 'create'])
router.put('api/books/:id',[BooksController, 'update'])
router.delete('api/books/:id', [BooksController, 'remove'])

router.get('api/reviews',[ReviewsController, 'getAll'])
router.post('api/reviews',[ReviewsController, 'create'])
router.put('api/reviews/:id',[ReviewsController, 'update'])
router.delete('api/reviews/:id',[ReviewsController, 'remove'])