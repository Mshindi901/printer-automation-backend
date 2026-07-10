import User from './user-schema.js';
import AuthRepository from './repository.js';
import AuthService from './services.js';

const usermodel = User;
const authRepo = new AuthRepository(usermodel);
const authService = new AuthService(authRepo);

export const signup = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password, role } = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({ success: false, message: 'Email, password, and role are required' });
        };
        const register = await authService.registerUser({ first_name, last_name, email, phone, password, role });
        if(!register){
            return res.status(400).json({ success: false, message: 'User registration failed' });
        };
        return res.status(201).json({ success: true, message: 'User registered successfully'});
    } catch (error) {
        console.error('Error signing up user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        const login = await authService.login(email, password);
        if(!login){
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        };
        return res.status(200).json({ success: true, message: 'User signed in successfully', token: login.token });
    } catch(error) {
        console.error('Error signing in user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};