import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: "http://localhost:3000/api/uploadthing",
  },
});


// import { createRouteHandler } from "uploadthing/next";
 
// import { ourFileRouter } from "./core";
 
// // Export routes for Next App Router
// export const { GET, POST } = createRouteHandler({
//   router: ourFileRouter,
 
//   // Apply an (optional) custom config:
//   // config: { ... },
// });