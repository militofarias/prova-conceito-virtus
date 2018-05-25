import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';
import {PostMySuffixService} from '../entities/post-my-suffix/index';
import {BodyMySuffixService} from '../entities/body-my-suffix/index';
import {PostsPopupService} from './posts-popup.service';
import {Post} from './post.model';
import {Body} from './body.model';
import {Asset} from './asset.model';
import {post} from "selenium-webdriver/http";
import {PostService} from "./posts.service";
import {PostMySuffix} from "../entities/post-my-suffix/post-my-suffix.model";
import {Observable} from "rxjs/Observable";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'jhi-post-dialog',
    templateUrl: './posts-dialog.component.html',
    styles: ['posts-dialog.scss']
})
export class PostsDialogComponent implements OnInit {

    newPost: Post = new Post();
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private postService: PostService,
        private bodyService: BodyMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.newPost.date = new Date();
        this.subscribeToSaveResponse(
            this.postService.create(this.newPost));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PostMySuffix>>) {
        result.subscribe((res: HttpResponse<Post>) =>
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

    setFileData(event, entity, field, isImage) {
        const asset = new Asset();
        this.dataUtils.setFileData(event, asset, field, isImage);

        entity.push(asset);
    }

    removeAsset(asset) {
        this.newPost.assets = this.newPost.assets.filter(obj => obj !== asset );
    }
}

@Component({
    selector: 'jhi-post-popup',
    template: ''
})
export class PostsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postPopupService: PostsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.postPopupService
                    .open(PostsDialogComponent as Component, params['id']);
            } else {
                this.postPopupService
                    .open(PostsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
