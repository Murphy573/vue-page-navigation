import VuePageNavigation from './vue-page-navigation';
import mixin from './mixin';
import history from './history';
import config from './config';
import { genKey, hasKey } from './util';

const VuePageNavigationPlugin = {
  install (Vue, { router, name = config.componentName, keyName = config.keyName }) {
    if (!router) {
      throw Error('\n vue-router is necessary. \n\n');
    }
    Vue.component(name, VuePageNavigation(keyName));

    mixin(router);

    function beforeEach (to, from, next) {
      if (!hasKey(to.query, keyName)) {
        to.query[keyName] = genKey();
        let replace = history.action === config.replaceName || !hasKey(from.query, keyName);
        next({
          hash: to.hash,
          path: to.path,
          name: to.name,
          params: to.params,
          query: to.query,
          meta: to.meta,
          replace: replace
        });
      }
      else {
        to.params[keyName + 'Direction'] = history.routerDirection;
        next({ params: to.params });
      }
    }

    // 确保它是第一个router拦截：beforeEach
    router.beforeHooks.unshift(beforeEach);
  }
};

export default VuePageNavigationPlugin;
