public class Information {
    public static void information(int AgentX, int AgentY, double[][][] knowledge, int[][][] map){
        System.out.print("Current Percepts:");
        if(map[AgentX][AgentY][0] == 0 && map[AgentX][AgentY][1] == 0 && map[AgentX][AgentY][2] == 0)
            System.out.print("\n\tNo percepts.");
        if(map[AgentX][AgentY][0] == 1)
            System.out.print("\n\tThe Agent smells a stench.");
        if(map[AgentX][AgentY][1] == 1)
            System.out.print("\n\tThe Agent feels a breeze.");
        if(map[AgentX][AgentY][2] == 1)
            System.out.print("\n\tThe Agent senses a glitter. There is gold here.");

        System.out.print("\nOdds of having Wumpus:");
        if(AgentY > 0)
            System.out.print("\n\tUp: " + String.format("%.2f", knowledge[AgentX][AgentY-1][1]));
        if(AgentY < 3)
            System.out.print("\n\tDown: " + String.format("%.2f", knowledge[AgentX][AgentY+1][1]));
        if(AgentX > 0)
            System.out.print("\n\tLeft: " + String.format("%.2f", knowledge[AgentX-1][AgentY][1]));
        if(AgentX < 3)
            System.out.print("\n\tRight: " + String.format("%.2f", knowledge[AgentX+1][AgentY][1]));

        System.out.println("\nOdds of having a pit:");
        if(AgentY > 0)
            System.out.println("\tUp: " + String.format("%.2f", knowledge[AgentX][AgentY - 1][0]));
        if(AgentY < 3)
            System.out.println("\tDown: " + String.format("%.2f", knowledge[AgentX][AgentY + 1][0]));
        if(AgentX > 0)
            System.out.println("\tLeft: " + String.format("%.2f", knowledge[AgentX - 1][AgentY][0]));
        if(AgentX < 3)
            System.out.println("\tRight: " + String.format("%.2f", knowledge[AgentX + 1][AgentY][0]));

    }
}

