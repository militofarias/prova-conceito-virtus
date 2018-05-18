/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JHipsterBlogTestModule } from '../../../test.module';
import { BodyMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/body-my-suffix/body-my-suffix-detail.component';
import { BodyMySuffixService } from '../../../../../../main/webapp/app/entities/body-my-suffix/body-my-suffix.service';
import { BodyMySuffix } from '../../../../../../main/webapp/app/entities/body-my-suffix/body-my-suffix.model';

describe('Component Tests', () => {

    describe('BodyMySuffix Management Detail Component', () => {
        let comp: BodyMySuffixDetailComponent;
        let fixture: ComponentFixture<BodyMySuffixDetailComponent>;
        let service: BodyMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [BodyMySuffixDetailComponent],
                providers: [
                    BodyMySuffixService
                ]
            })
            .overrideTemplate(BodyMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BodyMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BodyMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BodyMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.body).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
