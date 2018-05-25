import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CommentaryMySuffix } from './commentary-my-suffix.model';
import { CommentaryMySuffixPopupService } from './commentary-my-suffix-popup.service';
import { CommentaryMySuffixService } from './commentary-my-suffix.service';
import { PostMySuffix, PostMySuffixService } from '../post-my-suffix';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-commentary-my-suffix-dialog',
    templateUrl: './commentary-my-suffix-dialog.component.html'
})
export class CommentaryMySuffixDialogComponent implements OnInit {

    commentary: CommentaryMySuffix;
    isSaving: boolean;

    posts: PostMySuffix[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private commentaryService: CommentaryMySuffixService,
        private postService: PostMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.postService.query()
            .subscribe((res: HttpResponse<PostMySuffix[]>) => { this.posts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.commentary.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentaryService.update(this.commentary));
        } else {
            this.subscribeToSaveResponse(
                this.commentaryService.create(this.commentary));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CommentaryMySuffix>>) {
        result.subscribe((res: HttpResponse<CommentaryMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CommentaryMySuffix) {
        this.eventManager.broadcast({ name: 'commentaryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPostById(index: number, item: PostMySuffix) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-commentary-my-suffix-popup',
    template: ''
})
export class CommentaryMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentaryPopupService: CommentaryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commentaryPopupService
                    .open(CommentaryMySuffixDialogComponent as Component, params['id']);
            } else {
                this.commentaryPopupService
                    .open(CommentaryMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
