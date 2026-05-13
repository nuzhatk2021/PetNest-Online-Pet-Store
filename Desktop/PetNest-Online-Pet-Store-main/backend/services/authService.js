import supabase from '../database/petDatabase.js';

<<<<<<< HEAD
export const register = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
=======
export const register = async ({ email, password, username }) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username
            }
        }
    });
>>>>>>> 3a88ab5 (update)

    if (error) throw { status: 400, message: error.message };

    if (data.user) {
        const { error: profileError } = await supabase
            .from('Profiles')
<<<<<<< HEAD
            .insert({ ID: data.user.id });

        if (profileError) throw { 
            status: 500, 
            message: "Account created, but profile creation failed." 
        };
=======
            .insert({ ID: data.user.id, AuthRole: "customer" });

        if (profileError) {
            console.error("Profile creation error:", profileError);
            throw {
                status: 500,
                message: `Account created, but profile creation failed: ${profileError.message}`
            };
        }
>>>>>>> 3a88ab5 (update)
    }
};

export const login = async ({ email, password }) => {
    let data, error;

    if (password) {
        ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
<<<<<<< HEAD
    } else {
        ({ data, error } = await supabase.auth.signInWithOtp({ email }));
    }

    if (error) throw { status: 401, message: error.message };

    if (password) {
=======
        if (error) throw { status: 401, message: error.message };

>>>>>>> 3a88ab5 (update)
        return {
            message: "Login Successful",
            token: data.session.access_token,
            user: data.user
        };
<<<<<<< HEAD
    }

    return { message: "OTP sent successfully" };
};

export const verifyOtp = async ({ email, otpCode }) => {
    const { data, error } = await supabase.auth.verifyOtp({ 
        email, 
        type: "email", 
        token: otpCode 
=======
    } else {
        ({ data, error } = await supabase.auth.signInWithOtp({ email }));

        if (error) throw { status: 401, message: error.message };

        return { message: "OTP sent successfully" };
    }
};

export const verifyOtp = async ({ email, otpCode, type = "email" }) => {
    const { data, error } = await supabase.auth.verifyOtp({
        email,
        type,
        token: otpCode
>>>>>>> 3a88ab5 (update)
    });

    if (error) throw { status: 400, message: error.message };

    return {
        message: "Login Successful",
        token: data.session.access_token,
        user: data.user
    };
};