import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../database";

export class NotificationConstroller{
    
    async create(request: FastifyRequest, reply:FastifyReply){
        console.log(request.headers.authorization)
        const deviceId = z.string().parse(request.headers.authorization)
        
        const notificationSchema = z.object({
            message: z.string()
            
        });
        const {message} =notificationSchema.parse(request.body);
        
        const subscriber = await db.subscriber.findUnique({
            where: {
                deviceId,
                verified: true  
            }  
        });
        if (!subscriber) return reply.status(401).send({error: 'Authentication error'});
        const notification = await db.notification.create({
            data:{
                message,
                SubscriberId: subscriber.id
            }
        });
        
        return reply.send(notification)
    }
    async show(request: FastifyRequest, reply: FastifyReply){
        
        const paramsSchema = z.object({
            phone: z.string()
            
        });
        const deviceId = z.string().parse(request.headers.authorization)
        const {phone} =paramsSchema.parse(request.params);
        
        const subscriber = await db.subscriber.findUnique({
            where: {
                deviceId,
                verified: true,
                phone
            }  
        });
        if (!subscriber) return reply.status(401).send({error: 'Authentication error'});
        
        const notifications = await db.notification.findMany({
            where:{
                SubscriberId: subscriber.id
            }
        })

        return reply.send(notifications);
    }

}