//引入路由模块
const express=require('express');
//创建路由器对象
var router=express.Router();
//引入连接池模块
const pool=require('../pool.js');
const querystring=require('querystring');
// const bodyParser=require('body-parser');
//商品查询
router.get('/',(req,res)=>{
	var search1=decodeURI(req.query.search_product);
	// search1=search1.split("");
	search1 = search1.replace(/\"/g, "");
	search1 = search1.replace(/'/g, "");
console.log(search1);
	if(!search1){
		res.send('请至少输入一个商品关键字');
		return;
	}else{
	pool.query(`select * from product_details where advertisement LIKE ? `,[`%${search1}%`],(err, result) =>{
		if (err) console.log(err);
		var search = result[0];
		console.log(search);
		console.log(search1+"111");
		console.log("haha1");
		res.send(search);
	});}

});
//导出路由器对象
module.exports=router;

