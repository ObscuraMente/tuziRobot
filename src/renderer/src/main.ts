import { createApp, Directive } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './routers';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import './assets/main.css';

import ContextMenuPlugin from './components/contextmenu/ContextMenuPlugin';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router);

app.use(ElementPlus, {
    locale: zhCn
});

app.use(ContextMenuPlugin);

function rememberScrollDirective(): Directive {
    const scrollData = {};
    return {
        mounted(_el, binding) {
            if (typeof binding.value !== 'string') {
                throw new Error('v-rememberScroll 指令值必须为字符串');
            }
        },
        beforeUpdate(el, binding) {
            binding.value && (scrollData[binding.oldValue] = el.scrollTop);
        },
        updated(el, binding) {
            binding.value &&
                el.scrollTo({
                    top: scrollData[binding.value] || 0
                });
        }
    };
}

app.directive('rememberScroll', rememberScrollDirective());

app.mount('#app');
