package io.github.kaffite.moneygatherservice.goal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Goal {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;

    private int goal;

    private int saved;

    public Goal() {}

    public Goal(int goal, int saved) {
        this.goal = goal;
        this.saved = saved;
    }

    public Long getId() {
        return id;
    }

    public int getGoal() {
        return goal;
    }

    public int getSaved() {
        return saved;
    }

    @Override
    public String toString() {
        return "Goal{" +
                "id=" + id +
                ", goal=" + goal +
                ", saved=" + saved +
                '}';
    }
}
