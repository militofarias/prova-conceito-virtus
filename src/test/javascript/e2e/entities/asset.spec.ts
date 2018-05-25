import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Asset e2e test', () => {

    let navBarPage: NavBarPage;
    let assetDialogPage: AssetDialogPage;
    let assetComponentsPage: AssetComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Assets', () => {
        navBarPage.goToEntity('asset');
        assetComponentsPage = new AssetComponentsPage();
        expect(assetComponentsPage.getTitle())
            .toMatch(/jHipsterBlogApp.asset.home.title/);

    });

    it('should load create Asset dialog', () => {
        assetComponentsPage.clickOnCreateButton();
        assetDialogPage = new AssetDialogPage();
        expect(assetDialogPage.getModalTitle())
            .toMatch(/jHipsterBlogApp.asset.home.createOrEditLabel/);
        assetDialogPage.close();
    });

    it('should create and save Assets', () => {
        assetComponentsPage.clickOnCreateButton();
        assetDialogPage.setPathInput('path');
        expect(assetDialogPage.getPathInput()).toMatch('path');
        assetDialogPage.postSelectLastOption();
        assetDialogPage.save();
        expect(assetDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AssetComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-asset div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AssetDialogPage {
    modalTitle = element(by.css('h4#myAssetLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    pathInput = element(by.css('input#field_path'));
    postSelect = element(by.css('select#field_post'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPathInput = function(path) {
        this.pathInput.sendKeys(path);
    };

    getPathInput = function() {
        return this.pathInput.getAttribute('value');
    };

    postSelectLastOption = function() {
        this.postSelect.all(by.tagName('option')).last().click();
    };

    postSelectOption = function(option) {
        this.postSelect.sendKeys(option);
    };

    getPostSelect = function() {
        return this.postSelect;
    };

    getPostSelectedOption = function() {
        return this.postSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
