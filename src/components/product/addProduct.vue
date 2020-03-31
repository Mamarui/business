<template>
    <div class="container">
        <van-nav-bar title="添加/编辑商品"
            right-text="保存"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"/>
        <van-field
            label="商家图标"
            input-align="right">
            <van-uploader slot="button" :after-read="changeImg">
                <van-image
                width="3rem"
                height="3rem"
                fit="contain"
                :src="business.logo"/>
            </van-uploader>
        </van-field>
        <van-field
            v-model="business.name"
            label="商品名"
            input-align="right"/>
        <van-field
            readonly
            clickable
            label="商品类型"
            v-model="category"
            input-align="right"
            @click="show_category = true"/>
        <van-popup v-model="show_category" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="show_category = false"
                @confirm="onConfirm"/>
        </van-popup>
        <van-field
            v-model="business.price"
            label="售出价格"
            input-align="right"/>
        <van-field
            v-model="business.barcode"
            label="条形码"
            input-align="right"/>
        <van-field
            v-model="business.inventory"
            label="库存"
            input-align="right"/>
        <van-field
            label="推荐"
            input-align="right">
            <van-switch slot="button" v-model="business.recommend" active-color="#07c160"/>
        </van-field>
        <van-field
            label="新品"
            input-align="right">
            <van-switch slot="button" v-model="business.newly" active-color="#07c160"/>
        </van-field>
    </div>
</template>

<script>
import requestData  from '../../requestMethod';
import upload  from '../../upload';
export default {
    data(){
        return{
            business:{
                logo:'',
                name:'',
                category:'',
                price:'',
                barcode:'',
                inventory:'',
                recommend:0,
                newly:0
            },
            category:'',
            show_category:false,        //商品类型
            columns:[],     //商品分类name列表
            list:[],        //商品分类列表
        }
    },
    created(){
        this.getColumns();
        if(this.$route.query.id){
            this.getInfo();
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getInfo(){
            requestData('/api/wechat/mmc/goods/detail',{
                id:this.$route.query.id
            },'get').then((res)=>{
                if(res.status == 200){
                    this.business = res.data;
                    this.business.recommend==0?this.business.recommend=false:this.business.recommend=true;
                    this.business.newly==0?this.business.recommend=false:this.business.recommend=true;
                }
            },(err)=>{
                alert(err)
            })
        },
        // 商品类型部分
        getColumns(){
            requestData('/api/wechat/mmc/goods/catlist',{
                merchant:sessionStorage.getItem('merchant'),
            },'post').then((res)=>{
                if(res.status == 200){
                    this.list = res.data;
                    this.columns = res.data.map(function(obj){
                        return obj.name;
                    })
                }
            },(err)=>{
                alert(err)
            })
        },
        onConfirm(value, index) {
            this.category = value;
            this.business.category = this.list[index].id;
            this.show_category = false;
        },
        onCancel() {
            this.$toast('取消');
            this.show_category = false;
            this.columns = [];
        },
        // 图片修改
        // 图片修改
        changeImg(file){
            let fd = new FormData();
            fd.append('upfile', file.file);
            upload('/api/upload',fd,'post').then((res)=>{
                this.business.logo = res.url;
            },(err)=>{
                alert(err)
            })
        },
        onClickRight(){
            var url_='';
            if(this.$route.query.id){
                url_ = '/api/wechat/mmc/goods/update';
            }else{
                url_ = '/api/wechat/mmc/goods/add';
            }
            if(this.business.recommend==true){
                this.business.recommend = 0;
            }else{
                this.business.recommend = 1;
            }
            if(this.business.newly==true){
                this.business.newly = 0;
            }else{
                this.business.newly = 1;
            }
            requestData(url_,{
                ...this.business,
                merchant:sessionStorage.getItem('merchant'),
            },'post').then((res)=>{
                this.$toast(res.message);
                if(res.status == 200){
                    this.$router.go(-1);
                }
            },(err)=>{
                alert(err)
            })
        }
    }
}
</script>

<style lang="css" scoped>
    p{
        margin: 0;
    }
    .container{
        position: relative;
    }
    .van_cell{
        padding-left: 2rem;
    }
</style>