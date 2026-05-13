import supabase from '../database/petDatabase.js';

function rowIsSold(row) {
    if (!row) return false;
    const v = row.IsSold;
    return v === true || v === "true" || v === "t" || v === 1 || v === "1";
}

export const getAllPets = async () => {
    const { data, error } = await supabase
        .from('Pet')
        .select()
        .or("IsSold.eq.false,IsSold.is.null")
        .order('PetName', { ascending: true })
        .limit(100);

    if (error) throw {
        status: 500,
        message: error.message
    }

    return (data ?? []).filter((row) => !rowIsSold(row));
}

export const getPetById = async (id) => {
    const { data, error } = await supabase
        .from('Pet')
        .select()
        .eq("PetID", id)
        .single();

    if (error) {
        const notFound = error.code === 'PGRST116' || /0 rows/i.test(error.message || '');
        throw {
            status: notFound ? 404 : 500,
            message: notFound ? 'Pet not found.' : error.message,
        };
    }
    if (rowIsSold(data)) {
        throw {
            status: 404,
            message: 'This pet is no longer available.',
        };
    }
    return data;
};

export const addPet = async ({ PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription}) => {
    const { data, error } = await supabase
        .from('Pet')
        .insert({ PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription, IsSold: false })
        .select()
        .single();
    if (error) throw {
        status:500,
        message:error.message
    }
    return data;
}

export const updatePet = async (body, id) => {
    const { data, error } = await supabase
        .from('Pet')
        .update(body) 
        .eq("PetID", id)
        .select()
        .single();
    if (error) throw {
        status: 500,
        message: error.message
    }
    return data;
}

export const deletePet = async (id) => {
    const { data, error } = await supabase
        .from('Pet')
        .delete()
        .eq("PetID", id)
        .select()
        .single();
    if (error) throw {
        status: 500,
        message: error.message
    }
    return data;
}