### Table 常见坑

通过dialog来编辑，新建，删除table的元素这种业务场景相对于前面说的两种更加的常见。而且也有不少的小坑。 首先我们要明确一个点 vue 是一个MVVM框架，我们传统写代码是命令式编程，拿到table这个dom之后就是命令式对dom增删改。而我们现在用声明式编程，只用关注data的变化就好了，所以我们这里的增删改都是基于list这个数组来的。这里我们还要明确一点[vue 列表渲染注意事项](https://cn.vuejs.org/v2/guide/list.html#注意事项)

> 由于 JavaScript 的限制， Vue 不能检测以下变动的数组： * 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue

所以我们想改变table中第一条数据的值，通过`this.list[0]=newValue`这样是不会生效的。

```
解决方案：
// Array.prototype.splice`
example1.items.splice(indexOfItem, 1, newValue)
复制代码
```

所以我们可以通过

```
//添加数据
this.list.unshift(this.temp);

//删除数据 
const index = this.list.indexOf(row); //找到要删除数据在list中的位置
this.list.splice(index, 1); //通过splice 删除数据

//修改数据
const index = this.list.indexOf(row); //找到修改的数据在list中的位置
this.list.splice(index, 1,this.updatedData); //通过splice 替换数据 触发视图更新
复制代码
```

这样我们就完成了对table的增删改操作，列表view也自动响应发生了变化。这里在修改数据的时候还有一个小坑**需要主要**。 当我们拿到需要修改行的数据时候不能直接将它直接赋值给dialog，不然会发生下面的问题。



![img](https://lc-gold-cdn.xitu.io/a7d80d91001f15b7f5be.gif?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如上图所示，我们在dialog里面改变状态的时候，遮罩下面的table里面该行的状态也在那里跟着一只变化着。原因想必大家都猜到了。赋值的数据是一个objec引用类型共享一个内存区域的。所以我们就不能直接连等复制，需要重新指向一个新的引用，方案如下：



```
//赋值对象是一个obj
this.objData=Object.assign({}, row) //这样就不会共用同一个对象

//数组我们也有一个巧妙的防范
newArray = oldArray.slice(); //slice会clone返回一个新数组
```


作者：花裤衩
链接：https://juejin.cn/post/6844903481224986638
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。