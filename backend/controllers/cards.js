const CardSchema = require('../models/card');
const { error } = require('../errors/Error');
const getCards = (req, res) => {
  CardSchema.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(new error(500, 'An error occurred'));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  CardSchema.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const { errors } = err;
        next(
          new error(
            400,
            `${Object.values(errors)
              .map((error) => error.message)
              .join(', ')}`
          )
        );
      } else {
        throw new error(500, 'An error occured');
      }
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  CardSchema.findById(id)
    .orFail(() => {
      throw new error(404, 'No card was found with this id');
    })
    .then((card) => CardSchema.deleteOne(card).then(() => res.send(card)))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new error(400, 'Invalid card id'));
      } else if (err.statusCode === 404) {
        next(new error(404, err.message));
      } else {
        next(new error(500, 'an error has occured'));
      }
    });
};

const updateLike = (req, res, operator) => {
  const { id } = req.params;
  CardSchema.findByIdAndUpdate(
    id,
    { [operator]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new error(404, `no card found with this id (${id})`);
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(new error(400, 'invalid card id'));
      } else if (err.statusCode === 500) {
        next(new error(500, 'somthing went wrong'));
      }
    });
};

const likeCard = (req, res) => updateLike(req, res, '$addToSet');
const dislikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
