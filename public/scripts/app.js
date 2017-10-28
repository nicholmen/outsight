$(() => {
  let local_user = '';

  function start(){
    $.ajax({
      method: "POST",
      url: "/api/users/login"
    }).done((oAuth) => {
      if(oAuth.error){
        console.log('Please login or register!');
      } else {
        local_user = oAuth;
        // Deactivate login container and activate all elements
        // from home page with the data got from the function bellow
        getResources();
        viewUser();
      }
    });;
  }

  function getResources (){
    $.ajax({
      method: "GET",
      url: "/api/users/" + local_user + "/resources"
    }).done((resources) => {
      console.log(resources);
    });
  }

  function viewResource(resource_id){
    $.ajax({
      method: "GET",
      url: "/api/users/resources/" + resource_id + "/show"
    }).done((resource) => {
      console.log(resource);
    });
  }

  function viewUser(){
    $.ajax({
      method: "GET",
      url: "/api/users/users/" + local_user + "/edit"
    }).done((user) => {
      console.log(user);
    });
  }

  $( ".card-body" ).click(function() {
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
  $( ".your-outsights" ).click(function() {
    $( ".outsight-explain" ).toggle( 0, function() {
    });
  })

  start();
});
