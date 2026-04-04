import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
const targetPath = resolve(process.cwd(), "public/vendor/zxing/zxing_reader.wasm");
let sourcePath;

try {
	sourcePath = require.resolve("zxing-wasm/reader/zxing_reader.wasm");
} catch (error) {
	throw new Error(
		"Could not resolve 'zxing-wasm/reader/zxing_reader.wasm'. Run 'bun install' to install the local ZXing reader dependency.",
		{ cause: error },
	);
}

await mkdir(dirname(targetPath), { recursive: true });
await copyFile(sourcePath, targetPath);

console.log(`Copied ZXing reader WASM to ${targetPath}`);
