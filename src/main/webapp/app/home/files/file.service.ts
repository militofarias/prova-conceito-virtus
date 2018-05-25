import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

export type EntityResponseType = HttpResponse<File>;

@Injectable()
export class FileService {

    private resourceUrl =  SERVER_API_URL + 'api/uploadFile';

    constructor(private http: HttpClient) { }

    create(file: any): Observable<EntityResponseType> {

        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post<File>(this.resourceUrl, formData, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: File = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PostMySuffix.
     */
    private convertItemFromServer(post: File): File {
        const copy: File = Object.assign({}, post);
        // copy.date = this.dateUtils
        //     .convertDateTimeFromServer(post.date);
        return copy;
    }

    /**
     * Convert a PostMySuffix to a JSON which can be sent to the server.
     */
    private convert(post: File): File {
        const copy: File = Object.assign({}, post);

        const formData: FormData = new FormData();
        formData.append('file', copy);

        // copy.date = this.dateUtils.toDate(post.date);
        return copy;
    }
}
