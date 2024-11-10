import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";
/**
 * This file collects the endpoint for all clients (get) or for posting new clientes (not having ClientId)
 */

export const prerender = false; // Make this page server side rendered (not static)

export const GET: APIRoute = async ({ params, request }) => {
    try {
        const users = await db.select().from(Clients);
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
              "Content-Type": "Application/json",
            },
          });
        
    } catch (error) {
        return new Response(
            JSON.stringify({
              msg: "no users were found!",
            }),
            {
              status: 401,
              headers: {
                "Content-Type": "Application/json",
              },
            }
          );        
    }
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id, ...body } = await request.json(); // by separating the id, we can ignore incoming ids and create ours

    const resp = await db.insert(Clients).values({
        ...body
    });

    console.log('resp :>> ', resp);


    return new Response(
      JSON.stringify({
        method: "post",
        ...body,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
        JSON.stringify({
          msg: "no body found",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
  }
};
