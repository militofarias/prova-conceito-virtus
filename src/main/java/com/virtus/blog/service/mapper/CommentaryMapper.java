package com.virtus.blog.service.mapper;

import com.virtus.blog.domain.*;
import com.virtus.blog.service.dto.CommentaryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Commentary and its DTO CommentaryDTO.
 */
@Mapper(componentModel = "spring", uses = {PostMapper.class, UserMapper.class})
public interface CommentaryMapper extends EntityMapper<CommentaryDTO, Commentary> {

    @Mapping(source = "post.id", target = "postId")
    @Mapping(source = "author.id", target = "authorId")
    @Mapping(source = "author.login", target = "authorLogin")
    CommentaryDTO toDto(Commentary commentary);

    @Mapping(source = "postId", target = "post")
    @Mapping(source = "authorId", target = "author")
    Commentary toEntity(CommentaryDTO commentaryDTO);

    default Commentary fromId(Long id) {
        if (id == null) {
            return null;
        }
        Commentary commentary = new Commentary();
        commentary.setId(id);
        return commentary;
    }
}
