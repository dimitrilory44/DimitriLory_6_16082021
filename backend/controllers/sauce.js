const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObjet._id;
    const sauce = new Sauce({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({error}));
};

exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauce.updateOne({_id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(my_sauce => {
        const filename = my_sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(400).json({error}))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(my_sauce => res.status(200).json(my_sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}))
};

/**
*
* Opération en base : (Ne pas oublié de le convertir en objet)
* $inc est un opérateur qui imprimera la valeur de la request 
* $push est un opérateur qui incrémentera le tableau
* $pull est un opérateur qui retire un élément du tableau
*
*/
// liké un produit ou pas
exports.likedOrNot = (req, res, next) => {
    // Définir le statut de like
    if(req.body.like == 1) {
        Sauce.updateOne(
            { _id: req.params.id },
            { $inc : {likes: req.body.like++}, $push : {usersLiked: req.body.userId} }
        )
        .then(() => res.status(200).json({message: "Utilisateur à liker"}))
        .catch((error) => res.status(400).json({error}))
    } else if(req.body.like == -1) {
        Sauce.updateOne(
            { _id: req.params.id },
            { $inc : {dislikes: -(req.body.like++)}, $push : {usersDisliked: req.body.userId} }
        )
        .then(() => res.status(200).json({message: "Utilisateur à disliker"}))
        .catch((error) => res.status(400).json({error}))
    } else {
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            console.log(sauce.usersLiked, req.body.userId, sauce.usersDisliked);
            if(sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $inc : {likes: req.body.like - 1}, $pull : {usersLiked: req.body.userId} }
                )
                .then(() => res.status(200).json({message: "Utilisateur à enlever son like"}))
                .catch((error) => res.status(400).json({error}))
            } else if(sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $inc : {dislikes: req.body.like - 1}, $pull : {usersDisliked: req.body.userId} }
                )
                .then(() => res.status(200).json({message: "Utilisateur à enlever son dislike"}))
                .catch((error) => res.status(400).json({error}))
            }
        })
        .catch(error => res.status(400).json({error}))
    }
};