import supabase from '../database/petDatabase.js';


export const getUser = async (id) => {
    const { data, error } = await supabase
        .from('Profiles')
        .select('ID, FirstName, LastName, ShippingAddress') // no need to reveal auth role
        .eq('ID', id)
        .single();
    if (error) throw {
        status: 500,
        message: error.message
    }
    return data
}

export const updateUser = async (id, body) => {
    const { data, error } = await supabase
        .from('Profiles')
        .update(body)
        .eq('ID', id)
        .select()
        .single();
    if (error) throw {
        status:500,
        message:error.message
    }
    return data;
}

/* Henry's Notes:
no need for post, as account creation already initiates the record but does not fully fill entire profile record

put router to update profile
before any purchase is made, user profile record should be filled completely. 
*/