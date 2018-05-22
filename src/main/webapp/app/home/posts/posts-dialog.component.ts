import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';
import {PostMySuffixService} from '../../entities/post-my-suffix';
import {BodyMySuffixService} from '../../entities/body-my-suffix';
import {PostsPopupService} from './posts-popup.service';
import {Post} from './post.model';
import {Body} from './body.model';
import {Asset} from "./asset.model";

@Component({
    selector: 'jhi-post-dialog',
    templateUrl: './posts-dialog.component.html'
})
export class PostsDialogComponent implements OnInit {

    newPost: Post = new Post(0, '', new Body(0, '', []));
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private postService: PostMySuffixService,
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

    }

    setFileData(event, entity, field, isImage) {

        let asset : Asset = new Asset();

        this.dataUtils.setFileData(event, asset, field, isImage);

        entity.push(asset)
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
