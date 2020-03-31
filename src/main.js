import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import {
    Tabbar,
    TabbarItem,
    NavBar,
    DatetimePicker,
    Loading,
    Card,
    Tab,
    Tabs,
    Button,
    Field,
    Toast,
    Switch,
    Popup,
    Cell,
    CellGroup,
    Picker,
    Icon,
    Image,
    Uploader,
    Skeleton,
    SwipeCell,
    ContactCard,
    ContactList,
    ContactEdit,
    Tag,
    Slider,
    PasswordInput,
    NumberKeyboard,
    Divider 


} from 'vant';

Vue.use(Tabbar).use(TabbarItem);
Vue.use(NavBar);
Vue.use(DatetimePicker);
Vue.use(Tab).use(Tabs);
Vue.use(Card);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Switch);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Picker);
Vue.use(Icon);
Vue.use(Image);
Vue.use(Uploader);
Vue.use(Skeleton);
Vue.use(SwipeCell);
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);
Vue.use(Tag);
Vue.use(Slider);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Divider);

Vue.config.productionTip = false

Vue.use(VueRouter)
new Vue({
    render: h => h(App),
    router
}).$mount('#app')