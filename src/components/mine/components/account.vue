<template>
    <div class="container">
        <van-nav-bar title="账号与安全"
            left-arrow
            @click-left="onClickLeft"/>
        <router-link :to="{ path: 'curTele', query: { phone: this.phone }}">
            <van-field
                :value="phone"
                label="手机号"
                input-align="right"
                is-link/>
        </router-link>
        <router-link :to="{ path: 'addBankCard' }">
            <van-field
                label="银行卡管理"
                input-align="right"
                is-link/>
        </router-link>
        <router-link :to="{ path: 'verifyTele' }">
            <van-field
                label="交易密码管理"
                input-align="right"
                is-link/>
        </router-link>
    </div>
</template>

<script>
import requestData  from '../../../requestMethod';
export default {
    data(){
        return{
            phone:'',
        }
    },
    created(){
        this.getInfo();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getInfo(){
            requestData('/api/wechat/mmc/user/profile',{
                user_id:sessionStorage.getItem('user_id')
            },'get').then((res)=>{
                if(res.status==200){
                    console.log(res)
                    this.phone = res.data.phone;
                }
            },(err)=>{
                alert(err)
            })
        },
        
    }
}
</script>