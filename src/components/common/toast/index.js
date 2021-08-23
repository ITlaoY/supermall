import Toast from './Toast.vue'


const obj = {}

obj.install = function (Vue) {
  // console.log('111', Vue);
  //创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  const toast = new toastContrustor()
  //将组件对象手动挂载
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast;
}


export default obj