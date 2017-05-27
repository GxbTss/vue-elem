<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size='36' :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content"><span class="stress">{{seller.minPrice}}</span>元</div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content"><span class="stress">{{seller.deliveryPrice}}</span>元</div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content"><span class="stress">{{seller.deliveryTime}}</span>分钟</div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <span class="img" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <div class="split"></div>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul class="supports" v-if="seller.supports">
                    <li class="support-item" v-for="(item,index) in seller.supports">
                        <img :src='"../../assets/img/"+classMap[seller.supports[index].type]+"_2@2x.png"' alt="">
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <div class="split"></div>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="split"></div>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
        <ShopCartView :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></ShopCartView>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import star from '../com/Star.vue'
import ShopCartView from './ShopCart.vue'

export default{
    data(){
        return {
            seller:{},
            selectFoods:[],
            favorite:false
        }
    },
    created(){
        this.classMap=['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        var _this = this;
        this.$http.get('src/data.json').then((msg)=>{
            _this.seller=msg.data.seller;
            _this.$nextTick(()=>{
            this._initScroll();
            this._initPics();
        })
        }).catch((err)=>{
            console.log(err);
        })
    },
    computed:{
        favoriteText(){
            return this.favorite?"已收藏":"收藏";
        }
    },
    methods:{
        _initPics(){
            if(this.seller.pics){
                let picWidth=120;
                let margin=6;
                let width=(picWidth+margin)*this.seller.pics.length-margin;
                this.$refs.picList.style.width=width+"px";
                this.$nextTick(()=>{
                    if(!this.picScroll){
                        this.picScroll=new BScroll(this.$refs.picWrapper,{
                            scrollX:true,
                            eventPassthrough: 'vertical'
                        })
                    }else{
                        this.picScroll.refresh();
                    }
                })
            }
        },
        _initScroll(){
            if(!this.scroll){
                this.scroll=new BScroll(this.$refs.seller,{
                    click:true
                })
            }else{
                this.scroll.refresh();
            }
        },
        toggleFavorite(event){
            if(!event._constructed){
                return;
            }
            this.favorite=!this.favorite;
        }
    },
    components:{
        star,
        ShopCartView
    }
}
</script>
<style lang="less">
    .seller{
        position:absolute;
        top:174px;
        bottom:0;
        left:0;
        width:100%;
        overflow:hidden;
        .overview{
            position:relative;
            padding:18px;
            .title{
                margin-bottom:8px;
                line-height:14px;
                color:rgb(7,17,27);
                font-size:14px;
            }
            .desc{
                padding-bottom:18px;
                border-bottom:1px solid rgba(7,17,27,.1);
                font-size:0;
                .star{
                    display:inline-block;
                    margin-right:8px;
                    vertical-align:top;
                }
                .text{
                    display:inline-block;
                    margin-right:12px;
                    line-height:18px;
                    vertical-align:top;
                    font-size:10px;
                    color:rgb(77,85,93);
                }
            }
            .remark{
                display:flex;
                padding-top:18px;
                .block{
                    flex:1;
                    text-align:center;
                    border-right:1px solid rgba(7,17,27,.1);
                    &:last-child{
                        border:none;
                    }
                }
                h2{
                    margin-bottom:4px;
                    line-height:10px;
                    font-size:10px;
                    color:rgb(147,153,159);
                }
                .content{
                    line-height:24px;
                    font-size:10px;
                    color:rgb(7,17,27);
                    .sress{
                        font-size:24px;
                    }
                }
            }
            .favorite{
                position:absolute;
                top:18px;
                right:11px;
                width:50px;
                text-align:center;
                .img,.active{
                    display:inline-block;
                    width:50px;
                    height:24px;
                    background:url('../../assets/images/sc.png') no-repeat 13px;
                    background-size:24px 24px;
                    &.active{
                        background:url('../../assets/images/sc_active.png') no-repeat 13px;
                        background-size:24px 24px;
                    }
                }
                .text{
                    display:inline-block;
                    width:50px;
                    line-height:10px;
                    font-size:10px;
                    color:rgb(77,85,93);
                }
            }
        }
        .split{
            width: 100%;
            height: 12px;
            background: #f3f5f7;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
        .bulletin{
            padding:18px 18px 0 18px;
            .title{
                margin-bottom:8px;
                line-height:14px;
                font-size:14px;
                color:rgb(7,17,27);
            }
            .content-wrapper{
                padding:0 12px 16px 12px;
                .content{
                    line-height:24px;
                    font-size:12px;
                    font-weight:200;
                    color:rgb(240,20,20);
                }
            }
            .supports{
                .support-item{
                    padding:16px 12px;
                    border-top:1px solid rgba(7,17,27,.1);
                    img{
                        vertical-align:top;
                        width:16px;
                        height:16px;
                    }
                    .text{
                        margin-left:6px;
                        vertical-align:top;
                        line-height:16px;
                        font-size:12px;
                        font-weight:200;
                        color:rgb(7,17,27);
                    }
                }
            }
        }
        .pics{
            padding:18px;
            .title{
                margin-bottom:12px;
                line-height:14px;
                color:rgb(7,17,27);
                font-size:14px;
            }
            .pic-wrapper{
                width:100%;
                overflow:hidden;
                .pic-list{
                    font-size:0;
                    .pic-item{
                        display:inline-block;
                        margin-right:6px;
                        width:120px;
                        height:90px;
                        &:last-child{
                            margin:0;
                        }
                    }
                }
            }
        }
        .info{
            padding:18px 18px 0 18px;
            color:rgb(7,17,27);
            .title{
                padding-bottom:12px;
                line-height:14px;
                font-size:14px;
            }
            .info-item{
                padding:16px 12px;
                line-height:16px;
                border-top:1px solid rgba(7,17,27,.1);
                font-size:12px;
            }
        }
}
</style>