// 将评论请求转发到部署在 Netlify 上的 Twikoo 后端。
// 博客所在的 `*.pages.dev` 国内可达，评论前端的 envId/jsUrl 指向本文件
// 暴露的两个路径，由 Cloudflare 反代到 Netlify 云函数。
const BACKEND = "https://shadowvanx-twikoo.netlify.app/.netlify/functions/twikoo";
const CLIENT_JS = "https://fastly.jsdelivr.net/npm/twikoo@1.7.14/dist/twikoo.min.js";

const CORS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export const onRequest = async ({ request }) => {
	if (request.method === "OPTIONS") {
		return new Response(null, { status: 204, headers: CORS });
	}

	// 评论前端脚本：从 jsDelivr 拉取并交给边缘缓存，国内访客直接从本站加载
	if (new URL(request.url).pathname === "/twikoo.js") {
		const js = await fetch(CLIENT_JS);
		const headers = new Headers(js.headers);
		headers.set("Cache-Control", "public, max-age=86400");
		return new Response(js.body, { status: js.status, headers });
	}

	if (request.method !== "POST" && request.method !== "GET") {
		return new Response(JSON.stringify({ code: 405, message: "Method Not Allowed" }), {
			status: 405,
			headers: { ...CORS, "Content-Type": "application/json" },
		});
	}

	// GET 直达后端健康检查页；POST 转发评论 API 请求
	const res = await fetch(BACKEND, {
		method: request.method,
		headers: { "Content-Type": "application/json" },
		body: request.method === "POST" ? await request.text() : undefined,
	});
	const headers = new Headers(res.headers);
	headers.set("Access-Control-Allow-Origin", "*");
	return new Response(res.body, { status: res.status, headers });
};
