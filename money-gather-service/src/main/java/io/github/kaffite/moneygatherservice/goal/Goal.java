package io.github.kaffite.moneygatherservice.goal;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "invoice_seq")
    @SequenceGenerator(name = "invoice_seq", sequenceName = "invoice_sequence", allocationSize = 1)
    private Long id;

    private int goal;

    private int saved;

    public Goal() {}

    public Goal(int goal, int saved) {
        this.goal = goal;
        this.saved = saved;
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
