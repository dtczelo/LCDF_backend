const Products = require('../models/products');

exports.postProduct = (req, res, next) => {
    console.log(req.body)
    requestObject = req.body
    const products = new Product({
        ...requestObject,
        // imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    products.save()
    .then(() => res.status(201).json({ message: 'Produit enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
    Products.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Produit supprimé' }))
    .catch(error => res.status(404).json({ error }));
};

exports.getProduct = (req, res, next) => {
    Products.find()
    .then(products => res.status(200).json({ products }))
    .catch(error => res.status(400).json({ error }));
}