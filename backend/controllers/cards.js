const CardSchema = require('../models/card');
const error = require('../errors/Error');

const getCards = (req, res, next) => {
  CardSchema.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => next(new error(500, 'An error occurred')));
};

const createCard = (req, res, next) => {
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
        next(new error(500, 'An error occured'));
      }
    });
};

const deleteCard = (req, res, next) => {
  const { _id } = req.params;
  CardSchema.findById(_id)
    .orFail(() => {
      throw new error(404, 'No card was found with this id');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(
          new error(403, `you must be the card owner  in order to delete it`)
        );
      }
      CardSchema.deleteOne(card).then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new error(400, 'invalid card id'));
      } else if (err.statusCode === 404) {
        next(new error(404, err.message));
      } else {
        next(err);
      }
    });
};

const updateLike = (req, res, operator) => {
  const { _id } = req.params;
  CardSchema.findByIdAndUpdate(
    _id,
    { [operator]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new error(404, `no card found with this id (${_id})`);
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.statusCode === 400) {
        next(new error(400, 'invalid card id'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res) => updateLike(req, res, '$addToSet');
const dislikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
