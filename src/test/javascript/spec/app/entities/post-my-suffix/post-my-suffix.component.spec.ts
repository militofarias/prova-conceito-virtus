/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHipsterBlogTestModule } from '../../../test.module';
import { PostMySuffixComponent } from '../../../../../../main/webapp/app/entities/post-my-suffix/post-my-suffix.component';
import { PostMySuffixService } from '../../../../../../main/webapp/app/entities/post-my-suffix/post-my-suffix.service';
import { PostMySuffix } from '../../../../../../main/webapp/app/entities/post-my-suffix/post-my-suffix.model';

describe('Component Tests', () => {

    describe('PostMySuffix Management Component', () => {
        let comp: PostMySuffixComponent;
        let fixture: ComponentFixture<PostMySuffixComponent>;
        let service: PostMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [PostMySuffixComponent],
                providers: [
                    PostMySuffixService
                ]
            })
            .overrideTemplate(PostMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PostMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PostMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.posts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
