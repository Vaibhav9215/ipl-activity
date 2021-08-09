 //let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");
//const path = require("path/posix");
const { dir } = require("console");
//const fs = require("fs");
function processSinglematch(url){
request(url, cb);}
function cb(error, response, html){
    if (error){
        //Print the error if one occured
        console.log(error);
    }
    else if(response.statusCode == 404) {
        console.log("Page not found")
    }else{
       // console.log("vbvbvbvvvvvvvvvvvvv");
    //print the html for the
    //console.log(html);
    //console.log("html:", );
    dataExtracter(html);
    }
    }
    function dataExtracter(html){
        let searchTool = cheerio.load(html)
        // let scoreCard = ""
        let descElem = searchTool(".event .description");
        let result = searchTool(".event .status-text");
        let stringArr = descElem.text().split(",");
        let venue = stringArr[1].trim();
        let date = stringArr[2].trim();
        result = result.text();
        let bothInningArr = searchTool(".card.content-block.match-scorecard-table>.Collapsible");
        for(let i = 0; i < bothInningArr.length ; i++){
            let teamName = searchTool(bothInningArr[i]).find("h5").text();
          //  let teamName = teamNameElem.text();
            // console.log(teamName);
            teamName = teamName.split("INNINGS")[0].trim();
           // console.log(teamName);
            let opponentIndex = i == 0 ? 1 : 0;
            let opponentName= searchTool(bothInningArr[opponentIndex]).find("h5").text();
            opponentName = opponentName.split("INNINGS")[0].trim();
            let Inning = searchTool(bothInningArr[i]);
            console.log(`${teamName}  ${venue} ${date} ${opponentName} ${result} `);
            let batsManTableBodyAllRows = searchTool(bothInningArr[i]).find(".table.batsman tbody tr");
            for (let j = 0; j < batsManTableBodyAllRows.length; j++){
                let numberofTds = searchTool(batsManTableBodyAllRows[j]).find("td");
          //   console.log(numberofTds.length);
            //    if (numberofTds.length == 8){
                    //console.log("you are valid")
                    let istrue= searchTool(numberofTds[0]).hasClass("batsman-cell");
                    if(istrue == true){
                    let playerName = searchTool(numberofTds[0]).text().trim();
                  //  console.log(playerName);
                    let runs = searchTool(numberofTds[2]).text().trim();
                    let balls = searchTool(numberofTds[3]).text().trim();
                    let fours = searchTool(numberofTds[5]).text().trim();
                    let sixes = searchTool(numberofTds[6]).text().trim();
                    let sr = searchTool(numberofTds[7]).text().trim();
                    console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
                    let fs = require("fs");
                    
                   let matchinfo = { "TeamName": teamName,
                      "name": playerName,
                      "venue": venue,
                      "date": date,
                      "opponent Team": opponentName,
                      "result": result,
                      "runs": runs,
                      "Balls": balls,
                      "4s": fours,
                      "6s": sixes,
                      "sr": sr,
                    }
                    let path = require("path");
                    let iplFolderPath = path.join(__dirname, "ipl");
                    if(!fs.existsSync(iplFolderPath)){
                      fs.mkdirSync(iplFolderPath);
                     }
                       let folderPath = path.join(__dirname, "ipl", teamName);
                       if(!fs.existsSync(folderPath)){
                        fs.mkdirSync(folderPath);
                       }
                    //  
                      let filePath = path.join(folderPath,playerName + ".json");
                      let content = [];
                      // let matchinfo ={
                      //   teamName, playerName, venue, date, opponentName, result, runs, balls, fours, sixes, sr
                      // }
                      content.push(matchinfo);
                      if(fs.existsSync(filePath)){
                        let buffer = fs.readFileSync(filePath);
                        content = JSON.parse(buffer);
                      }
                    
                      content.push(matchinfo);
                      fs.writeFileSync(filePath, JSON.stringify(content));
                      


                    }
  
     }
     
          //  console.log("``````````````````");
            //fs.writeFileSync(`innninf$(i + 1).html` , scoreCard);

        }
  }
    module.exports = {
      ps:  processSinglematch
    }