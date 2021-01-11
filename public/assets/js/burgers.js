$(function() {
    $(".add-new-burger").on("click", function(event) {
        event.preventDefault();
      var newburgerName = $("#burger-input");
  
      var newBurger = {
        buger_name: newburgerName.val()
      };
  
      // Send the PosT request.
      $.ajax("/api/burgers/", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("Added new burger:", newBurger);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $("#devour-this").on("click",function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      var id = $(this).parent().data("id");
      var DevouredState = {
        devoured: 1
      };
  
      // Send the PuT request.
      $.ajax("/api/burgers/:" + id, {
        type: "PUT",
        data: DevouredState
      }).then(
        function() {
          console.log("Burger devoured");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
  });
  