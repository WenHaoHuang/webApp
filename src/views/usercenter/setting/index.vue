<template>
    <div class="wrapper text-lg">
        <section class="bg-white mb20">
            <div @click="linkFn('settingName')" class="cells-before cells-flex cells-arrow">
                <div class="cell_bd">昵称</div>
                <div class="cell_hd">{{userInfo.nickname}}</div>
                <div class="cell_ft"></div>
            </div>
        </section>
        <section class="bg-white mb20">
            <div class="cells-before cells-flex">
                <div class="cell_bd">用户名</div>
                <div class="cell_ft">{{userInfo.username}}</div>
            </div>
            <div class="cells-before cells-flex">
                <div class="cell_bd">手机号码</div>
                <div class="cell_ft">{{userInfo.phoneNumber}}</div>
            </div>
        </section>
        <section class="bg-white mb20">
            <div @click="selectSexFn" class="cells-before cells-flex cells-arrow">
                <div class="cell_bd">性别</div>
                <div class="cell_hd">{{userInfo.sex}}</div>
                <div class="cell_ft"></div>
            </div>
            <div class="cells-before cells-flex cells-arrow">
                <div class="cell_hd">出生日期</div>
                <div class="cell_bd text-right">
                    <datetime
                        v-model="userInfo.birthday"
                        :minYear="1850"
                        :maxYear="2018"
                        :placeholder="'未选择'"
                        @on-confirm="dateSelect"></datetime>
                </div>
                <div class="cell_ft"></div>
            </div>
            <div @click="linkFn('settingEmail')" class="cells-before cells-flex cells-arrow">
                <div class="cell_bd">邮箱</div>
                <div class="cell_hd" v-html="userInfo.email ? userInfo.email : '未设置'"></div>
                <div class="cell_ft"></div>
            </div>
        </section>
        <section class="bg-white mb20">
            <div @click="linkFn('resetPassword')" class="cells-before cells-flex cells-arrow">
                <div class="cell_bd">修改登录密码</div>
                <div class="cell_ft"></div>
            </div>
        </section>
        <div class="container flex mt60">
            <div class="btn btn-primary btn-lg flex-bd" @click="logoutFn">退出登录</div>
        </div>
        <!--选择性别-->
        <select-item :data="selectData" @onCancel="sexCancel" @onSelect="sexSelect"></select-item>
    </div>
</template>

<script>
    import selectItem from '@/components/selectItem'
    import {Datetime} from 'vux'

    export default {
        name: "setting",
        components: {
            selectItem, Datetime
        },
        data() {
            return {
                userInfo: {},
                selectData: {
                    list: [],
                    show: false
                }
            }
        },
        activated() {
            this.getUserBasicInfo()
        },
        methods: {
            getUserBasicInfo() {
                this.$ajax({
                    api: 'getUserBasicInfo',
                    params: {
                        userId: this.$cookies.get('userId')
                    }
                }).then((response) => {
                    this.userInfo = response.data
                })
            },
            linkFn(str) {
                sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
                this.$router.push({
                    name: str
                })
            },
            logoutFn() {
                this.$logout().then(() => {
                    this.$router.push({
                        name: 'login'
                    })
                })
            },
            selectSexFn() {
                this.selectData = {
                    list: ['男', '女', '保密'],
                    selected: this.userInfo.sex,
                    show: true
                }
            },
            sexCancel() {
                this.selectData.show = false
            },
            sexSelect(item) {
                this.$ajax({
                    api: 'updateUserSex',
                    params: {
                        userId: this.$cookies.get('userId'),
                        sex: item
                    }
                }).then((response) => {
                    this.$msg(response.data)
                    this.userInfo.sex = item
                    this.selectData.show = false
                })
            },
            dateSelect() {
                this.$ajax({
                    api: 'updateBirthday',
                    params: {
                        userId: this.$cookies.get('userId'),
                        date:this.userInfo.birthday
                    }
                }).then((response) => {
                    this.$msg(response.data)
                })
            }
        }
    }
</script>

<style lang="scss">
    .dp-container{
        .dp-header .dp-item.dp-right{
            color:#5D3AE0;
        }
        .weui-cell_access .weui-cell__ft:after{
            display:none;
        }
    }
    .vux-datetime{
        &.weui-cell{
            padding:0;
            .weui-cell__ft{
                padding:0;
                &:after{
                    display:none;
                }
                .vux-cell-placeholder, .vux-cell-value{
                    color:#555;
                }
            }
        }
    }
</style>
