import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const getGreeting = defineAction({
    input: z.object({
      name: z.string(),
      age: z.string(),
      isActive: z.boolean(),
    }),
    
    handler: async ({name, age, isActive}) => {
        console.log('server says :>> ', {name, age, isActive});
      return `Hello, ${name}!`
    }
  })