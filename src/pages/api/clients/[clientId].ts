import type { APIRoute  } from "astro";
import { getEntry } from "astro:content";
import { Clients, db, eq } from "astro:db";

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
    const clientId = params.clientId ?? '';

    try {
      const { id, ...body } = await request.json(); // by separating the id, we can ignore incoming ids and create ours
  
      const resp = await db.update(Clients).set(body).where(eq(Clients.id, +clientId));
      console.log('resp :>> ', resp);
  
      const updatedClient = await db.select().from(Clients).where(eq(Clients.id, +clientId))
      console.log('updatedClient :>> ', updatedClient);
  
      return new Response(
        JSON.stringify(updatedClient.at(0)),
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

  export const DELETE: APIRoute = async ({ params, request }) => {
    const clientId = params.clientId ?? '';

    try {
      const { id, ...body } = await request.json(); // by separating the id, we can ignore incoming ids and create ours
  
    const {rowsAffected} = await db.delete(Clients).where(eq(Clients.id, +clientId));
      
    if(rowsAffected >0 ) 
      {return new Response(
        JSON.stringify({
            msg:`The user ${clientId} has been deleted`
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
    } else { throw new Error ('not found')}
    } catch (error) {
      return new Response(
          JSON.stringify({
            msg: `Unable to delete ${clientId}`,
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

