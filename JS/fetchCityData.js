import { FindCitybyName } from "./autoComplete.js";

let getCityFullName = () => {
    let citiesName = [];
    $('.city-selection input').each(function () {
        citiesName.push($(this).val());
    })

    return citiesName;
}

let getCityItemLinks = async (cityName) => {
    let citiesLinks;

    let city = await FindCitybyName(cityName);
    citiesLinks = city._embedded['city:search-results'][0]._links['city:item'].href;
    return citiesLinks;
    
}

let findCityInfor = async (myURL) => {
    try{
        let response = await fetch(myURL);
        if(response.status == 200){
            let result = await response.json();
            return result;
        }
    }
    catch(error){
        console.log(error);
    }


}


let ExtractBasicInfor = (city) => {
    let basicInfor = [];
    let state = city._links['city:admin1_division'].name;
    let country = city._links['city:country'].name;
    let timezone = city._links['city:timezone'].name;
    let urbanArea = city._links['city:urban_area'].name;
    let population = city.population;
    let cityName = city.name

    basicInfor.push(state,country,timezone,urbanArea,population,cityName)
    return basicInfor;
}

let displayBasicData = (dataSet, index) => {
    let lenght = dataSet.length;
    //display Basic infor
    dataSet.forEach((data,j) => {
        $('.basic-infor').eq(index).find('input').eq(j).val(data);
    })

    // display city name
    $('.city-banner').eq(index).children('.city-name').text(dataSet[lenght-1]);
}

let displayCityScore = (urbanResult, index) => {
    let dataSet = urbanResult.categories;
    dataSet.forEach((data,j) => {
        let label = data.name;
        let score =  parseFloat(data.score_out_of_10).toFixed(2);
        let color = data.color;

        //append score bar
        let scoreTemplate = `<div class="row">
            <label>${label}</label>
            <div class="score-container">
                <div class="score-bar">
                    <div></div>
                </div>
                <div class="score">
                    <span>${score}</span>
                </div>
            </div>
            </div>`;
        $('.city-score').eq(index).append(scoreTemplate);


        // style score bar
        let currentScoreBar = $('.city-score').eq(index).find(".score-bar div").last();
        let scoreBarWidth = score*10;
        currentScoreBar.width(scoreBarWidth + "%");
        currentScoreBar.css({
            backgroundColor: color
        })
    })
    
}



let getCityImage = async (cityName) => {
    let citylink = await getCityItemLinks(cityName);
    let cityResult = await findCityInfor(citylink);
    let urbanLink = cityResult._links['city:urban_area'].href;
    let urbanResult = await findCityInfor(urbanLink);

    let urbanImageLink = urbanResult._links['ua:images'].href;
    let urbanImageResult = await findCityInfor(urbanImageLink);

    let webImage = urbanImageResult.photos[0].image.web;
    let mobilImage = urbanImageResult.photos[0].image.mobile;

    return {web: webImage, mobile: mobilImage};

}

let displayCityFinalScore = (urbanScroreResult,index) => {
    let cityFinalScore = urbanScroreResult.teleport_city_score.toFixed(1);

    $('.city-final-score').eq(index).text(cityFinalScore);
}

let displaySummary = (urbanScroreResult,index) =>{
    let summary = urbanScroreResult.summary;
    $('.summary-detail').eq(index).html(summary);
}



let fetchCityData = async () =>{
    try{
        for(let i = 0 ;i <2 ;i ++){
            let CityNameList = getCityFullName();
            let citylink = await getCityItemLinks(CityNameList[i]);
            let cityResult = await findCityInfor(citylink);
            let cityBasicInfor = await  ExtractBasicInfor(cityResult);
    
            let urbanLink = cityResult._links['city:urban_area'].href;
            let urbanResult = await findCityInfor(urbanLink);
            let urbanScoreLink = urbanResult._links['ua:scores'].href;
            let urbanScroreResult = await findCityInfor(urbanScoreLink);

            console.log(urbanScroreResult);
    
            displayBasicData(cityBasicInfor,i);
            displayCityScore(urbanScroreResult,i);
            displaySummary(urbanScroreResult,i);
            displayCityFinalScore(urbanScroreResult,i);
        }

        return true;
    
    }

    catch(error){
        console.log(error);
        return false;
    }
}


export {fetchCityData, getCityImage}