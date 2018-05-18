/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JHipsterBlogTestModule } from '../../../test.module';
import { PostMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/post-my-suffix/post-my-suffix-detail.component';
import { PostMySuffixService } from '../../../../../../main/webapp/app/entities/post-my-suffix/post-my-suffix.service';
import { PostMySuffix } from '../../../../../../main/webapp/app/entities/post-my-suffix/post-my-suffix.model';

describe('Component Tests', () => {

    describe('PostMySuffix Management Detail Component', () => {
        let comp: PostMySuffixDetailComponent;
        let fixture: ComponentFixture<PostMySuffixDetailComponent>;
        let service: PostMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [PostMySuffixDetailComponent],
                providers: [
                    PostMySuffixService
                ]
            })
            .overrideTemplate(PostMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PostMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PostMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.post).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
