const express = require("express");
const router = express.Router();
const pool = require("../pool");

//需要查询多个数据表格
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
  var output = {
    list:[],
    product: [],
    // kinds:[],
    pics: []
  }
  if (search1 !== undefined) {
    var sql0=`select * from product_details where advertisement LIKE ? `;
    pool.query(sql0,[`%${search1}%`],(err,result)=>{
      if (err) console.log(err);
      output.list.push(result);
      console.log(output.list);
      console.log("haha0");
// res.send(output)

      for(var key in output.list[0] ){
        var product_id = output.list[0][key]["product_id"];
        var sql1 = `select * from product_details where product_id=?`;
        pool.query(sql1, [product_id], (err, result) => {
          if (err) console.log(err);
          output.product.push(result) ;
          console.log("haha733333s");
            var dataString = JSON.stringify(output.product);
             var data = JSON.parse(dataString);
             console.log("data.length");
            console.log(data.length);
          for(var i=0;i<data.length;i++){
            console.log("data.length22");
           console.log(data.length);
           console.log(data[0]);
           console.log(data[1]);
           console.log(data[2]);
          //  console.log(data[0][0].product_id);
          //  console.log(data[1][0].product_id);
          //  console.log(data[2][0].product_id);
            // var productid = data[i][0]["product_id"];
          var sql2 = `select * from product_pic where prcid=?`
          pool.query(sql2, [data[i][0].product_id], (err, result) => {
                if (err) console.log(err);
                output.pics.push(result) ;
                console.log(output);
              })
            }
           
         
            })

      }
      
  })
  res.send(output);
  }else{
    console.log("chucuola");
  }}
})

module.exports = router;
 


var dataString = JSON.stringify(output.product);
var data2 = JSON.parse(dataString);
console.log("d2"+data2);const express = require("express");
const router = express.Router();
const pool = require("../pool");

//需要查询多个数据表格
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
  var output = {
    list:[],
    product: [],
    // kinds:[],
    pics: []
  }
//开始
function getlist(){
  return new Promise(function(door){
    var sql0=`select * from product_details where advertisement LIKE ? `;
    pool.query(sql0,[`%${search1}%`],(err,result)=>{
      if (err) console.log(err);
      output.list.push(result);
      console.log(output.list);
      console.log("haha0");
      var list1=output.list;
      var dataString = JSON.stringify(list1);
       var data = JSON.parse(dataString);
       data=data[0];
       console.log("data"+data);
      door(data);
  })})}
function getproduct(data){
  return new Promise(function(door){
    var b=[];
    for(var i=0;i<data.length;i++ ){
      var product_id = data[i]["product_id"];
      console.log(data[i]);
      console.log("haha5");
      var sql1 = `select * from product_details where product_id=?`;
      pool.query(sql1, [product_id], (err, result) => {
        if (err) console.log(err);
        output.product.push(result) ;
        console.log("haha733333s");
        // output.product +=b.concat(result)
        console.log(output.product);
  })}
  var data2=output.product;
  door(data2);
})}
function getpics(data2){
  return new Promise(
    function(door){
      var a=[];
      console.log("data3.length"+data2.length);
      for(var i=0 ;i<data2.length;i++){
        console.log(data2[i]);
        console.log("haha6");
        var product_id =  data2[i]["product_id"];
      var sql2 = `select * from product_pic where prcid=?`
      pool.query(sql2, [product_id], (err, result) => {
            if (err) console.log(err);
            console.log('RESULT'+result)
            output.pics.push(result) ;
            // output.pics +=a.concat(result[0])
            console.log(output);
            door()
          })}
        })}
getlist()
.then(getproduct)
.then(getpics)
.then(function(){res.send(output)})
} 
})

module.exports = router;
