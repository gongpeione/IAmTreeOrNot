# 带拖拽上传的微博图床


[Demo](http://geeku.work/wbu/)

## Usage

```php
    //应用的AppKey
    $k = "source";
    $v = ""; //将此处的内容修改为你的应用Appkey
    
    ···
    
     //微博的可见性，0：所有人能看，1：仅自己可见，2：密友可见，3：指定分组可见，默认为0。
    $k = "visible";
    $v = 2; //将此处的内容修改为微博可见性
    
    ···
    
    curl_setopt($ch, CURLOPT_USERPWD, "xxx:xxx"); //将此处的内容修改为微博的 用户名:密码
```
