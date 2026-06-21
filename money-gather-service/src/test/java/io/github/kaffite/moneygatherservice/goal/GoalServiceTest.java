package io.github.kaffite.moneygatherservice.goal;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class GoalServiceTest {

    @Mock
    private GoalRepository repository;

    @InjectMocks
    private GoalService service;

    @Test
    void getAllGoals() {
        List<Goal> goals = new ArrayList<>();
        // TODO: Need to specify ID as well
        goals.add(new Goal("TestGoal", 0, 100));
        goals.add(new Goal("TestGoal2", 100, 200));
        Mockito.when(repository.findAll(Sort.by("id"))).thenReturn(goals);
        Assertions.assertEquals(2, service.getAllGoals().size());

    }

    @Test
    void addNewGoal() {
    }

    @Test
    void setGoalById() {
    }

    @Test
    void deleteGoalByID() {
    }
}
