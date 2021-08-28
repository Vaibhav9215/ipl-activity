let request = require("request");
let cheerio = require("cheerio");
const path = require("path");
//const { dir } = require("console");
const fs = require("fs");
const xlsx = require("xlsx");
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
                    processPlayer(teamName,playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result);
                    let fs = require("fs");
                    }
                  }
                }
                console.log("```````````````");
              }//
              function processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result) {
                let teamPath = path.join(__dirname, "ipl", teamName);
                // directory create if not created
                dirCreater(teamPath);
                let filePath = path.join(teamPath, playerName + ".xlsx");
                // reads the content if file exists and returns an empty array file does not exist 
                let content = excelReader(filePath, playerName);
                let playerObj = {
                    teamName,
                    playerName,
                    runs,
                    balls,
                    fours,
                    sixes,
                    sr,
                    opponentName,
                    venue,
                    date,
                    result
                }
                content.push(playerObj);
                // excel write
                excelWriter(filePath, content, playerName);
            }
            let iplFolderPath = path.join(__dirname, "ipl");
                    if (!fs.existsSync(iplFolderPath)) {
                      fs.mkdirSync(iplFolderPath);
                    }
            function dirCreater(filePath) {
            
                if (fs.existsSync(filePath) == false) {
                    fs.mkdirSync(filePath);
                }
            
            }
            function excelWriter(filePath, json, sheetName) {
                // workbook create
                let newWB = xlsx.utils.book_new();
                // worksheet
                let newWS = xlsx.utils.json_to_sheet(json);
                xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
                // excel file create 
                xlsx.writeFile(newWB, filePath);
            }
            // // json data -> excel format convert
            // // -> newwb , ws , sheet name
            // // filePath
            // read 
            //  workbook get
            function excelReader(filePath, sheetName) {
                if (fs.existsSync(filePath) == false) {
                    return [];
                }
                // player workbook
                let wb = xlsx.readFile(filePath);
                // get data from a particular sheet in that wb
                let excelData = wb.Sheets[sheetName];
                // sheet to json 
                let ans = xlsx.utils.sheet_to_json(excelData);
                return ans;
            }
            module.exports = {
              ps: processSinglematch
            }