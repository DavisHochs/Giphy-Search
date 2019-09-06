const buttonChoices = ["Dogs", "Cats", "Tacos", "Something", "Texas", "Hot Girls", "Boobs"];

function showButtons() {
    $("#buttons").empty();
    for(let i = 0; i < buttonChoices.length; i++) {
        let a = $("<button>");
        a.addClass("tag");
        a.attr("data-name", buttonChoices[i]);
        
        a.text(buttonChoices[i]);
        $("#buttons").append(a);
    }
}

  $("#add-button").on("click", function(event) {
    event.preventDefault();

    let input = $("#searchfield").val().trim();
    buttonChoices.push(input);
    
    showButtons();

  });

  function displayMovieInfo() {

    let searchTag = $(this).data('name'); // $(this).attr('data-name');
    searchTag = searchTag.replace(' ', '+');
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchTag}&api_key=VumF18uoV5t88Tij8FxSFFaGth98OuL9`;
    const method = 'GET';

    $.ajax({ url, method })
      .then(function(response) {
        console.log(response);
        $('#gif-container').empty();
        
        let gifDisplay = $('<div>');
        $('#gif-container').prepend(gifDisplay);
        for (let i = 0; i < 10; i++) {
          
          let gif = $(`<img>`);
          let rating = $(`<div>`);
          gif.attr('src', response.data[i].images.original_still.url);
          gif.attr('data-still', response.data[i].images.original_still.url);
          gif.attr('data-animate', response.data[i].images.original.url);
          gif.attr('data-state', 'still');
          gif.attr('height', '200px');
          gif.attr('width', '200px');
          gif.addClass('gif');
          
          rating.text(`Rating: ` + response.data[i].rating);
          gifDisplay.append(rating);

          gifDisplay.append(gif)
        }
        // gifDisplay.append(`<img src= />`)
        
          
        
      })
      .catch(function(err) {
        console.log(err);
      })

  }

  function playGif() {
    $(".gif").on("click", function() {
      let state = $(this).data('state');
      if(state === 'still') {
        $(this).data('state', 'animate');
        $(this).attr('src', $(this).data('animate'));
      }

      else if(state === 'animate') {
        $(this).data('state', 'still');
        $(this).attr('src', $(this).data('still'));
      }
  })
}

$('#clear-button').on("click", function() {
  $('#gif-containter').empty();
})
  
$(document).on("click", ".tag", displayMovieInfo);
$(document).on("click", ".gif", playGif);

showButtons();
