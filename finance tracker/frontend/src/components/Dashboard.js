import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [financialData, setFinancialData] = useState({});
    const [income, setIncome] = useState('');
    const [expenditure, setExpenditure] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [totalBalance, setTotalBalance] = useState(0);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if no token
        } else {
            // Fetch user info from backend using the token
            axios.get('/api/auth/user', { headers: { 'x-auth-token': token } })
                .then(res => setUserName(res.data.username))
                .catch(err => console.error(err));
        }
    }, [navigate]);

    // Handle form submission for income/expenditure
    const handleSubmit = (e) => {
        e.preventDefault();

        // Update the financial data for the selected month
        const updatedData = { ...financialData };
        if (!updatedData[selectedMonth]) {
            updatedData[selectedMonth] = [];
        }
        
        const newEntry = {
            income: parseFloat(income) || 0,
            expenditure: parseFloat(expenditure) || 0,
            notes: notes,
            date: new Date().toLocaleDateString()
        };
        
        updatedData[selectedMonth].push(newEntry);

        // Update balance after each operation
        const monthlyBalance = newEntry.income - newEntry.expenditure;
        setTotalBalance(prevBalance => prevBalance + monthlyBalance);
        setFinancialData(updatedData);

        // Clear the form fields
        setIncome('');
        setExpenditure('');
        setNotes('');
    };

    const calculateMonthlyBalance = (month) => {
        if (!financialData[month]) return 0;
        return financialData[month].reduce((acc, entry) => acc + entry.income - entry.expenditure, 0);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Welcome {userName}, to your dashboard!
            </Typography>

            <Box mt={4}>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <TextField
                            label="Income"
                            type="number"
                            variant="outlined"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                        />
                        <TextField
                            label="Expenditure"
                            type="number"
                            variant="outlined"
                            value={expenditure}
                            onChange={(e) => setExpenditure(e.target.value)}
                        />
                        <TextField
                            label="Notes"
                            variant="outlined"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <TextField
                            select
                            label="Select Month"
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </TextField>
                        <Button type="submit" variant="contained" color="primary">
                            Add Entry
                        </Button>
                    </Box>
                </form>
            </Box>

            <Table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Income</th>
                        <th>Expenditure</th>
                        <th>Notes</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {months.map((month) => (
                        <tr key={month}>
                            <td>{month}</td>
                            <td>{financialData[month]?.map(entry => entry.income).join(', ') || '-'}</td>
                            <td>{financialData[month]?.map(entry => entry.expenditure).join(', ') || '-'}</td>
                            <td>{financialData[month]?.map(entry => entry.notes).join(', ') || '-'}</td>
                            <td>{calculateMonthlyBalance(month)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Typography variant="h5" align="right" mt={3}>
                Year-End Balance: {totalBalance}
            </Typography>
        </Container>
    );
};

export default Dashboard;
