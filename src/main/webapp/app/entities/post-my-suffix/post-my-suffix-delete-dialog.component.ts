import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PostMySuffix } from './post-my-suffix.model';
import { PostMySuffixPopupService } from './post-my-suffix-popup.service';
import { PostMySuffixService } from './post-my-suffix.service';

@Component({
    selector: 'jhi-post-my-suffix-delete-dialog',
    templateUrl: './post-my-suffix-delete-dialog.component.html'
})
export class PostMySuffixDeleteDialogComponent {

    post: PostMySuffix;

    constructor(
        private postService: PostMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.postService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'postListModification',
                content: 'Deleted an post'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-post-my-suffix-delete-popup',
    template: ''
})
export class PostMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postPopupService: PostMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.postPopupService
                .open(PostMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
