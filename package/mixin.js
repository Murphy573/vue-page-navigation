/* 拦截路由跳转指令：重写 */
import history from './history';
import config from './config';

export default function (router) {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = (location, onResolve, onReject) => {
    history.action = config.pushName;
    history.routerDirection = 'forward';

    if (onResolve || onReject) {
      return routerPush(location, onResolve, onReject);
    }
    return routerPush(location).catch(error => error);
  };

  router.go = n => {
    history.action = config.goName;
    history.routerDirection = n > 0 ? 'forward' : 'backward';

    routerGo(n);
  };

  router.replace = (location, onResolve, onReject) => {
    history.action = config.replaceName;
    history.routerDirection = 'forward';

    if (onResolve || onReject) {
      return routerReplace(location, onResolve, onReject);
    }
    return routerReplace(location).catch(error => error);
  };

  router.back = () => {
    history.action = config.backName;
    history.routerDirection = 'backward';

    routerBack();
  };

  router.forward = () => {
    history.action = config.forwardName;
    history.routerDirection = 'forward';

    routerForward();
  };
};
