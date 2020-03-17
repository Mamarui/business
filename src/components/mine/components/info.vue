<template>
    <div class="container">
        <van-nav-bar title="个人信息"
            right-text="保存"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"/>
        <van-field
            label="头像"
            input-align="right">
            <van-uploader slot="button" :after-read="changeImg">
                <van-image
                width="3rem"
                height="3rem"
                fit="contain"
                :src="info.avatar"/>
            </van-uploader>
        </van-field>
        <van-field
            v-model="info.name"
            label="姓名"
            input-align="right"/>
        <van-field
            v-model="info.merchant_name"
            label="酒店名"
            input-align="right"/>
        <van-field
            v-model="info.phone"
            label="手机号"
            input-align="right"/>
    </div>
</template>

<script>
import requestData  from '../../../requestMethod';
export default {
    data(){
        return{
            info:{}
        }
    },
    mounted(){
        this.info = JSON.parse(this.$route.query.info);
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },

        // 图片修改
        changeImg(file){
            this.info.headpic = file.content;
        },
        onClickRight(){
            requestData('/api/wechat/mmc/user/profile/update',{
                ...this.info
            },'post').then((res)=>{
                if(res.status==200){
                    this.$router.go(-1);
                }else{
                    this.$toast(res.message);
                }
            },(err)=>{
                alert(err)
            })
        }
    }
}
</script>

<style lang="css" scoped>

</style>