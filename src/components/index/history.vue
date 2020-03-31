<template>
    <div class="container">
        <van-nav-bar
            left-arrow
            @click-left="onClickLeft"
            :title="curTitle"/>
        <div class="timeBox">
            <div class="time">
                <p class="filtertime" @click="pickTime('start')">{{start}}</p>
                <van-datetime-picker class="picktime" v-if="ifPickTimeStart" v-model="currentDateStart" type="date" :formatter="formatter" @confirm="confirmDate('start')"/>
            </div>
            <span>-</span>
            <div class="time">
                <p class="filtertime" @click="pickTime('end')">{{end}}</p>
                <van-datetime-picker class="picktime" v-if="ifPickTimeEnd" v-model="currentDateEnd" type="date" :formatter="formatter" @confirm="confirmDate('end')"/>
            </div>
        </div>
        <table>
            <thead>
                <td>商品</td>
                <td>售出</td>
                <td>{{cur==0?'时间':'库存'}}</td>
                <td>销售金额</td>
            </thead>
            <tbody v-if="list!=[]&&list.length!=0">
                <tr v-for="(item,index) in list" :key="index">
                    <th>{{item.name}}</th>
                    <th width="70">{{item.amount}}</th>
                    <th width="120">{{cur==0?item.saledate:item.inventory}}</th>
                    <th width="100">{{item.sub_total}}</th>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>暂无数据</tr>
            </tbody>
            <p>汇总<span>{{total}}</span>元</p>
        </table>
        <van-tabbar>
            <van-tabbar-item @click="changeTab">{{curBtntext}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="css" scoped>
    p{
        margin: 0;
    }
    .container{
        position: relative;
    }
    .container .timeBox{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .container .filtertime{
        text-align: left;
        margin: 0.5rem 0;
        padding-left: 0.5rem;
    }
    .container .picktime{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
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
    .container table p{
        font-weight: bold;
        padding-left: 2rem;
        width: 7.5rem;
    }
    .container table p span{
        margin-left: 2rem;
    }
</style>

<script>
import requestData  from '../../requestMethod';
export default {
    data() {
        return {
            cur:0,      //0 - 销售明细，1 - 汇总统计
            curTitle:'销售明细',
            curBtntext:'汇总统计',
            currentDateStart: new Date(),
            currentDateEnd: new Date(),
            nows:'',        //今日时间
            start:'',
            end:'',
            ifPickTimeStart:false,
            ifPickTimeEnd:false,
            list:[],
            total:''
        }
    },
    created(){
        var day = new Date(),
            year = day.getFullYear(),
            month = day.getMonth()+1,
            date = day.getDate();
            if(date<10){
                date = '0' + date;
            }
            if(month<10){
                month = '0'+ month;  //补齐
            }
        this.nows = year + '-' + month + '-' + date;
        this.start = this.nows;
        this.end = this.nows;
    },
    mounted(){
        this.getSales(); 
    },
    methods:{
        getSales(){     //销售明细  
            requestData('/api/wechat/mmc/detail/order/list',{
                merchant:sessionStorage.getItem('merchant'),
                gmt_created:this.start + '~' + this.end
            },'get').then((res)=>{
                if(res.status == 200){
                    this.list = res.data.list;
                    this.total = res.data.total;
                }
            },(err)=>{
                alert(err)
            })
        },
        getList(){      //汇总统计
            requestData('/api/wechat/mmc/summary/order/list',{
                merchant:sessionStorage.getItem('merchant'),
                gmt_created:this.start + '~' + this.end
            },'get').then((res)=>{
                if(res.status==200){
                    this.list = res.data.list;
                    this.total = res.data.total;
                }
            },(err)=>{
                alert(err)
            })
        },
        changeTab(){
            switch (this.curTitle) {
                case '销售明细':
                    this.curBtntext = '销售明细';
                    this.curTitle = '汇总统计';
                    this.cur = 1;
                    this.getList();
                    break;
                case '汇总统计':
                    this.curBtntext = '汇总统计';
                    this.curTitle = '销售明细';
                    this.cur = 0;
                    this.getSales();
                    break;
                default:
                    break;
            }
        },
        pickTime(type){
            if(type=='start'){
                this.ifPickTimeStart = true;
            }else{
                this.ifPickTimeEnd = true;
            }
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`
            }
            return value;
        },
        confirmDate(type){
            if(type=='start'){
                this.start = JSON.stringify(this.currentDateStart).substr(1,10);
                this.ifPickTimeStart = false;
            }else{
                this.end = JSON.stringify(this.currentDateEnd).substr(1,10);
                this.ifPickTimeEnd = false;
            }
            this.getSales();
            this.getList();
        },
        onClickLeft(){
            this.$router.go(-1);
        }
    }
}
</script>