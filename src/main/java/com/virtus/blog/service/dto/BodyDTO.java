package com.virtus.blog.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Body entity.
 */
public class BodyDTO implements Serializable {

    private Long id;

    @NotNull
    @Lob
    private String text;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BodyDTO bodyDTO = (BodyDTO) o;
        if(bodyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bodyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BodyDTO{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
