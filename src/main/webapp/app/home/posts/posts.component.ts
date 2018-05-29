import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {Post} from './post.model';
import {PostService} from './posts.service';
import {Commentary, CommentaryService} from '../commentaries';
import {Asset} from './asset.model';

@Component({
    selector: 'jhi-posts',
    templateUrl: './posts.component.html',
    styleUrls: [
        'posts.scss'
    ]
})
export class PostsComponent implements OnInit, OnDestroy {

    posts: Post[];
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    currentSearch: string;
    inputComment = false;
    commentaries = [];
    currentAccount: any;

    constructor(
        private postService: PostService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private commentaryService: CommentaryService
    ) {
        this.posts = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';

        for (let i = 0; i < 2; i++) {
            this.commentaries.push({
                author: `lorem ${i}`,
                text: 'ipsum'
            });
        }
    }

    loadAll() {
        if (this.currentSearch) {
            this.postService.search({
                query: this.currentSearch,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Post[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            return;
        }
        this.postService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Post[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    reset() {
        this.page = 0;
        this.posts = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    clear() {
        this.posts = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = '';
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.posts = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = '_score';
        this.reverse = false;
        this.currentSearch = query;
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.registerChangeInPosts();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPosts() {
        this.eventSubscriber = this.eventManager.subscribe('postListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.posts = [];
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        data.forEach((post) => {
            const assets: Asset[] = [];
            post.assets.forEach((asset) => {
                const imagePathArray = asset.imagePath.split('.');
                let fileType;
                if (imagePathArray[1] === 'png' || imagePathArray[1] === 'jpeg') {
                    fileType = 'image/' + imagePathArray[1];
                } else if (imagePathArray[1] === 'mp4') {
                    fileType = 'video/' + imagePathArray[1];
                }

                assets.push(new Asset(asset.id, asset.imagePath, fileType));
            });
            post.assets = assets;
            this.posts.push(post);
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public submitComment(comment, post) {

        const commentary: Commentary = {
            postId: post.id,
            authorId: this.currentAccount.id,
            text: comment
        };

        this.commentaryService.create(commentary).subscribe(
            (res: HttpResponse<Commentary>) => {
                this.reset();
                this.loadAll();
            }, (res: HttpErrorResponse) => {
                console.log(res);
            }
        );
    }
}
