import {createWorldApi} from './world-api.mjs';
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// cloudflare/generated/service.mjs
import { randomBytes, randomUUID, randomInt, timingSafeEqual, createHash } from "node:crypto";

// engine.js
var classes = { knight: { name: "\u9010\u98CE\u9A91\u58EB", icon: "shield", level: 1 }, mage: { name: "\u661F\u706B\u672F\u58EB", icon: "spark", level: 1 }, fighter: { name: "\u8D64\u7130\u6597\u58EB", icon: "sword", level: 3 }, sage: { name: "\u6708\u9732\u8D24\u8005", icon: "leaf", level: 3 } };
var skills = [
  { id: "slash", name: "\u75BE\u98CE\u65A9", type: "\u4E3B\u52A8", icon: "sword", desc: "\u9020\u6210 145% \u653B\u51FB\u4F24\u5BB3\u3002", mult: 1.45, classes: ["knight"] },
  { id: "guard", name: "\u68EE\u6797\u5E87\u62A4", type: "\u4E3B\u52A8", icon: "shield", desc: "\u83B7\u5F97\u6700\u5927\u751F\u547D 22% \u7684\u62A4\u76FE\u3002", shield: 0.22, classes: ["knight", "mage"] },
  { id: "flame", name: "\u7130\u706B\u6D41\u661F", type: "\u4E3B\u52A8", icon: "flame", desc: "\u9020\u6210 160% \u653B\u51FB\u4F24\u5BB3\uFF0C\u5E76\u71C3\u70E7 2 \u56DE\u5408\u3002", mult: 1.6, burn: 2, classes: ["mage"] },
  { id: "heal", name: "\u6668\u9732\u6CBB\u6108", type: "\u4E3B\u52A8", icon: "leaf", desc: "\u56DE\u590D\u6700\u5927\u751F\u547D\u7684 24%\u3002", heal: 0.24, classes: ["knight", "mage"] },
  { id: "ice", name: "\u971C\u6708\u672F", type: "\u4E3B\u52A8", icon: "snow", desc: "\u9020\u6210 115% \u653B\u51FB\u4F24\u5BB3\uFF0C\u4F7F\u654C\u4EBA\u4E0B\u6B21\u653B\u51FB\u51CF\u534A\u3002", mult: 1.15, slow: true, classes: ["mage"] },
  { id: "strike", name: "\u7834\u6653\u91CD\u51FB", type: "\u4E3B\u52A8", icon: "sun", desc: "\u9020\u6210 185% \u653B\u51FB\u4F24\u5BB3\u3002", mult: 1.85, classes: ["knight"] },
  { id: "vital", name: "\u575A\u97E7\u4E4B\u5FC3", type: "\u88AB\u52A8", icon: "heart", desc: "\u6700\u5927\u751F\u547D\u589E\u52A0 15%\u3002", classes: ["knight", "mage"] },
  { id: "fury", name: "\u6218\u610F", type: "\u88AB\u52A8", icon: "spark", desc: "\u653B\u51FB\u589E\u52A0 12%\u3002", classes: ["knight", "mage"] },
  { id: "drain", name: "\u751F\u547D\u56DE\u54CD", type: "\u88AB\u52A8", icon: "drop", desc: "\u653B\u51FB\u540E\u56DE\u590D\u6240\u9020\u6210\u4F24\u5BB3\u7684 10%\u3002", classes: ["knight", "mage"] },
  { id: "bond", name: "\u5E7B\u517D\u5171\u9E23", type: "\u88AB\u52A8", icon: "paw", desc: "\u5E7B\u517D\u653B\u51FB\u4E0E\u6CBB\u7597\u6548\u679C\u589E\u52A0 35%\u3002", classes: ["knight", "mage"] }
];
skills.find((k) => k.id === "slash").classes.push("fighter");
skills.find((k) => k.id === "strike").classes.push("fighter");
for (const id of ["guard", "heal", "vital", "fury", "drain", "bond"]) skills.find((k) => k.id === id).classes.push("fighter", "sage");
skills.find((k) => k.id === "ice").classes.push("sage");
skills.push(
  { id: "whirl", name: "\u65CB\u98CE\u7A81\u88AD", type: "\u4E3B\u52A8", icon: "sword", desc: "\u9020\u6210 155% \u653B\u51FB\u4F24\u5BB3\uFF0C\u5E76\u83B7\u5F97\u5C11\u91CF\u62A4\u76FE\u3002", mult: 1.55, shield: 0.08, classes: ["fighter", "knight"] },
  { id: "blood", name: "\u70BD\u8840\u4E4B\u5203", type: "\u4E3B\u52A8", icon: "flame", desc: "\u9020\u6210 175% \u653B\u51FB\u4F24\u5BB3\uFF0C\u5E76\u56DE\u590D\u5C11\u91CF\u751F\u547D\u3002", mult: 1.75, heal: 0.07, classes: ["fighter"] },
  { id: "moonbeam", name: "\u6708\u534E\u5149\u675F", type: "\u4E3B\u52A8", icon: "moon", desc: "\u9020\u6210 140% \u653B\u51FB\u4F24\u5BB3\uFF0C\u56DE\u590D 10% \u751F\u547D\u3002", mult: 1.4, heal: 0.1, classes: ["sage"] },
  { id: "renew", name: "\u7E41\u82B1\u65B0\u751F", type: "\u4E3B\u52A8", icon: "leaf", desc: "\u56DE\u590D 20% \u751F\u547D\uFF0C\u83B7\u5F97 10% \u751F\u547D\u62A4\u76FE\u3002", heal: 0.2, shield: 0.1, classes: ["sage"] },
  { id: "meteor", name: "\u661F\u9668", type: "\u4E3B\u52A8", icon: "star", desc: "\u9020\u6210 200% \u653B\u51FB\u4F24\u5BB3\u3002", mult: 2, classes: ["mage"] },
  { id: "thorns", name: "\u8346\u68D8\u62A4\u4F53", type: "\u88AB\u52A8", icon: "leaf", desc: "\u53D7\u51FB\u540E\u53CD\u5F39\u6240\u53D7\u4F24\u5BB3\u7684 15%\u3002", classes: Object.keys(classes) },
  { id: "resolve", name: "\u7EDD\u5883\u610F\u5FD7", type: "\u88AB\u52A8", icon: "shield", desc: "\u751F\u547D\u4F4E\u4E8E 35% \u65F6\u53D7\u5230\u4F24\u5BB3\u51CF\u5C11 20%\u3002", classes: Object.keys(classes) },
  { id: "focus", name: "\u4E13\u6CE8", type: "\u88AB\u52A8", icon: "star", desc: "\u6BCF\u7B2C\u56DB\u56DE\u5408\u6280\u80FD\u653B\u51FB\u989D\u5916\u589E\u52A0 25%\u3002", classes: Object.keys(classes) }
);
var pets = [
  { id: "fox", name: "\u82D4\u5149\u7075\u72D0", rarity: "SR", color: "#aecfa0", icon: "leaf", desc: "\u6BCF 3 \u56DE\u5408\u56DE\u590D\u4F60 8% \u7684\u751F\u547D\u3002", kind: "heal" },
  { id: "dragon", name: "\u4F59\u70EC\u5E7C\u9F99", rarity: "SSR", color: "#e6b68b", icon: "flame", desc: "\u6BCF 3 \u56DE\u5408\u989D\u5916\u653B\u51FB\uFF0C\u9020\u6210 55% \u653B\u51FB\u4F24\u5BB3\u3002", kind: "attack" },
  { id: "owl", name: "\u6708\u7FBD\u9E2E", rarity: "R", color: "#b8b4dd", icon: "moon", desc: "\u6BCF 3 \u56DE\u5408\u83B7\u5F97\u6700\u5927\u751F\u547D 7% \u7684\u62A4\u76FE\u3002", kind: "shield" },
  { id: "deer", name: "\u6668\u9732\u9E7F", rarity: "SR", color: "#e9ca86", icon: "sun", desc: "\u6BCF 3 \u56DE\u5408\u989D\u5916\u653B\u51FB\uFF0C\u9020\u6210 40% \u653B\u51FB\u4F24\u5BB3\u3002", kind: "attack" }
];
pets.push(
  { id: "phoenix", name: "\u66D9\u5149\u706B\u9E1F", rarity: "SSR", color: "#e6b68b", icon: "sun", desc: "\u6BCF 3 \u56DE\u5408\u56DE\u590D\u4F60 12% \u7684\u751F\u547D\u3002", kind: "heal" },
  { id: "otter", name: "\u6CC9\u6708\u6C34\u736D", rarity: "SR", color: "#aecfa0", icon: "drop", desc: "\u6BCF 3 \u56DE\u5408\u83B7\u5F97\u6700\u5927\u751F\u547D 9% \u7684\u62A4\u76FE\u3002", kind: "shield" },
  { id: "cat", name: "\u661F\u7802\u7075\u732B", rarity: "SR", color: "#b8b4dd", icon: "star", desc: "\u6BCF 3 \u56DE\u5408\u989D\u5916\u653B\u51FB\uFF0C\u9020\u6210 40% \u653B\u51FB\u4F24\u5BB3\u3002", kind: "attack" },
  { id: "mushroom", name: "\u5C0F\u8611\u83C7", rarity: "R", color: "#e9ca86", icon: "leaf", desc: "\u6BCF 3 \u56DE\u5408\u56DE\u590D\u4F60 6% \u7684\u751F\u547D\u3002", kind: "heal" }
);
var nodes = [
  { id: "camp", name: "\u65C5\u4EBA\u8425\u5730", kind: "camp", x: 43, y: 83, need: null, desc: "\u7089\u706B\u8FD8\u6E29\u7740\u3002\u9886\u53D6\u4F11\u606F\u6536\u76CA\uFF0C\u51C6\u5907\u4E0B\u4E00\u6BB5\u65C5\u9014\u3002" },
  { id: "chest", name: "\u6797\u95F4\u5B9D\u7BB1", kind: "chest", x: 23, y: 69, need: "camp", desc: "\u85E4\u8513\u4E0B\u9762\uFF0C\u85CF\u7740\u4E00\u5C01\u65E7\u65E5\u65C5\u4EBA\u7684\u4FE1\u548C\u8865\u7ED9\u3002" },
  { id: "slime", name: "\u82D4\u539F\u53F2\u83B1\u59C6", kind: "battle", x: 62, y: 63, need: "camp", desc: "\u6321\u4F4F\u5C0F\u5F84\u7684\u53F2\u83B1\u59C6\u3002\u8BD5\u8BD5\u4F60\u7684\u7B2C\u4E00\u5957\u6280\u80FD\u3002", hp: 170, atk: 18, xp: 60, gold: 65 },
  { id: "spring", name: "\u6708\u5149\u6CC9", kind: "story", x: 32, y: 48, need: "slime", desc: "\u6CC9\u6C34\u5012\u6620\u7740\u53E4\u8001\u7B26\u6587\u3002\u6478\u4E00\u6478\u77F3\u7891\uFF0C\u53D1\u73B0\u901A\u5F80\u9057\u8FF9\u7684\u9053\u8DEF\u3002" },
  { id: "wolf", name: "\u7070\u5F71\u72FC", kind: "battle", x: 71, y: 39, need: "spring", desc: "\u5C71\u9053\u4E0A\u7684\u5B88\u536B\u3002\u62A4\u76FE\u548C\u6CBB\u6108\u80FD\u5E2E\u52A9\u4F60\u62B5\u6321\u5B83\u7684\u653B\u51FB\u3002", hp: 300, atk: 28, xp: 95, gold: 95 },
  { id: "ruins", name: "\u5931\u843D\u77F3\u5EAD", kind: "chest", x: 40, y: 29, need: "wolf", desc: "\u53E4\u4EE3\u9A91\u58EB\u7559\u4E0B\u7684\u88C5\u5907\uFF0C\u4EE5\u53CA\u524D\u5F80\u5723\u6811\u7684\u7EBF\u7D22\u3002" },
  { id: "boss", name: "\u5723\u6811\u5B88\u536B", kind: "boss", x: 52, y: 14, need: "ruins", desc: "\u96FE\u8C37\u7684\u6700\u7EC8\u8BD5\u70BC\u3002\u8C03\u6574\u6280\u80FD\u548C\u88C5\u5907\uFF0C\u5524\u9192\u6C89\u7761\u7684\u5723\u6811\u3002", hp: 560, atk: 38, xp: 180, gold: 200 }
];
var regions = [{ id: 1, name: "\u98CE\u7720\u4E4B\u68EE", en: "MISTWOOD", boss: "boss", color: "forest" }, { id: 2, name: "\u6708\u6F6E\u6D77\u5CB8", en: "MOONSHORE", boss: "r2-boss", color: "coast" }, { id: 3, name: "\u8D64\u7802\u9057\u8FF9", en: "EMBER RUINS", boss: "r3-boss", color: "desert" }, { id: 4, name: "\u661F\u971C\u9AD8\u5730", en: "STARFROST", boss: "r4-boss", color: "snow" }];
nodes.forEach((n) => n.region = 1);
for (const r of regions.slice(1)) {
  const i = r.id;
  nodes.push(
    { id: `r${i}-camp`, region: i, name: ["", "", "\u6D77\u98CE\u8425\u5730", "\u6C99\u4E18\u8425\u5730", "\u96EA\u677E\u8425\u5730"][i], kind: "camp", x: 43, y: 83, need: regions[i - 2].boss, desc: "\u65B0\u7684\u98CE\u666F\u3002\u4F11\u606F\u7247\u523B\uFF0C\u518D\u5411\u8FDC\u65B9\u51FA\u53D1\u3002" },
    { id: `r${i}-chest`, region: i, name: "\u65C5\u4EBA\u8865\u7ED9", kind: "chest", x: 23, y: 69, need: `r${i}-camp`, desc: "\u53D1\u73B0\u65B0\u7684\u8865\u7ED9\u4E0E\u4E00\u679A\u9057\u7269\u788E\u7247\u3002" },
    { id: `r${i}-scout`, region: i, name: ["", "", "\u6F6E\u6C50\u87F9", "\u6C99\u5F71\u874E", "\u51B0\u539F\u72FC"][i], kind: "battle", x: 62, y: 63, need: `r${i}-camp`, hp: 260 * i, atk: 22 + 12 * i, xp: 65 * i, gold: 70 * i, desc: "\u901A\u5F80\u65B0\u533A\u57DF\u7684\u7B2C\u4E00\u573A\u8003\u9A8C\u3002" },
    { id: `r${i}-story`, region: i, name: ["", "", "\u6F6E\u58F0\u77F3\u7891", "\u65E7\u738B\u4E4B\u7891", "\u89C2\u661F\u53F0"][i], kind: "story", x: 32, y: 48, need: `r${i}-scout`, desc: "\u89E3\u8BFB\u8FDC\u53E4\u7891\u6587\uFF0C\u53D1\u73B0\u9057\u8FF9\u6DF1\u5904\u7684\u79D8\u5BC6\u3002" },
    { id: `r${i}-elite`, region: i, name: ["", "", "\u73CA\u745A\u5B88\u536B", "\u8D64\u7802\u9A91\u58EB", "\u971C\u6708\u536B\u58EB"][i], kind: "battle", x: 71, y: 39, need: `r${i}-story`, hp: 380 * i, atk: 28 + 14 * i, xp: 100 * i, gold: 95 * i, desc: "\u5F3A\u654C\u5B88\u4F4F\u4E86\u5C71\u9053\u3002\u5F3A\u5316\u88C5\u5907\u4E0E\u6280\u80FD\u518D\u51FA\u53D1\u3002" },
    { id: `r${i}-ruins`, region: i, name: "\u53E4\u4EE3\u79D8\u85CF", kind: "chest", x: 40, y: 29, need: `r${i}-elite`, desc: "\u6C89\u7761\u7684\u88C5\u5907\u4E0E\u9057\u7269\uFF0C\u7B49\u5F85\u4E0B\u4E00\u4F4D\u65C5\u4EBA\u3002" },
    { id: `r${i}-boss`, region: i, name: ["", "", "\u6F6E\u6C50\u5DE8\u7075", "\u8D64\u7802\u9F99\u536B", "\u661F\u971C\u9886\u4E3B"][i], kind: "boss", x: 52, y: 14, need: `r${i}-ruins`, hp: 600 * i, atk: 35 + 15 * i, xp: 200 * i, gold: 220 * i, desc: "\u672C\u533A\u57DF\u7684\u6700\u7EC8\u6311\u6218\u3002\u80DC\u5229\u5C06\u6253\u5F00\u65B0\u7684\u5192\u9669\u3002" }
  );
}
function regionOpen(s, id) {
  return id === 1 || s.completed.includes(regions[id - 2]?.boss);
}
__name(regionOpen, "regionOpen");
function freshState(now = Date.now()) {
  return { version: 1, name: "\u65C5\u4EBA", class: "knight", level: 1, xp: 0, gold: 240, gems: 300, tickets: 3, completed: ["camp"], selected: "camp", region: 1, equipped: ["slash", "guard", "heal", "strike"], passives: ["vital", "fury"], skillLevels: {}, pet: "fox", ownedPets: { fox: 1 }, gear: { weapon: 1, armor: 1, charm: 1 }, relic: 0, shards: 0, inventory: [], lastClaim: now, arenaWins: 0, arenaPlays: 0, pity: 0, draws: 0, questClaims: [], daily: { date: "", battles: 0, draws: 0, claims: [] }, tower: 0, created: false };
}
__name(freshState, "freshState");
function sanitizeState(raw, now = Date.now()) {
  const base = freshState(now);
  if (!raw || raw.version !== 1) return base;
  const s = { ...base };
  for (const k of ["level", "xp", "gold", "gems", "tickets", "lastClaim", "arenaWins", "arenaPlays", "pity", "draws"]) if (Number.isFinite(raw[k]) && raw[k] >= 0) s[k] = Math.min(raw[k], k === "lastClaim" ? now : 1e7);
  s.level = Math.max(1, Math.floor(s.level));
  s.name = typeof raw.name === "string" ? raw.name.slice(0, 16) : base.name;
  s.class = classes[raw.class] ? raw.class : base.class;
  s.completed = [.../* @__PURE__ */ new Set(["camp", ...(Array.isArray(raw.completed) ? raw.completed : []).filter((id) => nodes.some((n) => n.id === id))])];
  s.selected = nodes.some((n) => n.id === raw.selected) ? raw.selected : "camp";
  s.region = regions.some((r) => r.id === raw.region) && regionOpen(s, raw.region) ? raw.region : 1;
  s.relic = Math.max(0, Math.min(20, Math.floor(Number(raw.relic) || 0)));
  s.shards = Math.max(0, Math.min(1e5, Math.floor(Number(raw.shards) || 0)));
  s.tower = Math.max(0, Math.min(30, Math.floor(Number(raw.tower) || 0)));
  s.inventory = Array.isArray(raw.inventory) ? raw.inventory.filter((i) => i && typeof i.id === "string" && ["weapon", "armor", "charm"].includes(i.slot) && Number.isFinite(i.rank)).slice(0, 60).map((i) => ({ id: i.id.slice(0, 40), slot: i.slot, rank: Math.max(1, Math.min(50, Math.floor(i.rank))), name: String(i.name || "\u65C5\u4EBA\u88C5\u5907").slice(0, 30) })) : [];
  if (raw.daily && typeof raw.daily.date === "string") s.daily = { date: raw.daily.date.slice(0, 10), battles: Math.max(0, Math.min(1e3, Number(raw.daily.battles) || 0)), draws: Math.max(0, Math.min(1e3, Number(raw.daily.draws) || 0)), claims: Array.isArray(raw.daily.claims) ? raw.daily.claims.filter((x) => ["login", "battle", "draw"].includes(x)) : [] };
  const valid = /* @__PURE__ */ __name((list, type) => Array.isArray(list) ? [...new Set(list.filter((id) => skills.some((k) => k.id === id && k.type === type && k.classes.includes(s.class))))].slice(0, 4) : [], "valid");
  s.equipped = valid(raw.equipped, "\u4E3B\u52A8");
  if (!s.equipped.length) s.equipped = s.class === "mage" ? ["flame", "guard", "heal", "ice"] : base.equipped;
  s.passives = valid(raw.passives, "\u88AB\u52A8");
  for (const k of ["weapon", "armor", "charm"]) s.gear[k] = Math.max(1, Math.min(50, Math.floor(Number(raw.gear?.[k]) || 1)));
  for (const k of skills) s.skillLevels[k.id] = Math.max(1, Math.min(20, Math.floor(Number(raw.skillLevels?.[k.id]) || 1)));
  s.ownedPets = { fox: 1 };
  for (const p of pets) if (Number.isFinite(raw.ownedPets?.[p.id]) && raw.ownedPets[p.id] > 0) s.ownedPets[p.id] = Math.min(50, Math.floor(raw.ownedPets[p.id]));
  s.pet = s.ownedPets[raw.pet] ? raw.pet : "fox";
  s.questClaims = Array.isArray(raw.questClaims) ? raw.questClaims.filter((x) => ["explore", "boss", "draw"].includes(x)) : [];
  s.created = raw.created === true;
  return s;
}
__name(sanitizeState, "sanitizeState");
function stats(s) {
  let hp = 180 + s.level * 28 + s.gear.armor * 24 + (s.relic || 0) * 12, atk = 25 + s.level * 7 + s.gear.weapon * 8 + (s.relic || 0) * 3, def = 3 + s.gear.armor * 3 + s.gear.charm;
  if (s.passives.includes("vital")) hp = Math.round(hp * 1.15);
  if (s.passives.includes("fury")) atk = Math.round(atk * 1.12);
  return { hp, atk, def, power: Math.round(hp * 0.8 + atk * 9 + def * 12 + Object.values(s.gear).reduce((a, b) => a + b, 0) * 15 + (s.ownedPets[s.pet] || 1) * 40 + s.equipped.reduce((a, id) => a + (s.skillLevels[id] || 1) * 20, 0)) };
}
__name(stats, "stats");
function addXP(s, amount) {
  s.xp += amount;
  while (s.xp >= s.level * 100) {
    s.xp -= s.level * 100;
    s.level++;
  }
}
__name(addXP, "addXP");
function available(s, node) {
  return !node.need || s.completed.includes(node.need);
}
__name(available, "available");
function restReward(s, now = Date.now()) {
  const minutes = Math.min(480, Math.max(0, Math.floor((now - s.lastClaim) / 6e4)));
  return { minutes, gold: minutes * 2, xp: minutes };
}
__name(restReward, "restReward");
function claimRest(s, now = Date.now()) {
  const reward = restReward(s, now);
  if (!reward.minutes) return reward;
  s.gold += reward.gold;
  addXP(s, reward.xp);
  s.lastClaim = now;
  return reward;
}
__name(claimRest, "claimRest");
function switchClass(s, id) {
  if (!classes[id] || s.level < classes[id].level) return false;
  s.class = id;
  s.equipped = { knight: ["slash", "guard", "heal", "strike"], mage: ["flame", "guard", "heal", "ice"], fighter: ["slash", "blood", "heal", "whirl"], sage: ["moonbeam", "renew", "heal", "ice"] }[id];
  return true;
}
__name(switchClass, "switchClass");
function drawPet(s, rng2 = Math.random) {
  if (s.tickets > 0) s.tickets--;
  else if (s.gems >= 100) s.gems -= 100;
  else return null;
  s.draws++;
  s.pity++;
  const roll = rng2();
  const rarity = s.pity >= 10 || roll < 0.05 ? "SSR" : roll < 0.35 ? "SR" : "R";
  const pool = pets.filter((p) => p.rarity === rarity);
  const pet = pool[Math.min(pool.length - 1, Math.floor(rng2() * pool.length))];
  if (rarity === "SSR") s.pity = 0;
  const duplicate = Boolean(s.ownedPets[pet.id]);
  s.ownedPets[pet.id] = Math.min(50, (s.ownedPets[pet.id] || 0) + 1);
  return { pet, duplicate };
}
__name(drawPet, "drawPet");
function createBattle(s, enemy) {
  const st = stats(s);
  return { hero: st.hp, max: st.hp, enemy: enemy.hp, enemyMax: enemy.hp, enemyAtk: enemy.atk, shield: 0, burn: 0, slow: false, turn: 0, done: false, won: false, st, log: [], enemyInfo: enemy };
}
__name(createBattle, "createBattle");
function battleTurn(s, b, chosen, { enemyAction = true } = {}) {
  if (b.done) return [];
  const log = [];
  b.turn++;
  const id = chosen || s.equipped[(b.turn - 1) % s.equipped.length];
  const skill = skills.find((k) => k.id === id && s.equipped.includes(id));
  const boost = 1 + ((s.skillLevels[id] || 1) - 1) * 0.07;
  if (skill) {
    if (skill.mult) {
      const damage = Math.round(b.st.atk * skill.mult * boost * (s.passives.includes("focus") && b.turn % 4 === 0 ? 1.25 : 1));
      b.enemy = Math.max(0, b.enemy - damage);
      log.push(`${skill.name} \xB7 \u9020\u6210 ${damage} \u4F24\u5BB3`);
      if (s.passives.includes("drain")) b.hero = Math.min(b.max, b.hero + Math.round(damage * 0.1));
    }
    if (skill.heal) {
      const v = Math.round(b.max * skill.heal * boost);
      b.hero = Math.min(b.max, b.hero + v);
      log.push(`${skill.name} \xB7 \u56DE\u590D ${v} \u751F\u547D`);
    }
    if (skill.shield) {
      const v = Math.round(b.max * skill.shield * boost);
      b.shield += v;
      log.push(`${skill.name} \xB7 \u83B7\u5F97 ${v} \u62A4\u76FE`);
    }
    if (skill.burn) b.burn = skill.burn;
    if (skill.slow) b.slow = true;
  }
  if (b.burn > 0) {
    const damage = Math.round(b.st.atk * 0.18);
    b.enemy = Math.max(0, b.enemy - damage);
    b.burn--;
    log.push(`\u71C3\u70E7 \xB7 ${damage} \u4F24\u5BB3`);
  }
  if (b.turn % 3 === 0) {
    const pet = pets.find((p) => p.id === s.pet);
    const boost2 = (s.passives.includes("bond") ? 1.35 : 1) * (1 + ((s.ownedPets[s.pet] || 1) - 1) * 0.06);
    if (pet.kind === "heal") {
      const value = Math.round(b.max * (pet.id === "phoenix" ? 0.12 : pet.id === "mushroom" ? 0.06 : 0.08) * boost2);
      b.hero = Math.min(b.max, b.hero + value);
      log.push(`${pet.name} \xB7 \u56DE\u590D ${value} \u751F\u547D`);
    } else if (pet.kind === "shield") {
      b.shield += Math.round(b.max * (pet.id === "otter" ? 0.09 : 0.07) * boost2);
      log.push(`${pet.name} \xB7 \u52A0\u62A4\u76FE`);
    } else {
      const value = Math.round(b.st.atk * (pet.id === "dragon" ? 0.55 : 0.4) * boost2);
      b.enemy = Math.max(0, b.enemy - value);
      log.push(`${pet.name} \xB7 ${value} \u4F24\u5BB3`);
    }
  }
  if (b.enemy <= 0) {
    b.done = true;
    b.won = true;
  } else if (enemyAction) {
    let damage = Math.max(4, Math.round((b.enemyAtk + (b.turn > 16 ? (b.turn - 16) * 6 : 0)) * (b.slow ? 0.5 : 1) * (s.passives.includes("resolve") && b.hero / b.max < 0.35 ? 0.8 : 1)) - b.st.def);
    b.slow = false;
    const absorbed = Math.min(b.shield, damage);
    b.shield -= absorbed;
    damage -= absorbed;
    b.hero = Math.max(0, b.hero - damage);
    log.push(`${b.enemyInfo.name} \xB7 ${damage} \u4F24\u5BB3${absorbed ? `\uFF0C\u62A4\u76FE\u5438\u6536 ${absorbed}` : ""}`);
    if (s.passives.includes("thorns") && damage > 0) {
      const d = Math.round(damage * 0.15);
      b.enemy = Math.max(0, b.enemy - d);
      log.push(`\u8346\u68D8\u53CD\u51FB \xB7 ${d} \u4F24\u5BB3`);
    }
    if (b.hero <= 0 || b.turn >= 60) {
      b.done = true;
      b.won = false;
    } else if (b.enemy <= 0) {
      b.done = true;
      b.won = true;
    }
  }
  b.log.push(...log);
  return log;
}
__name(battleTurn, "battleTurn");
function settleBattle(s, b) {
  if (!b.done || b.settled) return null;
  b.settled = true;
  if (!b.won) return { gold: 0, xp: 0, first: false };
  const e = b.enemyInfo;
  const first = !s.completed.includes(e.id);
  let gold = e.gold || 45, xp = e.xp || 30;
  if (e.arena) {
    s.arenaWins++;
    s.arenaPlays++;
  } else if (first) s.completed.push(e.id);
  else {
    gold = Math.floor(gold * 0.4);
    xp = Math.floor(xp * 0.4);
  }
  s.gold += gold;
  addXP(s, xp);
  if (first && (e.id === "boss" || /^r[234]-boss$/.test(e.id))) {
    s.gems += 200;
    s.tickets += 2;
  }
  return { gold, xp, first };
}
__name(settleBattle, "settleBattle");

// cloudflare/password.mjs
async function hashPassword(password, salt, length) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations: 1e5 }, key, length * 8);
  return Buffer.from(bits);
}
__name(hashPassword, "hashPassword");

// cloudflare/generated/service.mjs
var rng = /* @__PURE__ */ __name(() => randomInt(1e6) / 1e6, "rng");
var dateKey = /* @__PURE__ */ __name((time = Date.now()) => new Date(time + 8 * 36e5).toISOString().slice(0, 10), "dateKey");
var weekKey = /* @__PURE__ */ __name(() => {
  const d = new Date(Date.now() + 8 * 36e5);
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
}, "weekKey");
function fail(message, status = 400) {
  const e = new Error(message);
  e.status = status;
  throw e;
}
__name(fail, "fail");
var digest = /* @__PURE__ */ __name((token) => createHash("sha256").update(token).digest("hex"), "digest");
function createService(db, scheduler) {
  const setInterval = scheduler.setInterval.bind(scheduler), clearInterval = scheduler.clearInterval.bind(scheduler);
  db.exec(`PRAGMA foreign_keys=ON;
 CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, username TEXT UNIQUE COLLATE NOCASE, salt TEXT NOT NULL, password TEXT NOT NULL, created INTEGER);
 CREATE TABLE IF NOT EXISTS characters(user_id TEXT PRIMARY KEY REFERENCES users(id), state TEXT NOT NULL, battle TEXT, last_turn INTEGER DEFAULT 0, revision INTEGER DEFAULT 0);
 CREATE TABLE IF NOT EXISTS sessions(hash TEXT PRIMARY KEY, user_id TEXT REFERENCES users(id), expires INTEGER);
 CREATE TABLE IF NOT EXISTS friends(a TEXT REFERENCES users(id), b TEXT REFERENCES users(id), requester TEXT, status TEXT, PRIMARY KEY(a,b));
 CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT REFERENCES users(id), channel TEXT, body TEXT, created INTEGER);
 CREATE TABLE IF NOT EXISTS guilds(id TEXT PRIMARY KEY, owner TEXT REFERENCES users(id), name TEXT UNIQUE, day TEXT, hp INTEGER DEFAULT 20000, max_hp INTEGER DEFAULT 20000);
 CREATE TABLE IF NOT EXISTS guild_members(user_id TEXT PRIMARY KEY REFERENCES users(id), guild_id TEXT REFERENCES guilds(id), contribution INTEGER DEFAULT 0, hit_day TEXT DEFAULT '', hits INTEGER DEFAULT 0);
 CREATE TABLE IF NOT EXISTS ratings(user_id TEXT REFERENCES users(id), season TEXT, score INTEGER DEFAULT 1000, wins INTEGER DEFAULT 0, losses INTEGER DEFAULT 0, claimed INTEGER DEFAULT 0, PRIMARY KEY(user_id,season));
 CREATE TABLE IF NOT EXISTS matches(id TEXT PRIMARY KEY, a TEXT REFERENCES users(id), b TEXT REFERENCES users(id), data TEXT, updated INTEGER);
 CREATE TABLE IF NOT EXISTS room_saves(code TEXT PRIMARY KEY, data TEXT, updated INTEGER);
 CREATE TABLE IF NOT EXISTS purchases(user_id TEXT REFERENCES users(id), day TEXT, item TEXT, count INTEGER DEFAULT 0, PRIMARY KEY(user_id,day,item));`);
  db.exec("CREATE TABLE IF NOT EXISTS draw_log(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id TEXT REFERENCES users(id),pet TEXT,rarity TEXT,duplicate INTEGER,created INTEGER)");
  db.exec("CREATE TABLE IF NOT EXISTS coop_rewards(user_id TEXT REFERENCES users(id),code TEXT,day TEXT,PRIMARY KEY(user_id,code))");
  const q = /* @__PURE__ */ __name((sql, ...args) => db.prepare(sql).run(...args), "q");
  const one = /* @__PURE__ */ __name((sql, ...args) => db.prepare(sql).get(...args), "one");
  const all = /* @__PURE__ */ __name((sql, ...args) => db.prepare(sql).all(...args), "all");
  const transact = /* @__PURE__ */ __name((fn) => db.transactionSync(fn), "transact");
  const record = /* @__PURE__ */ __name((id) => {
    const row = one("SELECT * FROM characters WHERE user_id=?", id);
    if (!row) fail("\u89D2\u8272\u4E0D\u5B58\u5728", 404);
    return { state: sanitizeState(JSON.parse(row.state)), battle: row.battle ? JSON.parse(row.battle) : null, lastTurn: row.last_turn, revision: row.revision };
  }, "record");
  const persist = /* @__PURE__ */ __name((id, r) => q("UPDATE characters SET state=?,battle=?,last_turn=?,revision=revision+1 WHERE user_id=?", JSON.stringify(r.state), r.battle ? JSON.stringify(r.battle) : null, r.lastTurn || 0, id), "persist");
  function daily(s) {
    const key = dateKey();
    if (s.daily.date !== key) s.daily = { date: key, battles: 0, draws: 0, claims: [] };
  }
  __name(daily, "daily");
  function publicUser(id) {
    const u = one("SELECT id,username FROM users WHERE id=?", id);
    if (!u) fail("\u65C5\u4EBA\u4E0D\u5B58\u5728", 404);
    const s = record(id).state;
    return { ...u, name: s.name, class: s.class, level: s.level, power: stats(s).power };
  }
  __name(publicUser, "publicUser");
  function mint(id) {
    const token = randomBytes(32).toString("hex");
    q("INSERT INTO sessions VALUES(?,?,?)", digest(token), id, Date.now() + 30 * 864e5);
    return token;
  }
  __name(mint, "mint");
  function session(token) {
    if (typeof token !== "string" || token.length !== 64) return null;
    const row = one("SELECT user_id FROM sessions WHERE hash=? AND expires>?", digest(token), Date.now());
    return row?.user_id || null;
  }
  __name(session, "session");
  async function register(input) {
    const username = String(input.username || "").trim().toLowerCase();
    const password = String(input.password || "");
    if (!/^[a-z0-9_]{3,20}$/.test(username)) fail("\u8D26\u53F7\u9700\u4E3A 3\u201320 \u4F4D\u5B57\u6BCD\u3001\u6570\u5B57\u6216\u4E0B\u5212\u7EBF");
    if (password.length < 8 || password.length > 128) fail("\u5BC6\u7801\u9700\u4E3A 8\u2013128 \u4F4D");
    if (one("SELECT id FROM users WHERE username=?", username)) fail("\u8D26\u53F7\u5DF2\u5B58\u5728", 409);
    const salt = randomBytes(16).toString("hex");
    const hashed = (await hashPassword(password, salt, 64)).toString("hex");
    const id = randomUUID(), s = freshState();
    s.name = String(input.name || "\u65C5\u4EBA").trim().slice(0, 16) || "\u65C5\u4EBA";
    s.created = true;
    daily(s);
    transact(() => {
      q("INSERT INTO users VALUES(?,?,?,?,?)", id, username, salt, hashed, Date.now());
      q("INSERT INTO characters(user_id,state) VALUES(?,?)", id, JSON.stringify(s));
    });
    return { user: publicUser(id), state: s, battle: null, token: mint(id) };
  }
  __name(register, "register");
  async function login(input) {
    const u = one("SELECT * FROM users WHERE username=?", String(input.username || "").trim().toLowerCase());
    const password = String(input.password || "");
    if (password.length > 128) fail("\u8D26\u53F7\u6216\u5BC6\u7801\u4E0D\u6B63\u786E", 401);
    const h = await hashPassword(password, u?.salt || "nonexistent-account-salt", 64);
    if (!u || !timingSafeEqual(h, Buffer.from(u.password, "hex"))) fail("\u8D26\u53F7\u6216\u5BC6\u7801\u4E0D\u6B63\u786E", 401);
    return { ...getState(u.id), token: mint(u.id) };
  }
  __name(login, "login");
  function getState(id) {
    const r = record(id);
    daily(r.state);
    return { user: publicUser(id), state: r.state, battle: r.battle, revision: r.revision, season: weekKey() };
  }
  __name(getState, "getState");
  function gameAction(id, input) {
    return transact(() => {
      const r = record(id), s = r.state;
      daily(s);
      const action = String(input.action || "");
      const [verb, a, b] = action.split(":");
      let result = null;
      if (r.battle && !r.battle.done && !["cast", "turn", "retreat", "select"].includes(verb)) fail("\u8BF7\u5148\u7ED3\u675F\u5F53\u524D\u6218\u6597", 409);
      if (verb === "select") {
        const n = nodes.find((n2) => n2.id === input.node);
        if (!n || !regionOpen(s, n.region)) fail("\u5730\u70B9\u5C1A\u672A\u5F00\u653E");
        s.selected = n.id;
        s.region = n.region;
      } else if (verb === "region") {
        const region = Number(a);
        if (!regions.some((r2) => r2.id === region) || !regionOpen(s, region)) fail("\u533A\u57DF\u5C1A\u672A\u89E3\u9501");
        s.region = region;
        s.selected = nodes.find((n) => n.region === region && n.kind === "camp").id;
      } else if (verb === "visit") {
        const n = nodes.find((n2) => n2.id === s.selected);
        if (!n || !available(s, n)) fail("\u8BF7\u5148\u5B8C\u6210\u524D\u7F6E\u63A2\u7D22");
        if (["battle", "boss"].includes(n.kind)) {
          r.battle = createBattle(s, n);
          r.lastTurn = 0;
          result = { kind: "battle" };
        } else if (n.kind === "camp") {
          if (!s.completed.includes(n.id)) s.completed.push(n.id);
          result = { kind: "rest" };
        } else {
          if (!s.completed.includes(n.id)) {
            s.completed.push(n.id);
            s.gold += n.kind === "chest" ? 120 * n.region : 50 * n.region;
            addXP(s, 40 * n.region);
            s.shards += n.kind === "chest" ? 3 : 1;
            if (n.kind === "chest") s.tickets++;
            if (n.id === "ruins" || n.id.endsWith("-ruins")) s.gear.weapon = Math.min(50, s.gear.weapon + 1);
          }
          result = { kind: "story" };
        }
      } else if (verb === "arena" || verb === "tower") {
        const st = stats(s);
        let enemy;
        if (verb === "tower") {
          if (s.tower >= 30) fail("\u8BD5\u70BC\u5854\u5DF2\u901A\u5173");
          const floor = s.tower + 1;
          enemy = { id: `tower-${floor}`, name: `\u661F\u5854\u7B2C ${floor} \u5C42`, hp: 180 + floor * 85, atk: 20 + floor * 5, gold: 50 + floor * 10, xp: 40 + floor * 7, tower: floor };
        } else {
          const f = { easy: 0.7, normal: 1, hard: 1.4 }[a];
          if (!f) fail("\u672A\u77E5\u8BD5\u70BC");
          enemy = { id: "arena-" + a, arena: true, name: { easy: "\u6EAA\u8C37\u5B88\u536B", normal: "\u9057\u8FF9\u9A91\u58EB", hard: "\u661F\u5EAD\u8D24\u8005" }[a], hp: Math.round(st.hp * f * 1.25), atk: Math.round(st.atk * f * 0.8), gold: Math.round(60 * f), xp: Math.round(45 * f) };
        }
        r.battle = createBattle(s, enemy);
        r.lastTurn = 0;
        result = { kind: "battle" };
      } else if (verb === "cast" || verb === "turn") {
        if (!r.battle || r.battle.done) fail("\u6CA1\u6709\u8FDB\u884C\u4E2D\u7684\u6218\u6597");
        if (Date.now() - r.lastTurn < 250) fail("\u884C\u52A8\u8FC7\u5FEB\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5", 429);
        if (verb === "cast" && !s.equipped.includes(a)) fail("\u8BE5\u6280\u80FD\u672A\u88C5\u5907");
        battleTurn(s, r.battle, verb === "cast" ? a : void 0);
        r.lastTurn = Date.now();
        if (r.battle.done) {
          result = { kind: "result", rewards: settleBattle(s, r.battle) };
          s.daily.battles++;
          if (r.battle.won) {
            const e = r.battle.enemyInfo;
            if (e.tower) {
              s.tower = e.tower;
              s.shards += 2;
              if (e.tower % 5 === 0) s.tickets++;
            }
            if (s.inventory.length < 60) {
              const slot = ["weapon", "armor", "charm"][randomInt(3)];
              const rank = Math.min(50, Math.max(1, (e.region || 1) * 2 + randomInt(3)));
              s.inventory.push({ id: randomUUID(), slot, rank, name: { weapon: "\u98CE\u7EB9\u957F\u5251", armor: "\u82D4\u7EC7\u65C5\u8863", charm: "\u6708\u9732\u540A\u5760" }[slot] });
            }
            s.shards++;
          }
        } else result = { kind: "turn" };
      } else if (verb === "retreat") {
        r.battle = null;
        result = { kind: "retreat" };
      } else if (verb === "claim-rest") {
        result = { kind: "rest-claim", rewards: claimRest(s) };
      } else if (verb === "class") {
        if (!switchClass(s, a)) fail("\u804C\u4E1A\u5C1A\u672A\u89E3\u9501");
      } else if (verb === "gear") {
        if (!["weapon", "armor", "charm"].includes(a)) fail("\u88C5\u5907\u65E0\u6548");
        const cost = s.gear[a] * 70;
        if (s.gold < cost || s.gear[a] >= 50) fail("\u91D1\u5E01\u4E0D\u8DB3\u6216\u88C5\u5907\u5DF2\u6EE1\u7EA7");
        s.gold -= cost;
        s.gear[a]++;
      } else if (verb === "toggle") {
        const k = skills.find((k2) => k2.id === a && k2.classes.includes(s.class));
        if (!k) fail("\u8BE5\u804C\u4E1A\u4E0D\u80FD\u88C5\u5907\u6B64\u6280\u80FD");
        const key = k.type === "\u4E3B\u52A8" ? "equipped" : "passives", list = s[key];
        if (list.includes(a)) {
          if (key === "equipped" && list.length === 1) fail("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u4E3B\u52A8\u6280\u80FD");
          s[key] = list.filter((id2) => id2 !== a);
        } else {
          if (list.length >= 4) fail("\u69FD\u4F4D\u5DF2\u6EE1\uFF0C\u8BF7\u5148\u9009\u62E9\u66FF\u6362");
          list.push(a);
        }
      } else if (verb === "replace") {
        const k = skills.find((k2) => k2.id === b && k2.classes.includes(s.class));
        if (!k) fail("\u65E0\u6548\u6280\u80FD");
        const key = k.type === "\u4E3B\u52A8" ? "equipped" : "passives";
        const i = s[key].indexOf(a);
        if (i < 0 || s[key].includes(b)) fail("\u4E0D\u80FD\u66FF\u6362\u6B64\u69FD\u4F4D");
        s[key][i] = b;
      } else if (verb === "move") {
        if (!s.equipped.includes(a)) fail("\u6280\u80FD\u672A\u88C5\u5907");
        s.equipped = [a, ...s.equipped.filter((id2) => id2 !== a)];
      } else if (verb === "upgrade") {
        const k = skills.find((k2) => k2.id === a && k2.type === "\u4E3B\u52A8" && k2.classes.includes(s.class));
        if (!k) fail("\u6280\u80FD\u65E0\u6548");
        const level = s.skillLevels[a] || 1, cost = level * 55;
        if (s.gold < cost || level >= 20) fail("\u91D1\u5E01\u4E0D\u8DB3\u6216\u5DF2\u6EE1\u7EA7");
        s.gold -= cost;
        s.skillLevels[a] = level + 1;
      } else if (verb === "pet") {
        if (!s.ownedPets[a]) fail("\u5C1A\u672A\u62E5\u6709\u6B64\u5E7B\u517D");
        s.pet = a;
      } else if (verb === "draw") {
        const draw = drawPet(s, rng);
        if (!draw) fail("\u661F\u613F\u5238\u4E0E\u661F\u6676\u4E0D\u8DB3");
        s.daily.draws++;
        q("INSERT INTO draw_log(user_id,pet,rarity,duplicate,created) VALUES(?,?,?,?,?)", id, draw.pet.id, draw.pet.rarity, draw.duplicate ? 1 : 0, Date.now());
        result = { kind: "draw", draw };
      } else if (verb === "quest") {
        const quest = { explore: [100, 1, s.completed.length >= 4], draw: [60, 1, s.draws >= 1], boss: [150, 2, s.completed.includes("boss")] }[a];
        if (!quest || !quest[2] || s.questClaims.includes(a)) fail("\u4EFB\u52A1\u672A\u5B8C\u6210\u6216\u5DF2\u9886\u53D6");
        s.gold += quest[0];
        s.tickets += quest[1];
        s.questClaims.push(a);
      } else if (verb === "daily") {
        const condition = { login: true, battle: s.daily.battles >= 3, draw: s.daily.draws >= 1 }[a];
        if (!condition || s.daily.claims.includes(a)) fail("\u4EFB\u52A1\u672A\u5B8C\u6210\u6216\u5DF2\u9886\u53D6");
        s.daily.claims.push(a);
        s.gold += a === "battle" ? 150 : 80;
        s.gems += a === "battle" ? 50 : 20;
        if (a === "login") s.tickets++;
      } else if (verb === "relic") {
        const cost = (s.relic + 1) * 5;
        if (s.relic >= 20 || s.shards < cost) fail("\u788E\u7247\u4E0D\u8DB3\u6216\u9057\u7269\u5DF2\u6EE1\u7EA7");
        s.shards -= cost;
        s.relic++;
      } else if (verb === "equip-item" || verb === "salvage") {
        const i = s.inventory.findIndex((item2) => item2.id === a);
        if (i < 0) fail("\u88C5\u5907\u4E0D\u5B58\u5728");
        const item = s.inventory[i];
        if (verb === "salvage") {
          s.shards += item.rank;
          s.inventory.splice(i, 1);
        } else {
          const previous = s.gear[item.slot];
          s.gear[item.slot] = item.rank;
          item.rank = previous;
        }
      } else if (verb === "shop") {
        const item = { ticket: { cost: 120, limit: 2 }, shards: { cost: 90, limit: 5 } }[a];
        if (!item) fail("\u672A\u77E5\u5546\u54C1");
        const day = dateKey();
        const bought = one("SELECT count FROM purchases WHERE user_id=? AND day=? AND item=?", id, day, a)?.count || 0;
        if (bought >= item.limit || s.gold < item.cost) fail("\u91D1\u5E01\u4E0D\u8DB3\u6216\u4ECA\u65E5\u5151\u6362\u6B21\u6570\u5DF2\u7528\u5B8C");
        s.gold -= item.cost;
        if (a === "ticket") s.tickets++;
        else s.shards += 3;
        q("INSERT INTO purchases VALUES(?,?,?,1) ON CONFLICT(user_id,day,item) DO UPDATE SET count=count+1", id, day, a);
      } else fail("\u672A\u77E5\u64CD\u4F5C");
      persist(id, r);
      return { ...getState(id), result };
    });
  }
  __name(gameAction, "gameAction");
  function pair(a, b) {
    if (a === b) fail("\u4E0D\u80FD\u6DFB\u52A0\u81EA\u5DF1");
    return [a, b].sort();
  }
  __name(pair, "pair");
  function areFriends(a, b) {
    const [x, y] = pair(a, b);
    return one("SELECT a FROM friends WHERE a=? AND b=? AND status='accepted'", x, y);
  }
  __name(areFriends, "areFriends");
  function social(id) {
    const friends = all("SELECT * FROM friends WHERE a=? OR b=?", id, id).map((f) => ({ ...publicUser(f.a === id ? f.b : f.a), status: f.status, incoming: f.requester !== id }));
    const membership = one("SELECT g.*,m.contribution,m.hits,m.hit_day FROM guild_members m JOIN guilds g ON g.id=m.guild_id WHERE m.user_id=?", id);
    if (membership && membership.day !== dateKey()) {
      q("UPDATE guilds SET day=?,hp=max_hp WHERE id=?", dateKey(), membership.id);
      membership.day = dateKey();
      membership.hp = membership.max_hp;
    }
    const guild = membership ? { ...membership, members: all("SELECT user_id,contribution FROM guild_members WHERE guild_id=?", membership.id).map((m) => ({ ...publicUser(m.user_id), contribution: m.contribution })), remaining: membership.hit_day === dateKey() ? Math.max(0, 3 - membership.hits) : 3 } : null;
    const rating = one("SELECT score,wins,losses FROM ratings WHERE user_id=? AND season=?", id, weekKey()) || { score: 1e3, wins: 0, losses: 0 };
    const leaderboard = all("SELECT user_id,score,wins FROM ratings WHERE season=? ORDER BY score DESC,wins DESC LIMIT 20", weekKey()).map((r) => ({ ...publicUser(r.user_id), score: r.score, wins: r.wins }));
    return { friends, guild, guilds: all("SELECT g.id,g.name,COUNT(m.user_id) members FROM guilds g LEFT JOIN guild_members m ON m.guild_id=g.id GROUP BY g.id LIMIT 30"), rating, leaderboard, season: weekKey() };
  }
  __name(social, "social");
  function friendAction(id, input) {
    if (input.action === "search") {
      const username = String(input.username || "").trim().toLowerCase();
      const u = one("SELECT id FROM users WHERE username=?", username);
      return { found: u ? publicUser(u.id) : null };
    }
    const target = String(input.target || "");
    publicUser(target);
    const [a, b] = pair(id, target);
    const existing = one("SELECT * FROM friends WHERE a=? AND b=?", a, b);
    if (input.action === "request") {
      if (existing) fail("\u5DF2\u662F\u597D\u53CB\u6216\u8BF7\u6C42\u6B63\u5728\u7B49\u5F85");
      q("INSERT INTO friends VALUES(?,?,?,?)", a, b, id, "pending");
    } else if (input.action === "accept") {
      if (!existing || existing.status !== "pending" || existing.requester === id) fail("\u6CA1\u6709\u53EF\u63A5\u53D7\u7684\u8BF7\u6C42");
      q("UPDATE friends SET status='accepted' WHERE a=? AND b=?", a, b);
    } else if (input.action === "remove") {
      q("DELETE FROM friends WHERE a=? AND b=?", a, b);
    } else fail("\u65E0\u6548\u597D\u53CB\u64CD\u4F5C");
    return social(id);
  }
  __name(friendAction, "friendAction");
  function channel(id, value) {
    const name = String(value || "world");
    if (name === "world") return name;
    if (name === "guild") {
      const m = one("SELECT guild_id FROM guild_members WHERE user_id=?", id);
      if (!m) fail("\u8BF7\u5148\u52A0\u5165\u516C\u4F1A");
      return "guild:" + m.guild_id;
    }
    if (name.startsWith("dm:")) {
      const target = name.slice(3);
      if (!areFriends(id, target)) fail("\u53EA\u80FD\u5411\u597D\u53CB\u53D1\u9001\u79C1\u4FE1");
      return "dm:" + pair(id, target).join(":");
    }
    fail("\u65E0\u6548\u9891\u9053");
  }
  __name(channel, "channel");
  function messages(id, input = {}, post = false) {
    const ch = channel(id, input.channel);
    if (post) {
      const body = String(input.body || "").trim();
      if (!body || body.length > 200) fail("\u6D88\u606F\u9700\u4E3A 1\u2013200 \u5B57");
      const last = one("SELECT created FROM messages WHERE user_id=? ORDER BY id DESC LIMIT 1", id);
      if (last && Date.now() - last.created < 700) fail("\u53D1\u9001\u8FC7\u5FEB", 429);
      q("INSERT INTO messages(user_id,channel,body,created) VALUES(?,?,?,?)", id, ch, body, Date.now());
    }
    return { messages: all("SELECT id,user_id,body,created FROM messages WHERE channel=? ORDER BY id DESC LIMIT 40", ch).reverse().map((m) => ({ ...m, name: publicUser(m.user_id).name })) };
  }
  __name(messages, "messages");
  function guildAction(id, input) {
    return transact(() => {
      const m = one("SELECT * FROM guild_members WHERE user_id=?", id);
      const action = input.action;
      if (action === "create") {
        if (m) fail("\u5DF2\u52A0\u5165\u516C\u4F1A");
        const name = String(input.name || "").trim();
        if (name.length < 2 || name.length > 16) fail("\u516C\u4F1A\u540D\u9700\u4E3A 2\u201316 \u5B57");
        if (one("SELECT id FROM guilds WHERE name=?", name)) fail("\u516C\u4F1A\u540D\u5DF2\u4F7F\u7528");
        const r = record(id);
        if (r.state.gold < 150) fail("\u521B\u5EFA\u516C\u4F1A\u9700\u8981 150 \u91D1\u5E01");
        r.state.gold -= 150;
        persist(id, r);
        const gid = randomUUID();
        q("INSERT INTO guilds(id,owner,name,day) VALUES(?,?,?,?)", gid, id, name, dateKey());
        q("INSERT INTO guild_members(user_id,guild_id) VALUES(?,?)", id, gid);
      } else if (action === "join") {
        if (m) fail("\u5DF2\u52A0\u5165\u516C\u4F1A");
        const g = one("SELECT id FROM guilds WHERE id=?", String(input.guild || ""));
        if (!g) fail("\u516C\u4F1A\u4E0D\u5B58\u5728");
        if (one("SELECT COUNT(*) n FROM guild_members WHERE guild_id=?", g.id).n >= 30) fail("\u516C\u4F1A\u5DF2\u6EE1");
        q("INSERT INTO guild_members(user_id,guild_id) VALUES(?,?)", id, g.id);
      } else if (action === "leave") {
        if (!m) fail("\u672A\u52A0\u5165\u516C\u4F1A");
        q("DELETE FROM guild_members WHERE user_id=?", id);
        const next = one("SELECT user_id FROM guild_members WHERE guild_id=?", m.guild_id);
        if (next) q("UPDATE guilds SET owner=? WHERE id=? AND owner=?", next.user_id, m.guild_id, id);
        else q("DELETE FROM guilds WHERE id=?", m.guild_id);
      } else if (action === "boss") {
        if (!m) fail("\u672A\u52A0\u5165\u516C\u4F1A");
        const day = dateKey(), g = one("SELECT * FROM guilds WHERE id=?", m.guild_id);
        if (g.day !== day) {
          g.hp = g.max_hp;
          q("UPDATE guilds SET hp=max_hp,day=? WHERE id=?", day, g.id);
        }
        const hits = m.hit_day === day ? m.hits : 0;
        if (hits >= 3) fail("\u4ECA\u65E5\u4E09\u6B21\u6311\u6218\u5DF2\u5B8C\u6210");
        if (g.hp <= 0) fail("\u5DE8\u50CF\u5DF2\u88AB\u51FB\u8D25\uFF0C\u660E\u65E5\u518D\u6765");
        const r = record(id);
        if (r.battle && !r.battle.done) fail("\u8BF7\u5148\u7ED3\u675F\u5F53\u524D\u6218\u6597");
        const damage = stats(r.state).atk * 8 + stats(r.state).def * 4;
        const actual = Math.min(g.hp, damage);
        q("UPDATE guilds SET hp=MAX(0,hp-?) WHERE id=?", damage, g.id);
        q("UPDATE guild_members SET contribution=contribution+?,hit_day=?,hits=? WHERE user_id=?", actual, day, hits + 1, id);
        r.state.gold += 80;
        r.state.shards += 2;
        persist(id, r);
      } else fail("\u65E0\u6548\u516C\u4F1A\u64CD\u4F5C");
      return { ...social(id), ...getState(id) };
    });
  }
  __name(guildAction, "guildAction");
  function pvpView(m, id) {
    return { id: m.id, status: m.status, turn: m.turn, winner: m.winner, self: id, players: m.players.map((p) => ({ id: p.id, name: p.state.name, hp: p.battle?.hero ?? stats(p.state).hp, max: stats(p.state).hp, skills: p.state.equipped })), log: m.log.slice(-12) };
  }
  __name(pvpView, "pvpView");
  const duelTimers = /* @__PURE__ */ new Map();
  function saveMatch(m) {
    q("INSERT INTO matches VALUES(?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,updated=excluded.updated", m.id, m.players[0].id, m.players[1].id, JSON.stringify(m), Date.now());
  }
  __name(saveMatch, "saveMatch");
  function activeMatch(id) {
    const rows = all("SELECT data FROM matches WHERE (a=? OR b=?) AND updated>? ORDER BY updated DESC LIMIT 8", id, id, Date.now() - 30 * 6e4);
    return rows.map((r) => JSON.parse(r.data)).find((m) => ["pending", "fighting"].includes(m.status)) || null;
  }
  __name(activeMatch, "activeMatch");
  function getMatch(id, mid) {
    const row = one("SELECT data,updated FROM matches WHERE id=?", mid);
    if (!row) fail("\u5BF9\u6218\u4E0D\u5B58\u5728", 404);
    const m = JSON.parse(row.data);
    if (!m.players.some((p) => p.id === id)) fail("\u4F60\u4E0D\u5728\u8BE5\u5BF9\u6218", 403);
    if (["pending", "fighting"].includes(m.status) && Date.now() - row.updated > 30 * 6e4) fail("\u5BF9\u6218\u5DF2\u8FC7\u671F");
    return m;
  }
  __name(getMatch, "getMatch");
  function settleDuel(m) {
    transact(() => {
      for (const p of m.players) {
        q("INSERT OR IGNORE INTO ratings(user_id,season) VALUES(?,?)", p.id, m.season);
        const won = m.winner === p.id;
        q("UPDATE ratings SET score=MAX(100,score+?),wins=wins+?,losses=losses+? WHERE user_id=? AND season=?", won ? 25 : -15, won ? 1 : 0, won ? 0 : 1, p.id, m.season);
        const r = record(p.id);
        r.state.gold += won ? 80 : 25;
        persist(p.id, r);
      }
      m.status = "finished";
      saveMatch(m);
    });
  }
  __name(settleDuel, "settleDuel");
  function duelTick(mid) {
    const row = one("SELECT data FROM matches WHERE id=?", mid);
    if (!row) return;
    const m = JSON.parse(row.data);
    if (m.status !== "fighting") return;
    m.turn++;
    const [first, second] = m.turn % 2 ? m.players : [...m.players].reverse();
    for (const p of [first, second]) {
      const foe = m.players.find((x) => x !== p), b = p.battle;
      const before = foe.battle.hero;
      b.enemy = before;
      b.done = false;
      b.enemyAtk = 0;
      const logs = battleTurn(p.state, b, p.pending, { enemyAction: false });
      p.pending = null;
      const raw = Math.max(0, before - b.enemy), resisted = Math.min(raw, foe.battle.st.def), reduced = Math.round((raw - resisted) * (foe.state.passives.includes("resolve") && before / foe.battle.max < 0.35 ? 0.8 : 1)), absorbed = Math.min(reduced, foe.battle.shield), damage = reduced - absorbed;
      foe.battle.shield -= absorbed;
      foe.battle.hero = Math.max(0, before - damage);
      b.done = false;
      m.log.push(...logs.map((l) => p.state.name + " \xB7 " + l));
      if (absorbed || resisted) m.log.push(foe.state.name + " \xB7 \u9632\u5FA1\u62B5\u6321 " + resisted + "\uFF0C\u62A4\u76FE\u5438\u6536 " + absorbed);
      if (foe.state.passives.includes("thorns") && damage) {
        const reflected = Math.round(damage * 0.15);
        b.hero = Math.max(0, b.hero - reflected);
        m.log.push(foe.state.name + " \xB7 \u8346\u68D8\u53CD\u51FB " + reflected);
      }
      if (foe.battle.hero <= 0 || b.hero <= 0) {
        m.winner = b.hero <= 0 ? foe.id : p.id;
        break;
      }
    }
    if (!m.winner && m.turn >= 40) {
      const sorted = [...m.players].sort((a, b) => b.battle.hero / b.battle.max - a.battle.hero / a.battle.max);
      m.winner = sorted[0].id;
    }
    if (m.winner) {
      clearInterval(duelTimers.get(mid));
      duelTimers.delete(mid);
      m.log.push("\u5BF9\u6218\u7ED3\u675F\uFF0C\u79EF\u5206\u5DF2\u7ED3\u7B97\u3002");
      settleDuel(m);
    } else saveMatch(m);
  }
  __name(duelTick, "duelTick");
  function runDuel(m) {
    if (duelTimers.has(m.id)) return;
    const timer = setInterval(() => duelTick(m.id), 900);
    timer.unref();
    duelTimers.set(m.id, timer);
  }
  __name(runDuel, "runDuel");
  function pvpAction(id, input) {
    let m;
    if (input.action === "invite") {
      const target = String(input.target || "");
      if (!areFriends(id, target)) fail("\u8BF7\u5148\u6DFB\u52A0\u4E3A\u597D\u53CB");
      if (activeMatch(id) || activeMatch(target)) fail("\u5176\u4E2D\u4E00\u4F4D\u65C5\u4EBA\u5DF2\u6709\u5F85\u5904\u7406\u5BF9\u6218");
      const a = record(id), b = record(target);
      if (a.battle && !a.battle.done || b.battle && !b.battle.done) fail("\u8BF7\u5148\u7ED3\u675F\u5355\u4EBA\u6218\u6597");
      m = { id: randomUUID(), status: "pending", turn: 0, season: weekKey(), winner: null, log: [], players: [{ id, state: a.state, pending: null }, { id: target, state: b.state, pending: null }] };
      saveMatch(m);
    } else {
      m = getMatch(id, String(input.id || ""));
      if (input.action === "accept") {
        if (m.players[1].id !== id || m.status !== "pending") fail("\u4E0D\u80FD\u63A5\u53D7\u6B64\u9080\u8BF7");
        for (const p of m.players) {
          const r = record(p.id);
          if (r.battle && !r.battle.done) fail("\u8BF7\u5148\u7ED3\u675F\u5355\u4EBA\u6218\u6597");
          p.state = r.state;
        }
        for (const p of m.players) {
          const foe = m.players.find((x) => x !== p);
          p.battle = createBattle(p.state, { id: "pvp", name: foe.state.name, hp: stats(foe.state).hp, atk: 0 });
        }
        m.status = "fighting";
        m.log = ["\u53CC\u65B9\u771F\u5B9E\u89D2\u8272\u9635\u5BB9\u5DF2\u9501\u5B9A\uFF0C\u670D\u52A1\u5668\u5F00\u59CB\u8BA1\u7B97\u5BF9\u6218\u3002"];
        saveMatch(m);
        runDuel(m);
      } else if (input.action === "decline") {
        if (m.status !== "pending") fail("\u5BF9\u6218\u5DF2\u5F00\u59CB");
        m.status = "cancelled";
        saveMatch(m);
      } else if (input.action === "skill") {
        if (m.status !== "fighting") fail("\u5F53\u524D\u4E0D\u5728\u5BF9\u6218");
        const p = m.players.find((p2) => p2.id === id);
        if (!p.state.equipped.includes(input.skill)) fail("\u6280\u80FD\u672A\u88C5\u5907");
        p.pending = input.skill;
        saveMatch(m);
      } else fail("\u672A\u77E5\u7ADE\u6280\u64CD\u4F5C");
    }
    return { match: pvpView(m, id) };
  }
  __name(pvpAction, "pvpAction");
  function pvpState(id) {
    const m = activeMatch(id);
    const recent = all("SELECT data FROM matches WHERE (a=? OR b=?) ORDER BY updated DESC LIMIT 5", id, id).map((r) => JSON.parse(r.data));
    return { match: m ? pvpView(m, id) : recent[0] ? pvpView(recent[0], id) : null };
  }
  __name(pvpState, "pvpState");
  for (const row of all("SELECT data,updated FROM matches")) {
    const m = JSON.parse(row.data);
    if (["pending", "fighting"].includes(m.status) && Date.now() - row.updated >= 30 * 6e4) {
      m.status = "cancelled";
      saveMatch(m);
    } else if (m.status === "fighting") runDuel(m);
  }
  function seasonClaim(id) {
    return transact(() => {
      const previous = all("SELECT * FROM ratings WHERE user_id=? AND season<? AND claimed=0", id, weekKey());
      if (!previous.length) fail("\u6CA1\u6709\u53EF\u9886\u53D6\u7684\u5F80\u671F\u8D5B\u5B63\u5956\u52B1");
      const r = record(id);
      for (const p of previous) {
        r.state.gems += Math.min(300, 50 + p.wins * 10);
        r.state.tickets += 1;
        q("UPDATE ratings SET claimed=1 WHERE user_id=? AND season=?", id, p.season);
      }
      persist(id, r);
      return getState(id);
    });
  }
  __name(seasonClaim, "seasonClaim");
  function recentDraws(id) {
    const s = record(id).state;
    return { draws: s.draws, pity: s.pity, history: all("SELECT pet,rarity,duplicate,created FROM draw_log WHERE user_id=? ORDER BY id DESC LIMIT 50", id) };
  }
  __name(recentDraws, "recentDraws");
  function coopReward(id, code) {
    return transact(() => {
      if (one("SELECT code FROM coop_rewards WHERE user_id=? AND code=?", id, code)) return false;
      const day = dateKey();
      if (one("SELECT COUNT(*) n FROM coop_rewards WHERE user_id=? AND day=?", id, day).n >= 3) return false;
      const r = record(id);
      daily(r.state);
      r.state.gold += 100;
      r.state.shards += 3;
      addXP(r.state, 60);
      r.state.daily.battles++;
      persist(id, r);
      q("INSERT INTO coop_rewards VALUES(?,?,?)", id, code, day);
      return true;
    });
  }
  __name(coopReward, "coopReward");
  const rate = /* @__PURE__ */ new Map();
  async function api(req, res, url) {
    const send = /* @__PURE__ */ __name((status, data, extra = {}) => {
      res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extra });
      res.end(JSON.stringify(data));
    }, "send");
    try {
      const addr = req.socket.remoteAddress || "unknown", isAuth = url.pathname.startsWith("/api/auth/"), key = addr + ":" + (isAuth ? "auth" : req.method === "GET" ? "read" : "write");
      const now = Date.now(), limit = isAuth ? 30 : req.method === "GET" ? 1200 : 300;
      let bucket = rate.get(key);
      if (!bucket || now - bucket.start > 6e4) {
        bucket = { start: now, count: 0 };
        rate.set(key, bucket);
      }
      if (++bucket.count > limit) fail("\u8BF7\u6C42\u8FC7\u591A\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5", 429);
      const origin = req.headers.origin;
      if (req.method !== "GET" && origin && origin !== `http://${req.headers.host}` && origin !== `https://${req.headers.host}`) fail("\u8DE8\u7AD9\u8BF7\u6C42\u88AB\u62D2\u7EDD", 403);
      const mutating = req.method === "POST";
      if (!["GET", "POST"].includes(req.method)) fail("\u4E0D\u652F\u6301\u7684\u65B9\u6CD5", 405);
      if (mutating && !String(req.headers["content-type"] || "").startsWith("application/json")) fail("\u9700\u8981 JSON \u8BF7\u6C42", 415);
      let input = {};
      if (mutating) {
        let raw = "";
        for await (const chunk of req) {
          raw += chunk;
          if (Buffer.byteLength(raw) > 8192) fail("\u8BF7\u6C42\u8FC7\u5927", 413);
        }
        try {
          input = JSON.parse(raw || "{}");
        } catch {
          fail("\u8BF7\u6C42\u683C\u5F0F\u9519\u8BEF");
        }
        if (!input || Array.isArray(input) || typeof input !== "object") fail("\u8BF7\u6C42\u683C\u5F0F\u9519\u8BEF");
      }
      const pathname = url.pathname;
      const token = (req.headers.cookie || "").split(";").map((s) => s.trim()).find((s) => s.startsWith("mistvale_session="))?.slice(17) || "";
      if (pathname === "/api/health") return send(200, { ok: true, version: "0.3.0", storage: "sqlite" });
      if (["/api/auth/register", "/api/auth/login"].includes(pathname) && mutating) {
        const result = await (pathname.endsWith("register") ? register(input) : login(input));
        const secure = true ? "; Secure" : "";
        const { token: authToken, ...data } = result;
        return send(200, data, { "Set-Cookie": `mistvale_session=${authToken}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2592000${secure}` });
      }
      const id = session(token);
      if (!id) fail("\u8BF7\u5148\u767B\u5F55", 401);
      if (pathname === "/api/auth/logout" && mutating) {
        q("DELETE FROM sessions WHERE hash=?", digest(token));
        return send(200, { ok: true }, { "Set-Cookie": "mistvale_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0" });
      }
      if (pathname === "/api/me" && req.method === "GET") return send(200, getState(id));
      if (pathname === "/api/game/action" && mutating) return send(200, gameAction(id, input));
      if (pathname === "/api/snapshot" && req.method === "GET") return send(200, { social: social(id), messages: messages(id, { channel: url.searchParams.get("channel") || "world" }, false).messages, match: pvpState(id).match, history: recentDraws(id).history });
      if (pathname === "/api/social" && req.method === "GET") return send(200, social(id));
      if (pathname === "/api/friends" && mutating) return send(200, friendAction(id, input));
      if (pathname === "/api/chat") return send(200, messages(id, mutating ? input : { channel: url.searchParams.get("channel") || "world" }, mutating));
      if (pathname === "/api/guild" && mutating) return send(200, guildAction(id, input));
      if (pathname === "/api/pvp") return send(200, mutating ? pvpAction(id, input) : pvpState(id));
      if (pathname === "/api/season/claim" && mutating) return send(200, seasonClaim(id));
      if (pathname === "/api/draws" && req.method === "GET") return send(200, recentDraws(id));
      fail("\u63A5\u53E3\u4E0D\u5B58\u5728", 404);
    } catch (e) {
      if (!e.status) console.error("API operation failed:", e.code || e.name);
      send(e.status || 500, { error: e.status ? e.message : "\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5" });
    }
  }
  __name(api, "api");
  return { db, api, register, login, session, getState, gameAction, social, friendAction, messages, guildAction, pvpAction, pvpState, publicUser, seasonClaim, coopReward, dateKey, weekKey, saveRoom: /* @__PURE__ */ __name((r) => q("INSERT INTO room_saves VALUES(?,?,?) ON CONFLICT(code) DO UPDATE SET data=excluded.data,updated=excluded.updated", r.code, JSON.stringify(r), Date.now()), "saveRoom"), loadRooms: /* @__PURE__ */ __name(() => all("SELECT data FROM room_saves WHERE updated>?", Date.now() - 30 * 6e4).map((r) => JSON.parse(r.data)), "loadRooms"), deleteRoom: /* @__PURE__ */ __name((code) => q("DELETE FROM room_saves WHERE code=?", code), "deleteRoom"), close: /* @__PURE__ */ __name(() => {
    for (const timer of duelTimers.values()) clearInterval(timer);
    db.close();
  }, "close") };
}
__name(createService, "createService");

// cloudflare/generated/rooms.mjs
import { randomBytes as randomBytes2 } from "node:crypto";
function createRooms(scheduler) {
  const setInterval = scheduler.setInterval.bind(scheduler), clearInterval = scheduler.clearInterval.bind(scheduler);
  const rooms = /* @__PURE__ */ new Map();
  let store = null;
  function persistRoom(r) {
    if (store) store.saveRoom({ ...r, timer: void 0 });
  }
  __name(persistRoom, "persistRoom");
  function configureRooms(service) {
    store = service;
    for (const saved of service.loadRooms()) {
      rooms.set(saved.code, saved);
      if (saved.status === "fighting") {
        saved.timer = setInterval(() => advance(saved), 1e3);
        saved.timer.unref();
      }
    }
  }
  __name(configureRooms, "configureRooms");
  const fail2 = /* @__PURE__ */ __name((message, status = 400) => {
    const e = new Error(message);
    e.status = status;
    throw e;
  }, "fail");
  const token = /* @__PURE__ */ __name(() => randomBytes2(18).toString("hex"), "token");
  function member(input = {}) {
    const s = freshState();
    s.level = 3;
    s.gear = { weapon: 2, armor: 2, charm: 2 };
    s.name = String(input.name || "\u65C5\u4EBA").slice(0, 16);
    switchClass(s, ["mage", "fighter", "sage"].includes(input.class) ? input.class : "knight");
    return { id: randomBytes2(6).toString("hex"), token: token(), account: input._account || null, name: s.name, class: s.class, ready: false, state: s, battle: null, pending: null };
  }
  __name(member, "member");
  function view(r, self) {
    return { self, code: r.code, status: r.status, turn: r.turn, host: r.host, enemy: r.enemy, log: r.log.slice(-10), won: r.won, players: r.players.map((p) => ({ id: p.id, name: p.name, class: p.class, ready: p.ready, hp: p.battle?.hero ?? null, max: p.battle?.max ?? null, skills: p.state.equipped })) };
  }
  __name(view, "view");
  function find(code) {
    const r = rooms.get(String(code).toUpperCase());
    if (!r) fail2("\u623F\u95F4\u4E0D\u5B58\u5728\u6216\u5DF2\u8FC7\u671F", 404);
    r.updated = Date.now();
    return r;
  }
  __name(find, "find");
  function auth(r, id) {
    const p = r.players.find((p2) => p2.token === id);
    if (!p) fail2("\u4F60\u4E0D\u5728\u6B64\u623F\u95F4", 403);
    return p;
  }
  __name(auth, "auth");
  function createRoom(input) {
    if (rooms.size >= 100) fail2("\u623F\u95F4\u5DF2\u6EE1\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5", 503);
    let code;
    do {
      code = randomBytes2(3).toString("hex").toUpperCase();
    } while (rooms.has(code));
    const p = member(input), r = { code, host: p.id, players: [p], status: "waiting", turn: 0, log: [], enemy: null, updated: Date.now(), won: false };
    rooms.set(code, r);
    persistRoom(r);
    return { ...view(r, p.id), token: p.token };
  }
  __name(createRoom, "createRoom");
  function getRoom(code, id) {
    const r = find(code);
    const p = auth(r, id);
    return view(r, p.id);
  }
  __name(getRoom, "getRoom");
  function roomAction(code, input) {
    const r = find(code);
    if (input.action === "join") {
      if (r.status !== "waiting") fail2("\u6218\u6597\u5DF2\u5F00\u59CB");
      if (r.players.length >= 4) fail2("\u623F\u95F4\u5DF2\u6EE1");
      const p2 = member(input);
      r.players.push(p2);
      return { ...view(r, p2.id), token: p2.token };
    }
    const p = auth(r, input.token);
    if (input.action === "leave") {
      r.players = r.players.filter((m) => m !== p);
      if (!r.players.length) {
        clearInterval(r.timer);
        rooms.delete(r.code);
        store?.deleteRoom(r.code);
        return { left: true };
      }
      if (r.host === p.id) r.host = r.players[0].id;
      persistRoom(r);
      return { left: true };
    }
    if (input.action === "ready") {
      if (r.status !== "waiting") fail2("\u6218\u6597\u5DF2\u5F00\u59CB");
      p.ready = !p.ready;
    } else if (input.action === "start") {
      if (p.id !== r.host) fail2("\u53EA\u6709\u623F\u4E3B\u53EF\u4EE5\u51FA\u53D1", 403);
      if (r.status !== "waiting") fail2("\u6218\u6597\u5DF2\u5F00\u59CB");
      if (r.players.length < 2 || !r.players.every((p2) => p2.ready)) fail2("\u9700\u8981\u81F3\u5C11\u4E24\u540D\u65C5\u4EBA\uFF0C\u5E76\u5168\u90E8\u51C6\u5907");
      r.status = "fighting";
      r.enemy = { id: "coop-boss", name: "\u53E4\u6728\u5DE8\u50CF", hp: 600 * r.players.length, max: 600 * r.players.length, atk: 37 };
      r.players.forEach((p2) => {
        p2.battle = createBattle(p2.state, r.enemy);
      });
      r.log = ["\u961F\u4F0D\u51FA\u53D1\uFF01\u6240\u6709\u65C5\u4EBA\u7EDF\u4E00 Lv.3\uFF0C\u4F7F\u7528\u670D\u52A1\u5668\u751F\u6210\u7684\u57FA\u7840\u88C5\u5907\u3002"];
      r.timer = setInterval(() => advance(r), 1e3);
      r.timer.unref();
    } else if (input.action === "skill") {
      if (r.status !== "fighting") fail2("\u5F53\u524D\u4E0D\u5728\u6218\u6597");
      if (!p.state.equipped.includes(input.skill)) fail2("\u65E0\u6548\u6280\u80FD");
      if (p.battle.hero <= 0) fail2("\u89D2\u8272\u5DF2\u5012\u4E0B");
      p.pending = input.skill;
    } else if (!["ready", "leave"].includes(input.action)) fail2("\u65E0\u6548\u64CD\u4F5C");
    persistRoom(r);
    return view(r, p.id);
  }
  __name(roomAction, "roomAction");
  function advance(r) {
    r.turn++;
    for (const p of r.players) {
      if (p.battle.hero <= 0) continue;
      const b = p.battle;
      b.enemy = r.enemy.hp;
      b.done = false;
      const log = battleTurn(p.state, b, p.pending);
      p.pending = null;
      r.enemy.hp = b.enemy;
      r.log.push(...log.map((l) => p.name + " \xB7 " + l));
      if (r.enemy.hp <= 0) break;
    }
    if (r.enemy.hp <= 0 || r.players.every((p) => p.battle.hero <= 0) || r.turn >= 60) {
      r.status = "finished";
      r.won = r.enemy.hp <= 0;
      clearInterval(r.timer);
      r.log.push(r.won ? "\u53E4\u6728\u5DE8\u50CF\u5012\u4E0B\uFF0C\u961F\u4F0D\u80DC\u5229\uFF01" : "\u672C\u6B21\u8FDC\u5F81\u7ED3\u675F\uFF0C\u53EF\u4EE5\u91CD\u65B0\u521B\u5EFA\u623F\u95F4\u8C03\u6574\u804C\u4E1A\u642D\u914D\u3002");
      if (r.won && store) {
        for (const p of r.players) if (p.account && store.coopReward(p.account, r.code)) r.log.push(p.name + " \xB7 \u83B7\u5F97 100 \u91D1\u5E01\u300160 \u7ECF\u9A8C\u4E0E 3 \u9057\u7269\u788E\u7247\uFF08\u6BCF\u65E5\u524D\u4E09\u6B21\u80DC\u5229\uFF09");
      }
    }
    r.log = r.log.slice(-100);
    r.updated = Date.now();
    persistRoom(r);
  }
  __name(advance, "advance");
  function cleanup() {
    for (const [code, r] of rooms) if (Date.now() - r.updated > 30 * 6e4) {
      clearInterval(r.timer);
      rooms.delete(code);
      store?.deleteRoom(code);
    }
  }
  __name(cleanup, "cleanup");
  async function roomAPI(req, res, url) {
    const reply = /* @__PURE__ */ __name((status, data) => {
      res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      res.end(JSON.stringify(data));
    }, "reply");
    try {
      cleanup();
      if (req.method === "GET") {
        const code = url.pathname.split("/")[3];
        return reply(200, getRoom(code, url.searchParams.get("token")));
      }
      if (req.method !== "POST") return reply(405, { error: "\u4E0D\u652F\u6301\u7684\u65B9\u6CD5" });
      if (req.headers.origin && req.headers.origin !== `http://${req.headers.host}` && req.headers.origin !== `https://${req.headers.host}`) return reply(403, { error: "\u8DE8\u7AD9\u8BF7\u6C42\u88AB\u62D2\u7EDD" });
      let body = "";
      for await (const chunk of req) {
        body += chunk;
        if (body.length > 4096) fail2("\u8BF7\u6C42\u8FC7\u5927", 413);
      }
      const input = JSON.parse(body || "{}");
      if (!input || Array.isArray(input) || typeof input !== "object") fail2("\u8BF7\u6C42\u683C\u5F0F\u9519\u8BEF");
      delete input._account;
      if (store) {
        const token2 = (req.headers.cookie || "").split(";").map((s) => s.trim()).find((s) => s.startsWith("mistvale_session="))?.slice(17) || "";
        const id = store.session(token2);
        if (id) {
          input._account = id;
          const u = store.publicUser(id);
          input.name = u.name;
          input.class = u.class;
        }
      }
      return reply(200, url.pathname === "/api/rooms" ? createRoom(input) : roomAction(url.pathname.split("/")[3], input));
    } catch (e) {
      reply(e.status || 400, { error: e.status ? e.message : "\u8BF7\u6C42\u683C\u5F0F\u9519\u8BEF" });
    }
  }
  __name(roomAPI, "roomAPI");
  return { configureRooms, roomAPI };
}
__name(createRooms, "createRooms");

// cloudflare/worker.mjs
var Scheduler = class {
  static {
    __name(this, "Scheduler");
  }
  constructor(storage) {
    this.storage = storage;
    this.jobs = /* @__PURE__ */ new Map();
    this.next = 0;
  }
  setInterval(fn, ms) {
    const id = ++this.next;
    this.jobs.set(id, { fn, ms, due: Date.now() + ms });
    return { id, unref() {
    } };
  }
  clearInterval(timer) {
    this.jobs.delete(timer?.id);
  }
  async arm() {
    if (this.jobs.size) await this.storage.setAlarm(Math.min(...[...this.jobs.values()].map((j) => j.due)));
    else await this.storage.deleteAlarm();
  }
  async tick() {
    const now = Date.now();
    for (const [id, j] of [...this.jobs]) if (j.due <= now) {
      j.fn();
      if (this.jobs.has(id)) j.due = now + j.ms;
    }
    await this.arm();
  }
};
function database(storage) {
  const sql = storage.sql;
  return {
    exec(statement) {
      sql.exec(statement);
    },
    prepare(statement) {
      return { run(...args) {
        sql.exec(statement, ...args);
        return {};
      }, get(...args) {
        return [...sql.exec(statement, ...args)][0];
      }, all(...args) {
        return [...sql.exec(statement, ...args)];
      } };
    },
    transactionSync(fn) {
      return storage.transactionSync(fn);
    },
    close() {
    }
  };
}
__name(database, "database");
var GameWorld = class {
  static {
    __name(this, "GameWorld");
  }
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.scheduler = new Scheduler(ctx.storage);
    this.ready = ctx.blockConcurrencyWhile(async () => {
      this.service = createService(database(ctx.storage), this.scheduler);
      this.worldApi = createWorldApi(database(ctx.storage),this.service);
      this.rooms = createRooms(this.scheduler);
      this.rooms.configureRooms(this.service);
      await this.scheduler.arm();
    });
  }
  async alarm() {
    await this.ready;
    await this.scheduler.tick();
  }
  async fetch(request) {
    await this.ready;
    return this.ctx.blockConcurrencyWhile(async () => {
      const url = new URL(request.url);
      const length = Number(request.headers.get("content-length") || 0);
      if (length > 8192) return Response.json({ error: "\u8BF7\u6C42\u8FC7\u5927" }, { status: 413 });
      const body = request.method === "POST" ? await request.text() : "";
      if (new TextEncoder().encode(body).length > 8192) return Response.json({ error: "\u8BF7\u6C42\u8FC7\u5927" }, { status: 413 });
      const headers = Object.fromEntries(request.headers);
      headers.host = url.host;
      const req = { method: request.method, headers, socket: { remoteAddress: request.headers.get("cf-connecting-ip") || "local" }, async *[Symbol.asyncIterator]() {
        yield body;
      } };
      let status = 200, responseHeaders = {}, data = "";
      const res = { writeHead(s, h) {
        status = s;
        responseHeaders = h;
      }, end(value) {
        data = value;
      } };
      if(url.pathname === "/api/world"){let parsed={};try{parsed=JSON.parse(body||"{}");}catch{return Response.json({error:"请求格式错误"},{status:400});}if(request.method!=="GET"&&headers.origin&&headers.origin!==url.origin)return Response.json({error:"跨站请求被拒绝"},{status:403});const result=this.worldApi(req,parsed,url);return Response.json(result.data,{status:result.status,headers:{"Cache-Control":"no-store"}});}
      if(url.pathname === "/api/game/action"&&request.method==="POST"){let input;try{input=JSON.parse(body);}catch{}if(input?.action==="visit"){const token=(headers.cookie||"").split(";").map(v=>v.trim()).find(v=>v.startsWith("mistvale_session="))?.slice(17);const id=this.service.session(token);if(id&&!this.worldApi.canVisit(id))return Response.json({error:"先走近这个地点再交互"},{status:400});}}
      if (url.pathname === "/api/rooms" || url.pathname.startsWith("/api/rooms/")) await this.rooms.roomAPI(req, res, url);
      else await this.service.api(req, res, url);
      await this.scheduler.arm();
      return new Response(data, { status, headers: responseHeaders });
    });
  }
};
var worker_default = { async fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) return env.GAME.get(env.GAME.idFromName("friends-world-v1")).fetch(request);
  return env.ASSETS.fetch(request);
} };
export {
  GameWorld,
  worker_default as default
};
//# sourceMappingURL=worker.js.map
