import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PostMySuffix } from './post-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PostMySuffix>;

@Injectable()
export class PostMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/posts';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/posts';

    constructor(private http: HttpClient) { }

    create(post: PostMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(post);
        return this.http.post<PostMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(post: PostMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(post);
        return this.http.put<PostMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PostMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PostMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PostMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PostMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PostMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PostMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PostMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PostMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PostMySuffix[]>): HttpResponse<PostMySuffix[]> {
        const jsonResponse: PostMySuffix[] = res.body;
        const body: PostMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PostMySuffix.
     */
    private convertItemFromServer(post: PostMySuffix): PostMySuffix {
        const copy: PostMySuffix = Object.assign({}, post);
        return copy;
    }

    /**
     * Convert a PostMySuffix to a JSON which can be sent to the server.
     */
    private convert(post: PostMySuffix): PostMySuffix {
        const copy: PostMySuffix = Object.assign({}, post);
        return copy;
    }
}
