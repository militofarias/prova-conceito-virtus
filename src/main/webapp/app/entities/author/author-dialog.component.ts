import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Author } from './author.model';
import { AuthorPopupService } from './author-popup.service';
import { AuthorService } from './author.service';
import { User, UserService } from '../../shared';
import { PostMySuffix, PostMySuffixService } from '../post-my-suffix';

@Component({
    selector: 'jhi-author-dialog',
    templateUrl: './author-dialog.component.html'
})
export class AuthorDialogComponent implements OnInit {

    author: Author;
    isSaving: boolean;

    users: User[];

    posts: PostMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private authorService: AuthorService,
        private userService: UserService,
        private postService: PostMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.postService.query()
            .subscribe((res: HttpResponse<PostMySuffix[]>) => { this.posts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.author.id !== undefined) {
            this.subscribeToSaveResponse(
                this.authorService.update(this.author));
        } else {
            this.subscribeToSaveResponse(
                this.authorService.create(this.author));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Author>>) {
        result.subscribe((res: HttpResponse<Author>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Author) {
        this.eventManager.broadcast({ name: 'authorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackPostById(index: number, item: PostMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-author-popup',
    template: ''
})
export class AuthorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private authorPopupService: AuthorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.authorPopupService
                    .open(AuthorDialogComponent as Component, params['id']);
            } else {
                this.authorPopupService
                    .open(AuthorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
