# rubyChinaSpa
Build with angularjs and ruby-china.org api/v2.

## 简介
ruby-china.org的SPA版, 根据ruby-china.org api制作.使用简单的angularjs语法, 未涉及复杂的directive与filters等.

## 功能
- 帖子(index/show)
- 节点(index/show)
- 用户(index/show)
- 用户登陆(基于loginname, token)
  - 发表新贴
  - 发表评论
  - 收藏帖子
- 支持 markdown即时预览(预览格式与ruby-china.org原站略有不同.)
- 支持 emoji

## ~~DEMO~~
~~因为CROS的原因, 无论是在线测试还是本地测试, 都无法获取ruby-china.org的api数据. 除非ruby-china.org管理员允许CROS.~~

当前ruby-china.org官方已支持CROS, :), 此节可省. 以下部分保留以作参考;

### ~~DEMO运行的前提~~

~~Google chrome 浏览器通过运行非安全模式(暂时)解决此问题:~~

- Linux: `google-chrome --disable-web-security`
- Mac: `open -a Google\ Chrome --args --disable-web-security`
- windows: 进入到chrome安装目录, `chrome.exe --disable-web-security`

注意: 必须完全关闭google chrome之后再运行此命令. 否则只要有任何一个chrome实例存在, 此模式将启动失败.

如果运行命令后出现`You are using an unsupported command-line flag: --disable-web-security. Stability and security will suffer.` 或 `您使用的是不受支持的命令行标记: —disable-web-security. 稳定性和安全性会有所下降.`的提示, 即可正常浏览.

[参考](http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome/6083677#6083677)

### Online Demo:
[http://rbspa.zhuboliu.me](http://rbspa.zhuboliu.me)

**测试帐号**: rbspa

**token**: 3d8757cc530374f18778:13471

以上帐号仅为新注册的测试帐号, 不能发帖, 只能回帖.

注意: 可以使用个人的登陆名与token登陆, 但不推荐使用(虽然个人保证不在log中记录任何个人的token).

### 本地测试

    git clone https://github.com/suffering/rubychinaspa.git
    cd rubychinaspa
    npm install connect
    node server.js
    google-chrome http://localhost:1337 --disable-web-security

  本地测试分两种模式, 一种是直接引用ruby-china.org/api/v2的数据, 另一种是本地运行ruby-china, 而后将`services.js`中的`base_url()`函数的返回值改为`http://localhost:3000`.

## TODO
- 简化代码, 引入更多angularjs的高阶应用.
- 用户`喜欢`/`收藏`功能.
- 图片上传功能
- 允许多界面多主题切换.

**帖子列表**
![](https://ruby-china-files.b0.upaiyun.com/photo/2014/9bdfcb9484284a9165f9911ee6f81938.png)
**发帖, markdown即时预览**
![](https://ruby-china-files.b0.upaiyun.com/photo/2014/929a5e67edcf3743eb63fa672097ee71.png)
**节点**
![](https://ruby-china-files.b0.upaiyun.com/photo/2014/89de6a00aefd4a7eb5e7663b5855320d.png)
**Login**
![](https://ruby-china-files.b0.upaiyun.com/photo/2014/a80b340ff8d0cbb2924fe965dc0ffde3.png)
**Users#show**
![](https://ruby-china-files.b0.upaiyun.com/photo/2014/82fd1f0051d02e43d0f164ce82750478.png)
![](https://ruby-china-files.b0.upaiyun.com/photo/2014/ef497440fcecae29b279445df7c41fde.png)
