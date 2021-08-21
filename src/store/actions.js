import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    //判断是否是同一商品
    //先查找数组中有没有和新添加的商品iid一样的商品,如果有，把这个商品赋值给oldproduct
    let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
    //判断，如果有相同的商品，把这个商品的count+1，如果没有，将新添加商品count设为1，push到数组中
    if (oldproduct) {
      context.commit(ADD_COUNTER, oldproduct)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  }
}