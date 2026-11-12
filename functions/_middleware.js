const BLOCKED = new Set([
  "/README.md",
  "/CHANGES.md",
  "/TODO.md",
  "/wrangler.jsonc",
  "/images-manifest.json",
  "/.assetsignore",
  "/.gitignore",
  "/_routes.json",
  "/functions/_middleware.js",
]);

export async function onRequest(context) {
  const { pathname } = new URL(context.request.url);
  if (!BLOCKED.has(pathname)) return context.next();
  try {
    const asset = await context.env.ASSETS.fetch(new URL("/404.html", context.request.url));
    if (asset.ok) {
      return new Response(asset.body, { status: 404, headers: asset.headers });
    }
  } catch {
    /* Fall through to a plain 404 if the asset binding is unavailable. */
  }
  return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
}
