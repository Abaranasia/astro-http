import type { APIRoute  } from "astro";
import { Posts, db, eq } from "astro:db";

export const prerender = false; // Make this page server side rendered (not static)

export const GET: APIRoute = async ({ params, request }) => {
    const postId = params.postId ?? '';

    try {
        const posts = await db.select().from(Posts).where(eq(Posts.id, postId))
        console.log('response :>> ', posts);
    
        if (posts.length>0) {
            return new Response(
              JSON.stringify(posts.at(0)),
              {
                status: 200,
                headers: {
                  "Content-Type": "Application/json",
                },
              }
            );
        } else {
            throw new Error ('not found')
        }
      } catch (error) {
        return new Response(
            JSON.stringify({
              msg: `Post ${postId} not found`,
            }),
            {
              status: 404,
              headers: {
                "Content-Type": "Application/json",
              },
            }
          );
      }
};

export const PUT: APIRoute = async ({ params, request }) => {
  const postId = params.postId ?? '';

  const { likes = 0 } = await request.json();

  try {
      const posts = await db.select().from(Posts).where(eq(Posts.id, postId))

      if (postId.length=== 0) {
        const newPost = {
          id: postId,
          title: 'Post not found',
          likes: 0,
        }
        await db.insert(Posts).values(newPost);
        posts.push(newPost);
      }
  
      const post = posts.at(0)!;
      post.likes = post.likes + likes;

      await db.update(Posts).set(post).where(
        eq(Posts.id, postId),
      )
      return new Response('Ok!', {status: 200});
      
    } catch (error) {
      return new Response(
          JSON.stringify({
            msg: `${postId} not found. We cannot like it :/`,
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
    }
};