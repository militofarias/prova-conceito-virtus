package com.virtus.blog.service.mapper;

import com.virtus.blog.domain.*;
import com.virtus.blog.service.dto.CommentaryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Commentary and its DTO CommentaryDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PostMapper.class})
public interface CommentaryMapper extends EntityMapper<CommentaryDTO, Commentary> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "post.id", target = "postId")
    CommentaryDTO toDto(Commentary commentary);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "postId", target = "post")
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
