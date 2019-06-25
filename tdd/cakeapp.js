const express=require('express');
const bodyParser=require('body-parser');

//引入路由模块
const cors=require('cors');
// const index=require("./routes/index");
const userRouter=require('./routers/user.js');
const details=require('./routers/detail.js');
const productRouter=require('./routers/product.js');


//创建web服务器
var server=express();
server.listen(3000);
server.use(cors({
  origin:"http://127.0.0.1:5500"
}))
server.use(bodyParser.urlencoded({
  extended:false
}))

//托管静态资源到public下；
server.use(express.static('public'));

server.use('/user',userRouter);
server.use('/product',productRouter);
server.use('/details',details);
