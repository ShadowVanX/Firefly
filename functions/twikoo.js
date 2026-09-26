// 将评论请求转发到部署在 Netlify 上的 Twikoo 后端。
// 博客所在的 `*.pages.dev` 国内可达，评论前端的 envId 指向 /twikoo，
// 由 Cloudflare 反代到 Netlify 云函数；客户端脚本为静态文件 public/twikoo.js。
const BACKEND = "https://shadowvanx-twikoo.netlify.app/.netlify/functions/twikoo";

const CORS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export const onRequest = async ({ request }) => {
	if (request.method === "OPTIONS") {
		return new Response(null, { status: 204, headers: CORS });
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
