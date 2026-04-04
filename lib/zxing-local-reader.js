import { prepareZXingModule } from "barcode-detector";

const ZXING_READER_WASM_PATH = "/vendor/zxing/zxing_reader.wasm";

const zxingModuleOverrides = {
	locateFile(fileName, prefix = "") {
		if (fileName === "zxing_reader.wasm") {
			return ZXING_READER_WASM_PATH;
		}

		return `${prefix}${fileName}`;
	},
};

let zxingReaderPromise;

export function ensureLocalZxingReader() {
	if (typeof window === "undefined") {
		return Promise.resolve();
	}

	if (!zxingReaderPromise) {
		zxingReaderPromise = prepareZXingModule({
			overrides: zxingModuleOverrides,
			equalityFn: Object.is,
			fireImmediately: true,
		}).catch((error) => {
			zxingReaderPromise = undefined;
			throw error;
		});
	}

	return zxingReaderPromise.then(() => undefined);
}
