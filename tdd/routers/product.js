//引入路由模块
const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
const querystring=require('querystring');
const bodyParser=require('body-parser');
//创建路由器对象
var router=express.Router();
//商品查询
router.get('/search',(req,res)=>{
	var $search=req.query.search_product;
	if(!$search){
		res.send('请至少输入一个商品关键字');
		return;
	}
	pool.query('select * from product_details where advertisement LIKE "%?%"',[$search],function(err,result){
		if(err) throw err;
		console.log(result);
	});
	res.send(result);

});
//导出路由器对象
module.exports=router;

