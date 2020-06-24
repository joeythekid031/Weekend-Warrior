const Router = require('express').Router;
const { User } = require('../../models');

const markerRoutes = Router();

// Get all marker
markerRoutes
    .route('/')

    .get(async (_req, res) => {
        const dbMarker = await Marker.findAll();
        res.json(dbMarker);
    })

    .post(async (req, res) => {
        const dbMarker = await marker.create(req.body);
        res.json(dbMarker);
    });

// Delete an marker by id
markerRoutes
    .route('/:id')
    .put(async (_req, res) => {
        res.status(501).end();
    })
    .delete(async (req, res) => {
        const options = {
            where: {
                id: req.params.id
            }
        };
        const dbMarker = await Marker.destroy(options);
        res.json(dbMaker);
    });

module.exports = MarkerRoutes;