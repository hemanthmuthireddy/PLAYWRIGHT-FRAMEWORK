class Membercreation {

    constructor(page) {
        this.page = page;
        this.membersMenu = page.getByTitle('Members');
        this.addMemberBtn = page.getByAltText('add member');
        this.mobileNumber = page.getByTitle('Mobile Number').nth(1);
        this.firstName = page.getByTitle('First Name').nth(1);
        this.lastName = page.getByTitle('Last Name').nth(1);
        this.dob = page.getByPlaceholder('Date of Birth');
        this.calendarIcon = page.locator('.gravty-text-field__input-icon').first();
        this.genderDropdown = page.getByTitle('Gender');
    }
    async memberspagenavigation() {
        await this.membersMenu.click();
        await this.addMemberBtn.click();
    }

    parseDateFlexible(dateofbirth) {

        if (!dateofbirth) {
            throw new Error("DOB is undefined");
        }

        const cleaned = dateofbirth.trim();

        // DD/MM/YYYY or DD-MM-YYYY
        if (/^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/.test(cleaned)) {
            const [day, month, year] = cleaned.split(/[\/\-]/);
            return new Date(year, month - 1, day);
        }

        // YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
            const [year, month, day] = cleaned.split('-');
            return new Date(year, month - 1, day);
        }

        // fallback
        const parsed = new Date(cleaned);

        if (!isNaN(parsed.getTime())) return parsed;

        throw new Error(`Unsupported date format: ${dateofbirth}`);
    }

    async selectDOB(dateofbirth) {

        const parsedDate = this.parseDateFlexible(dateofbirth);

        if (isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid date: ${dateofbirth}`);
        }

        const day = String(parsedDate.getDate());
        const year = String(parsedDate.getFullYear());
        const monthIndex = String(parsedDate.getMonth()); // 0–11

        // ✅ Open calendar
        await this.calendarIcon.click();

        // ✅ Select Year (VERY IMPORTANT)
        await this.page.locator('.yearselect').selectOption({ label: year });

        // ✅ Select Month
        await this.page.locator('.monthselect').selectOption({ value: monthIndex });

        // ✅ Select Day
        await this.page.locator('td.available:not(.off):not(.disabled) span')
        .filter({ hasText: new RegExp(`^${day}$`) })
        .first()
        .click();
        // ✅ Save
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async membercreation(mobilnumber, firstname, lastname, dateofbirth, gender) {
        await this.mobileNumber.fill(mobilnumber);
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        // await this.dob.click();
        await this.selectDOB(dateofbirth);
        // await this.calendarIcon.click();
        // await this.dob.fill(dateofbirth);
        await this.genderDropdown.click();
        await this.page.getByRole('option', { name: gender }).nth(1).click();

    }
}

module.exports = { Membercreation };