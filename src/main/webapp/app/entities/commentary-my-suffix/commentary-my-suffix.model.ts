import { BaseEntity } from './../../shared';

export class CommentaryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public text?: any,
        public postId?: number,
        public authorLogin?: string,
        public authorId?: number,
    ) {
    }
}
