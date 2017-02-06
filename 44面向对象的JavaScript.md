# 面向对象的JavaScript

---

## **面向对象的JavaScript**
### **基于原型**
- JS中的所有类型都拥有**原型**
- 当使用对象的某个属性时，JS引擎会在两个地方查找该属性：
    - 一个是对象本身
    - 另一个是对象的原型链上
#### **Object.create()**
- 使用接口：
```
Object.create(proto, [propertiesObject])

- proto: 一个对象，新建对象的原型
- propertiesObject: 可选。该对象是一组属性和属性描述符，其中属性将会是新创建对象的属性


//详细使用如下（摘自MDN）：
o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { writable:true, configurable:true, value: "hello" },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) { 
        console.log("Setting `o.bar` to", value);
    }
 }
});
```
- 使用**对比**：
```
var o;      //undefined

例一：
var o = {};
//上面创建对象字面量的方法等同于下面：
var o = Object.create(Object.prototype);


例二：
function Constructor(){}
o = new Constructor();
//上面一句等同于
o = Object.create(Constructor.prototype);

例三：
//这么做会返回一个没有任何属性的对象，连__proto__都没有
var o = Object.create(null);
```
- **polyfill**
```
if( typeof Object.create !== 'function' ){
    
    Object.create = (function(){
        
        function Temp(){};
        
        return function(o){
            if(typeof o !== 'object'){
                throw TypeError('Object prototype may only be an Object or null');
            }
            
            Temp.prototype = o;
            var obj = new Temp();
            Temp.prototype = null;
            
            if(arguments.length > 1){
                var properties = Object(argument[1]);
                
                for(var prop in properties){
                    if(Object.prototype.hasOwnProperty.call(properties, prop)){
                        obj[prop] = properties[prop];
                    }
                }
            }
            
            return obj;
        };
    })();
}
```
### **新学函数**
- **isPrototypeOf()**：判断一个对象是否在另一个对象的原型链上。
- **getPrototypeOf()**：[详情点这里][1]


  [1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf