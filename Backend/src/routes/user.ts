import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@ajinkya66/medium-common";


export const userRouter = new Hono<{
  Bindings :{
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();

userRouter.post('/signup', async (c) => {
  console.log('Signup request received');
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message : "error while signing up",
      })
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name:body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(jwt);
  return c.text(jwt);
  
  } catch (error) {
    console.error('Error during signup:', error);
    c.status(411);
    return c.json({
      message: 'error',
    });
  }
});


//signin................................................
userRouter.post('/signin', async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    c.json({
      message : "inputs are not correct",
    })
  }
  const user = await prisma.user.findUnique({
    where:{
      email:body.email,
      password : body.password,
    }
  });
  if(!user){
    c.status(403);
    return c.json({error:"user not found"});
  }
  const jwt = await sign({ id: user.id},c.env.JWT_SECRET);
  console.log(jwt);
  return c.text(jwt)
})
