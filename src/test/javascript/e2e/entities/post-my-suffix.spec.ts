import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Post e2e test', () => {

    let navBarPage: NavBarPage;
    let postDialogPage: PostDialogPage;
    let postComponentsPage: PostComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Posts', () => {
        navBarPage.goToEntity('post-my-suffix');
        postComponentsPage = new PostComponentsPage();
        expect(postComponentsPage.getTitle())
            .toMatch(/jHipsterBlogApp.post.home.title/);

    });

    it('should load create Post dialog', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage = new PostDialogPage();
        expect(postDialogPage.getModalTitle())
            .toMatch(/jHipsterBlogApp.post.home.createOrEditLabel/);
        postDialogPage.close();
    });

    it('should create and save Posts', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage.setTitleInput('title');
        expect(postDialogPage.getTitleInput()).toMatch('title');
        postDialogPage.setDateInput(12310020012301);
        expect(postDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        postDialogPage.bodySelectLastOption();
        postDialogPage.authorSelectLastOption();
        postDialogPage.save();
        expect(postDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PostComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-post-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PostDialogPage {
    modalTitle = element(by.css('h4#myPostLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    dateInput = element(by.css('input#field_date'));
    bodySelect = element(by.css('select#field_body'));
    authorSelect = element(by.css('select#field_author'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    bodySelectLastOption = function() {
        this.bodySelect.all(by.tagName('option')).last().click();
    };

    bodySelectOption = function(option) {
        this.bodySelect.sendKeys(option);
    };

    getBodySelect = function() {
        return this.bodySelect;
    };

    getBodySelectedOption = function() {
        return this.bodySelect.element(by.css('option:checked')).getText();
    };

    authorSelectLastOption = function() {
        this.authorSelect.all(by.tagName('option')).last().click();
    };

    authorSelectOption = function(option) {
        this.authorSelect.sendKeys(option);
    };

    getAuthorSelect = function() {
        return this.authorSelect;
    };

    getAuthorSelectedOption = function() {
        return this.authorSelect.element(by.css('option:checked')).getText();
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
