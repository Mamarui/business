<template>
    <div class="container">
        <!-- 订单层 -->
        <div class="order" v-for="(item_pro,index) in product" :key="index + 'product'">
            <p class="orderState">订单号：{{item_pro.orderId}} <span>{{item_pro.order_status}}</span></p>
            <!-- 商品层 -->
            <div class="product" v-for="(item_goods,index) in item_pro.goods_list" :key="index + 'goods'">
                <van-card :num="item_goods.amount" :price="item_goods.goods_price" :title="item_goods.name" :thumb="item_goods.logo==''?'https://img.yzcdn.cn/vant/t-thirt.jpg':item_goods.logo"/>
            </div>
            <div class="total">
                <p><span>共{{item_pro.shopNum}}件商品，合计 ：</span>￥{{item_pro.total}}</p>
                <p><span>支付时间 ：</span>{{item_pro.saledate}}</p>
                <p>{{item_pro.customer}}</p>
            </div>
        </div>
        <!-- <van-swipe-cell :on-close="onClose">
            <van-cell :border="false" title="单元格" value="内容" />

            <template slot="right">
                <van-button square type="primary" text="修正" />
            </template>
        </van-swipe-cell> -->
    </div>
</template>

<style lang="css" scoped>
    .container:last-child{
        margin-bottom: 4rem;
    }
    .container .order{
        background-color: #fafafa;
        margin-bottom: 1rem;
        overflow: hidden;
    }    
    .container .order .orderState{
        font-size: 14px;
        color: #666666;
        padding: 0 1rem;
        margin-top: 0.5rem;
    }
    .container .order .orderState span{
        float: right;
    }
    .container .order .product{
        margin-top: 0.5rem;
    }
    .container .order .total{
        padding-top: 0.5rem;
        border-top: 1px solid #cccccc;
    }
    .container .order .total p{
        margin: 0;
        font-size: 12px;
        text-align: right;
        padding-right: 1rem;
    }
    .container .order .total p span{
        color: #cccccc;
    }
</style>

<script>
export default {
    props:['product'],
    data() {
        return {
           
        }
    },
    methods:{
        onClose(clickPosition, instance) {
            switch (clickPosition) {
                case 'cell':
                case 'outside':
                    instance.close();
                break;
                case 'right':
                    alert('交易成功');
                    instance.close();
                break;
            }
        }
    },
}
</script>