package io.github.kaffite.moneygatherservice.goal;

import io.github.kaffite.moneygatherservice.ResourceNotFoundException;
import io.github.kaffite.moneygatherservice.goal.DTO.GoalRequestDTO;
import io.github.kaffite.moneygatherservice.goal.DTO.GoalResponseDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GoalServiceTest {

    @Mock
    private GoalRepository repository;

    @InjectMocks
    private GoalService service;


    @Test
    void getAllGoals() {
        Goal first = new Goal("TestGoal", 0, 100);
        first.setId(1L);
        Goal second = new Goal("TestGoal2", 10, 200);
        second.setId(2L);
        List<Goal> goals = Arrays.asList(first, second);
        when(repository.findAll(Sort.by("id"))).thenReturn(goals);
        List<GoalResponseDTO> result = service.getAllGoals();

        assertEquals(2, result.size());
        assertEquals("TestGoal", result.getFirst().getDescription());
        assertEquals(0, result.getFirst().getCurrentAmount());
        assertEquals(100, result.getFirst().getTarget());
        assertEquals("TestGoal2", result.getLast().getDescription());
        assertEquals(10, result.getLast().getCurrentAmount());
        assertEquals(200, result.getLast().getTarget());
    }

    @Test
    void addNewGoal() {
        GoalRequestDTO inputGoal = new GoalRequestDTO("New", 200, 300);

        Goal repoGoal = new Goal(
                inputGoal.getDescription(),
                inputGoal.getCurrentAmount(),
                inputGoal.getTarget());
        repoGoal.setId(5L);
        when(repository.save(any())).thenReturn(repoGoal);
        GoalResponseDTO response = service.addNewGoal(inputGoal);
        verify(repository).save(any());

        assertEquals(inputGoal.getDescription(), response.getDescription());
        assertEquals(inputGoal.getTarget(), response.getTarget());
        assertEquals(inputGoal.getCurrentAmount(), response.getCurrentAmount());
    }

    @Test
    void setByIdWithValidId() {
        Long id = 1L;
        String desc = "changed";
        int current = 100;
        int target = 200;
        GoalRequestDTO inputGoal = new GoalRequestDTO(desc, current, target);
        Goal repoGoalFromId = new Goal(desc, current, target);

        when(repository.findById(id)).thenReturn(Optional.of(repoGoalFromId));
        when(repository.setById(anyLong(), anyString(),anyInt(),anyInt())).thenReturn(1);
        GoalResponseDTO response = service.setById(inputGoal, id);

        assertEquals(inputGoal.getDescription(), response.getDescription());
        assertEquals(inputGoal.getCurrentAmount(), response.getCurrentAmount());
        assertEquals(inputGoal.getTarget(), response.getTarget());
        verify(repository).setById(
                id,
                inputGoal.getDescription(),
                inputGoal.getCurrentAmount(),
                inputGoal.getTarget());
    }

    @Test
    void setByIdWithInvalidId() {
        Long id = -1L;
        GoalRequestDTO inputGoal = new GoalRequestDTO("changed", 200, 300);
        when(repository.setById(anyLong(), anyString(), anyInt(),anyInt())).thenReturn(0);
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        verify(repository).setById(id, inputGoal.getDescription(), inputGoal.getCurrentAmount(), inputGoal.getTarget());
        assertThrows(ResourceNotFoundException.class,  () -> service.setById(inputGoal, id));
    }


    @Test
    void deleteByID() {
        Long id = 1L;
        service.deleteByID(id);
        verify(repository).deleteById(id);
    }
}
