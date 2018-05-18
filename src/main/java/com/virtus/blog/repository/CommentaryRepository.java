package com.virtus.blog.repository;

import com.virtus.blog.domain.Commentary;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Commentary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentaryRepository extends JpaRepository<Commentary, Long> {

}
