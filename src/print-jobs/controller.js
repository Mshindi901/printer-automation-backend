import PrintJobs from "./schema.js";

export const add_job = async (req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success:false,message:'Not authenticated, please try again'});
        };
        const {file_id, printer_id, copies, page_range} = req.body;
        if(!file_id || !printer_id || !copies){
            return res.status(400).json({success:false,message:'Provide printer and file id'});
        };
        const new_print_job_record = await PrintJobs.create({
            user_id,
            printer_id,
            file_id,
            copies,
            page_range,
            status,
            submitted_at: Date.now()
        });
        if(!new_print_job_record){
            return res.status(400).json({success:false,message:'Failed, to create new record'});
        };
        return res.status(201).json({success:true,message:'Created New job record'})

    } catch (error) {
        return res.status(500).json({success:false,message:'Internal Server Error',error:error});
    }
};

export const get_user_jobs = async (req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success:false,message:'Not authenticated, please try again'});
        };
        const print_job = await PrintJobs.findOne({where:user_id});
        if(!print_job){
            return res.status(400).json({success:false,message:'File not found'});
        };
        return res.status(200).json({success:true,message:'print job found',data:print_job})
    } catch (error) {
        return res.status(500).json({success:false,message:'Internal Server Error',error:error});
    }
};

export const get_print_jobs_id = async (req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success:false,message:'Not authenticated, please try again'});
        };
        const id = req.params;
        if(!id){
            return res.status(400).json({success:false,message:'Provide Print job id'});
        };
        const print_job = await PrintJobs.findByPk(id);
        if(!print_job){
            return res.status(400).json({success:false,message:'Failed to fetch print job'});
        };
        return res.status(200).json({success:true,message:'Print job found',data:print_job})
    } catch (error) {
        return res.status(500).json({success:false,message:'Internal Server Error',error:error});
    }
};

export const delete_job = async (req, res) => {
    try {
        const id = req.params;
        if(!id){
            return res.status(400).json({success:false,message:'Provide Print job id'});
        };
        const print_job = await PrintJobs.findByPk(id);
        if(!print_job){
            return res.status(400).json({success:false,message:'Failed to fetch print job'});
        };
        const delete_job = await print_job.destroy();
        if(!delete_job){
            return res.status(400).json({success:false,message:'Could not delete job'})
        };
        return res.status(200).json({success:true,message:'Print job deleted'});
    } catch (error) {
        return res.status(500).json({success:false,message:'Internal Server Error',error:error});
    }
};

export const get_pending_jobs = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success:false,message:'Not authenticated, please try again'});
        };
        const pending_jobs = await PrintJobs.findAll({where:{status:'pending'}});
        if(!pending_jobs || pending_jobs.length === 0){
            return res.status(400).json({success:false,message:'No pending jobs or API failed'})
        };
        return res.status(200).json({success:true,message:'Pending Jobs Fetched',data:pending_jobs})
    } catch (error) {
        return res.status(500).json({success:false,message:'Internal Server Error',error:error});
    }
};