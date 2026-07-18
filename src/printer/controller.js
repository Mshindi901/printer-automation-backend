import Printers from "./schema.js";

export const add_printer = async(req, res) => {
    try {
        const {name, location, ip_address, agent_id} = req.body;
        if(!name || !location || !ip_address || !agent_id){
            return res.status(400).json({success:false,message:'Provide all information'});
        };
        const is_printer = await Printers.findOne({where:{ip_address:ip_address}});
        if(is_printer){
            return res.status(400).json({success:false,message:'Printer with that address already exists'})
        };
        const new_printer = await Printers.create({name, location, status, ip_address, agent_id});
        if(!new_printer){
            return res.status(400).json({success:false,message:'Could not create printer'});
        };
        return res.status(200).json({success:true,message:'Printer added'})
    } catch (error) {
        return res.status(500).json({cess:false,message:'Internal Server Error',error:error})
    }
};


export const get_agent_printers = async(req, res) => {
    try {
        const agent_id = req.params;
        if(!agent_id){
            return res.status(400).json({success:false,message:'Provide the agent record id'})
        };
        const printers = await Printers.findAll({where:{agent_id}});
        if(!printers || printers.length === 0){
            return res.status(400).json({success:false, message:'Api failed or no records for agent id yet'});
        };
        return res.status(200).json({success:true,message:'Printers Found',data:printers});
    } catch (error) {
        return res.status(500).json({cess:false,message:'Internal Server Error',error:error})
    }
}

export const get_printer_by_name = async(req, res) => {
    try {
        const printer_name = req.body;
        if(!printer_name){
            return res.status(400).json({success:false,message:'Printer Name not provided'})
        };
        const printer = await Printers.findOne({where:{name:printer_name}});
        if(!printer){
            return res.status(400).json({success:false,message:'no printer found'})
        };
        return res.status(200).json({success:true,message:'Found Printer',data:printer});
    } catch (error) {
        return res.status(500).json({cess:false,message:'Internal Server Error',error:error})
    }
};

export const get_printer_by_ip = async(req, res) => {
    try {
        const ip_address = req.body;
        if(!ip_address){
            return res.status(400).json({success:false,message:'Printer ID not provided'})
        };
        const printer = await Printers.findOne({where:{ip_address:ip_address}});
        if(!printer){
            return res.status(400).json({success:false,message:'Printer not found'});
        };
        return res.status(200).json({success:true,message:'Printer Found',data:printer});
    } catch (error) {
        return res.status(500).json({cess:false,message:'Internal Server Error',error:error})
    }
};

export const get_printer_by_id = async(req, res) => {
    try {
        const id = req.params;
        if(!id){
            return res.status(400).json({success:false,message:'Provide Printer ID'});
        };
        const printer = await Printers.findByPk(id);
        if(!printer){
            return res.status(400).json({success:false,message:'Printer Not found'});
        };
        return res.status(200).json({success:true,message:'Printer found',data:printer})
    } catch (error) {
        return res.status(500).json({cess:false,message:'Internal Server Error',error:error})
    }
};

export const delete_printer = async(req, res) => {
    try {
        const id = req.params;
        if(!id){
            return res.status(400).json({success:false,message:'Provide Printer ID'});
        };
        const printer = await Printers.findByPk(id);
        if(!printer){
            return res.status(400).json({success:false,message:'Printer Not found'});
        };
        const deleting = await printer.destroy();
        if(!deleting){
            return res.status(400).json({success:false,message:'Failed to delete record'});
        };
        return res.status(200).json({success:false,message:'Printer deleted'})
    } catch (error) {
        return res.status(500).json({cess:false,message:'Internal Server Error',error:error})
    }
};