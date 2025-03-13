import { Router } from 'express';
import { getCustomerStats } from './db/queries/customer';

export const router = Router();

router.get('/customers/leaderboard', async (req, res) => {
    const {country} = req.query;

    try {
        const customerStats = await getCustomerStats(country as string);
        res.json(customerStats);
    } catch (error) {
        console.error(error);
    }
});