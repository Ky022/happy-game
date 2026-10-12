export const SAVE_KEY = 'mistvale-save-v1';
export const classes = {knight:{name:'逐风骑士',icon:'shield',level:1},mage:{name:'星火术士',icon:'spark',level:1},fighter:{name:'赤焰斗士',icon:'sword',level:3},sage:{name:'月露贤者',icon:'leaf',level:3}};
export const skills = [
 {id:'slash',name:'疾风斩',type:'主动',icon:'sword',desc:'造成 145% 攻击伤害。',mult:1.45,classes:['knight']},
 {id:'guard',name:'森林庇护',type:'主动',icon:'shield',desc:'获得最大生命 22% 的护盾。',shield:.22,classes:['knight','mage']},
 {id:'flame',name:'焰火流星',type:'主动',icon:'flame',desc:'造成 160% 攻击伤害，并燃烧 2 回合。',mult:1.6,burn:2,classes:['mage']},
 {id:'heal',name:'晨露治愈',type:'主动',icon:'leaf',desc:'回复最大生命的 24%。',heal:.24,classes:['knight','mage']},
 {id:'ice',name:'霜月术',type:'主动',icon:'snow',desc:'造成 115% 攻击伤害，使敌人下次攻击减半。',mult:1.15,slow:true,classes:['mage']},
 {id:'strike',name:'破晓重击',type:'主动',icon:'sun',desc:'造成 185% 攻击伤害。',mult:1.85,classes:['knight']},
 {id:'vital',name:'坚韧之心',type:'被动',icon:'heart',desc:'最大生命增加 15%。',classes:['knight','mage']},
 {id:'fury',name:'战意',type:'被动',icon:'spark',desc:'攻击增加 12%。',classes:['knight','mage']},
 {id:'drain',name:'生命回响',type:'被动',icon:'drop',desc:'攻击后回复所造成伤害的 10%。',classes:['knight','mage']},
 {id:'bond',name:'幻兽共鸣',type:'被动',icon:'paw',desc:'幻兽攻击与治疗效果增加 35%。',classes:['knight','mage']},
];
skills.find(k=>k.id==='slash').classes.push('fighter');
skills.find(k=>k.id==='strike').classes.push('fighter');
for(const id of ['guard','heal','vital','fury','drain','bond'])skills.find(k=>k.id===id).classes.push('fighter','sage');
skills.find(k=>k.id==='ice').classes.push('sage');
skills.push(
 {id:'whirl',name:'旋风突袭',type:'主动',icon:'sword',desc:'造成 155% 攻击伤害，并获得少量护盾。',mult:1.55,shield:.08,classes:['fighter','knight']},
 {id:'blood',name:'炽血之刃',type:'主动',icon:'flame',desc:'造成 175% 攻击伤害，并回复少量生命。',mult:1.75,heal:.07,classes:['fighter']},
 {id:'moonbeam',name:'月华光束',type:'主动',icon:'moon',desc:'造成 140% 攻击伤害，回复 10% 生命。',mult:1.4,heal:.1,classes:['sage']},
 {id:'renew',name:'繁花新生',type:'主动',icon:'leaf',desc:'回复 20% 生命，获得 10% 生命护盾。',heal:.2,shield:.1,classes:['sage']},
 {id:'meteor',name:'星陨',type:'主动',icon:'star',desc:'造成 200% 攻击伤害。',mult:2,classes:['mage']},
 {id:'thorns',name:'荆棘护体',type:'被动',icon:'leaf',desc:'受击后反弹所受伤害的 15%。',classes:Object.keys(classes)},
 {id:'resolve',name:'绝境意志',type:'被动',icon:'shield',desc:'生命低于 35% 时受到伤害减少 20%。',classes:Object.keys(classes)},
 {id:'focus',name:'专注',type:'被动',icon:'star',desc:'每第四回合技能攻击额外增加 25%。',classes:Object.keys(classes)}
);
export const pets = [
 {id:'fox',name:'苔光灵狐',rarity:'SR',color:'#aecfa0',icon:'leaf',desc:'每 3 回合回复你 8% 的生命。',kind:'heal'},
 {id:'dragon',name:'余烬幼龙',rarity:'SSR',color:'#e6b68b',icon:'flame',desc:'每 3 回合额外攻击，造成 55% 攻击伤害。',kind:'attack'},
 {id:'owl',name:'月羽鸮',rarity:'R',color:'#b8b4dd',icon:'moon',desc:'每 3 回合获得最大生命 7% 的护盾。',kind:'shield'},
 {id:'deer',name:'晨露鹿',rarity:'SR',color:'#e9ca86',icon:'sun',desc:'每 3 回合额外攻击，造成 40% 攻击伤害。',kind:'attack'},
];
pets.push(
 {id:'phoenix',name:'曙光火鸟',rarity:'SSR',color:'#e6b68b',icon:'sun',desc:'每 3 回合回复你 12% 的生命。',kind:'heal'},
 {id:'otter',name:'泉月水獭',rarity:'SR',color:'#aecfa0',icon:'drop',desc:'每 3 回合获得最大生命 9% 的护盾。',kind:'shield'},
 {id:'cat',name:'星砂灵猫',rarity:'SR',color:'#b8b4dd',icon:'star',desc:'每 3 回合额外攻击，造成 40% 攻击伤害。',kind:'attack'},
 {id:'mushroom',name:'小蘑菇',rarity:'R',color:'#e9ca86',icon:'leaf',desc:'每 3 回合回复你 6% 的生命。',kind:'heal'}
);
export const nodes = [
 {id:'camp',name:'旅人营地',kind:'camp',x:43,y:83,need:null,desc:'炉火还温着。领取休息收益，准备下一段旅途。'},
 {id:'chest',name:'林间宝箱',kind:'chest',x:23,y:69,need:'camp',desc:'藤蔓下面，藏着一封旧日旅人的信和补给。'},
 {id:'slime',name:'苔原史莱姆',kind:'battle',x:62,y:63,need:'camp',desc:'挡住小径的史莱姆。试试你的第一套技能。',hp:170,atk:18,xp:60,gold:65},
 {id:'spring',name:'月光泉',kind:'story',x:32,y:48,need:'slime',desc:'泉水倒映着古老符文。摸一摸石碑，发现通往遗迹的道路。'},
 {id:'wolf',name:'灰影狼',kind:'battle',x:71,y:39,need:'spring',desc:'山道上的守卫。护盾和治愈能帮助你抵挡它的攻击。',hp:300,atk:28,xp:95,gold:95},
 {id:'ruins',name:'失落石庭',kind:'chest',x:40,y:29,need:'wolf',desc:'古代骑士留下的装备，以及前往圣树的线索。'},
 {id:'boss',name:'圣树守卫',kind:'boss',x:52,y:14,need:'ruins',desc:'雾谷的最终试炼。调整技能和装备，唤醒沉睡的圣树。',hp:560,atk:38,xp:180,gold:200},
];
export const regions=[{id:1,name:'风眠之森',en:'MISTWOOD',boss:'boss',color:'forest'},{id:2,name:'月潮海岸',en:'MOONSHORE',boss:'r2-boss',color:'coast'},{id:3,name:'赤砂遗迹',en:'EMBER RUINS',boss:'r3-boss',color:'desert'},{id:4,name:'星霜高地',en:'STARFROST',boss:'r4-boss',color:'snow'}];
nodes.forEach(n=>n.region=1);
for(const r of regions.slice(1)){const i=r.id;nodes.push(
 {id:`r${i}-camp`,region:i,name:['','', '海风营地','沙丘营地','雪松营地'][i],kind:'camp',x:43,y:83,need:regions[i-2].boss,desc:'新的风景。休息片刻，再向远方出发。'},
 {id:`r${i}-chest`,region:i,name:'旅人补给',kind:'chest',x:23,y:69,need:`r${i}-camp`,desc:'发现新的补给与一枚遗物碎片。'},
 {id:`r${i}-scout`,region:i,name:['','','潮汐蟹','沙影蝎','冰原狼'][i],kind:'battle',x:62,y:63,need:`r${i}-camp`,hp:260*i,atk:22+12*i,xp:65*i,gold:70*i,desc:'通往新区域的第一场考验。'},
 {id:`r${i}-story`,region:i,name:['','','潮声石碑','旧王之碑','观星台'][i],kind:'story',x:32,y:48,need:`r${i}-scout`,desc:'解读远古碑文，发现遗迹深处的秘密。'},
 {id:`r${i}-elite`,region:i,name:['','','珊瑚守卫','赤砂骑士','霜月卫士'][i],kind:'battle',x:71,y:39,need:`r${i}-story`,hp:380*i,atk:28+14*i,xp:100*i,gold:95*i,desc:'强敌守住了山道。强化装备与技能再出发。'},
 {id:`r${i}-ruins`,region:i,name:'古代秘藏',kind:'chest',x:40,y:29,need:`r${i}-elite`,desc:'沉睡的装备与遗物，等待下一位旅人。'},
 {id:`r${i}-boss`,region:i,name:['','','潮汐巨灵','赤砂龙卫','星霜领主'][i],kind:'boss',x:52,y:14,need:`r${i}-ruins`,hp:600*i,atk:35+15*i,xp:200*i,gold:220*i,desc:'本区域的最终挑战。胜利将打开新的冒险。'}
);}
export function regionOpen(s,id){return id===1||s.completed.includes(regions[id-2]?.boss);}
export function freshState(now=Date.now()) { return {version:1,name:'旅人',class:'knight',level:1,xp:0,gold:240,gems:300,tickets:3,completed:['camp'],selected:'camp',region:1,equipped:['slash','guard','heal','strike'],passives:['vital','fury'],skillLevels:{},pet:'fox',ownedPets:{fox:1},gear:{weapon:1,armor:1,charm:1},relic:0,shards:0,inventory:[],lastClaim:now,arenaWins:0,arenaPlays:0,pity:0,draws:0,questClaims:[],daily:{date:'',battles:0,draws:0,claims:[]},tower:0,created:false}; }
export function sanitizeState(raw,now=Date.now()) {
 const base=freshState(now); if(!raw||raw.version!==1) return base;
 const s={...base};
 for(const k of ['level','xp','gold','gems','tickets','lastClaim','arenaWins','arenaPlays','pity','draws']) if(Number.isFinite(raw[k])&&raw[k]>=0) s[k]=Math.min(raw[k],k==='lastClaim'?now:10000000);
 s.level=Math.max(1,Math.floor(s.level));s.name=typeof raw.name==='string'?raw.name.slice(0,16):base.name;s.class=classes[raw.class]?raw.class:base.class;
 s.completed=[...new Set(['camp',...(Array.isArray(raw.completed)?raw.completed:[]).filter(id=>nodes.some(n=>n.id===id))])];
 s.selected=nodes.some(n=>n.id===raw.selected)?raw.selected:'camp';
 s.region=regions.some(r=>r.id===raw.region)&&regionOpen(s,raw.region)?raw.region:1;
 s.relic=Math.max(0,Math.min(20,Math.floor(Number(raw.relic)||0)));s.shards=Math.max(0,Math.min(100000,Math.floor(Number(raw.shards)||0)));s.tower=Math.max(0,Math.min(30,Math.floor(Number(raw.tower)||0)));
 s.inventory=Array.isArray(raw.inventory)?raw.inventory.filter(i=>i&&typeof i.id==='string'&&['weapon','armor','charm'].includes(i.slot)&&Number.isFinite(i.rank)).slice(0,60).map(i=>({id:i.id.slice(0,40),slot:i.slot,rank:Math.max(1,Math.min(50,Math.floor(i.rank))),name:String(i.name||'旅人装备').slice(0,30)})):[];
 if(raw.daily&&typeof raw.daily.date==='string')s.daily={date:raw.daily.date.slice(0,10),battles:Math.max(0,Math.min(1000,Number(raw.daily.battles)||0)),draws:Math.max(0,Math.min(1000,Number(raw.daily.draws)||0)),claims:Array.isArray(raw.daily.claims)?raw.daily.claims.filter(x=>['login','battle','draw'].includes(x)):[]};
 const valid=(list,type)=>Array.isArray(list)?[...new Set(list.filter(id=>skills.some(k=>k.id===id&&k.type===type&&k.classes.includes(s.class))))].slice(0,4):[];
 s.equipped=valid(raw.equipped,'主动');if(!s.equipped.length)s.equipped=s.class==='mage'?['flame','guard','heal','ice']:base.equipped;
 s.passives=valid(raw.passives,'被动');
 for(const k of ['weapon','armor','charm'])s.gear[k]=Math.max(1,Math.min(50,Math.floor(Number(raw.gear?.[k])||1)));
 for(const k of skills)s.skillLevels[k.id]=Math.max(1,Math.min(20,Math.floor(Number(raw.skillLevels?.[k.id])||1)));
 s.ownedPets={fox:1};for(const p of pets)if(Number.isFinite(raw.ownedPets?.[p.id])&&raw.ownedPets[p.id]>0)s.ownedPets[p.id]=Math.min(50,Math.floor(raw.ownedPets[p.id]));
 s.pet=s.ownedPets[raw.pet]?raw.pet:'fox';s.questClaims=Array.isArray(raw.questClaims)?raw.questClaims.filter(x=>['explore','boss','draw'].includes(x)):[];s.created=raw.created===true; return s;
}
export function stats(s) {
 let hp=180+s.level*28+s.gear.armor*24+(s.relic||0)*12,atk=25+s.level*7+s.gear.weapon*8+(s.relic||0)*3,def=3+s.gear.armor*3+s.gear.charm;
 if(s.passives.includes('vital'))hp=Math.round(hp*1.15);if(s.passives.includes('fury'))atk=Math.round(atk*1.12);
 return {hp,atk,def,power:Math.round(hp*.8+atk*9+def*12+Object.values(s.gear).reduce((a,b)=>a+b,0)*15+(s.ownedPets[s.pet]||1)*40+s.equipped.reduce((a,id)=>a+(s.skillLevels[id]||1)*20,0))};
}
export function addXP(s,amount) {s.xp+=amount;while(s.xp>=s.level*100){s.xp-=s.level*100;s.level++;}}
export function available(s,node){return !node.need||s.completed.includes(node.need);}
export function restReward(s,now=Date.now()){const minutes=Math.min(480,Math.max(0,Math.floor((now-s.lastClaim)/60000)));return {minutes,gold:minutes*2,xp:minutes};}
export function claimRest(s,now=Date.now()){const reward=restReward(s,now);if(!reward.minutes)return reward;s.gold+=reward.gold;addXP(s,reward.xp);s.lastClaim=now;return reward;}
export function switchClass(s,id){if(!classes[id]||s.level<classes[id].level)return false;s.class=id;s.equipped={knight:['slash','guard','heal','strike'],mage:['flame','guard','heal','ice'],fighter:['slash','blood','heal','whirl'],sage:['moonbeam','renew','heal','ice']}[id];return true;}
export function drawPet(s,rng=Math.random){
 if(s.tickets>0)s.tickets--;else if(s.gems>=100)s.gems-=100;else return null;
 s.draws++;s.pity++;const roll=rng();const rarity=s.pity>=10||roll<.05?'SSR':roll<.35?'SR':'R';
 const pool=pets.filter(p=>p.rarity===rarity);const pet=pool[Math.min(pool.length-1,Math.floor(rng()*pool.length))];if(rarity==='SSR')s.pity=0;
 const duplicate=Boolean(s.ownedPets[pet.id]);s.ownedPets[pet.id]=Math.min(50,(s.ownedPets[pet.id]||0)+1);return {pet,duplicate};
}
export function createBattle(s,enemy){const st=stats(s);return {hero:st.hp,max:st.hp,enemy:enemy.hp,enemyMax:enemy.hp,enemyAtk:enemy.atk,shield:0,burn:0,slow:false,turn:0,done:false,won:false,st,log:[],enemyInfo:enemy};}
export function battleTurn(s,b,chosen,{enemyAction=true}={}){
 if(b.done)return [];
 const log=[];b.turn++;const id=chosen||s.equipped[(b.turn-1)%s.equipped.length];const skill=skills.find(k=>k.id===id&&s.equipped.includes(id));const boost=1+((s.skillLevels[id]||1)-1)*.07;
 if(skill){
  if(skill.mult){const damage=Math.round(b.st.atk*skill.mult*boost*(s.passives.includes('focus')&&b.turn%4===0?1.25:1));b.enemy=Math.max(0,b.enemy-damage);log.push(`${skill.name} · 造成 ${damage} 伤害`);if(s.passives.includes('drain'))b.hero=Math.min(b.max,b.hero+Math.round(damage*.1));}
  if(skill.heal){const v=Math.round(b.max*skill.heal*boost);b.hero=Math.min(b.max,b.hero+v);log.push(`${skill.name} · 回复 ${v} 生命`);}
  if(skill.shield){const v=Math.round(b.max*skill.shield*boost);b.shield+=v;log.push(`${skill.name} · 获得 ${v} 护盾`);}
  if(skill.burn)b.burn=skill.burn;if(skill.slow)b.slow=true;
 }
 if(b.burn>0){const damage=Math.round(b.st.atk*.18);b.enemy=Math.max(0,b.enemy-damage);b.burn--;log.push(`燃烧 · ${damage} 伤害`);}
 if(b.turn%3===0){
  const pet=pets.find(p=>p.id===s.pet);const boost=(s.passives.includes('bond')?1.35:1)*(1+((s.ownedPets[s.pet]||1)-1)*.06);
  if(pet.kind==='heal'){const value=Math.round(b.max*(pet.id==='phoenix'?.12:pet.id==='mushroom'?.06:.08)*boost);b.hero=Math.min(b.max,b.hero+value);log.push(`${pet.name} · 回复 ${value} 生命`);}
  else if(pet.kind==='shield'){b.shield+=Math.round(b.max*(pet.id==='otter'?.09:.07)*boost);log.push(`${pet.name} · 加护盾`);}
  else {const value=Math.round(b.st.atk*(pet.id==='dragon'?.55:.4)*boost);b.enemy=Math.max(0,b.enemy-value);log.push(`${pet.name} · ${value} 伤害`);}
 }
 if(b.enemy<=0){b.done=true;b.won=true;}
 else if(enemyAction) {
  let damage=Math.max(4,Math.round((b.enemyAtk+(b.turn>16?(b.turn-16)*6:0))*(b.slow?.5:1)*(s.passives.includes('resolve')&&b.hero/b.max<.35?.8:1))-b.st.def);b.slow=false;
  const absorbed=Math.min(b.shield,damage);b.shield-=absorbed;damage-=absorbed;b.hero=Math.max(0,b.hero-damage);log.push(`${b.enemyInfo.name} · ${damage} 伤害${absorbed?`，护盾吸收 ${absorbed}`:''}`);
  if(s.passives.includes('thorns')&&damage>0){const d=Math.round(damage*.15);b.enemy=Math.max(0,b.enemy-d);log.push(`荆棘反击 · ${d} 伤害`);}
  if(b.hero<=0||b.turn>=60){b.done=true;b.won=false;}else if(b.enemy<=0){b.done=true;b.won=true;}
 }
 b.log.push(...log);return log;
}
export function settleBattle(s,b){
 if(!b.done||b.settled)return null;b.settled=true;if(!b.won)return {gold:0,xp:0,first:false};
 const e=b.enemyInfo;const first=!s.completed.includes(e.id);let gold=e.gold||45,xp=e.xp||30;
 if(e.arena){s.arenaWins++;s.arenaPlays++;}else if(first)s.completed.push(e.id);else {gold=Math.floor(gold*.4);xp=Math.floor(xp*.4);}
 s.gold+=gold;addXP(s,xp);if(first&&(e.id==='boss'||/^r[234]-boss$/.test(e.id))){s.gems+=200;s.tickets+=2;}return {gold,xp,first};
}
