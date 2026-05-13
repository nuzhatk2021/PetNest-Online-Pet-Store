import * as authService from '../services/authService.js';

export const register = async (req, res) => {
    try {
        await authService.register(req.body);
        res.status(201).json({ message: "Account Created: Check your email to confirm then come back and log in" });
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 401).json({ message: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const result = await authService.verifyOtp(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
};