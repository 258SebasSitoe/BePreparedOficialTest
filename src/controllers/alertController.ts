import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { db } from "../database";
import { getMessaging } from 'firebase-admin/messaging';
import { subscribe } from "diagnostics_channel";
import { error } from "console";

export class AlertController{
    async create(request: FastifyRequest, reply:FastifyReply){
        const AlertSchema = z.object({
            title: z.string(),
            message: z.string(),
            provinceId: z.string(),
            districtId: z.string()
        });
        
        const {title, message, provinceId, districtId} = AlertSchema.parse(request.body);
        const district = await db.district.findUnique({
            where:{
                id: districtId,
                provinceId
            }
        });
        if(!district){
            return reply.status(400).send({error: 'O distrito não pertence à provicia'}) 
        };
        // enviar notificacoes
        const subscribersDevicesId = await db.subscriber.findMany({
            select: {
                deviceId: true
            },
            where: {
                districtId,
                deviceId:{
                    not: null
                },
                verified: true
            }
        })
        const alert = await db.alert.create({
            data: {
                title,
                message,
                provinceId,
                districtId
            },
            select:{
                id: true,
                title: true,
                message: true,
                provinceId: true,
                districtId: true,
            }
        });
        const tokens = subscribersDevicesId.map((deviceId) => String(deviceId.deviceId));

        const alertNotification = {
            data: alert,
            tokens: tokens,
        };
        try{
            const response = await getMessaging().sendMulticast(alertNotification)
            console.log(response.successCount + ' messages were sent successfully');
            return reply.send(alert)
        }catch(error){
            return reply.status(500).send({error: 'Notification failed!'});
        }

    }
}