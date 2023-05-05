const router = require('express').Router();
const {
  validateObjectId,
  validateCardBody,
} = require('../middlewars/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:_id', validateObjectId, deleteCard);
router.put('/:_id/likes', validateObjectId, likeCard);
router.delete('/:_id/likes', validateObjectId, dislikeCard);
module.exports = { cardRouter: router };
