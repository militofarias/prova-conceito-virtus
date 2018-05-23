package com.virtus.blog.web.rest.errors;

public class UserNotFoundException extends BadRequestAlertException {

    public UserNotFoundException() {
        super(ErrorConstants.USER_NOT_FOUND_TYPE, "User id not found in database.", "id", "usernotfound");
    }
}
