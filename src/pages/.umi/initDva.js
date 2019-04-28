import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('E:/workSpace/car_rule_manage_web/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('E:/workSpace/car_rule_manage_web/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('E:/workSpace/car_rule_manage_web/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('E:/workSpace/car_rule_manage_web/src/models/user.js').default) });
