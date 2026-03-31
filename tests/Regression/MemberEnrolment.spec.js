const {test, expect } = require("@playwright/test");
const {Membercreation} = require('../../pages/Membercreation');
const memberdata = require('../../data/memberenrolment.json');
const LoginPage = require('../../pages/LoginPage');
const users = require('../../data/users.json');

test('Member Enrolemnt',async({page})=>{
    const login = new LoginPage(page);
 await login.navigateto();
  await login.login(users.validUser.username, users.validUser.password);
const membercreation=new Membercreation(page);
 await membercreation.memberspagenavigation();
await membercreation.membercreation(memberdata.memberinfo.mobilenumber,memberdata.memberinfo.firstname,memberdata.memberinfo.lastname,memberdata.memberinfo.dateofbirth,memberdata.memberinfo.gender);
});