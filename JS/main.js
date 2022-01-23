import{FindCitybyName, filterCityResult, displaySuggestion} from './autoComplete.js';
$(document).ready(function(){
// ========= Landing animation ===========
let runLandingAnimation = () => {
    $('.animation-container span').eq(0).addClass('animation2');
    $('.animation-container span').eq(0).removeClass('animation1');

    $('.animation-container span').eq(1).addClass('animation1');
    $('.animation-container span').eq(1).removeClass('animation2');

    $('.city-container').addClass('show-city-container');
    $('.city-divider span').addClass('show-city-container');

    $('.city-selection').addClass('show-city');

    $('.control-button').addClass('show-control-button');
}

runLandingAnimation();


// ============= Transition function ==========
let TurnOnLoader = () => {
    $('.city-divider').addClass('onloading');
    $('.city-divider span').addClass('loader');
}

let TurnOffLoader = () => {
    $('.city-divider').removeClass('onloading');
    $('.city-divider span').addClass('finishedloading');
}

let showCityResult = () => {
    // hide city selection
    $('.city-selection').addClass('remove-delay');
    $('.city-selection').removeClass('show-city');

    // show city result
    $('.city-result').addClass('show-city');
}

let TurnOnVote = () => {
    //turn on vote button
    $('.control-button button').removeClass('hide-btn');
    $('#city-selection-btn').addClass('hide-btn');

}

let TurnOffVote = () => {
      //turn off vote button
      $('.control-button button').removeClass('hide-btn');
      $('#city-vote-btn').addClass('hide-btn');
  
}

//  ============== Check input Validity =============
let checkValidity = () => {
    const count = $('.city-selection').length;
    let pass = true;
    $('.city-selection').each(function(index){
        pass = $(this).children('form').get(0).reportValidity();
        if(!pass){
            return pass
        }
    })

    return pass;
}
$('#city-selection-btn').on('click',function(){
    // Check City selsection input validity
    if(checkValidity()){
        // Turn on loader
        TurnOnLoader();

        setTimeout(() => {
            TurnOffLoader();
            showCityResult();
            TurnOnVote();
        }, 2000);
       

    }
})

// ============ Vote button click ================
$('#city-vote-btn').on('click',function(){
    // show vote option
    $('.vote').addClass('show-vote');
})
// =========== Final vote click ===========
$('.vote').on('click',function(e){
    let lossingCity = $(e.currentTarget).parents('.city-container');
    let winningCity = lossingCity.siblings('.city-container');
    // Highlight winning city;
    winningCity.children('.city-result').addClass('winning-city');
})



// ============ Indicator slide function ==============
$('.indicator div').on('click', function(e){
    let parent = $(e.currentTarget).parent();
    let indicatorList = parent.children();
    let pos = indicatorList.index($(e.currentTarget));
    let distance = $('.infor-slider').width() * pos;
    let slider = parent.siblings('.infor-slider');

    //set new indicator
    indicatorList.removeClass('current-slide');
    $(e.currentTarget).addClass('current-slide');

    // move slider
    slider.css({
        transform: 'translateX(-'+distance+'px)'
    })
})


// ============== Auto Complete City Selection ==============
const numberCity = 5;

$('.city-selection input').keydown(async function(){
    let keyword = $(this).val();
    //reset suggestion field every new keydown
    $(this).siblings(".suggestion").html("");
    
    //fetching data from API
    let result = await FindCitybyName(keyword);

    //filter 5 closest result
    if(result.count > 0){
        let filteredResult = filterCityResult(result, numberCity);
        displaySuggestion($(this), filteredResult);
    }

    //reset suggestion if input has no value
    if($(this).val() == ""){
        $(this).siblings(".suggestion").html("");
    }
})





})
