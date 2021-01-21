
import config from './config';

const queryKeyName = config.keyName;

const queryDirectionKey = queryKeyName + 'Direction';
/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString;

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]';
}

export function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]';
}

export function isDef (v) {
  return v !== undefined && v !== null;
}

/**
 * 从数组中移除一个元素
 * @param {Array} arr
 * @param {Any} item 要删除的元素
 * @returns {Any} 移除的元素
 */
export function remove (arr, item) {
  if (Array.isArray(arr) && arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * 从数组中移除一个元素，并以新元素替换
 * @param {Array} arr
 * @param {Any} oldItem 要删除的元素
 * @param {Any} newItem 添加到删除位置的新元素
 * @returns {Any} 移除的元素
 */
export function splice (arr, oldItem, newItem) {
  if (Array.isArray(arr) && arr.length) {
    const index = arr.indexOf(oldItem);
    if (index > -1) {
      return arr.splice(index, 1, newItem);
    }
  }
}

/**
 * 生成key
 * @param {String} tpl 生成模版--xy组成
 */
export function genKey (tpl = 'xxxxxxxx') {
  return tpl.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 对象中是否有key
 * @param {Object} obj 纯对象
 * @param {String} keyName key名称
 */
export function hasKey (obj, keyName) {
  return !!obj[keyName];
}

/**
 * 构造路由跳转信息
 * @param {Object} routeInfo 路由跳转信息
 */
export function buildRouteData (routeInfo) {
  const { name, meta, query, params } = routeInfo;

  // 删除跳转方向和关键字key字段
  let { [queryDirectionKey]: directionKey, ...otherPrams } = params;
  let { [queryKeyName]: queryKey, ...otherQuery } = query;

  return {
    name,
    meta,
    query: otherQuery,
    params: otherPrams
  };
}

export function deleteObjectKey (obj, key) {
  let { [key]: dynamicKey, ...otherKeys } = obj;

  return {
    ...otherKeys
  };
}

/**
 * 判断传入的参数是否都相等
 * @param  {...any} args 参数
 */
export function deepCompare (...args) {
  /* eslint-disable */
  let i, l, leftChain, rightChain;

  function compare2Objects (x, y) {
    let p;
    // 判断NaN和undefined
    if (
      isNaN(x) &&
      isNaN(y) &&
      typeof x === 'number' &&
      typeof y === 'number'
    ) {
      return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof x[p]) {
        case 'object':
        case 'function':
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }

    return true;
  }
  // 如果长度小于1，默认返回true
  if (args.length < 1) {
    return true;
  }
  // 循环判断传入的对象参数是否都相等
  for (i = 1, l = args.length; i < l; i++) {
    leftChain = []; // Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(args[0], args[i])) {
      return false;
    }
  }

  return true;
}
