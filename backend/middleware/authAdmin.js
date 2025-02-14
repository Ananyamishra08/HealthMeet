import jwt from 'jsonwebtoken';

const authAdmin = (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authorization token missing or malformed.' });
        }
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token contains the expected email and role
        if (decodedToken.email !== process.env.ADMIN_EMAIL || decodedToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
        }

        // Attach user information to the request object
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
    }
};

export default authAdmin;
