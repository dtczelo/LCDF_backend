const Products = require("../models/products");
const fs = require("fs");

exports.postProduct = (req, res, next) => {
    console.log(req.body);
    requestObject = req.body;
    const product = new Products({
        ...requestObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    product
        .save()
        .then(() => res.status(201).json({ message: "Produit enregistré !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
    Products.findOne({
        _id: req.params.id,
    })
        .then((product) => {
            if (product.imageUrl) {
                const filename = product.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Products.deleteOne({
                        _id: req.params.id,
                    })
                        .then(() =>
                            res.status(200).json({
                                message: "Produit supprimée !",
                            })
                        )
                        .catch((error) => res.status(404).json({ error }));
                });
            } else {
                Products.deleteOne({
                    _id: req.params.id,
                })
                    .then(() =>
                        res.status(200).json({
                            message: "Produit supprimée !",
                        })
                    )
                    .catch((error) => res.status(404).json({ error }));
            }
        })
        .catch((error) => res.status(404).json({ error }));
};

exports.getProduct = (req, res, next) => {
    Products.find()
        .then((products) => res.status(200).json({ products }))
        .catch((error) => res.status(400).json({ error }));
};
