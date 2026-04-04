class Rewardoffercreation {
    constructor(page) {
        this.page = page;
        this.offertitle = page.getByTitle('Offers');
        this.rewardicon = page.locator('.offer-type-btn--reward');
        this.manualoptionselection = page.locator('//span[text()="Manual"]');
        this.offer_title = page.locator('div:has-text("Offer Title")').locator('input');
        this.sponsor = page.locator('.offer-details__left-container__sponsors__dropdown__input-field');
        this.offer_subtitle = page.locator('div:has-text("Offer Subtitle")').locator('input');
        this.validityperiod = page.locator('.gravty-text-field__input-icon').first();
        this.selectlocations = page.getByRole('button', { name: 'Select Locations' });
        this.BITsposnor =page.getByRole('radio', { name: 'BIT Sponsor' });
    }
    async offerpagenavigation() {
        await this.offertitle.click();
        await this.rewardicon.click();
        await this.manualoptionselection.click();
    }
    parseDateFlexible(validity) {

        if (!validity) {
            throw new Error("DOB is undefined");
        }

        const cleaned = validity.trim();

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

        throw new Error(`Unsupported date format: ${validity}`);
    }

    async selectDOB(validity) {

        const parsedDate = this.parseDateFlexible(validity);

        if (isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid date: ${validity}`);
        }

        const day = String(parsedDate.getDate());
        const year = String(parsedDate.getFullYear());
        const monthIndex = String(parsedDate.getMonth()); // 0–11

        // ✅ Open calendar
        await this.validityperiod.click();

        // ✅ Select Year (VERY IMPORTANT)
        await this.page.locator('.yearselect').first().selectOption({ label: year });

        // ✅ Select Month
        await this.page.locator('.monthselect').first().selectOption({ value: monthIndex });

        // ✅ Select Day
        await this.page.locator('td.available:not(.off):not(.disabled) span')
            .filter({ hasText: new RegExp(`^${day}$`) })
            .first()
            .click();
        // ✅ Save
        await this.page.getByRole('button', { name: 'Save' }).click();
    }


    async createrewardoffer(offermain) {
        const { Offer_Title, Sponsor, Offer_Subtitle, validity } = offermain;
        await this.offer_title.first().fill(Offer_Title);
        await this.sponsor.first().fill(Sponsor);
        await this.page.locator('li.offer-details__left-container__sponsors__dropdown__list__listvalue').click();
        //await this.offer_subtitle.first().fill(Offer_Subtitle);
        // await this.validityperiod.click();
        await this.selectDOB(validity);
        await this.BITsposnor.check();
    }

    async clickSelectLocations() {
        await this.selectlocations.click();
    }
}
module.exports = { Rewardoffercreation };