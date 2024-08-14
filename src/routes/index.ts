import { FastifyInstance } from "fastify";
import { subscribersController } from "../controllers/subscribersController";
import { AuthController } from "../controllers/authController";
import { NotificationConstroller } from "../controllers/NotificationController";
import { request } from "http";
import { AlertController } from "../controllers/alertController";
import { authHook } from "../hooks/auth";

const subscriberController = new subscribersController();
const authController = new AuthController();
const notificationConstroller = new NotificationConstroller();
const alertController = new AlertController();

export async function routes (fastify: FastifyInstance){
    fastify.get('/', async function handler (request, reply) {
        return { hello: 'Khodar Sebas' }
    })
    fastify.post('/subscribers', (request, reply) => subscriberController.create(request, reply));
    fastify.put('/subscribers', (request, reply) => subscriberController.update(request, reply));
    fastify.post('/auth/subscribers/otp', (request, reply) => authController.authOtp(request, reply));
    fastify.post('/auth/subscribers', (request, reply) => authController.loginSubscriber(request, reply));
    fastify.post('/notifications', (request, reply) => notificationConstroller.create(request, reply));
    fastify.get('/notifications/:phone', (request, reply) => notificationConstroller.show(request, reply));
    fastify.post('/auth/admin', (request, reply) => authController.loginAdmin(request, reply))
    fastify.post('/alerts', {preHandler: authHook}, (request, reply) => alertController.create(request, reply));

}