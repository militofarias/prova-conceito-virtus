import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';
import {BodyMySuffixService} from '../../entities/body-my-suffix';
import {PostsPopupService} from './posts-popup.service';
import {Post} from './post.model';
import {Asset} from '../assets/asset.model';
import {PostService} from './posts.service';
import {PostMySuffix} from '../../entities/post-my-suffix';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {File, FileService} from '../files';
import {AssetService} from "../assets/asset.service";

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
        private eventManager: JhiEventManager,
        private assetService: AssetService
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

    setFileData(files) {

        if (this.newPost.assets == null) {
            this.newPost.assets = [];
        }

        if (files.length === 1) {
            this.assetService.create(files[0]).subscribe(
                (res: HttpResponse<Asset>) => {
                    console.log(res)
                    const asset = new Asset();
                    asset.imagePath = res.body.imagePath;
                    asset.fileType = res.body.fileType;
                    asset.id = res.body.id;
                    this.newPost.assets.push(asset);
                }, (res: HttpErrorResponse) => {
                    console.log('Error');
                    console.log(res);
                });
        }
    }

    removeAsset(asset) {
        this.newPost.assets = this.newPost.assets.filter((obj) => obj.id !== asset.id );
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
