console.log('apelez api')
var url = document.URL
const recipe_id = url.substring(url.lastIndexOf('?') + 1);
console.log(recipe_id);

$(document).ready(function () {
    $(window).on('load', function() {
      $.ajax("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+recipe_id, {
        type: "GET", // http method
        // headers: {"Access-Control-Allow-Headers:": "*"},
        // headers: {"Access-Control-Allow-Origin:": "*"},
        dataType: "json", // type of response data
        success: function (data, status, xhr) {
          // success callback function
          // modal
          let item = data.drinks[0];
          console.log(item);
          let content = "";
        //   console.log(data);
        // date modified
        content = `${item.dateModified}`
        console.log(content, typeof(content));
        if (content != 'null'){
            $(".receipe-headline span").append(content);  
        }
            // drink title
          content = `${item.strDrink}`;
          $(".receipe-headline h2").append(content);
            $('.drink-title').append(`See the ingredients for<br><mark>${content}</mark>`)
            // drink info
          content = `<h6>Type: ${item.strAlcoholic}</h6>
          <h6>Category: ${item.strCategory}</h6>
          <h6>Container: ${item.strGlass}</h6>
                      `;
          $(".receipe-duration").append(content);

          let arrayIngredients = Object.values(item);
          console.log(arrayIngredients);
          for (let i=17; i<32; i++){
            console.log(arrayIngredients[i])
            if(arrayIngredients[i] != null){
                content = `<div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck${i}">
                <label class="custom-control-label" for="customCheck${i}">
                ${arrayIngredients[i]}</label>
                </div`
                $(".ingredients-item").append(content);
            }
          }
           // drink preparation
           content = `${item.strInstructions}
           `;
        $(".single-preparation-step>p").append(content);

        // drink image

        content = `<img src="${item.strDrinkThumb}" class="img-fluid hero-img" alt="" data-aos="zoom-out" data-aos-delay="300">`
        $(".drink-img").append(content);

        //   let filtered = arrayIngredients.filter(function (el) {
        //     return el != null;
        //   });
        //   console.log(filtered);
        }
        ,
        error: function (jqXhr, textStatus, errorMessage) {
          // error callback
          console.log("Error: " + errorMessage);
        },
      });
    });
  });

  