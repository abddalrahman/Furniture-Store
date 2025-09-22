let is_singIn = false;
if(localStorage.getItem('loged_user') && localStorage.getItem('loged_user') !=''){is_singIn =true;}
if(sessionStorage.getItem('there_is_user') && sessionStorage.getItem('there_is_user') !=''){is_singIn =true;}
if(! is_singIn){
	window.location.replace('login.html?come=not_loged');
}
show_remove_coupon_shipping();
function show_message(message, strong_word, ele){
	ele.innerHTML+=`
	<div class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
		<strong>${strong_word}</strong>${" "+ message}
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>`
}

if(cart){
	cart.addEventListener('click', function(){
		let orders_hohder = document.querySelector('.orders-details');
		disply_cart_items2(orders_hohder)
	});	
}

let params = new URLSearchParams(window.location.search);
let step_is_param = params.get('step_is');
if(step_is_param == "checkout"){
	let shipping = sessionStorage.getItem('shipping');
	let is_there_items = JSON.parse(localStorage.getItem('cart')) ;
	if(is_there_items && shipping){
		if(is_there_items.length > 0){
			let order_info = document.querySelector('.main-cart-view')
			let checking_page = document.querySelector('.delivery-info');
			order_info.classList.add('d-none');
			checking_page.classList.remove('d-none');
			let first_step = document.querySelector('.pay-steps > .step.cart-s');
			let first_step_span = document.querySelector('.pay-steps > .step.cart-s > span:first-of-type');
			let check_s = document.querySelector('.pay-steps > .step.check-s');
			if(first_step && check_s){
				first_step.classList.add('complete');
				first_step_span.textContent ="✔";
				check_s.classList.add('active');
			}
		}
	}
}

if(sessionStorage.getItem('cart2')){
	document.querySelector('.pay-steps > .step.cart-s').classList.add('complete');
	document.querySelector('.pay-steps > .step.cart-s > span:first-of-type').textContent="✔";
	document.querySelector('.pay-steps > .step.check-s').classList.add('complete');
	document.querySelector('.pay-steps > .step.check-s > span:first-of-type').textContent="✔";
	document.querySelector('.pay-steps > .step.complete-cart').classList.add('active');
	document.querySelector('.main-cart-view').classList.add('d-none');
	document.querySelector('.delivery-info').classList.add('d-none');
	document.querySelector('.complete-pay').classList.remove('d-none');
}

function removeItemsFromCart2(){
	let remove_from_aside = document.querySelectorAll('.cart-item .close-icon');
	let orders_hohder = document.querySelector('.orders-details')
	let remove_from_cart= document.querySelectorAll('.an-order .remove-order-btn');
	remove_from_cart.forEach(function(close){
		close.addEventListener('click', function(){
			let id = this.getAttribute('data-prod');
			let itme_array = JSON.parse(localStorage.getItem('cart'));
			let new_items_array = itme_array.filter((itme)=> itme != id);
			localStorage.setItem('cart', JSON.stringify(new_items_array));
			disply_cart_items2(orders_hohder);
		});
	});
	remove_from_aside.forEach(function(close){
		close.addEventListener('click', function(){
			disply_cart_items2(orders_hohder);
		});
	});
}

let close_aside = document.querySelector('.cart-aside .title-close .close-icon');
if(close_aside){
	close_aside.addEventListener('click',function(){
		disply_cart_items2(document.querySelector('.orders-details'));
		disply_cart_items3(document.querySelector('.order-summary .orders'));
		show_total();
	});
}

function calc_total(){
	let sub_total = document.querySelector('.cart-summary ul.total-info .sub-total');
	let total_all = document.querySelector('.cart-summary ul.total-info .total-all');
	let radios = document.querySelectorAll('.cart-summary ul.radios-father input[type=radio]');
	let shipping_is = 0;
	radios.forEach(function(radio){
		if(radio.checked){
			shipping_is = parseInt(radio.getAttribute('data-plane'));
		}
	});
	let calc_sub_total=0;
	let totals_val = document.querySelectorAll('.an-order .pro-price');
	totals_val.forEach(function(tot){
		calc_sub_total+= parseFloat(tot.textContent.replace("$",''));
	});
	let discount_data = sessionStorage.getItem('coup_dis');
	let discount_info = discount_data ? discount_data.split(',') : '';
	let discount_is = 0;
	if(discount_info!='' && discount_info.length > 0){discount_is= discount_info[0];}
	sub_total.textContent = `$${calc_sub_total}`;
	let full_total_is = calc_sub_total + parseInt(shipping_is) - ((calc_sub_total + parseInt(shipping_is)) / 100) * parseInt(discount_is)
	total_all.textContent = `$${full_total_is}`;
}

function addRemoveCartItems2(inCheckOut=""){
	let selector = inCheckOut=='' ? 'an-order' : 'order-img-info';
	let add_btns= document.querySelectorAll(`.${selector} .itme-quant .plus`);
	let minus_btns= document.querySelectorAll(`.${selector} .itme-quant .minus`);
	add_btns.forEach(function(add){
		add.addEventListener('click', function(){
			let id = this.getAttribute('data-prod');
			let itme_array = JSON.parse(localStorage.getItem('cart'));
			let num_is= document.querySelectorAll(`.${selector} .itme-quant .num-is[data-prod="${id}"]`);
			let price_area= document.querySelector(`.${selector} .pro-price[data-prod="${id}"]`);
			let price = parseInt(price_area.getAttribute('data-price'));
			num_is.forEach(function(num){
				num.textContent = `${parseInt(num.textContent) + 1}`;
				let number = (parseInt(num.textContent)* price).toFixed(1)
				price_area.textContent = number;
			})
			itme_array.push(id);
			localStorage.setItem('cart', JSON.stringify(itme_array));
			show_cartItems_count();
			calc_total();
			show_total();
		});
	});
	minus_btns.forEach(function(minus){
		minus.addEventListener('click', function(){
			let id = this.getAttribute('data-prod');
			let itme_array = JSON.parse(localStorage.getItem('cart'));
			let itme_count = itme_array.filter(itme_is => itme_is == id).length; 
			if(itme_count > 1){
				let num_is= document.querySelectorAll(`.${selector} .itme-quant .num-is[data-prod="${id}"]`);
				let price_area= document.querySelector(`.${selector} .pro-price[data-prod="${id}"]`);
				let price = parseInt(price_area.getAttribute('data-price'));
				num_is.forEach(function(num){
					num.textContent = `${parseInt(num.textContent) -1}`;
					let number = (parseInt(num.textContent)* price).toFixed(1)
					price_area.textContent = number;
				})
				let index = itme_array.indexOf(id);
				itme_array.splice(index, 1);
				localStorage.setItem('cart', JSON.stringify(itme_array));
				show_cartItems_count();
				calc_total();
				show_total();
			}
		});
	});
}


function disply_cart_items2(holder){
	let items_in_cart = localStorage.getItem('cart');
	if(items_in_cart){
		let items_in_cart2 = items_in_cart;
		if(items_in_cart.replace('[]','').trim() !=''){
			let items_in_cart_array = JSON.parse(items_in_cart2);
			let cart_items_set = new Set(items_in_cart_array);
			let all_items = '';
			cart_items_set.forEach(function(itme){
				let itme_count = items_in_cart_array.filter(itme_is => itme_is == itme).length;
				fetch("assets/json/products.json")
				.then(function(res){
					if(res.ok){
						return res.json();
					}else{
						throw new Error('Oops something went Wrone!');
					}
				})
				.then(function(cart_products){
					cart_products.forEach(function(product){
						if(product.id == itme){
							let price_total = (product.price * itme_count).toFixed(1);
							all_items += `
							<div class="an-order row py-3 align-items-center mx-0">
								<div class="col-12 col-sm-6 order-img-info d-flex px-0">
									<img src="${product.image}" alt="${product.title}">
									<div class="d-flex flex-column mx-2 w-100 justify-content-between py-1">
										<div class="title-price d-flex justify-content-between align-items-center">
											<a href="product.html?id=${product.id}">${product.title}</a> <span class="d-inline-block d-sm-none">$${product.price}</span>
										</div>
										<div class="color-remove d-flex align-items-center justify-content-between my-1">
											<span>Color: ${product.color}</span><span class="material-symbols-outlined d-inline-block d-sm-none remove-order-icon ">close</span>
										</div>
										<div class="itme-quant rounded-1 py-1 px-2 d-flex align-items-center d-inline-block d-sm-none">
											<span data-prod="${product.id}" class="material-symbols-outlined minus ">Remove</span>
											<span data-prod="${product.id}" class="num-is mx-2">${itme_count}</span>
											<span data-prod="${product.id}" class="material-symbols-outlined plus ">Add</span>
										</div>
										<div data-prod="${product.id}" class="d-sm-flex d-none remove-order-btn align-items-center">
											<span  class="material-symbols-outlined remove-order-icon">close</span><span class="mx-2">Remove</span>
										</div>
									</div>
								</div>
								<div class="col-2 px-0 justify-content-center d-none d-sm-flex">
									<div class="itme-quant rounded-1 py-1 px-2 d-flex align-items-center">
										<span data-prod="${product.id}" class="material-symbols-outlined minus ">Remove</span>
										<span data-prod="${product.id}" class="num-is mx-2">${itme_count}</span>
										<span data-prod="${product.id}" class="material-symbols-outlined plus ">Add</span>
									</div>
								</div>
								<div class="col-2 order-price px-0 justify-content-center d-none d-sm-flex" >$${product.price}</div>
								<div data-price="${product.price}" data-prod="${product.id}" class="pro-price col-2 order-total px-0 justify-content-end d-none d-sm-flex">$${price_total}</div>
							</div>`
						}
					});
				}).catch(function(errors){
					show_message(errors.message, '!!!', holder);
				})
				.finally(function(){
					holder.innerHTML= all_items;
					removeItemsFromCart2();
					addRemoveCartItems2();
					show_cartItems_count();
					calc_total();
				});
			});
		}else{
			holder.innerHTML="";
			show_cartItems_count(); 
			show_message("no items in cart"," Empty", holder);
		}
	}else{
		show_message("no items in cart"," Empty", holder);
	}

}

let apply_coupon = document.querySelector('.coupon .coupon-apply');
if(apply_coupon){
	apply_coupon.addEventListener('click', function(){
		let coupon_code = document.querySelector('.coupon .coupon-inp');
		if(coupon_code){ 
			let code = coupon_code.value;
			if(code.trim()!=""){
				let orders_details = document.querySelector('.orders-details');
				ckeck_coupon(code, orders_details);
			}
		}
		
	});
}

function ckeck_coupon(code, message_ele){
	let is_right_coupon = false;
	fetch("assets/json/coupons.json")
	.then(function(res){
		if(res.ok){
			return res.json();
		}else{
			throw new Error("Oops something went wrong");
		}
	})
	.then(function(coupons){
		coupons.coupons.forEach(function(coupon){
			if(code == coupon.code){
				is_right_coupon =true;
				sessionStorage.setItem('coup_dis', coupon.discount + "," + coupon.code);
			}
		});
	})
	.catch(function(errors){
		show_message(errors.message, "!!!", message_ele);
	})
	.finally(function(){
		if(is_right_coupon){
			message_ele.innerHTML+=`<div class="alert alert-success alert-dismissible fade show" role="alert">
			<strong>Applied</strong> Done Successfuly
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>`
		}else{
			message_ele.innerHTML+=`<div class="alert alert-success alert-dismissible fade show" role="alert">
			<strong>Not Applied</strong> Uncurrect code
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>`
		}
		document.querySelector('.coupon .coupon-inp').value="";
		document.querySelector('.coupon-field input').value="";
		show_remove_coupon_shipping();
		show_total()
		calc_total()
	});
}

let orders_hohder = document.querySelector('.orders-details')
if(orders_hohder){
		disply_cart_items2(orders_hohder);
}

// handle shipping plan change 
let radios = document.querySelectorAll('.cart-summary ul.radios-father input[type=radio]');
if(radios){
	radios.forEach(function(radio){
		radio.addEventListener('change', function(){
			calc_total();
			sessionStorage.setItem('shipping', radio.getAttribute('data-plane'));
		});
	});
}

// -------checkout section------------------/
function disply_cart_items3(container){
	let items_in_cart = localStorage.getItem('cart');
	if(items_in_cart){
		let items_in_cart2 = items_in_cart;
		if(items_in_cart.replace('[]','').trim() !=''){
			let items_in_cart_array = JSON.parse(items_in_cart2);
			let cart_items_set = new Set(items_in_cart_array);
			let all_items = '';
			cart_items_set.forEach(function(itme){
				let itme_count = items_in_cart_array.filter(itme_is => itme_is == itme).length;
				fetch("assets/json/products.json")
				.then(function(res){
					if(res.ok){
						return res.json();
					}else{
						throw new Error('Oops something went Wrone!');
					}
				})
				.then(function(cart_products){
					cart_products.forEach(function(product){
						if(product.id == itme){
							let price_total = (product.price * itme_count).toFixed(1);
							all_items += `
							<div class="order-img-info d-flex px-0 py-4">
								<img src="${product.image}" alt="table">
								<div class="d-flex flex-column mx-2 w-100 justify-content-between py-1">
									<div class="title-price d-flex justify-content-between align-items-center">
										<a href="project_2_product?id=${product.id}">Tray Table</a> 
										<span data-price="${product.price}" data-prod="${product.id}" class="pro-price d-inline-block">$${price_total}</span>
									</div>
									<div class="color-remove d-flex align-items-center justify-content-between my-1">
										<span>Color: ${product.color}</span>
									</div>
									<div class="itme-quant rounded-1 py-1 px-2 d-flex align-items-center d-inline-block">
										<span data-prod="${product.id}" class="material-symbols-outlined close-icon minus ">Remove</span>
										<span data-prod="${product.id}" class="num-is mx-2">${itme_count}</span>
										<span data-prod="${product.id}" class="material-symbols-outlined close-icon plus ">Add</span>
									</div>
								</div>
							</div>`
						}
					});
				}).catch(function(errors){
					show_message(errors.message, '!!!', container);
				})
				.finally(function(){
					container.innerHTML= all_items;
					addRemoveCartItems2('yes');
					show_cartItems_count();
					show_total();
				});
			});
		}else{
			container.innerHTML="";
			show_cartItems_count(); 
			show_message("no items in cart"," Empty", container);
		}
	}else{
		show_message("no items in cart"," Empty", container);
	}
}
let order_con = document.querySelector('.order-summary .orders');
if(order_con){
	disply_cart_items3(order_con);
}

let apply_coupon2 = document.querySelector('.coupon-field button');
if(apply_coupon2){
	apply_coupon2.addEventListener('click', function(){ 
		let coupon_code = document.querySelector('.coupon-field input');
		if(coupon_code){
			let code = coupon_code.value;
			if(code.trim()!=""){
				let coupon_field = document.querySelector('.to-show-coupon-result');
				ckeck_coupon(code, coupon_field);
			}
		}
		
	});
}

function show_remove_coupon_shipping(){
	let show_coupon = document.querySelector('.to-show-coupon-result .show-coupon > div > span');
	let remove_coupon = document.querySelector('.to-show-coupon-result .show-coupon > span');
	if(show_coupon){
		let coupon_is = sessionStorage.getItem('coup_dis');
		if(coupon_is){
			let coupon_array = coupon_is.split(',');
			show_coupon.textContent= coupon_array[1];
			remove_coupon.textContent= `-${coupon_array[0]}% [Remove]`;
			remove_coupon.addEventListener('click', function(){ 
				sessionStorage.removeItem('coup_dis');
				show_coupon.textContent = "no coupon";
				remove_coupon.textContent='';
				show_total();
			});
		}
	}
	let show_shipping = document.querySelector('.show-shipping > span:last-of-type');
	if(show_shipping){
		show_shipping.textContent = `$${sessionStorage.getItem('shipping')}`;
	}
}

function show_total(){
	let prices = document.querySelectorAll('.order-img-info .pro-price');
	let total_prices_sub=0;
	prices.forEach(function(ele){
		total_prices_sub+= parseFloat(ele.textContent.replace("$", ''));
	});
	let shipping_val = sessionStorage.getItem('shipping');
	let discount_data = sessionStorage.getItem('coup_dis');
	let discount_info = discount_data ? discount_data.split(',') : '';
	let discount_is = 0;
	if(discount_info!='' && discount_info.length > 0){discount_is= discount_info[0]; }
	let fill_sub_total = document.querySelector('.to-show-coupon-result .show_sub_total > span:last-of-type');
	let fill_total = document.querySelector('.to-show-coupon-result .show_full_total > span:last-of-type')
	fill_sub_total.textContent = `$${total_prices_sub}`;
	let full_total_is = total_prices_sub + parseInt(shipping_val) - ((total_prices_sub + parseInt(shipping_val)) / 100) * parseInt(discount_is)
	fill_total.textContent = `$${full_total_is}`;
	sessionStorage.setItem('total_cost', full_total_is);
}

// payment method display
function display_payment(radio){
	let payment_is = radio.getAttribute('data-pay');
	if(payment_is == 'card'){
		document.querySelector('.payment-method .top-content input[data-pay="card"]').checked=true;
		fill_payment_requ.innerHTML=`
		<div class="d-flex flex-column py-2 f-inter">
			<label class="mb-2">Card Number*</label>
			<input data-info="card_num" class="py-2 px-3 rounded-2" type="text" placeholder="1234 1234 1234">
		</div>
		<div class="d-flex tow-input-container align-items-center justify-content-between">
			<div class="d-flex flex-column py-2 f-inter">
				<label class="mb-2">Expiration date*</label>
				<input data-info="card_date" class="py-2 px-3 rounded-2" type="date" placeholder="MM/YY">
			</div>
			<div class="d-flex flex-column py-2 f-inter">
				<label class="mb-2">CVC*</label>
				<input data-info="card_cvc" class="py-2 px-3 rounded-2 " type="text" placeholder="CVC code">
			</div>
		</div>`
	}else if(payment_is == 'paypal'){
		document.querySelector('.payment-method .top-content input[data-pay="paypal"]').checked=true;
		fill_payment_requ.innerHTML=`
		<div class="d-flex flex-column py-2 f-inter">
			<label class="mb-2">Email used in PayPal*</label>
			<input data-info="pay_email" class="py-2 px-3 rounded-2" type="text" placeholder="Email">
		</div>
		<div class="d-flex flex-column py-2 f-inter">
			<label class="mb-2">Name in Paypal*</label>
			<input data-info="pay_name" class="py-2 px-3 rounded-2" type="text" placeholder="Name">
		</div>`
	}
}
let fill_payment_requ = document.querySelector('.payment-method .changed-content');
let payment_radios_con = document.querySelectorAll('.payment-method .top-content .payment-way');
if(payment_radios_con){
	payment_radios_con.forEach(function(radio_con){
		display_payment(radio_con);
		radio_con.addEventListener('click', function(){
			display_payment(radio_con);
		});
	});
}

function handle_place_order(){
	let contact_info_sec = document.querySelector('.delivery-info .contact-info');
	let shipping_address_sec = document.querySelector('.delivery-info .shipping-address');
	let payment_method_sec = document.querySelector('.delivery-info .payment-method');
	let errors_container = document.querySelector('.order-summary .all_errors_show');
	let errors_array = [];
	if(contact_info_sec && shipping_address_sec && payment_method_sec){
		let contact_info_sec_fname = document.querySelector('.delivery-info .contact-info input[data-info="fname"]');
		let contact_info_sec_lname = document.querySelector('.delivery-info .contact-info input[data-info="lname"]');
		let contact_info_sec_phone = document.querySelector('.delivery-info .contact-info input[data-info="phone"]');
		let contact_info_sec_email = document.querySelector('.delivery-info .contact-info input[data-info="emailAddress"]');
		if(contact_info_sec_fname && contact_info_sec_lname && contact_info_sec_phone && contact_info_sec_email){
			contact_info_sec_fname.value.trim().length < 3 ? errors_array.push('first name must be 3 letters at less'): '';
			contact_info_sec_lname.value.trim().length < 3 ? errors_array.push('last name must be 3 letters at less'): '';
			contact_info_sec_phone.value.trim().length < 10 ? errors_array.push('phone number must contain 10 numbers'): '';
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact_info_sec_email.value) ? '': errors_array.push('unvalide email1');
		}else{errors_array.push('some fields are missing');}

		let shipping_info_sec_address = document.querySelector('.delivery-info .shipping-address input[data-info="address"]');
		let shipping_info_sec_country = document.querySelector('.delivery-info .shipping-address select[data-info="country"]');
		let shipping_info_sec_city = document.querySelector('.delivery-info .shipping-address input[data-info="city"]');
		let shipping_info_sec_state = document.querySelector('.delivery-info .shipping-address input[data-info="state"]');
		let shipping_info_sec_zip = document.querySelector('.delivery-info .shipping-address input[data-info="zip"]');
		if(shipping_info_sec_address && shipping_info_sec_country && shipping_info_sec_city && shipping_info_sec_state && shipping_info_sec_zip){
			if(shipping_info_sec_address.value.trim().length < 3 || shipping_info_sec_city.value.trim().length < 3 || shipping_info_sec_state.value.trim().length < 3){
				errors_array.push('address, city and state must be 3 letters at less');
			}
			shipping_info_sec_country.value==0 ? errors_array.push('you must choos a country') : '';
			shipping_info_sec_zip.value.trim().length < 5 ? errors_array.push('zip code length must be 5 at less') : '';

		}else{errors_array.push('some fields are missing');}

		// payment info
		let payment_radios = document.querySelectorAll('.payment-method .top-content input[type=radio]');
		let whate_is_checked='';
		payment_radios.forEach(function(radio){
			if(radio.checked){
				whate_is_checked = radio.getAttribute('data-pay');
			}
		});
		if(whate_is_checked == 'card'){
			let payment_info_sec_card_n = document.querySelector('.payment-method .changed-content input[data-info="card_num"]');
			let payment_info_sec_card_d = document.querySelector('.payment-method .changed-content input[data-info="card_date"]');
			let payment_info_sec_card_c = document.querySelector('.payment-method .changed-content input[data-info="card_cvc"]');
			if(payment_info_sec_card_n && payment_info_sec_card_d && payment_info_sec_card_c){
				payment_info_sec_card_n.value.trim().length !=12 ? errors_array.push('card number must contain 12 numbers') : '';
				payment_info_sec_card_d.value.trim()=='' || payment_info_sec_card_d.getAttribute('type')!='date' ? errors_array.push('chosse date') : '';
				payment_info_sec_card_c.value.trim().length <3 ? errors_array.push('card cvc must contain 3 numbers at less') : '';
				sessionStorage.setItem('pay_by', 'Credit Card');
			}else{errors_array.push('some fields are missing');}
			
		}else if(whate_is_checked == 'paypal'){
			let payment_info_sec_payp_e = document.querySelector('.payment-method .changed-content input[data-info="pay_email"]');
			let payment_info_sec_payp_n = document.querySelector('.payment-method .changed-content input[data-info="pay_name"]');
			if(payment_info_sec_payp_e && payment_info_sec_payp_n){
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(payment_info_sec_payp_e.value) ? '': errors_array.push('unvalide paypal email');
				payment_info_sec_payp_n.value.trim() == '' ? errors_array.push('unvalide paypal name') :'' ;
				sessionStorage.setItem('pay_by', 'Paypal');
			}else{errors_array.push('some fields are missing');}
			
		}else{errors_array.push('choose payment method');}
	
		if(errors_array.length == 0){
			sessionStorage.setItem('cart2', localStorage.getItem('cart'));
			localStorage.removeItem('cart');
			to_complete();
		}else{
			errors_array.map((item)=>{show_message(item, 'Missing Data', errors_container)});
		}
	}else{show_message('some fields is missing', 'Missing Data', errors_container)}
}

let place_order_btn = document.querySelector('.order-summary .place_order');
if(place_order_btn){
	place_order_btn.addEventListener('click', function(e){
		e.preventDefault();
		handle_place_order();
	})
}

function to_complete(){
	document.querySelector('.delivery-info').classList.add('d-none');
	document.querySelector('.complete-pay').classList.remove('d-none');
	document.querySelector('.statec-content h1').textContent='Complete!';
	let order_id_is = "order_id_" + (Math.random()* 1000).toString();
	document.querySelector('.show-order-finaly .show-order-id').textContent =order_id_is;
	let currentDate = new Date();
	let date_is = currentDate.toLocaleDateString("en-GB");
	document.querySelector('.show-order-finaly .show-date').textContent = date_is;
	document.querySelector('.show-order-finaly .show-total-cost').textContent="$" + sessionStorage.getItem('total_cost');
	document.querySelector('.show-order-finaly .show-pay-method').textContent=sessionStorage.getItem('pay_by');
	document.querySelector('.pay-steps > .step.complete-cart').classList.add('active');
	document.querySelector('.pay-steps > .step.check-s').classList.remove('active');
	document.querySelector('.pay-steps > .step.check-s').classList.add('complete');
	document.querySelector('.pay-steps > .step.check-s > span:first-of-type').textContent='✔';
	let pros_container = document.querySelector('.complete-pay .user-prod');
	let cart_prods_set = new Set(JSON.parse(sessionStorage.getItem('cart2')));
	let all_cart_prods_array = JSON.parse(sessionStorage.getItem('cart2'));
	let new_order = {"order_id": order_id_is, 'order_date': date_is, "Status":"Delivered", "order_price": sessionStorage.getItem('total_cost')};
	if(localStorage.getItem('orders')){
		let all_orders = JSON.parse(localStorage.getItem('orders'));
		let is_it_exist = false;
		all_orders.forEach(function(order_1){
			if(order_1.id == new_order.order_id){
				is_it_exist=true 
			}
		})
		if(! is_it_exist){
			all_orders.push(new_order); 
			localStorage.setItem('orders', JSON.stringify(all_orders));
		}
	}else{ 
		all_orders_new = [];
		all_orders_new.push(new_order);
		localStorage.setItem('orders', JSON.stringify(all_orders_new));
	}
	let all_prods = '';
	fetch("assets/json/products.json")
	.then(function(res){
		if(res.ok){
			return res.json();
		}else{
			throw new Error('Oops something went Wrone!');
		}
	})
	.then(function(cart_products){
		cart_prods_set.forEach(function(itme){
			cart_products.forEach(function(product){
				if(product.id == itme){
					let itme_count = all_cart_prods_array.filter((ele)=> ele == itme);
					all_prods += `
					<div class="prod mx-1 mb-3 position-relative">
						<span class="position-absolute">${itme_count.length}</span>
						<img src="${product.image}" alt="${product.title}">
					</div>`
				}
			});
		});
	}).catch(function(errors){
		show_message(errors.message, '!!!', pros_container);
	})
	.finally(function(){
		pros_container.innerHTML = all_prods;
	});
}