/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHipsterBlogTestModule } from '../../../test.module';
import { CommentaryMySuffixComponent } from '../../../../../../main/webapp/app/entities/commentary-my-suffix/commentary-my-suffix.component';
import { CommentaryMySuffixService } from '../../../../../../main/webapp/app/entities/commentary-my-suffix/commentary-my-suffix.service';
import { CommentaryMySuffix } from '../../../../../../main/webapp/app/entities/commentary-my-suffix/commentary-my-suffix.model';

describe('Component Tests', () => {

    describe('CommentaryMySuffix Management Component', () => {
        let comp: CommentaryMySuffixComponent;
        let fixture: ComponentFixture<CommentaryMySuffixComponent>;
        let service: CommentaryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [CommentaryMySuffixComponent],
                providers: [
                    CommentaryMySuffixService
                ]
            })
            .overrideTemplate(CommentaryMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentaryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentaryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CommentaryMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.commentaries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
