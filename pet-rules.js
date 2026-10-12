// Slot weights observed in player screenshots; base attributes are original tuning.
export function normalizeSupports(s,list=s.supportPets){return [...new Set(Array.isArray(list)?list:[])].filter(id=>id!==s.pet&&Object.hasOwn(s.ownedPets,id)).slice(0,3);}
export function setMainPet(s,id){if(!Object.hasOwn(s.ownedPets,id))return false;s.pet=id;s.supportPets=normalizeSupports(s);return true;}
export function toggleSupport(s,id){s.supportPets=normalizeSupports(s);if(!Object.hasOwn(s.ownedPets,id)||id===s.pet)return '请选择已拥有的其他幻兽';const i=s.supportPets.indexOf(id);if(i>=0){s.supportPets.splice(i,1);return null;}if(s.supportPets.length>=3)return '副宠位置已满，请先移除一位';s.supportPets.push(id);return null;}
export function petBase(level){return {hp:level*12,atk:level*3,def:level};}
export function formationBonus(s){const supports=normalizeSupports(s),sum={hp:0,atk:0,def:0};for(const [id,level] of Object.entries(s.ownedPets)){const weight=id===s.pet?1:supports.includes(id)?.5:.2;const base=petBase(level);for(const key of Object.keys(sum))sum[key]+=base[key]*weight;}for(const key of Object.keys(sum))sum[key]=Math.round(sum[key]);return sum;}
