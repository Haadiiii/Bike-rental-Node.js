const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Bike = require('../../models/Bike');
const auth = require('../../middleware/auth');


// @route   POST api/bike
// @desc    Create a bike
// @access  Private

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('bike_type', 'Bike type is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('brand', 'Brand is required').not().isEmpty(),
    check('daily_rate', 'Daily rate is required').not().isEmpty(),
    check('color', 'Color is required').not().isEmpty(),
    check('images', 'Images are required').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        name,
        bike_type,
        description,
        brand,
        daily_rate,
        color,
        images
    } = req.body;

    try {
        const newBike = new Bike({
            name,
            bike_type,
            description,
            brand,
            daily_rate,
            color,
            images
        });

        const bike = await newBike.save();

        res.json(bike);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/bike
// @desc    Get all bikes
// @access  Public

router.get('/', async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.json(bikes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/bike/:id
// @desc    Get bike by ID
// @access  Public

router.get('/:id', async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);

        if (!bike) {
            return res.status(404).json({ msg: 'Bike not found' });
        }

        res.json(bike);
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Bike not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/bike/:id
// @desc    Delete a bike
// @access  Private

router.delete('/:id', auth, async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);

        if (!bike) {
            return res.status(404).json({ msg: 'Bike not found' });
        }

        // Check user
        if (bike.user === req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await bike.remove();

        res.json({ msg: 'Bike removed' });
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Bike not found' });
        }

        res.status(500).send('Server Error');
    }   
});


module.exports = router;