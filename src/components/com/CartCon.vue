<template>
    <div class="cartcontrol">
        <transition name="fadeRotate">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decCart($event)">
            <span class="dec-icon inner"></span>
        </div>
        </transition>        
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add" @click.stop.prevent="addCart($event)">
            <span class="add-icon"></span>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
    export default{
        props:{
            food:{
                type:Object
            }
        },
        methods:{
            addCart(event){              
                if(!event._constructed){
                    return
                }
                if(!this.food.count){
                    Vue.set(this.food,'count',0);
                }
                this.food.count++;
                //子组件触发事件
                //this.$root.eventHub.$emit('cart.add', event.target)
            },
            decCart(event){               
                if(!event._constructed||!this.food.count){
                    return
                }
                this.food.count--;
            }
        }
    }
</script>
<style lang="less">
    .cartcontrol
        .cart-decrease{
            display:inline-block;
            width:24px;
            height:24px;    
            padding:6px;
            vertical-align:top;
            line-height:24px;
            transition: all .4s linear;
            .inner{
                line-height: 24px;
                font-size: 24px;
                color :rgb(0,160,220);
                transition :all 0.4s linear;
            }               
            &.fadeRotate-enter-active, &.fadeRotate-leave-active{
                transform :translate3d(0,0,0);
                 .inner{
                    display: inline-block;
                    transform :rotate(0);
                }
            }      
            &.fadeRotate-enter, &.fadeRotate-leave-active{
                opacity: 0;
                transform: translate3d(24px,0,0);
                .inner{
                    transform :rotate(180deg);     
                }
            }      
            .dec-icon{
                display:inline-block;
                width:24px;
                height:24px;
                background:url('../../assets/images/dec.png') no-repeat;
                background-size:24px;
            }
        }
        .cart-count{
            display:inline-block;
            vertical-align:top;
            width:16px;
            font-size:10px;
            color: rgb(147,153,159);
            line-height: 24px;
            text-align: center;
            padding: 6px 0;
        }
        .cart-add{
            display:inline-block;
            width:24px;
            height:24px;    
            padding:6px;
            vertical-align:top;
            line-height:24px;         
            .add-icon{
                display:inline-block;
                width:24px;
                height:24px;
                background:url('../../assets/images/add.png') no-repeat;
                background-size:24px;
            }
        }
</style>