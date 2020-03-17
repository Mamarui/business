<template>
    <div class="container">
        <van-nav-bar :title="$route.query.name" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-cell-group class="cellGroup">
            <van-cell title="货机名" is-link :value="info.name" />
            <van-cell title="管理员" is-link :value="info.manager" />
            <van-cell title="机身条码" :value="info.surface_no" />
            <van-cell title="货机型号" :value="info.model" />
        </van-cell-group>
        <div class="product" v-if="info.list!=[]">
            <table>
                <thead>
                    <td>位置</td>
                    <td>商品</td>
                    <td>货柜存量</td>
                    <td>库存</td>
                    <td>操作</td>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in info.list" :key="index">
                        <th>{{item.cid}}</th>
                        <th>{{item.goods_name}}</th>
                        <th>{{item.amount}}</th>
                        <th>{{item.inventory}}</th>
                        <th><van-button plain type="danger" class="btn" size="mini" @click="tabToSupply(item.cid)">补货</van-button></th>
                    </tr>
                </tbody>
            </table>
        </div>
        <van-tabbar v-model="active" @change="changeTabs">
            <van-tabbar-item name="cancel">取消</van-tabbar-item>
            <!-- <van-tabbar-item name="done">一键补货</van-tabbar-item> -->
        </van-tabbar>
    </div>
</template>

<style lang="css" scoped>
    .container{
        text-align: left;
    }
    .container .product{
        margin-top: 1rem;
    }
    .container .product table{
        width: 22rem;
        margin: 0.5rem auto;
        background-color: #C6D2E3;
        font-size: 14px;
    }
    .container .product table thead{
        background-color: #1B57B1;
    }
    .container .product table thead td{
        color: #fff;
        text-align: center;
    }
    .container .product table tbody tr{
        line-height: 2rem;
        font-weight: normal;
    }
    .container .product table tbody tr th{
        border-bottom: 1px dashed #7792BB;
        text-align: center;
    }
</style>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data() {
        return {
            info:{},
            active:'',
        }
    },
    mounted() {
        this.getInfo();
    },
    methods:{
        getInfo(){
            requestData('/api/wechat/mmc/container/info',{
                id:this.$route.query.id
            },'get').then((res)=>{
                if(res.status==200){
                    this.info = res.data;
                }
            },(err)=>{
                alert(err)
            })
        },
        onClickLeft(){
                this.$router.go(-1);
        },
        tabToSupply(cid){
            this.$router.push({ name : 'counterSupply' , query : { id : cid } });
        },
        changeTabs(){
            if(this.active == 'cancel'){
                alert('取消')
                this.$router.go(-1);
            }else{
                alert('一键补货')
                this.$router.push({ name : 'counterSupOnce' , query : { list : this.info.list }});
            }
        },
    }
}
</script>