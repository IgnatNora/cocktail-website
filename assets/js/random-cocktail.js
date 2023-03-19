$(document).ready(function () {
  $("#btn-random-cocktail").click(function () {
    $.ajax("https://www.thecocktaildb.com/api/json/v1/1/random.php", {
      type: "GET", // http method
      // headers: {"Access-Control-Allow-Headers:": "*"},
      // headers: {"Access-Control-Allow-Origin:": "*"},
      dataType: "json", // type of response data
      success: function (data, status, xhr) {
        // success callback function
        // modal
        let modal = "";
        let randomDrink = data.drinks;
        console.log(randomDrink);
        modal = `${randomDrink[0].strDrink}
                    `;
        $("#modalInfoLabel").append(modal);

        let modalBody = `
        <div class="row">
          <div class="col-5">
            <img src="${randomDrink[0].strDrinkThumb}"
              class="img-fluid" alt="">
          </div>
          <div class="col-7">
            <p><strong><span class="fa-li"><i class="fa-solid fa-kitchen-set"></i></span>Here are more details about your drink:</strong></p>
<ul class="fa-ul">
        <li><span class="fa-li"><i class="fa-solid fa-arrow-right-long"></i></span>Type: ${randomDrink[0].strAlcoholic}</li>
        <li><span class="fa-li"><i class="fa-solid fa-arrow-right-long"></i></span>Category: ${randomDrink[0].strCategory}</li>
        </ul>
        <p><strong>How to make:</strong> ${randomDrink[0].strInstructions}</p>
        </div>`;
        $(".modal-body").append(modalBody);

        let modalButton =`
        <button onclick="window.location.href='ingredients.html?${randomDrink[0].idDrink}'" type="button" class="btn btn-danger btn-all-drinks" data-bs-dismiss="modal">See ingredients</button>
        `
        $('.modal-footer').append(modalButton);
      },
      error: function (jqXhr, textStatus, errorMessage) {
        // error callback
        $("#modalInfoContainer").append("Error: " + errorMessage);
      },
    });
  });
});

// $(".btn-all-drinks").click(function (){
//     $(".btn-all-drinks").attr("data-bs-dismiss","modal");
//     $(".btn-all-drinks").addClass("close");
// });
