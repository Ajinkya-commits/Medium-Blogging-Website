import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import {cors} from 'hono/cors'
 
const app = new Hono<{
  Bindings :{
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()

app.use("/*",cors())
app.get('/api', async (c) => {
  console.log('Signup request received');
  return new Response(JSON.stringify({ message: 'API is working!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


export default app
