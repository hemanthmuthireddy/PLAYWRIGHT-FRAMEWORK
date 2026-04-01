class Rewardoffercreation {
    constructor(page) {
        this.page = page;
        this.offertitle = page.getByLabel('Offers');
        this.rewardicon = page.locator('.offer-type-btn--reward');
        this.manualoptionselection = page.locator('//span[text()="Manual"]');
        this.offer_title = page.getByLabel('Offer Title');
        this.sponsor=page.getByLabel('Sponsor(s)');
        this.offer_subtitle=page.getByLabel(' Offer Subtitle ');
        this.validityperiod=page.locator('.gravty-text-field__input-icon').first();
    }
}