package com.virtus.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Body.
 */
@Entity
@Table(name = "body")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "body")
public class Body implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Lob
    @Column(name = "text", nullable = false)
    private String text;

    @OneToMany(mappedBy = "body")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Asset> assets = new HashSet<>();

    @OneToOne(mappedBy = "body")
    @JsonIgnore
    private Post post;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Body text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<Asset> getAssets() {
        return assets;
    }

    public Body assets(Set<Asset> assets) {
        this.assets = assets;
        return this;
    }

    public Body addAsset(Asset asset) {
        this.assets.add(asset);
        asset.setBody(this);
        return this;
    }

    public Body removeAsset(Asset asset) {
        this.assets.remove(asset);
        asset.setBody(null);
        return this;
    }

    public void setAssets(Set<Asset> assets) {
        this.assets = assets;
    }

    public Post getPost() {
        return post;
    }

    public Body post(Post post) {
        this.post = post;
        return this;
    }

    public void setPost(Post post) {
        this.post = post;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Body body = (Body) o;
        if (body.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), body.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Body{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
