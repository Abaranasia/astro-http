import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { db, Posts, eq } from "astro:db";

export const getPostLikes = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (postId) => {
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));
    if (!post) return { likes: 0 };

    return { likes: post.likes};
  },
});
