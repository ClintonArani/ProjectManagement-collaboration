import express, { NextFunction, Request, Response, json } from "express";
import cors from 'cors'
import user_router from "./routers/user.router";
import auth_router from "./routers/auth.router"; // Import the auth router
import { my_route } from "./routers/project.route";

const app = express();
app.use(json());
app.use(cors())

// Add both user and auth routers
app.use('/users', user_router);
app.use('/auth', auth_router); // Use the auth router for authentication routes
app.use('/projects', my_route)

// Add logging middleware to capture request details
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message
    });
});

const PORT = 5300;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ...`);
});


