import VueRouter from 'vue-router'

import Index from './index'

import Home from './components/index/home';
import History from './components/index/history';

import ProductManage from './components/product/productManage'
import AddProduct from './components/product/addProduct.vue'
import Supply from './components/product/supply.vue'

import OrderManage from './components/orders/orderManage'

import OwnManage from './components/mine/ownManage'

import Info from './components/mine/components/info.vue'
import CurTele from './components/mine/components/accountSecurity/curTele.vue'
import SureOldTele from './components/mine/components/accountSecurity/sureOldTele.vue'
import ChangeTele from './components/mine/components/accountSecurity/changeTele.vue'
import VerifyTele from './components/mine/components/accountSecurity/verifyTele.vue'
import ChangeTradePwd from './components/mine/components/accountSecurity/changeTradePwd.vue'
import AddBankCard from './components/mine/components/accountSecurity/addBankCard.vue'
import BankManage from './components/mine/components/accountSecurity/bankManage.vue'

import Child from './components/mine/components/child.vue'
import ChildDetail from './components/mine/components/children/childDetail.vue'
import AddChild from './components/mine/components/children/addChild.vue'

import Finance from './components/mine/components/finance.vue'
import CashOut from './components/mine/components/finances/cashOut.vue'
import Definite from './components/mine/components/finances/definite.vue'

import Machine from './components/mine/components/machine.vue'
import CounterDetail from './components/mine/components/counters/counterDetail.vue'
import CounterSupply from './components/mine/components/counters/counterSupply.vue'
import BindCounter from './components/mine/components/counters/bindCounter.vue'

import Message from './components/mine/components/message.vue'
import Account from './components/mine/components/account.vue'


const routes = [
    { path: '/', component: Index, name: 'index' },
    { path: '/home', component: Home, name: 'home' },
    { path: '/history', component: History, name: 'history' },
    { path: '/productManage', component: ProductManage, name: 'productManage' },
    { path: '/orderManage', component: OrderManage, name: 'orderManage' },
    { path: '/supply', component: Supply, name: 'supply' },
    { path: '/addProduct', component: AddProduct, name: 'addProduct' },
    { path: '/ownManage', component: OwnManage, name: 'ownManage' },
    { path: '/info', component: Info, name: 'info' },
    { path: '/child', component: Child, name: 'child' },
    { path: '/finance', component: Finance, name: 'finance' },
    { path: '/machine', component: Machine, name: 'machine' },
    { path: '/message', component: Message, name: 'message' },
    { path: '/account', component: Account, name: 'account' },
    { path: '/curTele', component: CurTele, name: 'curTele' },
    { path: '/childDetail', component: ChildDetail, name: 'childDetail' },
    { path: '/addChild', component: AddChild, name: 'addChild' },
    { path: '/cashOut', component: CashOut, name: 'cashOut' },
    { path: '/definite', component: Definite, name: 'definite' },
    { path: '/counterDetail', component: CounterDetail, name: 'counterDetail' },
    { path: '/counterSupply', component: CounterSupply, name: 'counterSupply' },
    { path: '/bindCounter', component: BindCounter, name: 'bindCounter' },
    { path: '/changeTele', component: ChangeTele, name: 'changeTele' },
    { path: '/sureOldTele', component: SureOldTele, name: 'sureOldTele' },
    { path: '/verifyTele', component: VerifyTele, name: 'verifyTele' },
    { path: '/changeTradePwd', component: ChangeTradePwd, name: 'changeTradePwd' },
    { path: '/addBankCard', component: AddBankCard, name: 'addBankCard' },
    { path: '/bankManage', component: BankManage, name: 'bankManage' },
]

const router = new VueRouter({
    routes
})

export default router