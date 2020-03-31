<template>
    <div class="container">
        <table>
            <thead>
                <td>商品</td>
                <td>库存</td>
                <td>状态</td>
                <td>操作</td>
            </thead>
            <tbody>
                <tr v-for="(item,index) in list" :key="index">
                    <th>{{item.name}}</th>
                    <th width="70">{{item.inventory}}</th>
                    <th width="70">{{item.goods_status}}</th>
                    <th width="100"> 
                        <van-button plain type="danger" size="mini" @click="operator('updown',item)">{{item.goods_status=="上架"?"下架":"上架"}}</van-button>
                        <van-button plain type="danger" size="mini" @click="operator('supply',item)">补货</van-button>
                        <van-button plain type="danger" size="mini" @click="operator('edit',item)">编辑</van-button>
                    </th>
                </tr>
            </tbody>
            <!-- <tbody v-else>
                <tr>暂无数据</tr>
            </tbody> -->
        </table>
        <p><span>在售/待售：{{on_sale}}/{{for_sale}}</span><span>总库存数：{{inventory}}</span></p>

        <van-icon name="add-o" color="#1989fa" size="3rem" @click="jump"/>
    </div>
</template>

<script>
import requestData  from '../../requestMethod';
export default {
    data(){
        return{
            list:[],
            for_sale:'',
            on_sale:'',
            inventory:'',
            goods_status:'',        //状态
        }
    },
    created(){
        this.getList();
        this.getBottom();
    },
    methods:{
        getList(){
            requestData('/api/wechat/mmc/goods/list',{
                merchant:sessionStorage.getItem('merchant'),
            },'get').then((res)=>{
                if(res.status == 200){
                    this.list = res.data;
                }
            },(err)=>{
                alert(err)
            })
        },
        getBottom(){
            requestData('/api/wechat/GoodsController/goods/stats',{
                merchant:sessionStorage.getItem('merchant'),
            },'get').then((res)=>{
                if(res.status == 200){
                    this.for_sale = res.data.for_sale;
                    this.on_sale = res.data.on_sale;
                    this.inventory = res.data.inventory;
                }
            },(err)=>{
                alert(err)
            })
        },
        operator(type,item){
            switch (type) {
                case 'updown':
                    if(item.goods_status=="上架"){
                        this.goods_status = 1;     //如果是上架 则要下架
                    }else{
                        this.goods_status = 0;     //如果是下架 则要上架
                    }
                    this.editSend(item.id);
                    break;
                case 'supply':
                    this.$router.push({ name:'supply', query:{ id: item.id , name: item.name} });
                    break;
                case 'edit':
                    this.$router.push({ name:'addProduct', query:{ id: item.id ,name: item.name ,type:'edit'} });
                    break;
            }
        },
        editSend(id){
            requestData('/api/wechat/mmc/goods/update',{
                id:id,
                goods_status:this.goods_status,
                merchant:sessionStorage.getItem('merchant'),
            },'post').then((res)=>{
                if(res.status == 200){
                    this.getList();
                }
            },(err)=>{
                alert(err)
            })
        },
        jump(){
            this.$router.push({ name:'addProduct', query:{ type:'new'} });
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
        margin-bottom: 4rem;
    }
    .container table{
        width: 22rem;
        margin: 0 auto;
        background-color: #C6D2E3;
        font-size: 14px;
        text-align: center;
    }
    .container table thead{
        background-color: #1B57B1;
    }
    .container table thead td{
        color: #fff;
    }
    .container table tbody tr{
        line-height: 2rem;
        font-weight: normal;
    }
    .container table tbody tr th{
        border-bottom: 1px dashed #7792BB;
    }
    .container p{
        margin: 0 auto;
        width: 20rem;
        height: 1.6rem;
        line-height: 1.6rem;
        text-align: left;
        font-weight: bold;
        padding-left: 2rem;
        font-size: 14px;
        background-color: #888;
    }
    .container p span{
        margin-left: 2rem;
    }
    .van-icon{
        position: fixed;
        right: 0;
        bottom: 15rem;
    }
</style>