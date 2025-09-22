
// fill articles 
let articles_container = document.querySelector('.all-articles');
if(articles_container){
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
		if(articles_container){
			articales.forEach(function(articale){
				articale_to_show += `
				<div class="a-prod">
					<a href="article.html?id=${articale.id}" class="img-holder d-block">
						<img src="${articale.image}" alt="${articale.title}">
					</a>
					<div class="text-info d-flex flex-column">
						<p class="mt-3 mb-1">${articale.title}</p>
						<span>${articale.date}</span>
					</div>
				</div>`;
			});
			articles_container.innerHTML = articale_to_show;
	
		}
	}).catch(function(errors){
		show_message(errors.message, '!!!', articles_container);
	})
	.finally(function(){
		let grid_tow = document.querySelector('.controle .disply-methods img.make-it-tow');
		if(grid_tow){
			changeGrid(grid_tow, 'add');
		}
		let grid_three = document.querySelector('.controle .disply-methods img.make-it-three');
		if(grid_three){
			changeGrid(grid_three, 'remove');
		}
		let row_design = document.querySelector('.controle .disply-methods img.streach-itme');
		if(row_design){
			changeGrid(row_design, 'not important', true);
		}
		function changeGrid(grid_ele, class_to_change, is_row_design){
			let grids = document.querySelectorAll('.controle .disply-methods img');
			grid_ele.addEventListener('click', function(){
				let all_items = document.querySelectorAll('.blog-all .a-prod');
				if(all_items){
					if(is_row_design == null){
						all_items.forEach(function(item){
							item.classList.remove('row-design');
							if(class_to_change === "remove"){
								item.classList.remove('just-tow');
							}else{
								item.classList.add('just-tow');
							}
						});
					}else{
						all_items.forEach(function(item){
							item.classList.add('row-design');
						});
					}
				}
				grids.forEach(function(grid){
					grid.classList.remove('active');
				});
				grid_ele.classList.add('active');
			});
		}
	});
}
