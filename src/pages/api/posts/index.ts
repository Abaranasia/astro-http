import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false; // This defines that this page should be server side rendered (so dynamic)

export const GET: APIRoute = async ({ params, request }) => {
  // const posts = await getCollection('blog');

  const url = new URL(request.url);
  const requestedSlug = url.searchParams.get(`slug`);

  if (requestedSlug) {
    const requestedPost = await getEntry("blog", requestedSlug);
    //const requestedPost= posts.filter((post) => post.slug === requestedSlug)

    if (requestedPost) {
      return new Response(JSON.stringify(requestedPost), {
        status: 200,
        headers: {
          "Content-Type": "Application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({msg: `Error: post ${requestedSlug} not found`}), {
        status: 404,
        headers: {
          "Content-Type": "Application/json",
        },
      });
    }
  } else {
    return new Response('nothing here', {status: 200});
  }
};
