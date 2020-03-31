<template>
    <div class="container">
        <van-nav-bar title="补换货"
            left-arrow
            @click-left="onClickLeft"/>
        <van-cell-group class="cellGroup">
            <van-cell title="货机名" :value="info.name" />
            <van-cell title="位置" :value="info.grid_id" />
            <!-- <van-cell title="商品类型" is-link :value="info.category" @click="chooseCategory"/> -->
            <van-field
                readonly
                clickable
                label="商品类型"
                input-align="right"
                :value="info.category"
                @click="showPicker('category')"/>
            <van-popup v-model="showPicker_category" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="onCancel('category')"
                    @confirm="onConfirm_category"/>
            </van-popup>

            <!-- <van-cell title="商品名称" is-link :value="info.goods_name"  @click="chooseGoodsName"/> -->
            <van-field
                readonly
                clickable
                label="商品名称"
                input-align="right"
                :value="info.goods_name"
                @click="showPicker('goods_name')"/>
            <van-popup v-model="showPicker_goods_name" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="onCancel('goods_name')"
                    @confirm="onConfirm_goodsname"/>
            </van-popup>
            <van-cell title="库存数" :value="info.inventory" />
            <van-field
                input-align="right"
                v-model="info.amount"
                label="补货量"
                placeholder="请输入补货量"/>
        </van-cell-group>
        <van-tabbar>
            <van-tabbar-item @click="cancel" name="cancel">取消</van-tabbar-item>
            <van-tabbar-item @click="done" name="done">完成</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="css" scoped>
    .container{
        text-align: left;
    }
</style>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data() {
        return {
            info:{},
            columns:[],
            categorys:[],
            category_id:'',
            goods:[],
            goods_id:'',
            showPicker_category:false,
            showPicker_goods_name:false,

        }
    },
    mounted() {
        this.getInfo();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getInfo(){
            requestData('/api/wechat/cmc/container/grid',{
                id:this.$route.query.id
            },'get').then((res)=>{
                if(res.status==200){
                    this.info = res.data;
                    this.info.amount = '';      //最开始的补货量是空 需要自己手动填写
                }
            },(err)=>{
                alert(err)
            })
        },
        showPicker(type){           //选择商品类型、商品名称
            var url_ = '';
            if(type=='category'){
                url_ = '/api/wechat/mmc/goods/catlist';
                this.showPicker_category = true;
            }else{
                url_ = '/api/wechat/mmc/goods/list';
                this.showPicker_goods_name = true;
            }
            requestData(url_,{
                merchant:sessionStorage.getItem('merchant'),
            },'get').then((res)=>{
                if(res.status==200){
                    if(res.data!=[]&&res.data.length!=0){
                        if(type=='category'){
                            this.categorys = res.data;
                        }else{
                            this.goods = res.data;
                        }
                        for(let i =0; i < res.data.length; i++){
                            this.columns.push(res.data[i].name);
                        }
                    }else{
                        this.$toast('暂无数据！');
                    }
                }
            },(err)=>{
                alert(err)
            })
        },
        onConfirm_category(value, index) {
            this.info.category = value;
            this.category_id = this.categorys[index].id;
            this.showPicker_category = false;
            this.columns = [];
        },
        onConfirm_goodsname(value, index){
            this.info.goods_name = value;
            this.goods_id = this.goods[index].id;
            this.showPicker_goods_name = false;
            this.columns = [];
        },
        onCancel(type) {
            if(type == 'category'){
                this.showPicker_category = false;
            }else{
                this.showPicker_goods_name = false;
            }
            this.columns = [];
        },
        cancel(){
            this.$router.go(-1);
        },
        done(){
            requestData('/api/wechat/mmc/container/supply',{
                    grid_id:this.info.grid_id,
                    goods_id:this.goods_id?this.goods_id:this.info.goods,
                    supply_amount:this.info.amount
                },'post').then((res)=>{
                    if(res.status==200){
                        this.$toast(res.message);
                        this.$router.go(-1);
                    }
                },(err)=>{
                    alert(err)
                })
        },
    }
}
</script>