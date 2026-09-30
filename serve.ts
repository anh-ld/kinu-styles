// Static server for the built portal. Dev: bun --hot serve.ts
const port = Number(process.env.PORT || 5173);

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === '/' ? '/index.html' : url.pathname;
    const file = Bun.file(`dist${path}`);
    if (await file.exists()) return new Response(file);
    return new Response(Bun.file('dist/index.html'), { headers: { 'content-type': 'text/html' } });
  },
});

console.log(`serving dist on :${port}`);