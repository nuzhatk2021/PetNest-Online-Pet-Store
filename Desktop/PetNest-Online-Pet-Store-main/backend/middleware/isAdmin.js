import supabase from '../database/petDatabase.js';

//checks user's AuthRole field if it is a "admin" (the AuthRole's defualt value is "customer");
const isAdmin = async (req, res, next) => {
    const userIdentifier = req.user.id;

    const { data, error } = await supabase
        .from("Profiles")
        .select("AuthRole")
        .eq("ID", userIdentifier)
        .single();
    
    if (error) return res.status(500).json({ message: error.message });

    //if the user is not an admin, deny access (stop the route from progressing any further)
    if (data.AuthRole !== "admin") return res.status(403).json({ message: "Access Denied" });

    //if user is admin, next()
    next();
};

export default isAdmin;

