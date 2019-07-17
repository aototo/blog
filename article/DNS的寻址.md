## dns寻址的理解



域名下dns 查找策略

1. 客户机host配置或者是历史dns 应答内容被加载到缓存。存在-> 直接访问 -> 访问结束，不存在则转第2步。
2. 根据linux 环境 resole.conf 查找dns 配置，先后顺序遍历各个dns 服务器。
3. 在dns服务器管理的区域进行对应的查找
4. 在dns服务器本地的缓存中进行查询，若不在继续
5. 利用递归全面分析解析，利用网络中的其他DNS服务器协助，进行递归查询。
6. 首先 xxxx.com 先用转寄查询方式向`com`DNS服务器查询以得到xxxx.com服务器地址，然后相同的方式从xxxx.com 获得 xxx.xxxx.com 服务器地址



参考 https://blog.csdn.net/annulsluo/article/details/50779344