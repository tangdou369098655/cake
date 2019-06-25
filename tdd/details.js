$(function(){
  //获得地址栏中的？product_id=2中的2
  if(location.search!==""){
    var product_id=location.search.split("=")[1]
    console.log(product_id);
    $.ajax({
      url:"http://localhost:3000/details",
      type:"get",
      data:{product_id},//{lid:lid},"lid="+lid 这里是简写
      dataType:"json",
      success:function(result){
        console.log(result);
        //先将2大块数据解构出来
        var {product,pics}=result;
        //填充右上角基本信息
        var {cake_name,advertisement,price}=product;
        $("#cake_name").html(cake_name);
        $("#advertisement").html(advertisement);
        $("#price").html(`￥${price}`);
      }
    })
  }
})