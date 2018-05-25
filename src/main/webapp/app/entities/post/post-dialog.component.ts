import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Post } from './post.model';
import { PostPopupService } from './post-popup.service';
import { PostService } from './post.service';
import { Author, AuthorService } from '../author';

@Component({
    selector: 'jhi-post-dialog',
    templateUrl: './post-dialog.component.html'
})
export class PostDialogComponent implements OnInit {

    post: Post;
    isSaving: boolean;

    authors: Author[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private postService: PostService,
        private authorService: AuthorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorService
            .query({filter: 'post-is-null'})
            .subscribe((res: HttpResponse<Author[]>) => {
                if (!this.post.authorId) {
                    this.authors = res.body;
                } else {
                    this.authorService
                        .find(this.post.authorId)
                        .subscribe((subRes: HttpResponse<Author>) => {
                            this.authors = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.post.id !== undefined) {
            this.subscribeToSaveResponse(
                this.postService.update(this.post));
        } else {
            this.subscribeToSaveResponse(
                this.postService.create(this.post));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Post>>) {
        result.subscribe((res: HttpResponse<Post>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Post) {
        this.eventManager.broadcast({ name: 'postListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAuthorById(index: number, item: Author) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-post-popup',
    template: ''
})
export class PostPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postPopupService: PostPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.postPopupService
                    .open(PostDialogComponent as Component, params['id']);
            } else {
                this.postPopupService
                    .open(PostDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
