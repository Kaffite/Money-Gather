package io.github.kaffite.moneygatherservice.goal;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;

@WebMvcTest(GoalController.class)
class GoalControllerTest {

//    @MockBean
    private GoalService service;

    @InjectMocks
    private GoalController controller;


//    @Test
//    void getAllGoals() {
//    }
//
//    @Test
//    void addNewGoal() {
//    }
//
//    @Test
//    void editGoal() {
//    }
//
//    @Test
//    void deleteGoal() {
//    }
}