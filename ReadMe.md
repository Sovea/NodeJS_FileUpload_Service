### NodeJs简单文件上传接口

> *项目需要Node环境及npm，请自行安装

1. 根目录下安装项目依赖 

   ```javascript
   npm install
   ```

4. 修改域名

   > 将routes/files.js  fileUrl中http://127.0.0.1:8999 改为服务器真实IP:8999，上传文件时字段命名为file

5. 开启服务

   ```
   node app.js 或 npm start(默认)
   pm2 start app.js --name xxxx(推荐使用pm2)
   ```

4. 接口路径

   上传文件接口路径为：http://127.0.0.1:8999/files/upload

