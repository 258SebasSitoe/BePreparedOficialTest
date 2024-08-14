// Import the framework and instantiate it
import { routes } from './routes';
import './database/redis';
import { initializeApp } from 'firebase-admin/app';
import Fastify from 'fastify'
import { firebaseConfig } from './config/firebase';

const firebaseApp = initializeApp(firebaseConfig);
const fastify = Fastify({
  logger: true
})
fastify.register(routes);


/**
 * REST  => Representational Transfer State
 */
// Run the server!
try {
   fastify.listen({ port: 3333 })
} catch (err) {
  fastify.log.error(err)
}