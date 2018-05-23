import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PostMySuffix } from './post-my-suffix.model';
import { PostMySuffixPopupService } from './post-my-suffix-popup.service';
import { PostMySuffixService } from './post-my-suffix.service';
import { BodyMySuffix, BodyMySuffixService } from '../body-my-suffix';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-post-my-suffix-dialog',
    templateUrl: './post-my-suffix-dialog.component.html'
})
export class PostMySuffixDialogComponent implements OnInit {

    post: PostMySuffix;
    isSaving: boolean;

    bodies: BodyMySuffix[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private postService: PostMySuffixService,
        private bodyService: BodyMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bodyService
            .query({filter: 'post-is-null'})
            .subscribe((res: HttpResponse<BodyMySuffix[]>) => {
                if (!this.post.bodyId) {
                    this.bodies = res.body;
                } else {
                    this.bodyService
                        .find(this.post.bodyId)
                        .subscribe((subRes: HttpResponse<BodyMySuffix>) => {
                            this.bodies = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<PostMySuffix>>) {
        result.subscribe((res: HttpResponse<PostMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PostMySuffix) {
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

    trackBodyById(index: number, item: BodyMySuffix) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-post-my-suffix-popup',
    template: ''
})
export class PostMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postPopupService: PostMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.postPopupService
                    .open(PostMySuffixDialogComponent as Component, params['id']);
            } else {
                this.postPopupService
                    .open(PostMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
