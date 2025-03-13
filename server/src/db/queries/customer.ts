import { db } from '../knex';
import { CustomerStats } from '../../types';

export const getCustomerStats = (country: string = 'All'): Promise<CustomerStats[]> => {
    const query = db('bet')
        .join('customer', 'bet.customer_id', '=', 'customer.id')
        .select(
            'customer.id',
            'customer.first_name',
            'customer.last_name',
            'customer.country',
            db.raw('COUNT(bet.id) as total_bets'),
            db.raw(`
            ROUND(
                SUM(CASE WHEN bet.status = 'WON' THEN 1 ELSE 0 END) * 100.0 / 
                NULLIF(COUNT(CASE WHEN bet.status IN ('WON', 'LOST') THEN 1 END), 0), 2
            ) as win_percentage
        `),
            db.raw(`
                SUM(CASE WHEN bet.status = 'WON' THEN (bet.stake * bet.odds - bet.stake) ELSE 0 END) 
                - SUM(CASE WHEN bet.status = 'LOST' THEN bet.stake ELSE 0 END) as profit
            `)
        )
        .groupBy('customer.id', 'customer.first_name', 'customer.last_name', 'customer.country')
        .having(db.raw('SUM(CASE WHEN bet.status = \'WON\' THEN bet.stake * bet.odds - bet.stake ELSE 0 END) - SUM(CASE WHEN bet.status = \'LOST\' THEN bet.stake ELSE 0 END) > 0'))
        .orderBy('profit', 'desc')
        .limit(10);

    if (country !== 'All') {
        query.where('customer.country', country);
    }

    return query;
};