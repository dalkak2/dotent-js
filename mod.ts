import { tgz } from "https://deno.land/x/compress@v0.4.4/mod.ts"

await tgz.uncompress("./test/1.ent", "./test/result")