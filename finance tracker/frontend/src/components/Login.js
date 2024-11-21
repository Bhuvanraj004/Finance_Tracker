import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Invalid credentials');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');  // Redirect to the registration page
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
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
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
            {/* Register Button below the Box */}
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Button onClick={handleRegisterRedirect} variant="text" color="secondary">
                    Don't have an account? Register
                </Button>
            </Grid>
        </Container>
    );
};

export default Login;
