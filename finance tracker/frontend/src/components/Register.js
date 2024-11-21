import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('User already exists');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Box textAlign="center" mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Register
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Register;
