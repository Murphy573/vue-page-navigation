import history from './history';
import config from './config';
import { isDef, remove, isRegExp, splice } from './util';

// 参考vue keepAlive组件写法
function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory;
}
// 参考vue keepAlive组件写法
function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

function getIndexByKey (keys, key) {
  for (let index = 0; index < keys.length; index++) {
    if (keys[index] === key) {
      return index;
    }
  }
  return -1;
}

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

/**
 * 是否匹配
 * @param {*} pattern
 * @param {String} name 组件名称
 */
function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  }
  else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  }
  else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}

function pruneCache (keepAliveInstance, filter) {
  const { cache, keys } = keepAliveInstance;
  for (const key in cache) {
    const cachedNode = cache[key];
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions);
      if (!filter(name)) {
        pruneCacheEntry(cache, key, keys);
      }
    }
  }
}

function pruneCacheEntry (cache, key, keys) {
  if (!key) return;
  const cached = cache[key];
  if (cached && cached.componentInstance) {
    cached.componentInstance.$destroy();
  }
  cache[key] = null;
  delete cache[key];
  remove(keys, key);
}

const patternTypes = [String, RegExp, Array];

let VuePageNavigation = keyName => {
  return {
    name: config.componentName,

    abstract: true,

    props: {
      include: patternTypes,

      exclude: patternTypes,

      max: {
        type: [String, Number],
        default: 50
      }
    },

    created () {
      this.cache = Object.create(null);
      this.keys = [];
    },

    destroyed () {
      for (let key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },

    mounted () {
      this.$watch('include', (val) => {
        pruneCache(this, (name) => matches(val, name));
      });
      this.$watch('exclude', (val) => {
        pruneCache(this, (name) => !matches(val, name));
      });
    },

    render () {
      let key = this.$route.query[keyName];
      const slot = this.$slots.default;
      const vnode = getFirstComponentChild(slot);
      const componentOptions = vnode && vnode.componentOptions;

      if (componentOptions) {
        const name = getComponentName(componentOptions);
        const { include, exclude, cache, keys } = this;

        // 如果匹配到不包含或者组件名称未提供，则直接返回vnode
        if (!name || (exclude && matches(exclude, name))) {
          if (history.action === config.replaceName && keys.length) {
            pruneCacheEntry(cache, keys[keys.length - 1], keys);
          }

          cache[key] = {};
          keys.push(key);
          return vnode;
        }
        else {
          // 从缓存中匹配name，include的始终缓存
          if (include && name && matches(include, name)) {
            for (let cacheKey in cache) {
              let _name = getComponentName(cache[cacheKey].componentOptions);
              // 如果组件名称一致，那么替换缓存中的key
              if (_name === name && key !== cacheKey) {
                cache[key] = cache[cacheKey];
                splice(keys, cacheKey, key);
                delete cache[cacheKey];
                break;
              }
            }
          }

          if (cache[key]) {
            let index = getIndexByKey(keys, key);
            vnode.componentInstance = cache[key].componentInstance;
            // 删除当前key的索引之后的缓存
            for (let i = keys.length - 1; i > index; i--) {
              let _name = getComponentName(cache[keys[i]].componentOptions);
              if (!matches(include, _name)) {
                pruneCacheEntry(cache, keys[i], keys);
              }
            }
          }
          else {
            if (history.action === config.replaceName && keys.length) {
              let _curKey = keys[keys.length - 1],
                _name = getComponentName(cache[_curKey].componentOptions);
              // replace：如果组件没变，仅替换缓存中的key
              if (_name === name && key !== _curKey) {
                cache[key] = cache[_curKey];
                splice(keys, _curKey, key);
                delete cache[_curKey];
              }
              else {
                pruneCacheEntry(cache, keys[keys.length - 1], keys);
                cache[key] = vnode;
                keys.push(key);
              }
            }
            else {
              cache[key] = vnode;
              keys.push(key);
            }

            // LRU：超出最大缓存数量，删除第一个
            if (this.max && keys.length > parseInt(this.max)) {
              pruneCacheEntry(cache, keys[0], keys);
            }

            // 删除多余缓存，例如：push:::A->B->C->B->C，那么当跳转到第二个B时，第一个B还在缓存状态
            for (let cacheKey in cache) {
              let _name = getComponentName(cache[cacheKey].componentOptions);
              // 如果组件名称一致，那么替换缓存中的key
              if (_name === name && key !== cacheKey) {
                pruneCacheEntry(cache, cacheKey, keys);
                break;
              }
            }
          }
        }

        vnode.data.keepAlive = true;
      }

      return vnode;
    }
  };
};

export default VuePageNavigation;
