import supabase from '../database/petDatabase.js';

//require authentication middleware
const requireAuth = async (req, res, next) => {

    //get the authroization from headers of the request
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Missing or invalid tokens"}) //401 Unauthorized
    }

    const accessToken = authHeader.split(" ")[1];

    //authenticate user with access token using supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError) return res.status(401).json({ message: authError.message}); 
    if (!user) return res.status(401).json({ message: "Session Expired, Please Login Again"}); 

    //attaches the user info from to the request
    req.user = user;

    next();

};

export default requireAuth;