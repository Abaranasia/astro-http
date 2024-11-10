import type { APIRoute, GetStaticPaths } from "astro";
import { getStaticPaths } from "../../blog/[...slug].astro";
import { getEntry } from "astro:content";

export const prerender = false; // Make this page server side rendered (not static)

export const GET: APIRoute = async ({ params, request }) => {
    const {slug} = params;

    const post = await getEntry('blog', slug as any);

    if (!post) {
        return new Response(JSON.stringify({ msg: `Post ${slug} not found`}), {
            status: 404,
            headers: {
              "Content-Type": "Application/json",
            },
        });
    }

    return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
            "Content-Type": "Application/json",
          },
    })
};

export const POST: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response(JSON.stringify({
        method: 'post',
        ...body,
    }), 
    {
        status: 200,
        headers: {
            "Content-Type": "Application/json",
          },
    })
};

export const PUT: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response(JSON.stringify({
        method: 'put',
        ...body,
    }), {
        status: 200,
        headers: {
            "Content-Type": "Application/json",
          },
    })
};

// Next line with getStaticPaths is needed to handle params if page is prerendered
/* export const getStaticPaths:GetStaticPaths = async () => {
    return [
        {
            params: { slug: 'first-post'}
        }
    ]
} */