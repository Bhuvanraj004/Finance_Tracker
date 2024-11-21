const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Return the success message
        res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});
