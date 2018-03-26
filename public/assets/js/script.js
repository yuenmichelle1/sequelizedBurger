$(function() {
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    var newdevoured = $(this).data("devoured");

    var newdevouredState = {
      devoured: 1
    };

    // Send the PUT request.
    $.ajax(`/burgers/update/${id}`, {
      type: "PUT",
      data: newdevouredState
    }).then(function() {
      console.log("changed devoured to", newdevoured);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newburger = {
      burger_name: $("#enter_text").val(),
      devoured: $("[name=devoured]:checked").val()
    };

    // Send the POST request.
    $.ajax("/burgers/create", {
      type: "POST",
      data: newburger
    }).then(function() {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
    console.log(newburger);
  });
});
