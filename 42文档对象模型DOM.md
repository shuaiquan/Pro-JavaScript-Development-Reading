# 文档对象模型DOM

标签（空格分隔）： 前端 DOM

---

## **什么是DOM**
> 文档对象模型(DOM)是HTML和XML文档的**编程接口**。DOM将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。

- 个人理解：**DOM就是一组可以在程序中访问HTML或XML文档的API**。DOM将这两者连接了起来。

> **一个Web页面就是一个文档**。这个文档可以在浏览器窗口或作为HTML源码显示出来。**DOM**则对该文档提供了另一种表现，存储和操作的方式。DOM是web页面的完全的面向对象表述，可以使用Java，PHP，Perl，JavaScript，python等编程语言来修改或操作

### **DOM结构**
- HTML文档的结构在DOM中描述成一颗导航的树，DOM树中的一切都是节点，每一个节点都有一个叫做nodeType的节点类型属性
- 详情可以参考[这篇文章][1]

### **DOM相互关系**
- 每一个DOM节点都包含了一组指针，我们可以利用这些指针在DOM中导航。![此处输入图片的描述][2]
- 例如：
```
<p><strong>hello</strong> how are you doing?</p>

上面的关系如下（原版来自精通JavaScript第二版）：
```
![此处输入图片的描述][3]

- 关于这一部分的内容，我在网上看到一篇比较详细的文章,[文章详情][4]

## **访问DOM元素**
### **常用函数**
- **document.getElementById('id')**：返回一个引用或者null。
    - **只**能**作用于document对象**
    - 返回的对象是一个Element类型的实例

> 下面两个函数可以用于访问**元素集合**。而且，返回的元素集合是**实时变化（live）**的。也就是说，如果DOM发生了改变，那么集合就会进行**自动更新**。

- **getElementsByTagName('li')**：返回一个**实时变化**的**NodeList**
    - 可以作用于任何元素
    - 返回元素集合
- **getElementsByClassName('class')**：返回一个**实时变化**的**HTMLCollection**
    - 可以作用于任何元素
    - 返回元素集合
- 如果想要访问集合中的某一个，可以：
```
var lis = ul.getElementsByTagName('li');
//两种方式：
lis[1];

lis.item(1);
```

### **使用CSS选择器**
- 有两个函数可以通过CSS选择器访问元素：
    1. **querySelector()**：返回匹配该选择器的第一个元素的引用
    2. **querySelectorAll()**：返回一个包含所有匹配元素的**静态**NodeList(不会实时更新)
    
## **等待HTML DOM载入**
> 如果JS在DOM完全载入之前执行，有可能会产生很多问题

### **等待页面载入**
- 这是最常见的方案，等待页面完全载入之后在执行DOM操作。
```javascript
window.addEventListener('load', function(){
    ...
});
```
- 这种方法最简单也最慢。会等待所需的全部文件下载完才会触及load事件。

### **等待正确的事件**
- 如果在较新的浏览器中，可以检查**DOMContentLoaded事件**。该事件会在文档完全载入并解析后触发，不会等待样式文件，图片文件，子框架页面的加载。

## **获取元素内容**
- DOM元素都可能包含三种内容：文本，元素，文本和元素。
###　**获取元素的文本内容**
- **innerText**：非mozilla浏览器
- **elem.firstChild.nodeValue**：全部浏览器
- **textContent**：一个节点及其内部节点的文本内容
### **获取元素的HTML**
- **innerHTML**：执行速度快，但有以下问题：
    - 在IE8以及更低的版本中，返回的元素都是大写的


## **使用元素特性**
### **特性数组**
- **elem.attributes**
- 一般特性值的获取与设置：
    - **getAttribute()**
    - **setAttribute()**

## **修改DOM**
- 修改DOM的三个步骤：
    - 创建一个新的元素
    - 将创建的新元素插入DOM
    - 删除元素
- **创建DOM节点**：
    - **createElement()**：接收一个元素的标签名做参数，返回该元素对应的虚拟DOM描述
- **插入DOM**
    - **insertBefore**：在当前节点的某个子节点之前在插入一个子节点
        - 示例：
        ```
        parentElement.insertBefore(newElement, referenceElement);
        
        newElement为要插入新节点
        ```
    - **appendChild**：将新节点添加到指点节点的子节点的末尾
- **删除DOM**
    - **removeChild**：从父节点中移除指定的子节点
                

  [1]: http://itbilu.com/javascript/js/Ny3B0ddWg.html
  [2]: https://raw.githubusercontent.com/rayshuai/Pro-JavaScript-Development-Reading/master/images/42DOM/DOM.png
  [3]: https://raw.githubusercontent.com/rayshuai/Pro-JavaScript-Development-Reading/master/images/42DOM/DOM%20%281%29.png
  [4]: http://itbilu.com/javascript/js/E1KPosrWl.html