package com.virtus.blog.service.mapper;

import com.virtus.blog.domain.*;
import com.virtus.blog.service.dto.BodyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Body and its DTO BodyDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BodyMapper extends EntityMapper<BodyDTO, Body> {


    @Mapping(target = "assets", ignore = true)
    @Mapping(target = "post", ignore = true)
    Body toEntity(BodyDTO bodyDTO);

    default Body fromId(Long id) {
        if (id == null) {
            return null;
        }
        Body body = new Body();
        body.setId(id);
        return body;
    }
}
