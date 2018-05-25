package com.virtus.blog.repository;

import com.virtus.blog.domain.Commentary;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Commentary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentaryRepository extends JpaRepository<Commentary, Long> {

    @Query("select commentary from Commentary commentary where commentary.author.login = ?#{principal.username}")
    List<Commentary> findByAuthorIsCurrentUser();

    List<Commentary> findByPostId(Long id);
}
