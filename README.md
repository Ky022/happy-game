# 雾谷纪行 0.4 — 界面与幻兽编队

线上：https://mistvale-friends.astral-cards.workers.dev/

0.4根据已核对的国服玩家截图重做冒险笔记、五主导航、集中式角色面板和养成导航，增加主宠/三个副宠/收藏编队；加成实际进入属性与服务器战斗，并兼容旧存档。对照和缺口见 [实现比较](docs/research/IMPLEMENTATION_COMPARISON.md)。

0.3把节点路线改为 11×15 方格世界，加入可行走角色、树林/河流碰撞、迷雾揭开、地点交互距离、独立账号地图记录。战斗改为格子场景展示和实际血量差产生的伤害数字，角色换为原创 Q 版 SVG。目标是逐步接近国服《杖剑传说》的探索体验，不宣称完整还原。

账号、公会、好友、聊天、组队和 PvP 保持原数据库与 Durable Object 标识。新探索资料存入新增 exploration 表，不覆盖人物存档。

## 使用

安卓测试包默认连接线上地址。已安装用户重新打开联网模式即可载入新页面，无需重装。`dist/mistvale-debug.apk` 原样恢复自线上包，内置离线页面仍为 0.2.1；新版方格探索通过服务器页面提供。未进行实体 Android 设备测试。

开发需要 Node.js 24：

```sh
npm ci
XDG_CONFIG_HOME=/tmp/mistvale-xdg WRANGLER_SEND_METRICS=false npm run dev
```

本地浏览器访问 http://127.0.0.1:5173 。测试使用本地服务，勿对真实玩家数据库执行注册和战斗测试。

```sh
npm run check
npm test
node tests/interface-browser.mjs
node tests/browser.mjs
node tests/online-regression.mjs
```

部署需要受信任的 Cloudflare 授权；账号 ID 必须是账号的真实 ID，不能使用邮箱：

```sh
npm run deploy
```

## 限制与恢复记录

环境重建未恢复此前未提交的开发文件。本次从已部署资产和 Cloudflare Script API 恢复前端、原签名 APK 及完整服务器部署代码；服务器核心暂保留为可读的打包模块，原 Android 源码、签名密钥及此前的测试源文件未恢复。新增功能源码和测试均在本仓库。

地图位置、迷雾和交互距离已由服务器验证。战斗中的格子和站位目前是表现层；底层仍为原单敌人回合规则，没有原作空间范围、多目标或真实移动战斗机制。地图仍沿用已有四区域各七个关键地点，未达到原作内容量。原作素材不包含在游戏中。

Cloudflare 免费资源有额度限制；本次不是长期容量承诺。参考与对照见 docs 目录。
