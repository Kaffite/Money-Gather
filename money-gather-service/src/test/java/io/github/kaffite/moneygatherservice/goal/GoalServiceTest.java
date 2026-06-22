package io.github.kaffite.moneygatherservice.goal;

import io.github.kaffite.moneygatherservice.goal.DTO.GoalRequestDTO;
import io.github.kaffite.moneygatherservice.goal.DTO.GoalResponseDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class GoalServiceTest {
    private List<Goal> goals;

    @Mock
    private GoalRepository repository;

    @InjectMocks
    private GoalService service;

    @BeforeEach
    void setUp() {
        Goal first = new Goal("TestGoal", 0, 100);
        first.setId(1L);
        Goal second = new Goal("TestGoal2", 10, 200);
        second.setId(2L);
        goals = Arrays.asList(first, second);
    }

    @Test
    void getAllGoals() {
        Mockito.when(repository.findAll(Sort.by("id"))).thenReturn(goals);
        List<GoalResponseDTO> result = service.getAllGoals();

        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("TestGoal", result.getFirst().getDescription());
        Assertions.assertEquals(0, result.getFirst().getCurrentAmount());
        Assertions.assertEquals(100, result.getFirst().getTarget());
        Assertions.assertEquals("TestGoal2", result.getLast().getDescription());
        Assertions.assertEquals(10, result.getLast().getCurrentAmount());
        Assertions.assertEquals(200, result.getLast().getTarget());
    }

    @Test
    void addNewGoal() {
        GoalRequestDTO inputGoal = new GoalRequestDTO("New", 200, 300);

        Goal repoGoal = new Goal(inputGoal.getDescription(), inputGoal.getCurrentAmount(), inputGoal.getTarget());
        repoGoal.setId(5L);
        Mockito.when(repository.save(Mockito.any(Goal.class))).thenReturn(repoGoal);

        GoalResponseDTO response = service.addNewGoal(inputGoal);
        Mockito.verify(repository, Mockito.times(1)).save(Mockito.any());
        Assertions.assertEquals(inputGoal.getDescription(), response.getDescription());
        Assertions.assertEquals(inputGoal.getTarget(), response.getTarget());
        Assertions.assertEquals(inputGoal.getCurrentAmount(), response.getCurrentAmount());
    }

    // TODO: Finish writing test
    @Test
    void setGoalById() {
        GoalRequestDTO goalAfterChange = new GoalRequestDTO("changed", 100, 200);
        Long id = 1L;
        service.setById(goalAfterChange, id);
        Mockito.verify(repository, Mockito.times(1))
                .setById(
                        id,
                        goalAfterChange.getDescription(),
                        goalAfterChange.getCurrentAmount(),
                        goalAfterChange.getTarget());
        // verify
    }

    @Test
    void deleteGoalByID() {
    }
}
