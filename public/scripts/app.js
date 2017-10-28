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
        viewResource(1);   
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

   //take in an array of resource objects and then appends each one to .all-resources
   function renderResources(resourcesArray) {
    // loops through resources
    resourcesArray.forEach(function (resource) {
    var resourceHtml = createResourceElement(resource);
    $('.all-resources').prepend(resourceHtml);
     
    });
  }
  //receiving an entire resource with all its information and append it to #expanded_resource (show resource page)
  function renderResource(resource) {
    console.log('hi');
    var html = '';
    var resourceHead = resource[0];
    var resourceLikes = resource[1];
    var resourceComments = resource[2];
    var resourceTags = resource[3];
    var resourceRating = resource[4];
    var resourceHeadHtml = createExpandedResourceElementHead (resourceHead[0]);
    // html += resourceHeadHtml;
    // html + =lik
    $('#expanded_resource .container').prepend(resourceHeadHtml);
    
  }

  //this function takes in a resource object and returns a <div> containing HTML structure of all of the resources expanded details
  function createExpandedResourceElementHead (resourceData) {
    console.log('resourceData title:', resourceData.title)
    return `
    <div class="expanded-head">
      <h1>${resourceData.title}</h1>
      <p><a href="${resourceData.link}">${resourceData.link}</a></p>
      <p>${resourceData.description}
      </p>
    </div>
    `
  }
  //this function takes in a resource object and returns a resource <div> containing the HTML structure of the resource (as a bootstrap card)  
  function createResourceElement (resourceData) {
    return `
    <div class="col-sm-3 resource-container" data-id="${resourceData.id}">
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
      renderResource(resource);
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
