package com.virtus.blog.service.mapper;

import com.virtus.blog.domain.*;
import com.virtus.blog.service.dto.PostDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Post and its DTO PostDTO.
 */
@Mapper(componentModel = "spring", uses = {BodyMapper.class, UserMapper.class})
public interface PostMapper extends EntityMapper<PostDTO, Post> {

    @Mapping(source = "body.id", target = "bodyId")
    @Mapping(source = "author.login", target = "authorLogin")
    PostDTO toDto(Post post);

    @Mapping(source = "bodyId", target = "body")
    @Mapping(target = "commentaries", ignore = true)
    @Mapping(source = "authorId", target = "author")
    Post toEntity(PostDTO postDTO);

    default Post fromId(Long id) {
        if (id == null) {
            return null;
        }
        Post post = new Post();
        post.setId(id);
        return post;
    }
}
