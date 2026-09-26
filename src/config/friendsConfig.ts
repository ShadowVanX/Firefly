import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "人生难得一只（知）鸡（己）",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: false,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "陆州",
		imgurl: "/assets/images/friends/luzhou.webp",
		desc: "王航云的小马",
		siteurl: "https://v.douyin.com/kYHgIL-h81U/ 1@5.com :5pm",
		tags: ["XiuMe"],
		weight: 10, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "成阳",
		imgurl: "/assets/images/friends/chengyang.webp",
		desc: "我们是挚友啊！",
		siteurl: "https://v.douyin.com/4YHAvmuGnss/ 2@9.com :7pm",
		tags: ["达瓦里氏"],
		weight: 9,
		enabled: true,
	},
	{
		title: "北华山笙（张队）",
		imgurl: "/assets/images/friends/beihuashansheng.webp",
		desc: "张队，你的结辩好碍事啊！（张队先是一愣......)",
		siteurl: "https://b23.tv/Jh8OQPS",
		tags: ["二次元针额心、二游老资历"],
		weight: 8,
		enabled: true,
	},
	{
		title: "神秘人",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 7,
		enabled: true,
	},
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
