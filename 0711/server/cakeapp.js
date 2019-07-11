const express=require('express');
const bodyParser=require('body-parser');

//引入路由模块
const cors=require('cors');
// const index=require("./routes/index");
const userRouter=require('./routers/user.js');
const details=require('./routers/detail.js');
const product=require('./routers/product');
const index=require('./routers/index');
const pics=require('./routers/pics');
const list=require('./routers/list');
const find=require('./routers/find');

//创建web服务器
var server=express();
server.listen(3000);
//跨域请求cors
server.use(cors({
  origin:"http://localhost:8080" ,
  credentials: true
}));
// server.writeHead(200,{"Access-Control-Allow-Credentials":true});
server.use(bodyParser.urlencoded({
  extended:false
}));




//托管静态资源到public下；
server.use(express.static('public'));

server.use('/user',userRouter);

server.use('/product',product);
server.use('/details',details);
server.use('/index',index);
server.use('/pics',pics);
server.use('/list',list);
server.use('/find',find);
