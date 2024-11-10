import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: "Pepito",
    age: 42,
  };

  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      "Content-Type": "Application/json",
    },
  });
};
