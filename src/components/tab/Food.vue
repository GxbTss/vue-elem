<template>
    <transition name="foodFade">
        <div class="detailWrapper" v-show="showDetail" ref="detailWrapper">
            <div class="foodDetail">
                <div class="back" @click="showToggle">
                    <img src="../../assets/images/lt.png" alt="">
                </div>
                <img :src="food.image" alt="" width="100%" height="425">
                <div class="info">
                    <div class="title">{{food.name}}</div>
                    <div class="desc">
                        <span>月售{{food.sellCount}}</span>
                        <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="unit">￥{{food.price}}</span>
                        <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <transition name="showAdd">
                        <div class="shopCart">
                            <div class="text" @click="addCart($event)" v-show="!food.count">加入购物车</div>
                        </div>
                    </transition>
                    
                    <CartConView :food="food"></CartConView>
                </div>
                <div class="divider" v-show="food.info"></div>
                <div class="desc" v-show="food.info">
                    <div class="title">商品介绍</div>
                    <div class="content">{{food.info}}</div>
                </div>
                <div class="divider"></div>
                <div class="rating">    
                    <div class="title">商品评价</div>
                    <RatingSelView @select="selectRating" @toggle="toggleContent" :selectType='selectType' :onlyContent='onlyContent' :desc='desc' :ratings='food.ratings'></RatingSelView>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings&&food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.name}}</span>
                                    <img :src="rating.avatar" class="avatar" width="12" height="12" alt="">
                                </div>
                                <div class="time">{{rating.rateTime|Timer}}</div>
                                <p class="text">
                                    <span></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import CartConView from '../com/CartCon.vue'
import Vue from 'vue'
import BScroll from 'better-scroll'
import RatingSelView from '../com/RatingSel.vue'
const ALL =2;
    export default{
        data(){
            return {
                showDetail:false,
                selectType:ALL,
                onlyContent:false,
                desc:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽'
                }
            }
        },
        props:{
            food:{
                type:Object
            }
        },
        methods:{
            needShow(type,text){
                if(this.onlyContent&&!text){
                    return false;
                }
                if(this.selectType==ALL){
                    return true;
                }else{
                    return type ===this.selectType;
                }
            },
            selectRating(type){
                this.selectType=type;
                //alert(this.selectType);
                this.$nextTick(() => {
                    this.detailScroll.refresh();
                    });
                    
                
            },
            toggleContent(){
                this.onlyContent=!this.onlyContent;
                this.$nextTick(() => {
                    this.detailScroll.refresh();
                    });
            },
            showToggle(){
                this.showDetail=!this.showDetail;
                if(this.showDetail){
                    this.$nextTick(()=>{
                        this._initScroll()
                    })
                }
            },
            addCart(event){
                if(!event._constructed){
                    return
                }
                this.$set(this.food,'count',1);
                //this.$root.eventHub.$emit('cart.add', event.target)
            },
            _initScroll(){
                if(!this.detailScroll){
                    this.detailScroll= new BScroll(this.$refs.detailWrapper,{
                        click:true
                    })
                }else{
                    this.detailScroll.refresh();
                }
            }
        },
        components:{
            CartConView,
            RatingSelView
        }
    }
</script>
<style lang="less">
    .detailWrapper{
        position:fixed;
        left:0;
        top:0;
        bottom:48px;
        width:100%;
        background:#fff;
        transition:all 0.4s ease;
        &.foodFade-enter-active,&.foodefade-leave-active{
            transform:translate3d(0,0,0)
        }
        &.foodFade-enter,&.foodFade-leave-active{
            transform:translate3d(100%,0,0);
        }
    }
    .foodDetail{
        .back{
            position:absolute;
            top:12px;
            left:6px;
            img{
                width:24px;
                height:24px;
            }
        }
        .info{
            position:relative;
            padding:18px;
            width:100%;
            box-sizing:border-box;
            .title{
                font-size:14px;
                font-weight:700;
                color:rgb(7,17,27);
                line-height:14px;
            }
            .desc{
                display:flex;
                padding:0;
                padding-top:8px;
                font-size:10px;
                color:rgb(147,153,159);
                line-height:10px;
                span:last-child{
                    padding-left:12px;
                }
            }
            .price{
                display:flex;
                padding-top:18px;
                fonts-size:14px;
                font-weight:700;
                color:rgb(240,20,20);
                line-height:24px;
                .unit{
                    font-size:10px;
                    font-weight:normal;
                }
                .oldPrice{
                    padding-left:12px;
                    font-size:10px;
                    font-weight:normal;
                    color:rgb(147,153,159);
                    line-height:24px;
                }
            }
            .shopCart{
                position:absolute;
                right:18px;
                bottom:18px;
                height:24px;
                text-align:center;
                z-index:2;
                .text{
                    height:100%;
                    line-height:24px;
                    color:#Fff;
                    font-size:10px;
                    padding: 0 12px;
                    border-radius:12px;
                    background:rgb(0,160,220);

                }
            }
            .cartcontrol{
                position:absolute;
                right:12px;
                bottom:12px;
            }
        }
        .divider{
            width:100%;
            height:12px;
            background:#f3f5f7;
            border-top:1px solid rgba(7,17,27,.1);
            border-bottom:1px solid rgba(7,17,27,.1);
        }
        .desc{
            padding:18px;
            .title{
                fnts-size:14px;
                fontw-weight:500;
                color:#07111b;
                margin-bottom:6px;
            }
            .content{
                fonts-size:12px;
                font-weight:200;
                color:rgb(77,85,93);
                line-height:24px;
                padding:0 8px;
            }
        }
        .rating{
            padding-top:18px;
            .title{
                line-height:14px;
                margin-left:18px;
                font-size:14px;
                color:rgb(7,17,27);
            }
            .rating-wrapper{
                padding:0 18px;
                .rating-item{
                    position:relative;
                    padding:16px 0;
                    border-bottom:1px solid rgba(7, 17, 27, 0.1);
                    .user{
                        position:absolute;
                        right:0;
                        top:16px;
                        line-height:12px;
                        font-size:0;
                        .name{
                            display:inline-block;
                            margin-right:6px;
                            vertical-align:top;
                            font-size:10px;
                            color:rgb(147,153,159);
                        }
                        .avatar{
                            border-radius:50%;
                        }
                    }
                    .time{
                        margin-bottom:6px;
                        line-height:12px;
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                    .text{
                        line-height:16px;
                        font-size:12px;
                        color:rgb(7,17,27);

                    }
                }
                .no-rating{
                    padding:16px 0;
                    font-size:12px;
                    color:rgb(147,153,159);
                }
            }
        }   
    }
</style>