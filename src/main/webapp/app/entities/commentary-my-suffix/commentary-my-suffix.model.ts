import { BaseEntity } from './../../shared';

export class CommentaryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public text?: any,
        public userLogin?: string,
        public userId?: number,
        public postTitle?: string,
        public postId?: number,
    ) {
    }
}
