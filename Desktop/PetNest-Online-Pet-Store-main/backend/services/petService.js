import supabase from '../database/petDatabase.js';

export const getAllPets = async () => {
    const { data, error } = await supabase
        .from('Pet')
        .select()
<<<<<<< HEAD
=======
        .or('IsSold.is.null,IsSold.eq.false')
>>>>>>> 3a88ab5 (update)
        .order('PetName', { ascending: true })
        .limit(100);

    if (error) throw {
        status: 500,
        message: error.message
    }
    return data
}

export const getPetById = async (id) => {
    const { data, error } = await supabase
        .from('Pet')
        .select()
        .eq("PetID", id)
        .single();
<<<<<<< HEAD
        
    if (error) throw {
        status: 500,
        message: error.message
    };
=======

    if (error) throw {
        status: error.code === "PGRST116" ? 404 : 500,
        message: error.code === "PGRST116" ? "Pet not found" : error.message,
    };
    if (data?.IsSold === true || data?.IsSold === 1) {
        throw { status: 404, message: "Pet not found" };
    }
>>>>>>> 3a88ab5 (update)
    return data;
};

export const addPet = async ({ PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription}) => {
    const { data, error } = await supabase
        .from('Pet')
        .insert({ PetName, PetBreed, PetAge, PetPrice, PetCategory, PetImg, PetDescription })
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