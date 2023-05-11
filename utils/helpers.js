import path from 'path'
import {
    fileURLToPath
} from 'url'
export const throwError = (msg) => new Error(msg)
export const isFunction = (obj) => typeof obj === `function`
export const isAsyncFunction = (fn) => fn.constructor.name === 'AsyncFunction'
export const cwd = (fileUrl) => {
    const __filename = fileURLToPath(fileUrl)
    const __dirname = path.dirname(__filename)
    return __dirname
}
export const serializeParams = (obj) => {
    if(obj === undefined || obj === null) return obj
    if (Array.isArray(obj)) {
        return {
            type: 'array',
            value: obj.map((value) => {
                if (Array.isArray(value)) {
                    return serializeParams(value);
                } else if (typeof value === 'object') {
                    return {
                        type: 'object',
                        value: Object.entries(value).map(([key, val]) => ({
                            key,
                            ...serializeParams(val),
                        })),
                    };
                } else {
                    return {
                        type: typeof value,
                        value,
                    };
                }
            }),
        };
    } else if (typeof obj === 'object') {
        return {
            type: 'object',
            value: Object.entries(obj).map(([key, value]) => ({
                key,
                ...serializeParams(value),
            })),
        };
    } else {
        return {
            type: typeof obj,
            value: obj,
        };
    }
}
export const deSerializeParams = (result) => {
    if(result === undefined || result === null) return result
    if (result.type === 'array') {
        return result.value.map((value) => {
            if (value.type === 'array') {
                return deSerializeParams(value);
            } else if (value.type === 'object') {
                const obj = {};
                value.value.forEach((entry) => {
                    obj[entry.key] = deSerializeParams(entry);
                });
                return obj;
            } else {
                return value.value;
            }
        });
    } else if (result.type === 'object') {
        const obj = {};
        result.value.forEach((entry) => {
            obj[entry.key] = deSerializeParams(entry);
        });
        return obj;
    } else {
        return result.value;
    }
}