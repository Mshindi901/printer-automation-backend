import Files from "../files/schema.js";
import User from "../auth/user-schema.js";
import Printers from "../printer/schema.js";

export const getAllUsers = async(req, res) => {
    try {
        const all_users = await User.findAll();
        if(!all_users || all_users.length === 0){
            return res.status(400).json({success:false, message:'Failed to fetch'})
        };
        return res.status(200).json({success:true,message:'Fetched all user records', data:all_users})
    } catch (error) {
        return res.status(500).json({success:false,message:'Internal Server error',error:error});
    }
};

export const getAllFiles = async(req, res) => {
    try {
        const all_files = await Files.findAll();
        if(!all_files || all_files.length === 0){
            return res.status(400).json({success:false, message:'Failed to fetch'})
        };
        return res.status(200).json({success:true,message:'Fetched all files records', data:all_files})
    } catch (error) {
        return res.status(500).json({success:false,message:'Internal Server error',error:error});
    }
};

export const getAllPrinters = async(req, res) => {
    try {
        const all_printers = await Printers.findAll();
        if(!all_printers || all_printers.length === 0){
            return res.status(400).json({success:false, message:'Failed to fetch'})
        };
        return res.status(200).json({success:true,message:'Fetched all Printer records', data:all_printers})
    } catch (error) {
        return res.status(500).json({success:false,message:'Internal Server error',error:error});
    }
};