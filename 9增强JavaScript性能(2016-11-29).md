# 增强JavaScript性能(2016/11/29)

标签（空格分隔）： 前端 js

---

> 接下来三天的内容是书上的第四章**增强JavaScript性能**，对应是85页~111页。在这章当中，将会学到如何使用编码窍门，方法，最佳实践和现代API来提升JavaScript的性能。 要全局性的着眼于性能问题，就意味着要考虑整个应用的生命周期。

--- 

> 今天是第一部分，**优化页面加载时间**，85页~91页

---

### **优化页面加载时间**
- **JavaScript**代码是通过**HTML**中**script**标签进行引用来实现加载的。在这个阶段我们所做的变化处理确保代码会**快速，高效的加载**，即代码可以更快地准备就绪来执行，从而提升应用程序的可感知**响应能力**。

#### **1. HTML标签顺序**
- **理由**：当浏览器遇到**script**标签时，大多数情况下，它会停止渲染页面，直到完成对该脚本的读取和解析。
- **实践**：把所有能够移动的**script**标签挪至"/body"标签前。
- **功能**：保证整个页面在各项脚本加载和解析之前进行渲染，提升了页面的可感知响应能力。

#### **2. JavaScript文件的GZip编码传输**
- **gzip编码**：服务器上，在文件发送之前进行压岁，当数据到达浏览器之后，进行解压。
- **功能**：这样，**通过线路传输**的**数据更少**，文件到达浏览器的**时间更快**。
- **实践**：在每个请求发生时进行即时的gzip编码处理会消耗服务器上额外的资源和CPU处理时间。一般可以**预先**把JavaScript和其他基于文本的文件进行**压缩**。

#### **3. 缩编，混淆和编译**
- 要让代码的体积尽可能小，可以通过三个过程来实现，分别是：缩编，混淆，编译
1. **缩编**：将代码中所有的**空格**和**换行符**进行**移除**。
2. **混淆**：（更高级的代码优化方法），原理是这种方式着眼于**变量**和**函数名**。所有的变量和函数名会保留其原来的名称，在限定作用域中的则会在恰当的地方以简短恰当的方式进行替换。
3. **编译**：（更先进的处理方法），会全面地对代码进行分析，并对代码中的语句进行简化，缩减，整合生成有着相同行为的另一语句。
- 提示三种工具：
1. 缩编：**JSMin** 支持node
2. 混淆：**UglifyJS** 支持node
    - ![UglifyJS][1]
3. 编译：**Google Closure Compiler**
    - ![Google Closure Commpiler][2]

#### **4. 使用匿名，自执行的函数闭包来减少全局变量**
```javascript
//这样做避免了无意间产生的全局变量
//从而更加高效地运用缩编，混淆和编译来压缩代码文件的体积
(function{
    var myName = 'quan',
        myAge = 20,
        mySex = 'boy';
        
    //dosomething....
}());
```

#### **5. 请求时才延时加载JavaScript文件**
```javascript
function loadScript(src, onload){
    var scriptTag = document.createElement('script');
    
    scriptTag.src = src;
    
    if(typeof onload === 'function'){
        
        scriptTag.onload = onload;
        
        scriptTag.onreadystatechange = function(){
            
            if(scriptTag === 4){
                onload();
            }
        }
    }
    
    document.body.appendChild(scriptTag);
}
```


  [1]: https://raw.githubusercontent.com/rayshuai/Pro-JavaScript-Development-Reading/master/images/8/uglifyjs.png
  [2]: https://raw.githubusercontent.com/rayshuai/Pro-JavaScript-Development-Reading/master/images/8/closure.png