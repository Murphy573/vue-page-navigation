
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
 * @param {Any} item
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
 * @param {Any} item
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
