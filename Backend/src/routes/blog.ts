import { createPostinput, updatePostinput } from '@ajinkya66/medium-common';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL : string,
    JWT_SECRET : string,
  },
  Variables:{
   userId : string,
  }
}>();

//middleware...............................
blogRouter.use('/*', async (c, next) => {
  const header = c.req.header("authorization") || "";
  try {
    const user = await verify(header, c.env.JWT_SECRET) as { id: string };
    console.log(user);
    if (user) {
      c.set("userId", user.id);
      await next();
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});


blogRouter.post('/', async (c)=>{
  
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());
   
  const body = await c.req.json();
  const {success} = createPostinput.safeParse(body);
  if(!success){
    c.status(411);
    c.json({
      message : "incorrect inputs error for blog"
    })
  }
  const authorId = c.get("userId");
  const post = await prisma.post.create({
    data:{
      title : body.title,
      content : body.content,
      authorId : authorId,
    }
  })
  return c.json({
    id : post.id,
  })
})

blogRouter.put('/',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = updatePostinput.safeParse(body);
  if(!success){
    c.status(411);
    c.json({
      message : "error while updating the blog / incorrect inputs"
    })
  }
  const post = await prisma.post.update({
    where:{
      id : body.id,
    },
    data:{
      title : body.title,
      content : body.content,
      
    }
  })
  return c.json({
    id : post.id,
    message : "hello updated successfully"
  })
})

blogRouter.get('/bulk',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());
 const posts = await prisma.post.findMany({
  select:{
    content:true,
    title:true,
    id:true,
    author:{
      select:{
        name:true,
      }
    }
  }
 })
  return c.json({
    posts
  })
})

blogRouter.get('/:id',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

 try {
  const id =  c.req.param("id");
  const post = await prisma.post.findFirst({
    where:{
      id : id,
    },
    select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true,
        }
      }
    }
  })
  return c.json({
    post,
  })
  
 } catch (e) {
  c.status(400);
  return c.json({
    message :"error while fetching the blog post "
  })
 }
})

