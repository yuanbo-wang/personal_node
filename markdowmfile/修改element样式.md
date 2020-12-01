修改element样式问题： 用ui组件总免不了需要对它做一些个性化定制的需求，所以我们就要覆盖element的一些样式。
首先我们要了解一下vue scoped是什么，很多人非常喜欢用scoped，妈妈再也不用担心样式冲突问题了，其实scoped也没有很神秘的，它就是基于PostCss的，加了一个作用局的概念。
//编译前
.example {
  color: red;
}
//编译后
.example[_v-f3f3eg9] {
  color: red;
}
复制代码它和我们传统的命名空间的方法避免css冲突没有什么本质性的区别。
现在我们来说说怎么覆盖element-ui样式。由于element-ui的样式我们是在全局引入的，所以你想在某个view里面覆盖它的样式就不能加scoped，但你又想只覆盖这个页面的element样式，你就可在它的父级加一个class，以用命名空间来解决问题。
.aritle-page{ //你的命名空间
    .el-tag { //element-ui 元素
      margin-right: 0px;
    }
}
复制代码建议向楼主一样专门建一个scss文件里专门自定义element-ui的各种样式。线上代码
其它关于element相关的东西真的没有什么好说的了，人家文档和源码就放在那里，有问题就去看文档，再去issue里找找，再去看看源码，大部分问题都能解决了。给一个诀窍其实大部分诡异的问题都可以通过加一个key或者
Vue.nextTick来解决。。

作者：花裤衩
链接：https://juejin.cn/post/6844903481224986638
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。