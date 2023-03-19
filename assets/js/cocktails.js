		// Pas 4
document.addEventListener('DOMContentLoaded', onLoad);
console.log('apelez api')

// Pas 1
async function getProducts() {
    let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");
    // let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic");
    let products = await response.json();
    return products;
}

// Pas 2
function onLoad() {
    document.getElementById('preloader').classList.remove('hidden');
    getProducts().then(function (products) {
        console.log('incepe ap1')
        listProducts(products).then(function (){
           
            var $container = $('.menu');
			// s[ continui cu filtrul si scriptul de la app1 - curs7
            // var $filter = $('#filter');
            $container.isotope({
                filter: '.mascara',
                layoutMode: 'masonry',
                animationOptions: {
                    duration: 750,
                    easing: 'linear'
                },
                containerStyle: {
                    position: 'relative',
                    overflow: 'visible'
                },
            });
            $filter.find('a').click(function() {
                var selector = $(this).attr('data-filter');
                $filter.find('a').removeClass('active');
                $(this).addClass('active');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        animationDuration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        });

    }).catch(function (rej) {
        console.log('Produsele nu au fost primite: ', rej);

    }).finally(() => {
        console.log("Cererea s-a incheiat: cu succes sau fara succes.");

    });
}

// random function
function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }
// Pas 3
async function listProducts(products) {
    let html='';
    // console.log(products.drinks);
	const someProducts = getMultipleRandom(products.drinks, 9);
	// const someProducts = products.drinks.filter(product => product.strDrink.length>20&&product.strDrink.length<30);
	console.log(someProducts);
    someProducts.forEach(function (product) {
        //console.log(product);
        let divProduct=`
		<div class='col-lg-4 menu-item'>
		<a href="ingredients.html?${product.idDrink}" class="glightbox"><img src="${product.strDrinkThumb}"
                    class="menu-img img-fluid" alt=""></a>
					<h4>${product.strDrink}</h4>
		<p class="ingredients" id="${product.idDrink}">
		<a target="_blank" class="btn btn-item btn-sm" href="ingredients.html?${product.idDrink}" data-abc="true">See ingredients</a>
	  </p>
	</div>
       `;
	//    <p class="price">
	// 	$5.95
	//   </p>
    html +=divProduct;
    });
    let container = document.getElementById('menu-item-cocktails');
    container.innerHTML = html;
    // document.getElementById('preloader').classList.add('hidden');

    let img ='';
    someProducts.forEach(function (product) {
        console.log(product);
        let divImages=`
		<div class="swiper-slide"><a class="glightbox" data-gallery="images-gallery"
                href="${product.strDrinkThumb}"><img src="${product.strDrinkThumb}" class="img-fluid"
                  alt=""></a></div>
       `;
    img +=divImages;
    });
    let containerImg = document.getElementById('product-images');
    containerImg.innerHTML = img;
    document.getElementById('preloader').classList.add('hidden');

}

// function seeIngredients(){
//     document.getElementById
// }
// async function listProductImage(products) {
//     let img='';
// 	const someProductsForImages = products.drinks.filter(product => product.strDrink.length>30);
// 	console.log(someProductsForImages);
//     someProductsForImages.forEach(function (product) {
//         //console.log(product);
//         let divImages=`
// 		<div class="swiper-slide"><a class="glightbox" data-gallery="images-gallery"
//                 href="${product.strDrinkThumb}"><img src="${product.strDrinkThumb}" class="img-fluid"
//                   alt=""></a></div>
//        `;
//     img +=divImages;
//     });
//     let container = document.getElementById('product-images');
//     container.innerHTML = img;
    // document.getElementById('preloader').classList.add('hidden');

// }
// console.log('se termina api cocktails')

/* <img src="${product.image_link}" alt="Category">
                    <img src="${product.image_link}" alt="Category"></div>
<p class="text-muted">Starting from ${product.price}</p>  */