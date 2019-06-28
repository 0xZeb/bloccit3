const adQueries = require("../db/queries.ads.js");

module.exports = {

    index(req, res, next) {

        adQueries.getAllAds((err, ads) => {

            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("advert/index", { ads });
                //all the views will access this { ads }
            }
        })

    },

    new(req, res, next) {
        res.render("advert/new");
    },


    create(req, res, next) {
        let newAd = {
            title: req.body.title,
            description: req.body.description
        };
        adQueries.addAd(newAd, (err, advert) => {
            if (err) {
                res.redirect(500, "/advert/new");
            } else {
                res.redirect(303, `/advert/${advert.id}`);
            }
        });
    },


    show(req, res, next) {

        adQueries.getAd(req.params.id, (err, advert) => {

            if (err || advert == null) {
                res.redirect(404, "/");
            } else {
                res.render("advert/show", { advert });
            }
        });
    },

    destroy(req, res, next) {
        adQueries.deleteAd(req.params.id, (err, advert) => {
            if (err) {
                res.redirect(500, `/advert/${advert.id}`)
            } else {
                res.redirect(303, "/advert")
            }
        });
    },

    edit(req, res, next) {
        adQueries.getAd(req.params.id, (err, advert) => {
            if (err || advert == null) {
                res.redirect(404, "/");
            } else {
                res.render("advert/edit", { advert });
            }
        });
    },

    update(req, res, next) {

        adQueries.updateAd(req.params.id, req.body, (err, advert) => {

            if (err || advert == null) {
                res.redirect(404, `/advert/${req.params.id}/edit`);
            } else {
                res.redirect(`/advert/${advert.id}`);
            }
        });
    }

}
