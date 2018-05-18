import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CommentaryMySuffix } from './commentary-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CommentaryMySuffix>;

@Injectable()
export class CommentaryMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/commentaries';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/commentaries';

    constructor(private http: HttpClient) { }

    create(commentary: CommentaryMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(commentary);
        return this.http.post<CommentaryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(commentary: CommentaryMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(commentary);
        return this.http.put<CommentaryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CommentaryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CommentaryMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommentaryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CommentaryMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CommentaryMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommentaryMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CommentaryMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CommentaryMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CommentaryMySuffix[]>): HttpResponse<CommentaryMySuffix[]> {
        const jsonResponse: CommentaryMySuffix[] = res.body;
        const body: CommentaryMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CommentaryMySuffix.
     */
    private convertItemFromServer(commentary: CommentaryMySuffix): CommentaryMySuffix {
        const copy: CommentaryMySuffix = Object.assign({}, commentary);
        return copy;
    }

    /**
     * Convert a CommentaryMySuffix to a JSON which can be sent to the server.
     */
    private convert(commentary: CommentaryMySuffix): CommentaryMySuffix {
        const copy: CommentaryMySuffix = Object.assign({}, commentary);
        return copy;
    }
}
