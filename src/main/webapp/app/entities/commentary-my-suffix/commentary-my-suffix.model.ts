import { BaseEntity } from './../../shared';

export class CommentaryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public text?: any,
        public userId?: number,
        public postId?: number,
    ) {
    }
}
