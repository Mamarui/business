<template>
    <div class="container">
        <div class="header">
            <div class="left context">
                <p class="num">￥{{today}}</p>
                <p>今日销售额</p>
            </div>
            <div class="right context">
                <p class="num">￥{{thismonth}}</p>
                <p>本月销售额</p>
            </div>
        </div>
        <div class="content">
            <p class="title"><span>今日明细</span><span><router-link to="/history" class="history">历史明细 ></router-link> </span></p>
            
            <table>
                <thead>
                    <td>商品</td>
                    <td>库存</td>
                    <td>已售出</td>
                    <td>销售金额</td>
                </thead>
                <tbody v-if="list!=[]&&list.length!=0">
                    <tr v-for="(item,index) in list" :key="index">
                        <th>{{item.name}}</th>
                        <th>{{item.inventory}}</th>
                        <th>{{item.sales}}</th>
                        <th>{{item.sub_total}}</th>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>暂无数据</tr>
                </tbody>
            </table>
        </div>
    </div> 
</template>

<style lang="css" scoped>
    p{
        margin: 0;
    }
    .container{
        margin-bottom: 4rem;
    }
    .container .header{
        height: 8rem;
        background-color: #f1f1f1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    .container .header .context{
        width: 50%;
        height: 5rem;
        text-align: center;
    }
    .container .header .context .num{
        font-size: 22px;
        margin-bottom: 1rem;
    }
    .container .header .left .num{
        color: #FF9900;
    }
    .container .header .right .num{
        color: #00FF00;
    }
    .container .content .title{
        margin-top: 0.5rem;
        padding: 0 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .container .content p span:nth-child(2) .history{
        color: #B3B3B3;
    }
    .container .content p span{
        font-size: 12px;
    }
    .container .content table{
        width: 22rem;
        margin: 0.5rem auto;
        background-color: #C6D2E3;
        font-size: 14px;
        text-align: center;
    }
    .container .content table thead{
        background-color: #1B57B1;
    }
    .container .content table thead td{
        color: #fff;
    }
    .container .content table tbody tr{
        line-height: 2rem;
        font-weight: normal;
    }
    .container .content table tbody tr th{
        border-bottom: 1px dashed #7792BB;
    }
</style>

<script>
import requestData  from '../../requestMethod';
export default {
    data() {
        return {
            today:'',
            thismonth:'',
            list:[],
            date_:''
        }
    },
    created(){
        this.getSales();
        var day = new Date();
        day.setTime(day.getTime());
        var month = day.getMonth()+1;
        this.date_ = day.getFullYear() + '-' + month + '-' + day.getDate();
        this.getList();
    },
    methods:{
        getSales(){
            requestData('/api/wechat/mmc/statistic/sales',{
                mid:1
            },'get').then((res)=>{
                if(res.status==200){
                    this.today = res.data.today;
                    this.thismonth = res.data.thismonth;
                }
            },(err)=>{
                alert(err)
            })
        },
        getList(){
            requestData('/api/wechat/mmc/summary/order/list',{
                gmt_created:this.date_,
                merchant:sessionStorage.getItem('merchant'),
            },'get').then((res)=>{
                if(res.status==200){
                    this.list = res.data.list;
                }
            },(err)=>{
                alert(err)
            })
        }
    }
}
</script>