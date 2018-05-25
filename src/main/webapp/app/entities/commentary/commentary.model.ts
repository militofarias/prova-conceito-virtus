import { BaseEntity } from './../../shared';

export class Commentary implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public authorLogin?: string,
        public authorId?: number,
        public postTitle?: string,
        public postId?: number,
    ) {
    }
}
