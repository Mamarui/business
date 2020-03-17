<template>
    <div class="container">
        <van-nav-bar :title="curTitle"/>
        <van-tabbar v-model="active" @change="onChange">
            <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item name="product" icon="shop-o">商品</van-tabbar-item>
            <van-tabbar-item name="orders" icon="orders-o">订单</van-tabbar-item>
            <van-tabbar-item name="mine" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
        <Home v-if="active == 'home'" class="content"/>
        <ProductManage v-if="active == 'product'" class="content"/>
        <OrderManage v-if="active == 'orders'" class="content"/>
        <OwnManage v-if="active == 'mine'" class="content"/>
    </div>
</template>


<script>
import Home from './components/index/home';
import ProductManage from './components/product/productManage'
import OrderManage from './components/orders/orderManage'
import OwnManage from './components/mine/ownManage'
export default {
    components:{
        Home,
        ProductManage,
        OrderManage,
        OwnManage
    },
    data() {
        return {
            active:'home',
            curTitle:'XXX商家微信平台'
        }
    },
    methods:{
        onChange : function(){
            switch (this.active) {
                case 'home':
                    this.curTitle = 'XXX商家微信平台';
                    break;
                case 'product':
                    this.curTitle = '商品管理';
                    break;
                case 'orders':
                    this.curTitle = '订单管理';
                    break;
                case 'mine':
                    this.curTitle = '我的';
                    break;
                default:
                    break;
            }
        }
    }
}
</script>