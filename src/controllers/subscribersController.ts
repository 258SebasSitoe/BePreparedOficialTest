import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import {generate6DigitsNumber} from '../utils/utils';
import { db } from "../database";
import { redis } from "../database/redis";
import {twilio, twilioConfig} from '../config/twilio';
import { error } from "console";


export class subscribersController{
    async create(request: FastifyRequest, reply:FastifyReply){
        const subscriberSchema = z.object({
            phone: z.string().regex(/^8[2-7]\d{7}/),
            provinceId: z.string(),
            districtId: z.string(),
        });
        const {phone, provinceId, districtId} = subscriberSchema.parse(request.body)
        // verrificar se o usuário já existe
        const subscribrExists = await db.subscriber.findUnique({where: {phone: String(phone)}});
        if(subscribrExists){
            return reply.status(401).send({error: 'O usuário já existe'});
        }
        // verrificar se o distrito esta relacionado com a provincia
        const district = await db.district.findUnique({where: {
            id: districtId,
            provinceId
            }
        });
        if(!district){
            return reply.status(400).send({error: 'O não pertence à provicia'});   

        };
        const sevedSubscriber = await db.subscriber.create({
            data:{
                phone,
                provinceId,
                districtId
            }
            }
        );
        
        const otp = generate6DigitsNumber();
        console.log(otp);
        twilio.messages.create({
            body: `${otp}`,
            from: "+12294514129",
            to: "+258845068123"}
        )
        const message = await twilio;
        await redis.set(`otp_${otp}`, phone, 60*3);


        return reply.status(200).send({
            subscriber: sevedSubscriber,
            otp
        }   
        );
    }
    async update(request: FastifyRequest, reply: FastifyReply ){
        console.log(request.headers.authorization)
        const deviceId = z.string().parse(request.headers.authorization)
        const subscriberSchema = z.object({
            provinceId: z.string().optional(),
            districtId: z.string().optional(),
        });
        const {provinceId, districtId} =subscriberSchema.parse(request.body);
        
        const subscriber = await db.subscriber.findUnique({
            where: {
                deviceId,
                verified: true  
            } 
        });
        if (!subscriber) return reply.status(401).send({error: 'Authentication error'});
        
        const district = await db.district.findUnique({where: {
            id: districtId,
            provinceId
            }
        });
        if(!district){
            return reply.status(400).send({error: 'O não pertence à provicia'});  
        };
        const updateSubscriber = await db.subscriber.update({
            where: {
                deviceId
            },
            data:{
                provinceId,
                districtId
            }
        });

        return reply.send(updateSubscriber)
    }
}