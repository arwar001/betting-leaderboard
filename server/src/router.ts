import { Router } from 'express';
import { getLeaderboard } from './db/queries/customer';
import { CustomerCountry } from './types';

export const router = Router();

router.get('/customers/leaderboard', async (req, res) => {
    const {country} = req.query;

    try {
        const customerStats = await getLeaderboard(country as CustomerCountry || 'All');
        res.json(customerStats);
    } catch (error) {
        console.error(error);
    }
});