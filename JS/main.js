$(document).ready(function(){
// ========= Landing animation ===========
let runLandingAnimation = () => {
    $('.animation-container span').eq(0).addClass('animation2');
    $('.animation-container span').eq(0).removeClass('animation1');

    $('.animation-container span').eq(1).addClass('animation1');
    $('.animation-container span').eq(1).removeClass('animation2');

    $('.city-container').addClass('show-city-container');
    $('.city-divider span').addClass('show-city-container');

    $('.city-selection').addClass('show-city-selection');

    $('.control-button').addClass('show-control-button');
}

runLandingAnimation();

// ============= Turn on and off loader ==========
let TurnOnLoader = () => {
    $('.city-divider').addClass('onloading');
    $('.city-divider span').addClass('loader');
}

let TurnOffLoader = () => {
    $('.city-divider').removeClass('onloading');
    $('.city-divider span').removeClass('loader');
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
$('.control-button button').on('click',function(){
    // Check City selsection input validity
    if(checkValidity()){
        // Turn on loader
        TurnOnLoader();

    }
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
})
