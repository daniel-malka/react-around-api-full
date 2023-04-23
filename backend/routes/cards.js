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

router.get('/cards', getCards);
router.post('/cards', /*validateCardBody,**/ createCard);
router.delete('/:id', /*validateObjectId,**/ deleteCard);
router.put('/:id/likes', /* validateObjectId,**/ likeCard);
router.delete('/:id/likes', /*validateObjectId, **/ dislikeCard);
module.exports = { cardRouter: router };
