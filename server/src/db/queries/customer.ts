import { db } from '../knex';
import { CustomerCountry, CustomerStats } from '../../types';

export const getLeaderboard = (country: CustomerCountry | 'All' = 'All'): Promise<CustomerStats[]> => {
    const query = db('customer')
        .select(
            'customer.id',
            'customer.first_name',
            'customer.last_name',
            'customer.country',
            db.raw('COUNT(bet.id) as total_bets'),
            db.raw(`
                ROUND(
                    SUM((bet.status = 'WON')::int) * 100.0 /
                    NULLIF(COUNT(bet.id), 0),
                2) as win_percentage`),
            db.raw(`
                SUM((bet.status = 'WON')::int * (bet.stake * bet.odds - bet.stake))
                - SUM((bet.status = 'LOST')::int * bet.stake) as profit`)
        )
        .join('bet', 'bet.customer_id', '=', 'customer.id')
        .whereIn('bet.status', ['WON', 'LOST'])
        .groupBy('customer.id', 'customer.first_name', 'customer.last_name', 'customer.country')
        .havingRaw('SUM((bet.status = \'WON\')::int * (bet.stake * bet.odds - bet.stake)) - SUM((bet.status = \'LOST\')::int * bet.stake) > 0')
        .orderBy('profit', 'desc')
        .limit(10);

    if (country !== 'All') {
        query.where('customer.country', country);
    }

    return query;
};