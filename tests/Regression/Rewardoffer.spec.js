const {test,expect}= require('@playwright/test');
const {Rewardoffercreation}= require('../../pages/Rewardoffercreation');
const offerdata= require('../../data/rewardoffer.json');
const {LoginPage} = require('../../pages/LoginPage');
const users = require('../../data/users.json');



test('reward Offer Creation',async({page})=>{
    const login = new LoginPage(page);
 await login.navigateto();
  await login.login(users.validUser.username, users.validUser.password);
const rewardoffercreation= new Rewardoffercreation(page);
await rewardoffercreation.offerpagenavigation();
//await page.pause();
await rewardoffercreation.createrewardoffer((offerdata.offermain));
await rewardoffercreation.clickSelectLocations();
await page.pause();

});