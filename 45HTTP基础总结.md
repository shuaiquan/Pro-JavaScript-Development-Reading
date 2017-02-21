# HTTP基础总结

---

> 这篇文章的深度和知识点基本上是关于，一个入门前端所应掌握的HTTP的相关内容。

## **什么是HTTP**
- **HTTP**（Hypertext Transfer Protocol）,即**超文本传输协议**。一般用来在网络中进行文档，图片，音频和视频等**数据资源**的**传输**。
- **HTTP协议**是一种**无状态**的，**应用层**协议：
    - 无状态是指：每一个请求都是独立的，不同的请求之间没有关联。
    - 应用层：如下图中HTTP所在的网络中的位置![此处输入图片的描述][1]

## **工作方式**
- **client**向服务器经过HTTP协议发送一个**request(请求)**，**服务器**收到request后，经过一些处理返回client一个**response(响应)**。如图：![此处输入图片的描述][2]

## **URL**
- **URL（Uniform Resource Locator）**用来描述一个网络上的资源。
### **URL详解**
- 这部分内容参考了[这篇文章][3]
- ![此处输入图片的描述][4]
- URL格式：
    - schema://host[:port#]/path/[;url-params][?query-string][#anchor]
    - **schema**:使用协议，一般为http或https
    - **host**:服务器IP地址或域名
    - **port**:端口。HTTP服务器默认端口为80，HTTPS默认端口为443
    - **path**:网络资源的路径
    - **url-params**:URL的参数
    - **query-string**:发送给服务器的数据
    - **anchor**：锚

## **请求方法（Method）**
- HTTP定义了一组请求方法，来告诉服务器，我们要对所请求的资源进行什么样的操作：
    - **GET**：向指定资源发出“显示”请求。只用于获取数据。
    - **POST**：向指定资源提交数据，数据被包含在请求文本中。
    - **PUT**：向指定资源上传最新的内容。
    - **DELETE**：删除Request——URI所标识的资源
    - **HEAD**：Same as GET, but only transfer the status line and header section.
    - **CONNECT**：Establish a tunnel to the server identified by the target resource.
    - **OPTIONS**：Describe the communication options for the target resource.
    - **TRACE**：Perform a message loop-back test along the path to the target resource.

## **响应状态码**

### **5种状态**
- 响应状态码的第一个数字代表了响应的5种状态：
```
1xx：信息，请求收到，继续处理
2xx：成功，行为被成功地接受、理解和采纳
3xx：重定向，为了完成请求，必须进一步执行的动作
4xx：客户端错误，请求包含语法错误或者请求无法实现
5xx：服务器错误，服务器不能实现一种明显无效的请求
```
### **常见的状态码**
```
200 OK 请求成功
301 Moved Permenantly 请求目标被转移至新地址，在响应头中包含有该目标的新地址
302 Found 目标被暂时移动。
400 Bad Request 错误请求
401 Unauthorized 未授权访问该资源
403 Forbidden 禁止访问该资源
404 Not Found 未找到
500 Internet Server Error 内部服务器错误
502 Bad Gateway 网关错误
503 Service Unavailiable 服务不可用
```
- [参考文档][5]
    
## **HTTP消息结构**
### **HTTP消息结构概览**
- HTTP消息分为**Request**消息和**Response**消息两种
- **Request**和**response**都由三部分构成：
```
1. start-line 开始行
2. header 消息头（一个或多个）
3. body 消息体
```
#### **开始行**
- **start-line**分为两种：
```
1. Request-Line: "METHOD/path-to-resource http-version"
2. Response-Line: "http-version status-code message"
```
#### **消息头**
- **header**消息头，有一下三种：
```
1. general header
2. entity header
3. request/response header
```
##### **General Headers**
- **general headers**消息头就是可以被request和response共有的消息头：
```
Cache-Control   指定请求或响应的缓存机制
Connection  指定与连接有关的选项
Date    日期和时间标志
Pragma  
Trailer
Transfer-Encoding   对报文采用的编码方式
Upgrade
Via
```
##### **Entity Headers**
- **entity headers**描述消息体（body）的消息头
```
Allow                    
Content-Encoding  
Content-Language  
Content-Length    
Content-Location  
Content-MD5       
Content-Range     
Content-Type      
Expires           
Last-Modified
```
##### **Request Headers**
```
request-header = Accept                   
               | Accept-Charset    
               | Accept-Encoding   
               | Accept-Language   
               | Authorization     
               | Expect            
               | From              
               | Host              
               | If-Match          
               | If-Modified-Since 
               | If-None-Match     
               | If-Range          
               | If-Unmodified-Since
               | Max-Forwards       
               | Proxy-Authorization
               | Range              
               | Referer            
               | TE                 
               | User-Agent
```
##### **Response Headers**
```
response-header = Accept-Ranges
                | Age
                | ETag              
                | Location          
                | Proxy-Authenticate
                | Retry-After       
                | Server            
                | Vary              
                | WWW-Authenticate
```

  [1]: http://img.blog.csdn.net/20151103145115996
  [2]: http://img.blog.csdn.net/20151103151532193
  [3]: https://yq.aliyun.com/articles/5892
  [4]: http://img.blog.csdn.net/20151103151235371
  [5]: http://www.opsschool.org/en/latest/http_101.html