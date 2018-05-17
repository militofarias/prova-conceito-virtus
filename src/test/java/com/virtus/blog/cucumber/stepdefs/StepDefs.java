package com.virtus.blog.cucumber.stepdefs;

import com.virtus.blog.JHipsterBlogApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = JHipsterBlogApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
