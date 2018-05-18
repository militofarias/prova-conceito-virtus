import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Body e2e test', () => {

    let navBarPage: NavBarPage;
    let bodyDialogPage: BodyDialogPage;
    let bodyComponentsPage: BodyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Bodies', () => {
        navBarPage.goToEntity('body-my-suffix');
        bodyComponentsPage = new BodyComponentsPage();
        expect(bodyComponentsPage.getTitle())
            .toMatch(/jHipsterBlogApp.body.home.title/);

    });

    it('should load create Body dialog', () => {
        bodyComponentsPage.clickOnCreateButton();
        bodyDialogPage = new BodyDialogPage();
        expect(bodyDialogPage.getModalTitle())
            .toMatch(/jHipsterBlogApp.body.home.createOrEditLabel/);
        bodyDialogPage.close();
    });

    it('should create and save Bodies', () => {
        bodyComponentsPage.clickOnCreateButton();
        bodyDialogPage.setTextInput('text');
        expect(bodyDialogPage.getTextInput()).toMatch('text');
        bodyDialogPage.save();
        expect(bodyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BodyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-body-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BodyDialogPage {
    modalTitle = element(by.css('h4#myBodyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    textInput = element(by.css('textarea#field_text'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTextInput = function(text) {
        this.textInput.sendKeys(text);
    };

    getTextInput = function() {
        return this.textInput.getAttribute('value');
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
