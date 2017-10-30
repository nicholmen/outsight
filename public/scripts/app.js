$(() => {
  let local_user = '';
  let resource_id ='';

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
    var resourceComments = resource[2].reverse();
    var resourceTags = resource[3];
    var resourceRating = resource[4];
    var resourceHeadHtml = createExpandedResourceElementHead (resourceHead[0]);
    var resourceTagsHtml = createExpandedResourceElementTags (resourceTags);
    var resourceCommentsHtml = createExpandedResourceElementComments (resourceComments);
    var resourceRatingHtml = createExpandedResourceElementRating (resourceRating[0], resourceHead[0].id);
    var resourceLikesHtml = createExpandedResourceElementLikesNumber (resourceLikes[0]);
    // html + =lik
    $('#expanded_resource .container').prepend(resourceHeadHtml);
    $('#expanded_resource .tag-badges').append(resourceTagsHtml);
    $('#expanded_resource .comments').append(resourceCommentsHtml);
    $('#expanded_resource .container .rating .ratings .average-rating').append(resourceRatingHtml);
    $('#expanded_resource .container .likes-ratings .like-button').append(resourceLikesHtml);

  }

function renderSearchOptions(searchInput) {
    var searchOptionHtml = createDatalistOption (searchInput)
    $('.searchResultsDiv').prepend(searchOptionHtml)
  }


function createDatalistOption (searchInput) {
  $('.navbar .searchResultsDiv').empty();
  var allSearchMatches = '';
  for (var i = 0; i < searchInput.length; i++) {
    allSearchMatches += `
    <option class="searchOption" value="${searchInput[i].title}" data-searchId="${searchInput[i].id}"></option>
    `
  }
  return allSearchMatches;
}

//functiion that takes a resource object array and returns the number of likes in an html span element
function createExpandedResourceElementLikesNumber (resourceData) {
  $('#expanded_resource .container .likes-ratings .like-button .inner-likes-amount').empty();
  return `
  <span class="inner-likes-amount">${resourceData.likes}</span>
  `
}

//function that takes a resource object array and returns the average rating in an html span element
function createExpandedResourceElementRating (resourceData, id) {
  $('#expanded_resource .container .ratings .average-rating').empty();
      for (i = 1; i <= 5; i++){
    $(`#expanded_resource .container .ratings .rating-block #${i}`).removeClass();
    $(`#expanded_resource .container .ratings .rating-block #${i}`).addClass("btn btn-default btn-grey btn-sm");
  }
    $.ajax({
      method: "GET",
      url: "/api/users/resource/" + id + "/rate"
    }).done((resource) => {
         for (i = 1; i <= resource[0].rating; i++){
          $(`#expanded_resource .container .ratings .rating-block #${i}`).removeClass();
          $(`#expanded_resource .container .ratings .rating-block #${i}`).addClass("btn btn-warning btn-sm");
        }
    });


  return `
    <span class="average-rating-inner-span">${(Math.round(resourceData.avg)).toFixed(1)}</span
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
    $('#expanded_resource .tag-badges').empty();
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
    <div class="expanded-head" data-resid="${resourceData.id}">
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
    console.log('hello')

      renderResource(resource);
    });
  }

  function viewUser(){
    $.ajax({
      method: "GET",
      url: "/api/users/users/" + local_user + "/edit"
    }).done((user) => {
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

  $('.rating-block button').on('click', function() {
    const cardID = this.parentNode.parentNode.parentNode.parentNode
    var article = cardID.getElementsByClassName('expanded-head');
    var resId = $(article)[0].dataset.resid;
    var data2 = {rating: this.id}

    $.ajax({
      method: "POST",
      url: "/api/users/resources/"+ resId +"/rate",
      data: data2
    }).done((user) => {
      viewResource(resId);
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
    }).done((search) => {
      renderSearchOptions(search);
      resource_id = search[0].id;


    })
  });

  $('.navbar #search-button').click(function() {
    $( "#my_outsights" ).hide( 0, function() {
      $("#expanded_resource").show( 0, function() {
        viewResource(resource_id);
        console.log('checking', $("#search-input"))
        $('#search-input').val('')
      })
    });
  })

  $('.comment-form form').on('submit', function (event) {
    event.preventDefault();
    let theForm = this;
    let data = $(this).serialize();
    let commentContent = $(".comment-form textarea").val();
    const cardID = this.parentNode.parentNode;
    var article = cardID.getElementsByClassName('expanded-head');
    var resId = $(article)[0].dataset.resid;
    var data2 = {
      comment: commentContent
    }
    $.ajax({
      method: "POST",
      url: "/api/users/resources/"+ resId +"/comment",
      data: data2
    }).done((user) => {
      theForm.reset();
      viewResource(resId)
    });
  });


  $( "#resources_toggle" ).click(function() {
    $( "#expanded_resource" ).hide( 0, function() {
      $("#my_outsights").show( 0, function() {
      })
    });
  });

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

  $()
  start();
});
