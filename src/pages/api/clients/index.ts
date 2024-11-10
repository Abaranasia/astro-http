import type { APIRoute  } from "astro";
/**
 * This file collects the endpoint for all clients (get) or for posting new clientes (not having ClientId)
 */

export const prerender = false; // Make this page server side rendered (not static)

export const GET: APIRoute = async ({ params, request }) => {
    const {id} = params;

    // const post = await getCollection('Clients');

 /*    if (!post) {
        return new Response(JSON.stringify({ msg: `Post ${id} not found`}), {
            status: 404,
            headers: {
              "Content-Type": "Application/json",
            },
        });
    } */
const body = {
    method: 'getAll general',
}
    return new Response(JSON.stringify(body), {
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
        status: 201,
        headers: {
            "Content-Type": "Application/json",
          },
    })
};