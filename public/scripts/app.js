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

   //take in an array of resource objects and then appends each one to .all-resources
   function renderResources(resourcesArray) {
    // loops through resources
    resourcesArray.forEach(function (resource) {
    var resourceHtml = createResourceElement(resource);
    $('.all-resources').prepend(resourceHtml);
    });
  }

  //receiving an entire resource with all its information and appending to elements in the show resource page
  function renderResource(resource) {
    var html = '';
    var resourceHead = resource[0];
    var resourceLikes = resource[1];
    var resourceComments = resource[2];
    var resourceTags = resource[3];
    var resourceRating = resource[4];
    var resourceHeadHtml = createExpandedResourceElementHead (resourceHead[0]);
    var resourceTagsHtml = createExpandedResourceElementTags (resourceTags);
    var resourceCommentsHtml = createExpandedResourceElementComments (resourceComments);
    var resourceRatingHtml = createExpandedResourceElementRating (resourceRating[0]);
    var resourceLikesHtml = createExpandedResourceElementLikesNumber (resourceLikes[0]);
    console.log('likes number', resourceLikesHtml)
    // html + =lik
    $('#expanded_resource .container').prepend(resourceHeadHtml);
    $('#expanded_resource .container .tag-badges').append(resourceTagsHtml);
    $('#expanded_resource .comments').prepend(resourceCommentsHtml);
    $('#expanded_resource .container .likes-ratings .ratings .average-rating').append(resourceRatingHtml);
    $('#expanded_resource .container .likes-ratings .like-button').append(resourceLikesHtml);

  }

//functiion that takes a resource object array and returns the number of likes in an html span element
function createExpandedResourceElementLikesNumber (resourceData) {
  $('#expanded_resource .container .likes-ratings .like-button .inner-likes-amount').empty();
  return `
  <span class="inner-likes-amount">(${resourceData.likes})</span>
  `
}

//function that takes a resource object array and returns the average rating in an html span element
function createExpandedResourceElementRating (resourceData) {
  $('#expanded_resource .container .likes-ratings .ratings .average-rating').empty();
  return `
    <span class="average-rating-inner-span">  (avg. rating: ${Math.round(resourceData.avg)}) </span
  `
}
//function that takes a resource object array and returns the rating property

  //this function takes in a resource object array and iterates over its elements, returning divs containing the comments it gets after iterating through the array
  function createExpandedResourceElementComments (resourceData) {
    $('#expanded_resource .comments').empty();
    var allComments = '';
    for (var i = 0; i < resourceData.length; i++) {
      allComments += `
      <div class="card">
        <div class="card-body">
          ${resourceData[i].comment}
        </div>
      </div>
      `
    }
    return allComments;
  }

  // this function takes in a resource object array and iterates over its elements, returning span tag HTML elements containing the tags it gets from iterating through the array
  function createExpandedResourceElementTags (resourceData) {
    $('#expanded_resource .container .tag-badges').empty();
    var allTags = '';
    for (var i = 0; i < resourceData.length; i++) {
      allTags += `
      <span class="badge badge-success">${resourceData[i].tag_name}</span>
      `
    }
    return allTags;
  }
  //this function takes in a resource object and returns a <div> containing HTML structure with title, link, and description
  function createExpandedResourceElementHead (resourceData) {
    $('#expanded_resource .container .expanded-head').empty();
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
    if (resourceData.user_id === 1) { // TODO style the like/unlike
      var elementsLiked = '';
      $()
    }
    else {
      var elementsLiked = 'style="opacity: 0.5"';
    }
    return `
    <div class="col-sm-3 resource-container" >
      <div class="card">
        <div class="card-body" data-id="${resourceData.id}">
          <h4 class="card-title"><a href="${resourceData.link}">${resourceData.title}</a></h4>
          <p class="card-text">${resourceData.description}</p>
          <a href="#" class="btn btn-primary fa fa-heart fa-lg" ${elementsLiked}></a>
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
      const cardID = this.dataset.id;
      $( "#my_outsights" ).hide( 0, function() {
        $("#expanded_resource").show( 0, function() {
          viewResource(cardID);
        })
      });
    });
});

  $('.navbar form').on('input', 'input', function() {
    var data = {
      'search': $(this)[0].value
    };
    $.ajax({
      method: 'get',
      url: '/api/users/resources/search',
      data: data
    })
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
  });

    $( "#navbar_resources_toggle" ).click(function() {
    $( "#expanded_resource" ).hide( 0, function() {
      $("#my_outsights").show( 0, function() {
      })
    });
  });

  start();
});
