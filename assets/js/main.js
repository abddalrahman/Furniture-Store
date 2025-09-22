let cart_page = document.querySelector('main.cart-page')
if(!cart_page){
	sessionStorage.removeItem('cart2');
}

function show_message(message, strong_word, ele){
	ele.innerHTML+=`
	<div class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>${strong_word}</strong>${" "+ message}
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>`
}

// log in / sign up page ------------------------/
let show_icon = document.querySelector('#show-icon');
if(show_icon){
	show_icon.addEventListener('click',function(){
		let pass_inp = document.querySelector('#pass-inp');
		if(show_icon.classList.contains('show-state')){
			pass_inp.setAttribute('type', 'text');
			show_icon.classList.remove('show-state');
			show_icon.textContent="visibility_off";
		}else{
			pass_inp.setAttribute('type', 'password');
			show_icon.classList.add('show-state');
			show_icon.textContent="visibility";
		}
	})
}

//sign up page ---------------------------------/
let sign_up_form = document.querySelector('form.sign-up-form');
if(sign_up_form){
	let body_ele = document.querySelector('body');
	sign_up_form.addEventListener('submit', function(e){
		e.preventDefault();
		let name_inp = document.querySelector('#name-inp');
		let userName_inp = document.querySelector('#userName-inp');
		let pass_inp = document.querySelector('#pass-inp');
		let email_inp = document.querySelector('#email-inp');
		let agree_inp = document.querySelector('#agree-inp');
		let text_holder = document.querySelector('.text-holder');
		if(name_inp && userName_inp && pass_inp && email_inp && agree_inp && text_holder){
			text_holder.innerHTML=""
			let missingData = 0;
			if(name_inp.value.trim().length < 5 || userName_inp.value.trim().length < 5){
				show_message('length must be 8 at less', '"username and name"', text_holder);
				missingData+=1
			}
			if(! agree_inp.checked){
				show_message("You must agree to the Privacy Policy and Terms of Use.", '', text_holder);
				missingData+=1
			}
			let regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
			if(! regex_pass.test(pass_inp.value)){
				show_message("Must contain numbers, uppercase and lowercase letters, with a total of 8 characters.", 'Password', text_holder);
				missingData+=1
			}
			let regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if(! regex_email.test(email_inp.value)){
				show_message("is not valid.", 'Email', text_holder);
				missingData+=1
			}
			if(missingData==0){
				let allUsers = localStorage.getItem('all_users');
				let newUser = {
					fullName: name_inp.value.trim(),
					userName: userName_inp.value.trim(),
					password: pass_inp.value.trim(),
					emailAddr: email_inp.value.trim(),
				}
				if(allUsers){
					let allUsersArray = JSON.parse(allUsers);
					let repete = 0;
					allUsersArray.forEach(function(user){
						if(user.userName == userName_inp.value.trim()){
							show_message("this username is already exist", 'repetition', text_holder);
							repete +=1;	
						}
						if(user.emailAddr == email_inp.value.trim()){
							show_message("this email is already exist", 'repetition', text_holder);
							repete +=1;	
						}
						if(repete == 0){
							allUsersArray.push(newUser);
							localStorage.setItem('all_users', JSON.stringify(allUsersArray));
							window.location.replace('index.html');
						}
					});
				}else{
					let firstUser = [newUser];
					localStorage.setItem('all_users', JSON.stringify(firstUser));
					window.location.replace('index.html');
				}
			}
		}else{
			body_ele.innerHTML=`
				<div class="alert alert-warning alert-dismissible fade show" role="alert">
					<strong>Don't mess around</strong> One of the page elements has been removed.
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>
			`
		}
	});
}

// log in page -------------------------------------------/
let login_form = document.querySelector('form.login-form');
if(login_form){
	let body_ele = document.querySelector('body');
	login_form.addEventListener('submit', function(e){
		e.preventDefault();
		let userName_email_inp = document.querySelector('#n-e-inp');
		let pass_inp = document.querySelector('#pass-inp');
		let remember_inp = document.querySelector('#rem-inp');
		let text_holder = document.querySelector('.text-holder');
		if(userName_email_inp && pass_inp && remember_inp && text_holder){
			text_holder.innerHTML=""
			if(userName_email_inp.value.trim() !="" && pass_inp.value.trim() !=""){
				let allUsers = localStorage.getItem('all_users');
				if(allUsers){
					let allUsersArray = JSON.parse(allUsers);
					let user_not_exist = true;
					allUsersArray.forEach(function(user){
						if(user.userName == userName_email_inp.value.trim() || user.emailAddr == userName_email_inp.value.trim()){
							let user_is = user.userName;
							if(user.password == pass_inp.value.trim()){
								localStorage.setItem('loged_user', '');
								sessionStorage.setItem('there_is_user', '');
								if(remember_inp.checked){
									localStorage.setItem('loged_user', user_is);
								}else{
									sessionStorage.setItem('there_is_user', user_is);
								}
								window.location.replace('index.html');
							}else{
								show_message('is not currect', 'the password', text_holder);
							}
							user_not_exist = false
						}
					});
					if(user_not_exist){
						show_message('is not currect', 'Username or Emial', text_holder);
					}
				}else{
					show_message('there is not any stored user sign up and be the first user', 'No Users', text_holder);
				}

			}else{
				show_message("enter all data please", 'Missing Data', text_holder);
			}
		}else{
			body_ele.innerHTML=`
				<div class="alert alert-warning alert-dismissible fade show" role="alert">
					<strong>Don't mess around</strong> One of the page elements has been removed.
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>
			`
		}
	});
}

// home page ------------------------------------------/
let open_search = document.querySelector('.open-search');
if(open_search){
	open_search.addEventListener('click', function(){
		let search_box = document.querySelector('.search-box');
		search_box.classList.toggle('open-s-b');
	});
}

let menu_icon = document.querySelector('nav .menu-icon');
if(menu_icon){
	let cover = document.querySelector('.cover');
	let aside_ele = document.querySelector('aside.nav-aside');
	menu_icon.addEventListener('click', function(){
		aside_ele.classList.add('show-aside');
		cover.classList.add('show');
	});
}
let close_icon = document.querySelector('aside.nav-aside .close-icon');
if(close_icon){
	let cover = document.querySelector('.cover');
	let aside_ele = document.querySelector('aside.nav-aside');
	close_icon.addEventListener('click', function(){
		aside_ele.classList.remove('show-aside');
		cover.classList.remove('show');
	});
}

// =================================================== all about cart start
let cart = document.querySelector('nav .my-badge');

let cartItems_count = document.querySelector('nav .my-badge span');
function show_cartItems_count(){
	if(cartItems_count){
		let cart_items_as_text = localStorage.getItem('cart');
		if(cart_items_as_text){
			let cart_items_arr_length = JSON.parse(cart_items_as_text).length;
			cartItems_count.textContent = cart_items_arr_length;
		}
	}
}

if(cart){
	cart.addEventListener('click', function(){
		disply_cart_items()
	});	
	show_cartItems_count();
}

function removeItemsFromCart(){
	let remove_from_cart= document.querySelectorAll('.cart-item .close-icon');
	remove_from_cart.forEach(function(close){
		close.addEventListener('click', function(){
			let id = this.getAttribute('data-prod');
			let itme_array = JSON.parse(localStorage.getItem('cart'));
			let new_items_array = itme_array.filter((itme)=> itme != id);
			localStorage.setItem('cart', JSON.stringify(new_items_array));
			disply_cart_items();
		});
	});
}

function addRemoveCartItems(){
	let add_btns= document.querySelectorAll('.cart-item .itme-quant .plus');
	let minus_btns= document.querySelectorAll('.cart-item .itme-quant .minus');
	add_btns.forEach(function(add){
		add.addEventListener('click', function(){
			let id = this.getAttribute('data-prod');
			let itme_array = JSON.parse(localStorage.getItem('cart'));
			let num_is= document.querySelector(`.cart-item .itme-quant .num-is[data-prod="${id}"]`);
			let price_area= document.querySelector(`.cart-item .pro-price[data-prod="${id}"]`);
			let price = parseInt(price_area.getAttribute('data-price'));
			num_is.textContent = `${parseInt(num_is.textContent) +1}`;
			let number = (parseInt(num_is.textContent)* price).toFixed(1)
			price_area.textContent = number;
			itme_array.push(id);
			localStorage.setItem('cart', JSON.stringify(itme_array));
			show_cartItems_count();
		});
	});
	minus_btns.forEach(function(minus){
		minus.addEventListener('click', function(){
			let id = this.getAttribute('data-prod');
			let itme_array = JSON.parse(localStorage.getItem('cart'));
			let itme_count = itme_array.filter(itme_is => itme_is == id).length; 
			if(itme_count > 1){
				let num_is= document.querySelector(`.cart-item .itme-quant .num-is[data-prod="${id}"]`);
				let price_area= document.querySelector(`.cart-item .pro-price[data-prod="${id}"]`);
				let price = parseInt(price_area.getAttribute('data-price'));
				num_is.textContent = `${parseInt(num_is.textContent) -1}`;
				let number = (parseInt(num_is.textContent)* price).toFixed(1)
				price_area.textContent = number;
				let index = itme_array.indexOf(id);
				itme_array.splice(index, 1);
				localStorage.setItem('cart', JSON.stringify(itme_array));
				show_cartItems_count();
			}
		});
	});
}

function disply_cart_items(){
	let cover = document.querySelector('.cover');
	let cart_aside = document.querySelector('aside.cart-aside');
	cart_aside.classList.add('show-aside');
	cover.classList.add('show');

	// show added items in aside
	let cart_items_father = document.querySelector('.cart-items');
	let items_in_cart = localStorage.getItem('cart');
	if(items_in_cart){
		let items_in_cart2 = items_in_cart;
		if(items_in_cart.replace('[]','').trim() !=''){
			let items_in_cart_array = JSON.parse(items_in_cart2);
			let cart_items_set = new Set(items_in_cart_array);
			let all_items = '';
			cart_items_set.forEach(function(itme){
				let itme_count = items_in_cart_array.filter(itme_is => itme_is == itme).length;
				let item_prop='';
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
							<div class="cart-item py-3 d-flex">
								<img src="${product.image}" alt="${product.title}">
								<div class="mx-3 d-flex flex-column justify-content-between py-1">
									<h5 class="m-0">${product.title}</h5>
									<span>${product.color}</span>
									<div class="itme-quant rounded-1 py-1 px-2 d-flex align-items-center">
										<span data-prod="${product.id}" class="material-symbols-outlined minus ">Remove</span>
										<span data-prod="${product.id}" class="num-is mx-2">${itme_count}</span>
										<span data-prod="${product.id}" class="material-symbols-outlined plus ">Add</span>
									</div>
								</div>
								<div class="d-flex flex-column align-items-end ms-auto">
									<span class="pro-price" data-price="${product.price}" data-prod="${product.id}" >$${price_total}</span>
									<span data-prod="${product.id}" class="material-symbols-outlined close-icon mt-2">close</span>
								</div>
							</div>`
						}
					});
				}).catch(function(errors){
					show_message(errors.message, '!!!', cart_items_father);
				})
				.finally(function(){
					cart_items_father.innerHTML= all_items;
					removeItemsFromCart();
					addRemoveCartItems();
					show_cartItems_count();
				});
			});
		}else{ 
			show_cartItems_count();
			cart_items_father.innerHTML="no items in cart";
		}
	}else{
		cart_items_father.innerHTML="no items in cart";
	}

}


let close_icon2 = document.querySelector('aside.cart-aside .close-icon');
if(close_icon2){
	let cover = document.querySelector('.cover');
	let cart_aside = document.querySelector('aside.cart-aside');
	close_icon2.addEventListener('click', function(){
		cart_aside.classList.remove('show-aside');
		cover.classList.remove('show');
	});
}

// add to cart func
function addToCart(){
	let is_singIn = false;
	if(localStorage.getItem('loged_user') && localStorage.getItem('loged_user') !=''){is_singIn =true;}
	if(sessionStorage.getItem('there_is_user') && sessionStorage.getItem('there_is_user') !=''){is_singIn =true;}
	let add_to_cart_btns = document.querySelectorAll('.add-to-cart');
	let show_add_item = document.querySelector('.add-to-cart-show');
	let show_add_item_sun = document.querySelector('.add-to-cart-show > div');
	let stop_confusion = 0
	add_to_cart_btns.forEach(function(btn){
		btn.addEventListener('click', function(){
			if(is_singIn){
				let item_id = this.getAttribute('data-prod');
				if(item_id !== null){ 
					let item_in_cart = localStorage.getItem('cart');
					if(item_in_cart){
						items = JSON.parse(item_in_cart);
						items.push(item_id);
						localStorage.setItem('cart', JSON.stringify(items));
						show_cartItems_count();
						if(show_add_item.classList.contains('show')){
							show_add_item_sun.classList.add('show-again');
						}else{show_add_item.classList.add('show');}
						stop_confusion++;
						
					}else{
						let first_item = [item_id]
						localStorage.setItem('cart', JSON.stringify(first_item));
						show_cartItems_count();
						if(show_add_item.classList.contains('show')){
							show_add_item_sun.classList.add('show-again');
						}else{show_add_item.classList.add('show');}
						stop_confusion++;
					}
					if(stop_confusion < 2){
						setTimeout(()=>{
							show_add_item.classList.remove('show');
							show_add_item_sun.classList.remove('show-again');
							stop_confusion=0;
						},2000)
					}
				}else{
					let add_to_cart_errors = document.querySelector('.add-to-cart-errors');
					if(add_to_cart_errors){show_message('itme id is missing.','!!!', add_to_cart_errors);}	
				}
			}else{window.location.replace('login.html?come=not_loged');}
		});
	});
}
// =================================================== all about cart end
// add to cart wish
function addToWish(){
	let is_singIn = false;
	if(localStorage.getItem('loged_user') && localStorage.getItem('loged_user') !=''){is_singIn =true;}
	if(sessionStorage.getItem('there_is_user') && sessionStorage.getItem('there_is_user') !=''){is_singIn =true;}
	let add_to_wish_btns = document.querySelectorAll('.add-to-wish');
	add_to_wish_btns.forEach(function(btn){
		btn.addEventListener('click', function(){
			if(is_singIn){
				let item_id = this.getAttribute('data-prod');
				if(item_id !== null){
					let item_in_wish = localStorage.getItem('wish');
					if(item_in_wish){
						items = JSON.parse(item_in_wish);
						if(! items.includes(item_id)){
							items.push(item_id);
							localStorage.setItem('wish', JSON.stringify(items));
							this.classList.add('added');
						}else{
							let new_items = items.filter((itme)=> itme != item_id);
							localStorage.setItem('wish', JSON.stringify(new_items));
							this.classList.remove('added');
						}
					}else{
						let first_item = [item_id]
						localStorage.setItem('wish', JSON.stringify(first_item));
						this.classList.add('added');
					}
				}else{
					let add_to_wish_errors = document.querySelector('.add-to-cart-errors');
					if(add_to_wish_errors){show_message('itme id is missing.','!!!', add_to_wish_errors);}	
				}
			}else{window.location.replace('login.html?come=not_loged');}
		});
	});
}
 
function fill_products(fill_ele, prods, cout, is_swip){
	let container_classes = '';
	if(is_swip ==  'no'){
		container_classes = 'col-6 col-lg-4 px-2 px-sm-3';
	}else{
		container_classes = 'swiper-slide';
	}
	let prod_to_show ='';
	if(fill_ele){
		let prod_added_count = 0;
		let all_wish_prod = JSON.parse(localStorage.getItem('wish'));
		prods.forEach(function(product){
			let addition_class = '';
			let id = product.id.toString();
			if(all_wish_prod && all_wish_prod.includes(id)){addition_class='added';}
			let new_tag = product.tags.length > 0 ? `<a class="mb-2 px-4 py-1 rounded-2 new-btn" href="shop.html?cat=new">NEW</a>` : '';
			let discount = product.discount != null ? '<span class="px-4 py-1 rounded-2 disc-btn">-50%</span>' : '';
			let rate = '<i class="fa-solid fa-star mx-1"></i>'.repeat(product.rating);
			let original_price = product.originalPrice != null ? `<span class="mx-2 ">$${product.originalPrice}</span>`  : '';
			if(is_swip == 'no' && new_tag == ''){
				new_tag = ' ';
			}
			if(new_tag != '' && prod_added_count < cout){
				prod_to_show += `
				<div class="${container_classes}">
					<div class="my-cart">
						<div class="my-cart-img position-relative">
							<a href="product.html?id=${product.id}" class="d-block"><img src="${product.image}" alt="${product.title}"></a>
							<div class="my-cart-info position-absolute p-3 d-flex justify-content-between">
								<div class="d-flex flex-column">
									${new_tag}
									${discount}
								</div>
								<div data-prod="${product.id}" class="add-to-wish ${addition_class} cart-info-img rounded-circle d-flex justify-content-center align-items-center">
									<img src="assets/images/proj_2/hear.svg" alt="hear">
								</div>
							</div>
							<span data-prod="${product.id}" class="add-to-cart custom-btn position-absolute text-center">Add to cart</span>
						</div>
						<div class="my-cart-text">
							<div class="stars d-flex align-items-center mt-3 my-2">
								${rate}
							</div>
							<span class="f-inter">${product.title}</span>
							<div class="price my-2">
								<span>$ ${product.price}</span>
								${original_price}
							</div>
						</div>
					</div>
				</div>`
				prod_added_count++;
			}
		});
		fill_ele.innerHTML = prod_to_show;
	}
}

// now fetching data----- 
// fetch products
let swiper_ele = document.querySelector('.new-arriv-swip .swiper-wrapper');
if(swiper_ele){
	fetch("assets/json/products.json")
	.then(function(res){
		if(res.ok){
			return res.json();
		}else{
			throw new Error('Oops something went Wrone!');
		}
	})
	.then(function(products){
		fill_products(swiper_ele, products, 5, 'yes');
	}).catch(function(errors){
		show_message(errors.message, '!!!', swiper_ele);
	})
	.finally(function(){ 
			addToCart();
			addToWish();
	});
}

// now fetching articles
let articales_container = document.querySelector('.home-page-main-sec .articales');
if(articales_container){
	fetch("assets/json/article.json")
	.then(function(res){
		if(res.ok){
			return res.json();
		}else{
			throw new Error('Oops something went Wrone!');
		}
	})
	.then(function(articales){
		let articale_to_show ='';
		if(articales_container){
			let articale_added_count = 0;
			articales.forEach(function(articale){
				if(articale_added_count < 3){
					articale_to_show += `
					<div class="articale">
					<div class="articale-img">
					<img src="${articale.image}" alt="${articale.title}">
					</div>
					<div class="articale-text">
					<span class="my-2 d-inline-block">${articale.title}</span>
					<a class="common-link" href="article.html?id=${articale.id}">Read More
					<span class="material-symbols-outlined ms-2">arrow_right_alt</span></a>
					</div>
					</div>`
					articale_added_count++;
				}
			});
			articales_container.innerHTML = articale_to_show;
	
		}
	}).catch(function(errors){
		let swiper_ele = document.querySelector('.new-arriv-swip .swiper-wrapper');
		show_message(errors.message, '!!!', swiper_ele);
	})
	.finally(function(){
			// console.log('Finished articale')
	});
}

// products page ----------------------------/
let product_page = document.querySelector('.produts-page-main-sec');
if(product_page){
	let query = window.location.search;
	let params = new URLSearchParams(query);
	let prod_id = params.get('id');
	if(prod_id != null && prod_id.trim()!= ""){
		let the_prod = '';
		fetch("assets/json/products.json")
		.then(function(res){
			if(res.ok){
				return res.json();
			}else{
				throw new Error('Oops something went Wrone!');
			}
		})
		.then(function(data){
			data.forEach(function(one_prod){
				if(one_prod.id == prod_id){the_prod = one_prod;}
			});
		})
		.catch(function(errors){
			show_message(errors.message, '!!!', product_page);
		})
		.finally(function(){
			if (the_prod !=''){
				let img_swip = document.querySelector('.products-images-swip .swiper-wrapper');
				let img_cont = document.querySelector('.all-prod-img');
				let stor_images = '';
				let stor_swip_images = '';

				if(img_cont){
					let all_images = the_prod.images;
					all_images.forEach(function(image){
						stor_images+= `
						<div class="prod-img position-relative">
							<img src="${image}" alt="${the_prod.title}">
						</div>`;
						stor_swip_images+= `
						<div class="swiper-slide">
							<div class="prod-img position-relative">
								<img src="${image}" alt="${the_prod.title}">
							</div>
						</div>`;
					});

					img_cont.innerHTML=stor_images;
					img_swip.innerHTML=stor_swip_images;
					
					// fill data now
					let main_info = document.querySelector('.row .main-prod-info');
					let stars = '<i class="fa-solid fa-star"></i>'.repeat(the_prod.rating);
					let o_price = the_prod.originalPrice != null ? `<span class="mx-2">$${the_prod.originalPrice}</span>` : '';
					main_info.innerHTML = `
					<div class="rating d-flex align-content-center">
						<div class="stars d-flex align-items-center">
							${stars}
						</div>
						<div class="raters mx-3">${the_prod.reviews} Reviews</div>
					</div>
					<h2 class="my-4">${the_prod.title}</h2>
					<p class="my-0">${the_prod.description}</p>
					<div class="prod-price my-1 py-2">
						<span>$${the_prod.price}</span> ${o_price}
					</div>`;
					// btns------------
					let prod_btns = document.querySelectorAll('.prod-btns .custom-btn');
					prod_btns.forEach(function(btn){
						btn.setAttribute('data-prod', the_prod.id);
					});
					// some other info------------
					let more_info = document.querySelector('.prod-id-cat');
					more_info.innerHTML = `
					<div class="prod-sku">
					<span>SKU</span> <a href="#">${the_prod.sku}</a>
					</div>
					<div class="prod-cat d-flex mt-2">
					<span>CATEGORY</span>
					<div>
					<a href="#">${the_prod.category}</a>
					</div>
					</div>`;
					// accordion info------------
					let fill_accordion = document.querySelector('.accordion .more-details');
					fill_accordion.innerHTML = `
					<div class="details">
						<h6>Details</h6>
						<p>${the_prod.details}</p>
					</div>
					<div class="packaging d-flex flex-column">
						<h6>Packaging</h6>
						<span>Width: ${the_prod.dimensions.width} Length: ${the_prod.dimensions.length}</span>
						<span>Weight: ${the_prod.weight}</span>
						<span>Package(s): 1</span>
					</div>`
				}
			} 
			let prod_colors = document.querySelectorAll('.prod-colors .colors > div');
			if(prod_colors.length > 0){
				prod_colors.forEach(function(ele){
					ele.addEventListener('click', function(){
						prod_colors.forEach(function(ele2){
							ele2.classList.remove('active');
						});
						ele.classList.add('active');
					});
				});
			}
		});
	}else{
		product_page.innerHTML = "prodact id is missing";
	}
	
	let addToCartBtn = document.querySelector('.prod-btns .add-to-cart');
	let addToWishtBtn = document.querySelector('.prod-btns .add-to-wish');
	addToCartBtn.setAttribute(`data-prod`, prod_id);
	addToWishtBtn.setAttribute(`data-prod`, prod_id);

}



// shop page ----------------------------------/
let grids = document.querySelectorAll('.controle-sec .disply-methods img');
if(grids){
	let controle_father = document.querySelector('.controle-sec');
	let filter_section = document.querySelector('.filter-section');
	let all_products = document.querySelector('.all-products');
	let products_grid = document.querySelector('.products-grid');
	let products = document.querySelectorAll('.all-products > div');
	grids.forEach(function(grid){
		grid.addEventListener('click', function(){
			if(grid.classList.contains('make-it-2')){
				products_grid.classList.remove('col-lg-9')
				controle_father.classList.add('tow_now');
				all_products.classList.remove('streach-item');
				products.forEach(function(prod){
					prod.classList.add('col-xl-3');
				});
				filter_section.classList.remove('d-lg-block');
			}else if(grid.classList.contains('make-it-3')){
				products_grid.classList.add('col-lg-9')
				products.forEach(function(prod){
					prod.classList.remove('col-xl-3');
				});
				filter_section.classList.add('d-lg-block');
				controle_father.classList.remove('tow_now');
				all_products.classList.remove('streach-item');
			}else if(grid.classList.contains('streach-itme')){
				all_products.classList.add('streach-item');
			}else if(grid.classList.contains('kape-it-2')){
				all_products.classList.remove('streach-item');
			}	
			grids.forEach(function(a_grid){
				a_grid.classList.remove('active');
			});
			grid.classList.add('active');
		});
	});
}

// fill item in shop page--
let shop_prods_container = document.querySelector('.shop-page .all-products');
if(shop_prods_container){
	fetch("assets/json/products.json")
	.then(function(res){
		if(res.ok){
			return res.json();
		}else{
			throw new Error('Oops something went Wrone!');
		}
	})
	.then(function(products){
		fill_products(shop_prods_container, products, 10 , 'no');
	}).catch(function(errors){
		show_message(errors.message, '!!!', shop_prods_container);
	})
	.finally(function(){ 
			addToCart();
			addToWish();
	});
}

