class Membercreation {

    constructor(page) {
        this.page = page;
        this.membersMenu = page.getByTitle('Members');
        this.addMemberBtn = page.getByAltText('add member');
        this.mobileNumber = page.getByTitle('Mobile Number').nth(1);
        this.firstName = page.getByLabel('First Name');
        this.lastName = page.getByLabel('Last Name');
        this.dob = page.getByLabel('Date of Birth');
        this.calendarIcon = page.locator('.gravty-text-field__input-icon').first();
        this.genderDropdown = page.getByLabel('Gender');
        this.genderOptionMale = page.getByText('Male');
    }
    async memberspagenavigation() {
        await this.membersMenu.click();
        await this.addMemberBtn.click();
    }
    async membercreation(firstname, lastname, dateofbirth, gender, mobilnumber) {
        await this.mobileNumber.fill(mobilnumber);
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.dob.click();
        await this.calendarIcon.click();
        await this.dob.fill(dateofbirth);
        await this.genderDropdown.click();
        await this.genderOptionMale.click();

    }
}

module.exports = { Membercreation };