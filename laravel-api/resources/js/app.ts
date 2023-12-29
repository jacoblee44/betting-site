import './bootstrap';
import { createApp, defineAsyncComponent } from 'vue';

window.Alpine.start();

const app = createApp({});

if (document.querySelector('#create-or-edit-site')) {
  app.component(
    'site-edit-form',
    defineAsyncComponent(() => {
      return import('./components/sites/Edit.vue');
    }),
  );
  app.component(
    'site-create-form',
    defineAsyncComponent(() => import('./components/sites/Create.vue')),
  );
}
if (document.querySelector('#permissions-tree-view')) {
  app.component(
    'Permission',
    defineAsyncComponent(() => import('./components/admin/permission/Permission.smart.vue')),
  );
}

app.mount('#app');
