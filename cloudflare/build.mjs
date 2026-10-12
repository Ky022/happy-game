import {mkdirSync,copyFileSync,writeFileSync} from 'node:fs';
mkdirSync('cloudflare/public',{recursive:true});
for(const n of ['index.html','app.js','interface.js','pet-rules.js','engine.js','art.js','online.js','style.css','sw.js','manifest.webmanifest','app-icon.svg','world.js','world-rules.js'])copyFileSync(n,'cloudflare/public/'+n);
copyFileSync('dist/mistvale-debug.apk','cloudflare/public/mistvale.apk');
writeFileSync('cloudflare/public/_headers',`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: same-origin\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'\n/mistvale.apk\n  Content-Type: application/vnd.android.package-archive\n  Content-Disposition: attachment; filename="mistvale.apk"\n  Cache-Control: no-store\n`);

mkdirSync("cloudflare/public/screenshots",{recursive:true});
copyFileSync("docs/compare.html","cloudflare/public/comparison.html");
for(const n of ["exploration-before","exploration-v3","battle-before","battle-v3","journal-v4","role-v4","pets-v4"])copyFileSync(`docs/screenshots/${n}.png`,`cloudflare/public/screenshots/${n}.png`);
