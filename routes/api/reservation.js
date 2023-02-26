const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Bike = require('../../models/Bike');
const Reservation = require('../../models/Reservation');
const auth = require('../../middleware/auth');

// @route   POST api/reservation
// @desc    Create a reservation
// @access  Private


router.post('/', [
    check('bike', 'Bike id is required').not().isEmpty(),
    check('reservation_date', 'Start date is required').not().isEmpty(),
    check('due_date', 'End date is required').not().isEmpty(),
    check('city', 'city is required').not().isEmpty(),
], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const {
            bike,
            reservation_date,
            due_date,
            city
        } = req.body;
    
        try {
            const newReservation = new Reservation({
                bike,
                reservation_date,
                due_date,
                city
            });
    
            const reservation = await newReservation.save();
    
            res.json(reservation);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

// @route   GET api/reservation
// @desc    Get all reservations
// @access  Public

router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/reservation/:id
// @desc    Get reservation by ID
// @access  Public

router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        res.json(reservation);
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/reservation/:id
// @desc    Delete a reservation
// @access  Private

router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        await reservation.remove();

        res.json({ msg: 'Reservation removed' });
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        res.status(500).send('Server Error');
    }
});



module.exports = router;