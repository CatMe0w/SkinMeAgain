# The Story of SkinMeAgain

### **拯救消逝的 Minecraft 皮肤**

我维护着一个 Minecraft 1.4.7 的服务器，它已经默默运行了很多年——它的整合包可以追溯到 2012 年，内置了当年的 SkinMe mod。

SkinMe 已经停运了很长时间，而 Mojang 针对旧版本的皮肤 API 在许多年前也已经失效了，服务器上所有人的皮肤都变成了默认的 Steve 模样。我一直都知道。

某天上线的时候，我偶然瞅了一眼游戏日志，我发现 SkinMe mod 还在尝试连接一些不存在的域名。

我记得以前人们并没有提过什么回落服务器，但此刻我觉得其中有什么东西还没被发现。

我反编译了 SkinMe mod，找到了一个（可能是）隐藏的回落服务器列表，硬编码在代码中。

这些服务器原本是为了当 SkinMe 和 Mojang 服务器下线时，从其他人的平台获取数据，以保持皮肤显示。

此刻，其中两个已经过期了。

我注册了这两个域名，写下了这里的代码，从 [CustomSkinLoader](https://modrinth.com/mod/customskinloader) 扒来了现在的回落服务器顺序（Mojang -> LittleSkin -> Blessing Skin -> ElyBy -> TLauncher），让 SkinMe mod 能够按照现在 CustomSkinLoader 的逻辑来获取皮肤。

从 2024-12-03 或 2024-12-04（取决于你在哪）开始，所有 Minecraft 1.3.x 到 1.5.x 玩家，只要还装有 SkinMe mod，皮肤就会重新显示，不需要更改任何配置。

![screenshot of Minecraft 1.4.7](nostalgia.jpg)

## 运行

需要 Deno。

```sh
deno run --allow-net skinmeagain.js
```

## 许可证

MIT License
