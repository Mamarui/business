<template>
    <div class="container">
        <van-nav-bar title="补货"
            right-text="保存"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"/>
        <van-field
            type="number"
            v-model="supply_amount"
            :label="$route.query.name"
            input-align="right"/>
    </div>
</template>

<script>
import requestData  from '../../requestMethod';
export default {
    data(){
        return{
            supply_amount:''
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        onClickRight(){
            requestData('/api/wechat/mmc/goods/update',{
                id:this.$route.query.id,
                supply_amount:this.supply_amount,
                merchant:1
            },'post').then((res)=>{
                if(res.status == 200){
                    this.$toast('补货成功！');
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
    .van-field{
        background: #f7f8fa;

    }
</style>