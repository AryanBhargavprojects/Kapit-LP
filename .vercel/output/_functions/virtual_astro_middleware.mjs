import { b as createRouteMatcher, a as clerkMiddleware } from "./chunks/index_BKeONVeX.mjs";
import { bc as sequence } from "./chunks/params-and-props_BO-CuAf5.mjs";
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const onRequest$1 = clerkMiddleware((auth, context, next) => {
  if (isProtectedRoute(context.request) && !auth().userId) {
    return auth().redirectToSignIn();
  }
  return next();
});
const onRequest = sequence(
  onRequest$1
);
export {
  onRequest
};
