import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { BodyMySuffix } from './body-my-suffix.model';
import { BodyMySuffixPopupService } from './body-my-suffix-popup.service';
import { BodyMySuffixService } from './body-my-suffix.service';
import { PostMySuffix, PostMySuffixService } from '../post-my-suffix';

@Component({
    selector: 'jhi-body-my-suffix-dialog',
    templateUrl: './body-my-suffix-dialog.component.html'
})
export class BodyMySuffixDialogComponent implements OnInit {

    body: BodyMySuffix;
    isSaving: boolean;

    posts: PostMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private bodyService: BodyMySuffixService,
        private postService: PostMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.postService.query()
            .subscribe((res: HttpResponse<PostMySuffix[]>) => { this.posts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.body.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bodyService.update(this.body));
        } else {
            this.subscribeToSaveResponse(
                this.bodyService.create(this.body));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BodyMySuffix>>) {
        result.subscribe((res: HttpResponse<BodyMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BodyMySuffix) {
        this.eventManager.broadcast({ name: 'bodyListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-body-my-suffix-popup',
    template: ''
})
export class BodyMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bodyPopupService: BodyMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bodyPopupService
                    .open(BodyMySuffixDialogComponent as Component, params['id']);
            } else {
                this.bodyPopupService
                    .open(BodyMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
