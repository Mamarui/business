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
import utils from './keyUtils'
import requestData from './requestMethod.js'
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
            curTitle:''
        }
    },
    created(){
	//解析参数
		let code = utils.getUrlKey('code')
		let state = utils.getUrlKey('state')
        requestData('/api/oauth/mp/authorize',{
            state:state,
            code:code
        },'get').then((res)=>{
            if(res.status==200){
                // sessionStorage.setItem('user_id',res.data.user_id);
                sessionStorage.setItem('user_id',1);
                if(res.data.hasbind){
                    sessionStorage.setItem('avatar',res.data.avatar);
                    sessionStorage.setItem('name',res.data.name);
                    sessionStorage.setItem('openid',res.data.openid);
                    sessionStorage.setItem('role',res.data.role);
                    sessionStorage.setItem('phone',res.data.phone);
                    sessionStorage.setItem('merchant',res.data.merchant);
                    sessionStorage.setItem('merchant_name',res.data.merchant_name);
                    this.curTitle = res.data.merchant_name;
                }else{
                    this.$router.push({ name:'login', query:{ user_id:res.data.user_id } });
                }
            }
        },(err)=>{
            alert(err)
        })
    },
    methods:{
        onChange : function(){
            switch (this.active) {
                case 'home':
                    this.curTitle = sessionStorage.getItem('merchant_name');
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
        },
    }
}
</script>