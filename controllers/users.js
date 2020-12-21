const express = require("express");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const users = new Users({
                email: req.body.email,
                password: hash,
            });
            users.save()
                .then(() => res.status(201).json({ message: "Utilisateur ajoutée !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log(req.body);
    Users.findOne({ email: req.body.email }, ["password"])
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Email inconnu !" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, "d9eb703f978a5087a3cd6efb01220790", { expiresIn: "2h" }),
                        message: "Connexion réussie"
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteAccount = (req, res, next) => {
    Users.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
    .catch(error => res.status(404).json({ error }));
};

