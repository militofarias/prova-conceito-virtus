package com.virtus.blog.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Commentary entity.
 */
public class CommentaryDTO implements Serializable {

    private Long id;

    @NotNull
    @Lob
    private String text;

    @NotNull
    private Long postId;

    private Long authorId;

    @NotNull
    private String authorLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long userId) {
        this.authorId = userId;
    }

    public String getAuthorLogin() {
        return authorLogin;
    }

    public void setAuthorLogin(String userLogin) {
        this.authorLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CommentaryDTO commentaryDTO = (CommentaryDTO) o;
        if(commentaryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commentaryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommentaryDTO{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
