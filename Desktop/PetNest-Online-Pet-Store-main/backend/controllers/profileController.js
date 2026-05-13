import * as profileService from '../services/profileService.js';


export const getUser = async (req, res) => {
    try{
        const result = await profileService.getUser(req.user.id)
        res.send(200).json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    try{
        await profileService.updateUser(req.user.id)
        res.send(200).json({ message: "User Profile Updated" })
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}