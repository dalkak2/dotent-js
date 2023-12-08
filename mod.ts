import { toFileUrl } from "https://deno.land/std@0.208.0/path/mod.ts"

import { Untar } from "https://deno.land/std@0.208.0/archive/untar.ts"

import {
    readerFromStreamReader,
    readableStreamFromReader,
} from "https://deno.land/std@0.208.0/streams/mod.ts"

const readableStream = await fetch(
    toFileUrl(Deno.cwd()).href + "/test/1.ent"
).then(res => res.body)!

const decompressedReadableStream = readableStream!.pipeThrough(
    new DecompressionStream("gzip")
)
const streamReader = decompressedReadableStream.getReader()

const untar = new Untar(readerFromStreamReader(streamReader))

for await (const entry of untar) {
    console.log(entry.fileName)
    if (entry.fileName.endsWith("/project.json")) {
        await Deno.writeFile("test/project.json", readableStreamFromReader(entry))
    }
}