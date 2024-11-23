import { defineAction } from "astro:actions";
import { db, Posts, eq } from "astro:db";
import { z } from "astro:schema";

export const updateLikes = defineAction({
  accept: "json",
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));
    if (!post) return false;

    post.likes = post.likes + increment;
    await db.update(Posts).set(post).where(eq(Posts.id, postId));
    return true;
},
});
