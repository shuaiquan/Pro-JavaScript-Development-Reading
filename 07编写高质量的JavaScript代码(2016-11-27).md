# 编写高质量的JavaScript代码(2016/11/27)

标签（空格分隔）： 前端 js

---

> 接下来的三天的读书任务是第三章，关于编写高质量的JavaScript代码。是书上的60页~84页。主要将介绍一些代码分析工具、单元测试的原理，以及如何处理运行时的错误。最后还将介绍如何度量代码的质量，并关注代码质量的持续改进。

--- 

> 今天主要内容是第一部分静态代码分析，和第二部分JavaScript中的单元测试。是书上的60页~74页。这部分我主要以大纲的形式为主，重在实践。可以用来参考

---

### **进行静态代码分析**
> 在运行之前对代码进行检查,可以有效的找到代码中的潜在错误。静态分析工具能发现常见的出错因素和陷阱，并进行提示。下面介绍几种比较流行的静态分析工具。

#### **1. JSLint**
- 来源于Yahoo，据说有很浓郁的工具贡献者的编程风格，不过也可以在Options区域进行自定义
- [在线平台][1]
- [在线文档][2]
- node方式使用, 详情可以点这里[github地址][3]
```
//安装
npm install -g jslint
//使用
jslint *.js
```
- 体验：在不设置的前提下，警告错误多到你怀疑人生，而且个人感觉下面的Options选项比较难懂（是我英文太差了吗？！），不去仔细研究一下的话，还是不太友好的。（附上一张截图）
- ![jslint测试][4]

#### **2. JSHint**
- 其实是JSLint原始代码的一个分支（从名字上也可以猜一猜），用法几乎相同，更偏重于语法检查。
- [官网][5]
- [在线文档][6]
- 提示，这个有sublime的插件哦
- node使用
```
//安装
npm install -g jshint
//使用
jshint *.js
```
- 体验：界面这个高端。。一下还不知道怎么用（摊手），然后提示的话就比较友好啦，实用！！（不过有3个警告，后两个我不服！付截图）
- ![jshint测试][7]

#### **3. Google Closure Compiler和Closure Linter**
- 这个后续会有详细介绍，这里简单说一下。
- 这个的特点是对编码风格，做了规范，具体了解了以后来补充
- 体验：不敢说什么，默默的放一张截图
- ![Closure Compiler][8]

### **JavaScript中的单元测试**
- 书上提到的单元测试框架有**QUnit, Mocha, Jasmine**
- [QUnit][9]
- [Mocha][10]
- [Jasmine][11]


  [1]: http://jslint.com/
  [2]: http://jslint.com/lint.html
  [3]: https://github.com/reid/node-jslint
  [4]: https://raw.githubusercontent.com/rayshuai/Pro-JavaScript-Development-Reading/master/images/6/jslint.png
  [5]: http://jshint.com
  [6]: http://jshint.com/docs/options
  [7]: https://raw.githubusercontent.com/rayshuai/Pro-JavaScript-Development-Reading/master/images/6/jshint.png
  [8]: https://raw.githubusercontent.com/rayshuai/Pro-JavaScript-Development-Reading/master/images/8/closure.png
  [9]: http://qunitjs.com
  [10]: http://visionmedia,github.io/mocha/
  [11]: http://pivotal.github.io/jasmine/