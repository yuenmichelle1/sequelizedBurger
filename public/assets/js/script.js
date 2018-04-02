$(function() {
  $(".change-devoured").on("submit", function(event) {
    event.preventDefault();
    var id = $(".btn-success").data("id");
    var customerName = $(".customerName").val().trim();
    console.log(customerName)
    //Post a new customer then PUT onto burger
    if (customerName){
     $.ajax(`/burgers/customer`, {
        type: "POST",
        data: {
          customer_name: customerName
        }
      }).then(function(res) {
        var customerId = res.id;
        $.ajax(`/burgers/update/${id}`, {
          type: "PUT",
          data: {
            CustomerId: customerId,
            devoured: 1
          }   
        }).then(function() {
          console.log("customer added to burger");
          location.reload();
        });
      });
    }
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    if ($("#enter_text").val().trim() != "") {
          var newburger = {
          burger_name: $("#enter_text").val().trim(),
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
      });
   }
    
});
