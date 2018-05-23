package com.virtus.blog.web.rest.errors;

public class PostNotFoundException extends BadRequestAlertException {

    public PostNotFoundException() {
        super(ErrorConstants.POST_NOT_FOUND_TYPE, "Post id not found in database.", "id", "postnotfound");
    }
}
