let request = require("request");
let cheerio = require("cheerio");
let scoreCardObj = require("C:\\Users\\91895\\Desktop\\rev\\wcat\\Module_2_Webscrapping\\activity\\ipl activity\\scoreCard.js");
function allMatchPageCb(url){
    request(url, function (error, response, html){
    if(error){
        //Print the error if one occured
        console.log(error);
    }
    else if(response.statusCode == 404) {
        console.log("Page not found")
    }else{
      //  console.log(html); 
   getAllScoreCardLink(html);}
})
}
function getAllScoreCardLink(html){

let searchTool = cheerio.load(html);
let scorecardsElems = searchTool("a[data-hover='Scorecard']");
for(let i =0 ; i < scorecardsElems.length; i++){
   //  console.log("`````````````````````````");
    let link =searchTool(scorecardsElems[i]).attr("href");
    let fullAllmatchPageLink = `https://www.espncricinfo.com${link}`;
console.log(fullAllmatchPageLink);
scoreCardObj.ps(fullAllmatchPageLink);
}
}
module.exports ={
    alMatchPageCb: allMatchPageCb
}