var Cart = {};

Cart.on = function(eventName, callback) {
  if (!Cart.callbacks[eventName]) Cart.callbacks[eventName] = [];
  Cart.callbacks[eventName].push(callback);
  return Cart;
};

Cart.trigger = function(eventName, args) {
  if (Cart.callbacks[eventName]) {
    for (var i = 0; i<Cart.callbacks[eventName].length; i++) {
      Cart.callbacks[eventName][i](args||{});
    }
  }
  return Cart;
};

Cart.save = function() {
  localStorage.setItem('cart-items', JSON.stringify(Cart.items));
  Cart.trigger('saved');

  return Cart;
};

Cart.empty =  function() {
  Cart.items = [];
  Cart.trigger('emptied');
  Cart.save();
  

  return Cart;
};

Cart.indexOfItem = function(id) {
  for (var i = 0; i<Cart.items.length; i++) {
    if (Cart.items[i].bill_details_id_product===id) return i;
  }
  return null;
};

Cart.removeEmptyLines = function() {
  newItems = [];
  for (var i = 0; i<Cart.items.length; i++) {
    if (Cart.items[i].bill_details_quantity>0) newItems.push(Cart.items[i]);
  }
  Cart.items = newItems;
  return Cart;
};

Cart.addItem = function(item) {
  if (!item.bill_details_quantity) item.bill_details_quantity = 1;
  var index = Cart.indexOfItem(item.bill_details_id_product);
  if (index===null) {
    Cart.items.push(item);
  } else {
    Cart.items[index]. bill_details_quantity += item.bill_details_quantity;
  }
  Cart.removeEmptyLines();
  if (item.bill_details_quantity > 0) {
    Cart.trigger('added', {item: item});
  } else {
    Cart.trigger('removed', {item: item});
  }

  Cart.save();


  return Cart;
};

Cart.itemsCount = function() {
  var accumulator = 0;
  for (var i = 0; i<Cart.items.length; i++) {
    accumulator += Cart.items[i].bill_details_quantity;
  }
  return accumulator;
};

Cart.currency = 'VNĐ';

Cart.displayPrice = function(price) {
  if (price===0) return 'Free';
  // var floatPrice = price/100;
  // var decimals = floatPrice==parseInt(floatPrice, 10) ? 0 : 2;
 
  return   price +" "+Cart.currency;
};

Cart.linePrice = function(index) {
  return Cart.items[index].bill_details_prices * Cart.items[index].bill_details_quantity;
};

Cart.subTotal = function() {
  var accumulator = 0;
  for (var i = 0; i<Cart.items.length; i++) {
    accumulator += Cart.linePrice(i);
  }
  return accumulator;
};

Cart.init = function() {
  var items = localStorage.getItem('cart-items');
  if (items) {
    Cart.items = JSON.parse(items);
  } else {
    Cart.items = [];
  }
  Cart.callbacks = {};
  return Cart;
}

Cart.initJQuery = function() {

  Cart.init();

  Cart.templateCompiler = function(a,b){return function(c,d){return a.replace(/#{([^}]*)}/g,function(a,e){return Function("x","with(x)return "+e).call(c,d||b||{})})}};

  console.log(this)
     var cartItem = `<div class="row">
     <div class="col-md-12">
         <div class="order-row padTB20">
             <div class="col-md-2 col-sm-2">
                 <div class="order-data order-table text-center padTB15">
                     <div class="order-table-cell">
                         <a href="dishes-detail.html"><img src="#{this.bill_details_image_product}" alt=""></a>
                         <div class="clear"></div>
                     </div>
                 </div>
             </div>
             <div class="col-md-2 col-sm-2">
                 <div class="order-data order-table text-center">
                     <div class="order-table-cell order-text">           
                         <strong><a href="dishes-detail.html">#{this.bill_details_name}</a></strong>
                     </div>
                 </div>
             </div>
             <div class="col-md-2 col-sm-2">
                 <div class="order-data order-table text-center">
                     <div class="order-table-cell order-text">
                         <strong>#{Cart.displayPrice(this.bill_details_prices)}</strong>
                     </div>
                 </div>
             </div>
             <div class="col-md-2 col-sm-2">
                 <div class="order-data order-table text-center">
                     <div class="order-table-cell order-text">
                         <input type="number" min=1 value="#{this.bill_details_quantity}" onchange='Cart.updateLine(#{this.id},$(this).val())' class="qty" name="qty1">
                     </div>
                 </div>
             </div>
             <div class="col-md-2 col-sm-2">
                 <div class="order-data order-table text-center">
                     <div class="order-table-cell order-text">
                         <strong>#{Cart.linePrice(Cart.indexOfItem(this.bill_details_id_product))}</strong>
                     </div>
                 </div>
             </div>
             <div class="col-md-2 col-sm-2">
                 <div class="order-data order-table text-center">
                     <div class="order-table-cell order-text">
                         <strong><a onclick = 'Cart.removeone(#{this.bill_details_id_product})')><i class="fa fa-trash" aria-hidden="true"></i></a></strong>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>`
    var cartItemInCheckOut = `<div class="col-xs-6 col-md-6 wv_subtotal_left textL">
                  <span>#{this.bill_details_name} x #{this.bill_details_quantity}</span>
              </div>
              <div class="col-xs-6 col-md-6 wv_subtotal_right textR">
                  <span>#{Cart.linePrice(Cart.indexOfItem(this.bill_details_id_product))} #{Cart.currency}</span>
          </div>`
      Cart.lineItemTemplate = cartItem;
      Cart.InCheckOut = cartItemInCheckOut

  
  $(document).on('click', '.cart-add', function(e) {
    e.preventDefault();
    var button = $(this);
    var item = {
      bill_details_id_product: button.data('id'),
      bill_details_prices: button.data('prices'),
      bill_details_quantity: button.data('quantity'),
      bill_details_name: button.data('name'),
      bill_details_image_product: button.data('images'),
      // bill_details_image_product
    }
    console.log(item);
    Cart.addItem(item);
  });

  var updateReport = function() {
    var count = Cart.itemsCount();
    $('.cart-items-count').text(count);
    $('.cart-subtotal_l').html(Cart.displayPrice(Cart.subTotal()));
    if (count===1) {
      $('.cart-items-count-singular').show();
      $('.cart-items-count-plural').hide();
    } else {
      $('.cart-items-count-singular').hide();
      $('.cart-items-count-plural').show();
    }
  };

  var updateCart = function() {
    if (Cart.items.length>0) {
      var template = Cart.templateCompiler(Cart.lineItemTemplate);
      var lineItems = "";
      var checkOutlineItems = "";
      var templateCheckout = Cart.templateCompiler(Cart.InCheckOut);
      for (var i = 0; i<Cart.items.length; i++) {
        lineItems += template(Cart.items[i]);
        checkOutlineItems+=templateCheckout(Cart.items[i])
      }
      $('.cart-line-items').html(lineItems);
      $('.cart-line-items-check-out').html(checkOutlineItems);
      $('.cart-table').show();
      $('.cart-is-empty').hide();
    } else {
      $('.cart-table').hide();
      $('.cart-is-empty').show();
    }
  };

  var update = function() {
    updateReport();
    updateCart();
  };
  update();

  Cart.on('saved', update);

  return Cart;
};
Cart.removeone = function (item) {
  console.log(item)
  for (var i = 0; i < Cart.items.length; i++) {
   
    if (Cart.items[i].bill_details_id_product === item) {
      Cart.items[i].bill_details_quantity = 0;
      Cart.removeEmptyLines();
      Cart.save();
      return Cart;
    }
    
  }
  return Cart;
};  
Cart.updateLine = function (id,quatity){
  console.log(id,c)
  // debugger
  for (var i = 0; i < Cart.items.length; i++) {
    
    if (Cart.items[i].bill_details_id_product === id) {
      Cart.items[i].bill_details_quantity = quatity;
      Cart.removeEmptyLines();
      Cart.save();
      return Cart;
      // break;
    }
    
  }
  return Cart;
}
Cart.checkout =function()
{
  if(Cart.items.length!=0)
  {
      
      var $adr=$("#adresst").val();
      var phone=$("#phone").val();
      var name=$("#name").val();
      if($adr.trim()==""||phone.trim()==""||name.trim()=="")
      {
        toastr.error("vui lòng nhập đầy đủ thông tin")
      }
      else{
        var data={
        "Address":$adr,
        "Phone":phone,
        "Order_Name":name,
        "total":Cart.subTotal()
        }
        console.log(data);
        $.ajax({
          type: "POST",
          url: "https://localhost:5001/user/create-order",
          data: data,
          dataType: "json",
          success: function(data)
          { 
            var model=[];
            Cart.items.forEach(element => {
              model.push(element)
            });
            console.log(JSON.stringify(model))
            $.ajax({
              type: "POST",
              url: "https://localhost:5001/user/order-detail-insert",
              data: JSON.stringify(model),
              dataType: "json",
              contentType: 'application/json; charset=utf-8',
              success: function(data)
              { 
                  Cart.empty();
                  window.location.href="index.html";
              },
              error : function (e){      
                  console.log(e)
              
              }
              })

              // Cart.empty();
              // window.location.href="/index.html";
          },
          error : function (e){      
              console.log(e)
          
          }
      })

      }
  }
  else
  {
    toastr.error("Giỏ hàng của bạn trống");
  }
  
}

