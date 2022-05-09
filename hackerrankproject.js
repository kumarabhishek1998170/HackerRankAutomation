
const pupeteer = require("puppeteer");
const codeobj=require('./code');


const loginlink = "https://www.hackerrank.com/auth/login";
const email = "xamot46817@stvbz.com";
const password = "222525";

// browser launch
let browseropen = pupeteer.launch({
  headless: false,

  args: ["--start-maximized"],

  defaultViewport: null,
});

let page;
// browser launch ke bd uska object milega jispe new page call krke tab me store kar lege
browseropen
  .then(function (browserobj) {
    let browseropoenpromise = browserobj.newPage();
    return browseropoenpromise;
  })
  .then(function (newtab) {
    page = newtab;
    let hackerrankopenpromise = page.goto(loginlink);
    return hackerrankopenpromise;
  })
  .then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 });
    return emailIsEntered;
  })
  .then(function () {
    let passwordIsEntered = page.type("input[id='input-2']", password, {
      delay: 50,
    });
    return passwordIsEntered;
  })
  .then(function () {
    let loginButtonclick = page.click(
      'button[data-analytics="LoginPassword"]',
      { delay: 50 }
    );
    return loginButtonclick;
  })
  .then(function () {
    let pageopenpromise = page.waitForSelector(
      "div[data-automation='algorithms']",
      { visible: true }
    );
    return pageopenpromise;
  })
  .then(function () {
    let clickonalgopromise = waitandclick("div[data-automation='algorithms']",page)
    return clickonalgopromise;
  }).then(function () {
    let clickonalgopromise = waitandclick('input[value="warmup"]',page)
    return clickonalgopromise;
  }).then(function(){
      let waitfor3sec=page.waitFor(3000)
      return waitfor3sec;
  }).then(function(){
    let allchallengepromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:50});
    return allchallengepromise;
  }).then(function(questionarray){
     // console.log("total",questionarray.length);
      let questionn=questionsolver(page,questionarray[0],codeobj.answer[0]);
      return questionn;
  })














// wait for a selector promise after promise complete then only click on that selector
function waitandclick(seletor, cpage) {
    console.log(seletor);
    
        return new Promise(function (resolve, reject) {
            let waitmodelpromise = cpage.waitForSelector(seletor);
            waitmodelpromise.then(function () {
                let clickmodel = cpage.click(seletor);
                return clickmodel;
            }).then(function () {
                 resolve();
            }).catch(function (err) {
                reject()
            })
        })
}

function questionsolver(page,question,answer ){
    return new Promise(function(resolve,reject){
        let questionwillbeclicked=question.click();
     questionwillbeclicked.then(function(){
         let editorinfocuspromise=waitandclick(".monaco-editor.no-user-select.vs",page);
         return editorinfocuspromise;
     }).then(function(){
         return waitandclick(".checkbox-input",page);
     }).then(function(){
        return waitandclick(".text-area.custominput",page);
    }).then(function(){
         return page.type('.text-area.custominput',answer,{delay:10})
    }).then(function(){
        let ctrlispressed =page.keyboard.down('Control')
        return ctrlispressed;
    }).then(function(){
        let Aispressed =page.keyboard.press('A',{delay:100})
        return Aispressed;
    }).then(function(){
        let Xispressed =page.keyboard.press('X',{delay:100})
        return Xispressed;
    }).then(function(){
        let ctrlisunpressed =page.keyboard.up('Control')
        return ctrlisunpressed;
    }).then(function(){
        let maineditorinfocus=waitandclick('.monaco-editor.no-user-select.vs',page)
        return maineditorinfocus; 
    }).then(function(){
        let ctrlispressed =page.keyboard.down('Control')
        return ctrlispressed; 
    }).then(function(){
        let Aispressed =page.keyboard.press('A',{delay:100})
        return Aispressed;
    }).then(function(){
        let Vispressed =page.keyboard.press('V',{delay:100})
        return Vispressed;
    }).then(function(){
        let maineditorinfocus=waitandclick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',page,{delay:50})
        return maineditorinfocus; 
    })

    })
}
//////////////////////////////////////////// COMPLETED SUCCESSFULLYYYYYYYYYYYYY ///////////////////////////////////////////