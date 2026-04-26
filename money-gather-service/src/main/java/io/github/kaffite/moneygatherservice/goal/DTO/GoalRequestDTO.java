package io.github.kaffite.moneygatherservice.goal.DTO;

public class GoalRequestDTO {
    private int goal;
    private int saved;

    public GoalRequestDTO(int goal, int saved) {
        this.goal = goal;
        this.saved = saved;
    }

    public int getGoal() {
        return goal;
    }

    public int getSaved() {
        return saved;
    }

    public void setGoal(int goal) {
        this.goal = goal;
    }

    public void setSaved(int saved) {
        this.saved = saved;
    }

    @Override
    public String toString() {
        return "GoalRequestDTO{" +
                "goal=" + goal +
                ", saved=" + saved +
                '}';
    }
}
