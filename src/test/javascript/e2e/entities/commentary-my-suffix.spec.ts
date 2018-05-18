import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Commentary e2e test', () => {

    let navBarPage: NavBarPage;
    let commentaryDialogPage: CommentaryDialogPage;
    let commentaryComponentsPage: CommentaryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Commentaries', () => {
        navBarPage.goToEntity('commentary-my-suffix');
        commentaryComponentsPage = new CommentaryComponentsPage();
        expect(commentaryComponentsPage.getTitle())
            .toMatch(/jHipsterBlogApp.commentary.home.title/);

    });

    it('should load create Commentary dialog', () => {
        commentaryComponentsPage.clickOnCreateButton();
        commentaryDialogPage = new CommentaryDialogPage();
        expect(commentaryDialogPage.getModalTitle())
            .toMatch(/jHipsterBlogApp.commentary.home.createOrEditLabel/);
        commentaryDialogPage.close();
    });

    it('should create and save Commentaries', () => {
        commentaryComponentsPage.clickOnCreateButton();
        commentaryDialogPage.setTextInput('text');
        expect(commentaryDialogPage.getTextInput()).toMatch('text');
        commentaryDialogPage.userSelectLastOption();
        commentaryDialogPage.postSelectLastOption();
        commentaryDialogPage.save();
        expect(commentaryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CommentaryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-commentary-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CommentaryDialogPage {
    modalTitle = element(by.css('h4#myCommentaryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    textInput = element(by.css('textarea#field_text'));
    userSelect = element(by.css('select#field_user'));
    postSelect = element(by.css('select#field_post'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTextInput = function(text) {
        this.textInput.sendKeys(text);
    };

    getTextInput = function() {
        return this.textInput.getAttribute('value');
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
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
