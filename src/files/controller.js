import Files from "./schema.js";
import supabase from "./supabase.js";
import {v4} from 'uuid'

export const fileUpload = async(req, res) => {
    try {
        const file = req.file;
        if(!file){
            return res.status(404).json({success:false,message:'File not provide'})
        }
        const {name} = req.file.originalname;
        if(!name){
            return res.status(400).json({sucess:false,message:'Provide File name'});
        };
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, Please Login'})
        };
        const {data,error} = await supabase.storage.from('bucket').upload(name, file.buffer);
        if(error){
            return res.status(400).json({success:false,message:'Supabase Failed'})
        };
        const new_file = await Files.create({
            file_name:name,
            uploaded_by: id,
            file_url:data.path,
            file_size:file.size,
            status,
        });
        if(!new_file){
            return res.status(400).json({success:false,message:"Failed to add file to"})
        };
        return res.status(201).json({success:true,message:'File Uploaded'})
        
    } catch (error) {
        console.error(`Error with creating a new file record ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }
};

export const usersFiles = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, Please Login'})
        };
        const user_files = await File.findAll({where: {uploaded_by:id}});
        if(!user_files || !user_files.length == 0){
            return res.status(400).json({success:false,message:'no user files or Api failed, check logs'});
        };
        return res.status(200).json({success:true,message:'Files fetched',data:user_files});
    } catch (error) {
        console.error('Error with Getting user files record in the database');
        return res.status(500).json({success:true,message:'Internal Server Error'})
    }
};

export const getFileInfoById = async(req, res) => {
    try {
        const fileId = req.params;
        if(!fileId){
            return res.status(400).json({success:false,message:'Provide the File Id'});
        };
        const file = await Files.findByPk(fileId);
        if(!file){
            return res.status(400).json({success:false,message:'file not found'});
        };
        return res.status(200).json({success:true,message:'File found', data:file})
    } catch (error) {
        console.error('Failed to fetch file record by Id:', error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const deleteFileRecord = async (req, res) => {
    try {
        const fileId = req.params;
        if(!fileId){
            return res.status(400).json({success:false,message:'Provide the File Id'});
        };
        const file = await Files.findByPk(fileId);
        if(!file){
            return res.status(400).json({success:false,message:'file not found'});
        };
        const deleted = await file.destroy();
        if(!deleted){
            return res.status(400).json({success:false,message:'File Failed to delete'})
        };
        return res.status(200).json({success:true,message:'File record deleted'});
    } catch (error) {
        console.error('Error with deleting a file record:', error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const download_files = async(req, res) => {
    try {
        const file_id = req.params;
        if(!file_id){
            return res.status(400).json({success:false,message:'Provide File Id'})
        };
        const file = await Files.findByPk(file_id);
        if(!file){
            return res.status(400).json({success:false,message:'Failed to fetch file'})
        };
        const {data, error} = await supabase.storage.from('buckets').download(file.file_url);
        if(error){
            return res.status(400).json({success:false,message:'Failed to download file from supabase'})
        };
        const buffer = Buffer.from(
            await data.arrayBuffer()
        );
        res.setHeader(
            'Content-Type','application/pdf'
        );
        return res.send(buffer);
    } catch (error) {
        return res.status(500).json({success:false,message:'Internal Server Error',error:error});
    }
};