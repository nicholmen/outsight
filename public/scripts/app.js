$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
  $( ".card-block" ).click(function() {
    $( "#my_outsights" ).hide( 0, function() {
      $("#expanded_resource").show( 0, function() {
      })
    });
  });
  $( "#resources_toggle" ).click(function() {
    $( "#expanded_resource" ).hide( 0, function() {
      $("#my_outsights").show( 0, function() {
      })
    });
  })
});
