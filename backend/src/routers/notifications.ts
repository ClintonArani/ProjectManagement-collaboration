// backend/routes/notifications.ts
import express, { Request, Response } from 'express';
import mssql from 'mssql';
import { sqlConfig } from '../config/sql.config';

const router = express.Router();

router.get('/notifications/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const notifications = (await pool.request()
        .input('user_id', mssql.VarChar, userId)
        .query('SELECT * FROM notifications WHERE user_id = @user_id AND is_read = 0')).recordset;
    
    res.json(notifications);
});

router.post('/notifications/mark-as-read/:notificationId', async (req: Request, res: Response) => {
    const { notificationId } = req.params;
    const pool = await mssql.connect(sqlConfig);
    await pool.request()
        .input('id', mssql.VarChar, notificationId)
        .query('UPDATE notifications SET is_read = 1 WHERE id = @id');
    
    res.json({ message: 'Notification marked as read' });
});

export default router;
