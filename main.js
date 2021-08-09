let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let request = require("request");
let cheerio = require("cheerio");
let allMatchPageCbObj = require("C:\\Users\\91895\\Desktop\\rev\\wcat\\Module_2_Webscrapping\\activity\\ipl activity\\allmacth.js");
//onst { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
// myTeamName name venue date opponentTeamName result
request(url, cb);
function cb(error, response, html){
    if (error){
        //Print the error if one occured
        console.log(error);
    }
    else if(response.statusCode == 404) {
        console.log("Page not found")
    }else{
    //print the html for the
    //console.log(html);
    //console.log("html:", );
    dataExtracter(html);
    }
    }
    function dataExtracter(html){
        // search tool
        let searchTool = cheerio.load(html);
        let anchorrep = searchTool('a[data-hover="View All Results"]');
        let link = anchorrep.attr("href");
        // console.log("link", link);
        let fullAllmatchPageLink = `https://www.espncricinfo.com${link}`;
        console.log(fullAllmatchPageLink);
       // console.log("vaibhav")
        // go to all match page
      // request(fullAllmatchPageLink, allMatchPageCb);
    
    // function allMatchPageCb(error, response, html){
    //         if (error){
    //             //Print the error if one occured
    //             console.log(error);
    //         }
    //         else if(response.statusCode == 404) {
    //             console.log("Page not found")
    //         }else{
    //           //  console.log(html); 
    //        getAllScoreCardLink(html);
    //     }
    // }
    // function getAllScoreCardLink(html){
       
    //     let searchTool = cheerio.load(html);
    //     let scorecardsArr = searchTool("a[data-hover='Scorecard']");
    //     for(let i =0 ; i < scorecardsArr.length; i++){
    //          console.log("`````````````````````````");
    //         let link =searchTool(scorecardsArr[i]).attr("href");
    //         let fullAllmatchPageLink = `https://www.espncricinfo.com${link}`;
    //     console.log(fullAllmatchPageLink);
    //     }
    // }
    allMatchPageCbObj.alMatchPageCb(fullAllmatchPageLink);
    }


