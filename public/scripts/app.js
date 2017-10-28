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
      }
    });;
  }

  function getResources (){
    $.ajax({
      method: "GET",
      url: "/api/users/" + local_user + "/resources"
    }).done((resources) => {
      renderResources(resources)
    });
  }

   //take in an array of resource objects and then 
   function renderResources(resourcesArray) {
    // loops through resources
    resourcesArray.forEach(function (resource) {
    var resourceHtml = createResourceElement(resource);
    $('.all-resources').prepend(resourceHtml);
     
    });
    }

  function createResourceElement (resourceData) {
    return `
    <div class="col-sm-3 resource-container">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title"><a href="${resourceData.link}">${resourceData.title}</a></h4>
        <p class="card-text">${resourceData.description}</p>
        <a href="#" class="btn btn-primary">like</a>
      </div>
    </div>
  </div>
    
    `
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
  
  $(document).ready(function() {
    $(document).on('click', '.card-body',function() {
      $( "#my_outsights" ).hide( 0, function() {
        $("#expanded_resource").show( 0, function() {
        })
      });
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
