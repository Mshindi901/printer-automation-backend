import crypto from 'crypto';
import Print_Agent from '../printer-agent/schema.js';

export async function agentAuth(req, res, next){
    const agentId = req.header('X-Agent-Id');
    const apiKey =  req.header('X-Agent-Key');

    if(!agentId || !apiKey){
        return res.status(401).json({success:false,message:'Missing Credentials'})
    };

    const is_agent = await Print_Agent.findByPk(agentId);
    if(!is_agent){
        return res.status(401).json({success:false,message:'Not an agent id'})
    };

    const received_key = crypto.createHash('sha256').update(apiKey).digest('hex');
    const is_key_valid = crypto.timingSafeEqual(Buffer.from(received_key, 'hex'), Buffer.from(is_agent.api_key, 'hex'));
    if(!is_key_valid){
        return res.status(401).json({success:false,message:'Invalid Api key'});
    };
    req.is_agent = is_agent;
    next();
};