# JavaScript错误和代码度量(2016/11/28)

标签（空格分隔）： 前端 js

---

> 今天是编写高质量的JavaScript代码的余下内容。74页~84页。主要分为第一部分JavaScript中的错误，第二部分度量代码质量。

### **处理运行时错误**
- JavaScript提供了一中**捕获运行时错误**的**机制**，我们可以通过这种机制来应对错误而不会影响代码其他部分的运行

#### **1. JavaScript原生错误类型（六种）**
1. **语法错误**
2. **类型错误**
3. **范围错误**
4. **eval错误**
5. **应用错误**
6. **URI错误**

#### **2. try-catch语句**
- **注意的：** **使用try时可以不包括catch，但如果没有catch就必须有finally**。在这种情况下，错误仍然会在浏览器中抛出，但在此之前会首先执行finally代码块，可以利用这个机会在抛出错误之前做好收尾工作。

#### **3. 检测错误类型**
- 所有的**错误类型**都继承自**原生基类Error**
```javascript
try{
    //可能抛出错误的代码
}catch(error){
    if( error instanceof SyntaxError){
    
    }else if(error instanceof TypeError){
        
    }else if(error instanceof RangeError){
        
    }else if(error instanceof EvalError){
    
    }else if(error instanceof ReferenceError){
    
    }else if(error instanceof URIError){
    
    }
}
```

#### **4. 自定义错误类型**
- JavaScript创建一个新的错误类型和创建一个新的‘类’一样。
```javascript
//定义新的错误类型
var ElementNotFoundErro = Class.create({
    id: '',
    message: 'the element could not be found by given ID',
    initialize: function(id){
        this.id = id;
    }
})

function findElement(id){
    var elem = document.getElementById(id);
    if(!elem)
        throw new ElementNotFoundError(id);     //抛出错误
    return elem;
}

try{
    findElement('header');
}catch(error){
    if( error instanceof ElementNotFoundError) {
        //这里善后
    }
}
```


