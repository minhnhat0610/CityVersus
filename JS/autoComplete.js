const CitybyNameURL = 'https://api.teleport.org/api/cities/?search=';
const numberCity = 5;
let FindCitybyName = async (keyword) => {
    let destination = CitybyNameURL + keyword;
    try{
        let response = await fetch(destination);
        if(response.status == 200){
            let result = await response.json();
            return result;    
        }
    }
    catch(error){
        console.log(error);
    }
}

let filterCityResult = (resultSet) => {
    let length = resultSet.count;
    let filteredResult = [];
    for(let i=0; i <length; i++){
        if(i<=numberCity){
            let result = resultSet._embedded['city:search-results'][i];
            filteredResult.push(result);    
        }
        else break;
    }

    return filteredResult

}

let displaySuggestion = (input, filteredResult) => {
    let suggestionList = input.siblings('.suggestion');
    filteredResult.forEach(result => {
        let CityFullName = result.matching_full_name;
        suggestionList.append(`<li>${CityFullName}</li>`)
    });

    $('.suggestion li').on('click',function(){
        //fill matching text to input field
        let input = $(this).parents('.suggestion').siblings('input');
        input.val($(this).html());

        //reset suggestion field
        $(this).parents(".suggestion").html("");
    })
}

export {FindCitybyName, filterCityResult, displaySuggestion}