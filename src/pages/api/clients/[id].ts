import type { APIRoute  } from "astro";
import { getEntry } from "astro:content";

export const prerender = false; // Make this page server side rendered (not static)

export const GET: APIRoute = async ({ params, request }) => {
    const {id} = params;

    // const post = await getEntry('Clients', id as any);

 /*    if (!post) {
        return new Response(JSON.stringify({ msg: `Post ${id} not found`}), {
            status: 404,
            headers: {
              "Content-Type": "Application/json",
            },
        });
    } */

    return new Response(JSON.stringify(id), {
        status: 200,
        headers: {
            "Content-Type": "Application/json",
          },
    })
};

export const PATCH: APIRoute = async ({ params, request }) => {
    const {id} = params;
    const body = await request.json();

    return new Response(JSON.stringify({
        method: `patch on clientId ${id}`,
        ...body,
    }), {
        status: 200,
        headers: {
            "Content-Type": "Application/json",
          },
    })
};

export const PUT: APIRoute = async ({ params, request }) => {
    const {id} = params;
    const body = await request.json();

    return new Response(JSON.stringify({
        method: `put on clientId ${id}`,
        ...body,
    }), {
        status: 200,
        headers: {
            "Content-Type": "Application/json",
          },
    })
};

export const DELETE: APIRoute = async ({ params, request }) => {
    const {id} = params;

    return new Response(JSON.stringify({
        method:  `delete clientId ${id}`,
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
            params: { id: 'first-post'}
        }
    ]
} */