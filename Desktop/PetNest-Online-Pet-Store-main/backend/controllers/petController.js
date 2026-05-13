import * as petService from '../services/petService.js';


export const getAllPets = async (req, res) => {
    try{
        const pets = await petService.getAllPets()
        return res.status(200).json(pets)
    } 
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const getPetID = async (req, res) => {
    try{
<<<<<<< HEAD
        const pet = await petService.getPetID()
=======
        const pet = await petService.getPetById(req.params.id)
>>>>>>> 3a88ab5 (update)
        return res.status(200).json(pet)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const addPet = async (req, res) => {
    try {
        await petService.addPet(req.body)
        res.status(201).json({ message: "Pet Added to Database" });
    }
    catch(error){
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const updatePet = async (req, res) => {
    try{
        await petService.updatePet(req.body, req.params.id)
        return res.status(200).json({ message: "Pet Listing Updated" });

    }
    catch(error){
        res.status(error.status || 500).json({ message: error.message });
    }
}


export const deletePet = async (req, res) => {
    try{
        await petService.deletePet(req.params.id)
        return res.status(200).json({ message: "Pet Listing Deleted" })
    }
    catch(error){
        res.status(error.status || 500).json({ message: error.message });
    }
}
