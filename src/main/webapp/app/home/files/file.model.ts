import { BaseEntity } from '../../shared';

export class File implements BaseEntity {
    constructor(
        public id?: number,
        public imagePath?: string,
        public postId?: number,
        public fileName?: string,
        public size?: number,
        public fileType?: string,
    ) {
    }
}
