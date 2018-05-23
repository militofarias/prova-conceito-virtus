import { BaseEntity } from './../../shared';

export class Author implements BaseEntity {
    constructor(
        public id?: number,
        public biography?: string,
        public userLogin?: string,
        public userId?: number,
        public posts?: BaseEntity[],
    ) {
    }
}
