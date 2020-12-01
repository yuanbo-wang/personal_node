# 给组件绑定的事件为什么无法触发？
在 Vue 2.0 中，为自定义组件绑定原生事件必须使用 .native 修饰符：

```
<my-component @click.native="handleClick">Click Me</my-component>
从易用性的角度出发，我们对 Button 组件进行了处理，使它可以监听 click 事件：

<el-button @click="handleButtonClick">Click Me</el-button>
但是对于其他组件，还是需要添加 .native 修饰符。
```
# Watch immediate
这个已经算是一个比较常见的技巧了，这里就简单说一下。当 watch 一个变量的时候，初始化时并不会执行，如下面的例子，你需要在created的时候手动调用一次。
// bad
created() {
  this.fetchUserList();
},
watch: {
  searchText: 'fetchUserList',
}
复制代码你可以添加immediate属性，这样初始化的时候也会触发，然后上面的代码就能简化为：
// good
watch: {
  searchText: {
    handler: 'fetchUserList',
    immediate: true,
  }
}


复制代码ps: watch 还有一个容易被大家忽略的属性deep。当设置为true时，它会进行深度监听。简而言之就是你有一个 const obj={a:1,b:2}，里面任意一个 key 的 value 发生变化的时候都会触发watch。应用场景：比如我有一个列表，它有一堆query筛选项，这时候你就能deep watch它，只有任何一个筛序项改变的时候，就自动请求新的数据。或者你可以deep watch一个 form 表单，当任何一个字段内容发生变化的时候，你就帮它做自动保存等等



# Object.freeze
这算是一个性能优化的小技巧吧。在我们遇到一些 big data的业务场景，它就很有用了。尤其是做管理后台的时候，经常会有一些超大数据量的 table，或者一个含有 n 多数据的图表，这种数据量很大的东西使用起来最明显的感受就是卡。但其实很多时候其实这些数据其实并不需要响应式变化，这时候你就可以使用 Object.freeze 方法了，它可以冻结一个对象(注意它不并是 vue 特有的 api)。
当你把一个普通的 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter，它们让 Vue 能进行追踪依赖，在属性被访问和修改时通知变化。
使用了 Object.freeze 之后，不仅可以减少 observer 的开销，还能减少不少内存开销。相关 issue。
使用方式：this.item = Object.freeze(Object.assign({}, this.item))
这里我提供了一个在线测速 demo，点我。
通过测速可以发现正常情况下1000 x 10 rerender 都稳定在 1000ms-2000ms 之间，而开启了Object.freeze的情况下，rerender 都稳住在 100ms-200ms 之间。有接近 10 倍的差距。所以能确定不需要变化检测的情况下，big data 还是要优化一下的。

作者：花裤衩
链接：https://juejin.cn/post/6844903840626507784
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
