let is_singIn = false;
if(localStorage.getItem('loged_user') && localStorage.getItem('loged_user') !=''){is_singIn =true;}
if(sessionStorage.getItem('there_is_user') && sessionStorage.getItem('there_is_user') !=''){is_singIn =true;}
if(! is_singIn){
	window.location.replace('login.html?come=not_loged');
}
function show_message(message, strong_word, ele){
	ele.innerHTML+=`
	<div class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>${strong_word}</strong>${" "+ message}
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>`
}

let taps = document.querySelectorAll('.account-taps-body ul li');
let select = document.querySelector('.account-taps-body select');
let options = document.querySelectorAll('.account-taps-body select option');
if(taps){
	taps.forEach(function(tap){
		tap.addEventListener('click', function(){
			show_taps(tap.getAttribute('data-taps'));
			taps.forEach(function(tap2){
				tap2.classList.remove('active');
			});
			tap.classList.add('active');
		});
	});
}
if(select){
	select.addEventListener('change', function () {
		options.forEach(function (opt) {
			opt.removeAttribute('selected');
		});
		let selectedOption = select.options[select.selectedIndex];
		selectedOption.setAttribute('selected', true);
		show_taps(selectedOption.value);
	});
}

function show_taps(tap_is){
	if(tap_is == 'logout'){
		localStorage.removeItem('cart');
		localStorage.removeItem('loged_user');
		sessionStorage.clear();
		window.location.replace('login.html');
	}else{
		let content = document.querySelectorAll('.taps-content > div');
		content.forEach(function(div){
			if(div.getAttribute('data-taps')== tap_is){
				div.classList.remove('d-none');
			}else{div.classList.contains('d-none')? '' : div.classList.add('d-none');}
		});
	}
}

let account_display = document.querySelectorAll('.taps-content > .tap-account');
if(account_display){
	let show_save_errors = document.querySelector('.show_save_errors');
	let fullname = document.querySelector('.taps-content > .tap-account input.full-name');
	let show_name = document.querySelector('.taps-content > .tap-account input.show-name');
	let user_email =document.querySelector('.taps-content > .tap-account input.u-email');
	let old_pass =document.querySelector('.taps-content > .tap-account .chang-pass input.old-pass');
	let new_pass =document.querySelector('.taps-content > .tap-account .chang-pass input.new-pass');
	let new_pass_2 =document.querySelector('.taps-content > .tap-account .chang-pass input.new-pass-repeat');
	let pass = '';
	let user_index=0;
	let user ='';
	let data = localStorage.getItem('loged_user');
	data ? user = data : sessionStorage.getItem('there_is_user'); 
	let all_user = JSON.parse(localStorage.getItem('all_users'));
	all_user.forEach(function(an_user, index){
		if(an_user.userName == user || an_user.emailAddr){
			fullname.value=an_user.fullName;
			show_name.value=an_user.userName;
			user_email.value=an_user.emailAddr;
			user_index = index;
			pass= an_user.password;
		}
	});
	let save_btn = document.querySelector('.save_changes');
	save_btn.addEventListener('click', function(e){
		e.preventDefault();
		if(old_pass.value.trim() !=''){
			if(fullname.value.trim() !='' && show_name.value.trim() !='' && user_email.value.trim() !='' && new_pass.value.trim() !='' && new_pass_2.value.trim() !=''){
				if(old_pass.value == pass){
					if(new_pass.value == new_pass_2.value){
						let missingData = 0;
						if(fullname.value.trim().length <5 || show_name.value.trim().length <5){
							show_message('length must be 5 at less', '"username and name"', show_save_errors);
							missingData+=1
						}
						let regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
						if(! regex_email.test(user_email.value.trim())){
							show_message("is not valid.", 'Email', show_save_errors);
							missingData+=1
						}
						let regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
						if(! regex_pass.test(new_pass.value.trim())){
							show_message("Must contain numbers, uppercase and lowercase letters, with a total of 8 characters.", 'Password', show_save_errors);
							missingData+=1
						}
						if(missingData == 0){
							let new_data = {"fullName":fullname.value,"userName":show_name.value,"password":new_pass.value,"emailAddr":user_email.value};
							all_user[user_index]=new_data;
							localStorage.setItem('all_users', JSON.stringify(all_user));
							show_message('Data Updated Successfuly', 'Done', show_save_errors);
							window.location.reload()
						}
					}else{
						show_message('New password and Repeat New Password fields are not matching','Not Matching', show_save_errors);
					}
				}else{
					show_message('Old Password is not currect','wrong Password', show_save_errors);
				}
			}else{
				show_message('enter All Data Pleace', 'Missing Data', show_save_errors);
			}
		}else{
			if(fullname.value.trim() !='' && show_name.value.trim() !='' && user_email.value.trim() !=''){
				if(fullname.value.trim().length <5 || show_name.value.trim().length <5){
					show_message('length must be 5 at less', '"username and name"', show_save_errors);
				}else{
					let regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
					if(! regex_email.test(user_email.value.trim())){
						show_message("is not valid.", 'Email', show_save_errors);
					}else{
						let new_data = {"fullName":fullname.value,"userName":show_name.value,"password":pass,"emailAddr":user_email.value};
						all_user[user_index]=new_data;
						localStorage.setItem('all_users', JSON.stringify(all_user));
						show_message('full name, usernam and email updated successfuly', 'Done', show_save_errors);
					}
				}
			}else{
				show_message('enter full name, username and email', 'Missing Data', show_save_errors);
			}
		}
	});

}
let orders_display = document.querySelectorAll('.taps-content > .tap-orders');
if(orders_display){
	let all_user_orders = JSON.parse(localStorage.getItem('orders'));
	let orders_container = document.querySelector('.taps-content > .tap-orders > ul');
	let orders_fill = '';
	if(all_user_orders){
		all_user_orders.forEach(function(order){
			orders_fill+=`
			<li class="d-flex row mx-0 py-3">
				<ul class="col-12 col-md-4 px-0 d-flex align-items-center mb-3">
					<li class="d-md-none d-inline-block">Number ID</li>
					<li>${order.order_id}</li>
				</ul>
				<ul class="col-12 col-md-3 px-2 d-flex align-items-center mb-3">
					<li class="d-md-none d-inline-block">Dates</li>
					<li>${order.order_date}</li>
				</ul>
				<ul class="col-12 col-md-3 px-0 pe-md-2 d-flex align-items-center mb-3">
					<li class="d-md-none d-inline-block">Status</li>
					<li>${order.Status}</li>
				</ul>
				<ul class="col-12 col-md-2 px-0 d-flex align-items-center">
					<li class="d-md-none d-inline-block">Pricespan</li>
					<li>$${order.order_price}</li>
				</ul>
			</li>`
		});
		orders_container.innerHTML=`
		<li class="row mx-0 py-3 d-none d-md-flex">
			<span class="col-4 px-0">Number ID</span>
			<span class="col-3 px-0">Dates</span>
			<span class="col-3 px-0">Status</span>
			<span class="col-2 px-0">Pricespan</span>
		</li>` + orders_fill;
	}else{orders_container.innerHTML="<div class='my-3'>There is no orders</div>"}	
}

function fetch_wish_list(){
	let wish_list = JSON.parse(localStorage.getItem('wish'));
	if(wish_list){
		let fill_wish="";
		fetch("assets/json/products.json")
		.then(function(res){
			if(res.ok){
				return res.json();
			}else{
				throw new Error('Oops something went Wrone!');
			}
		})
		.then(function(products){
			wish_list.forEach(function(wish){
				products.forEach(function(prod){
					if(prod.id == wish){
						fill_wish+=`
						<li class="row align-items-center mx-0 py-3"	>
							<div class="col-12 col-md-8 col-lg-6 d-flex align-items-center px-0">
								<span data-prod="${prod.id}" class="material-symbols-outlined remove-from-wish">close</span>
								<img class="mx-3" src="${prod.image}" alt="${prod.title}">
								<div class="d-flex flex-column justify-content-between py-1">
									<h5 class="my-0">${prod.title}</h5>
									<span class="my-2">Color: ${prod.color}</span>
									<span class="d-inline-block d-md-none ">$${prod.price}</span>
								</div>
							</div>
							<div class="d-none d-md-flex col-md-4 col-lg-2 price-cont px-1">
								<span>$${prod.price}</span>
							</div>
							<div class="col-12 col-lg-4 mt-3 px-0">
								<span data-prod="${prod.id}" class="add-to-cart custom-btn d-block px-4 py-1" href="#">Add to cart</span>
							</div>
						</li>`
					}
				});
			});
		}).catch(function(errors){
			show_message(errors.message, '!!!', wish_display);
		})
		.finally(function(){
			wish_display.innerHTML=fill_wish
			get_all_wish_btns();
			addToCart();
		});
	}
}

let wish_display = document.querySelector('.taps-content > .tap-wishlist > ul');
if(wish_display){
	fetch_wish_list();
}

// remove from wishlist

function get_all_wish_btns(){
	let remove_from_wish_btn = document.querySelectorAll('.remove-from-wish');
	if(remove_from_wish_btn){
		remove_from_wish_btn.forEach(function(btn){
			btn.addEventListener('click', function(){ 
				remove_form_wish(this.getAttribute('data-prod'));
			});
		});
	}
}
	
function remove_form_wish(p_id){
	let itmes_in_wishList = JSON.parse(localStorage.getItem('wish'));
	let new_wish_list = itmes_in_wishList.filter((item)=> item != p_id);
	localStorage.setItem('wish', JSON.stringify(new_wish_list));
	fetch_wish_list();
}
