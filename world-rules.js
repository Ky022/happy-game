export const COLS=11,ROWS=15;
export const locations=[[5,12],[2,11],[7,9],[3,7],[8,6],[4,4],[5,1]];
export const index=(x,y)=>y*COLS+x;
export function terrain(x,y){if(x<0||x>=COLS||y<0||y>=ROWS)return 'edge';if(x===0||x===COLS-1||y===0||y===ROWS-1)return 'tree';if((x===2&&y>=3&&y<=6)||(x===8&&y>=10&&y<=12))return 'water';if([[1,2],[3,2],[7,2],[9,3],[6,5],[6,6],[4,8],[5,8],[1,9],[9,8],[3,13]].some(p=>p[0]===x&&p[1]===y))return 'tree';if(y>=11||x===5||y===9||y===4)return 'path';return 'grass';}
export const walkable=(x,y)=>['grass','path'].includes(terrain(x,y));
export function reveal(world){const known=new Set(world.seen);for(let y=world.y-2;y<=world.y+2;y++)for(let x=world.x-2;x<=world.x+2;x++)if(x>=0&&x<COLS&&y>=0&&y<ROWS&&Math.abs(x-world.x)+Math.abs(y-world.y)<=3)known.add(index(x,y));world.seen=[...known];return world;}
export const newWorld=()=>reveal({x:5,y:12,seen:[],revision:0});
export function route(world,x,y){if(!walkable(x,y))return null;const queue=[[world.x,world.y,[]]],visited=new Set([index(world.x,world.y)]);for(let i=0;i<queue.length;i++){const [cx,cy,path]=queue[i];if(cx===x&&cy===y)return path;for(const [nx,ny] of [[cx-1,cy],[cx+1,cy],[cx,cy-1],[cx,cy+1]])if(walkable(nx,ny)&&!visited.has(index(nx,ny))){visited.add(index(nx,ny));queue.push([nx,ny,[...path,[nx,ny]]]);}}return null;}
export function moveWorld(world,path){if(!Array.isArray(path)||path.length>100)throw Error('移动路线无效');const next={...world,seen:[...world.seen]};for(const p of path){if(!Array.isArray(p)||p.length!==2||!p.every(Number.isInteger)||!walkable(...p)||Math.abs(p[0]-next.x)+Math.abs(p[1]-next.y)!==1)throw Error('无法走到这里');[next.x,next.y]=p;reveal(next);}next.revision++;return next;}
export const near=(world,p)=>Math.abs(world.x-p[0])+Math.abs(world.y-p[1])<=1;
