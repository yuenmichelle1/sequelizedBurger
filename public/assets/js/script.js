$("#devour").on("click", function(event){
    var id= $(this).data("id");
    var newDevouredState= {
        devoured: true
    };
    $.ajax(`/burgers/${id}`, {
        type: "PUT", 
        data: newDevouredState
    }).then(function(){
        console.log('devoured changed');
        location.reload();
    })
})