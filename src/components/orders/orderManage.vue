<template>
    <div class="container">
        <van-tabs type="card" color="#1989fa" @click="onClick">
            <van-tab title="已支付">
                <van-loading type="spinner" color="#1989fa" class="loading" v-if="isLoading"/>
                <PayCard :product="product"/>
            </van-tab>
            <van-tab title="未支付">
                <van-loading type="spinner" color="#1989fa" class="loading" v-if="isLoading"/>
                <PayCard :product="product"/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<style lang="css" scoped>
    .container .van-tabs{
        margin-top: 1rem;
    }
    .container .loading{
        line-height: 5rem;
        text-align: center;
    }
</style>

<script>
import PayCard from './payCard'
import requestData  from '../../requestMethod';
export default {
    components:{
        PayCard
    },
    data() {
        return {
            product_success:[],         //已支付
            product_fail:[],            //未支付
            product:[],
            isLoading:true,
            isPay:1,                    //支付状态 已支付：1 未支付：0
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList(){
            requestData('/api/wechat/cmc/order/list',{
                merchant:sessionStorage.getItem('merchant'),
                order_manager:12,
                order_status:this.isPay
            },'get').then((res)=>{
                if(res.status==200){
                    this.product = res.data;
                    this.isLoading = false;
                }
            },(err)=>{
                alert(err)
            })
        },
        onClick(name,title){
            this.product = [];
            if(title == '已支付'){
                this.isPay = 1;
            }else{
                this.isPay = 0;
            }
            this.isLoading = true;
            this.getList();
        }
    },
}
</script>