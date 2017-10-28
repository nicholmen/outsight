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
        getResources();
      }
    });;
  }

  function getResources (){
    $.ajax({
      method: "GET",
      url: "/api/users/" + local_user + "/resources"
    }).done((oAuth) => {
      console.log(oAuth);
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
