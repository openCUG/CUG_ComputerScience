import java.util.LinkedList;
import java.util.Queue;
import java.util.Random;

public class Move {
    public static int[] move(int AgentX, int AgentY, double[][][] knowledge, boolean hasGold){

        Random r = new Random();

        Queue<Integer> m = new LinkedList<>(); //stores locations that the agent can move to next

        int count=0;
        if(AgentX > 0) {
            m.add(AgentX-1);
            m.add(AgentY);
            count++;
        }
        if(AgentX < 3) {
            m.add(AgentX+1);
            m.add(AgentY);
            count++;
        }
        if(AgentY > 0) {
            m.add(AgentX);
            m.add(AgentY-1);
            count++;
        }
        if(AgentY < 3) {
            m.add(AgentX);
            m.add(AgentY+1);
            count++;
        }
        double lowest = 2; //find the lowest odds of a square having a pit or a wumpus
        for(int z=0; z<count; z++){
            //System.out.println("Lowest: " + lowest);
            int a = m.remove();
            int b = m.remove();

            if((knowledge[a][b][0] + knowledge[a][b][1]) < lowest){
                lowest = knowledge[a][b][0] + knowledge[a][b][1];
            }
            m.add(a);
            m.add(b);
        }
        //check if there are multiple lowest values
        int count2 = 0;
        for(int z=0; z<count; z++){
            int a = m.remove();
            int b = m.remove();

            if((knowledge[a][b][0] + knowledge[a][b][1]) == lowest){
                m.add(a);
                m.add(b);
                count2++;
            }
        }
        /*if there is 1 lowest value, go to that square.
        If there is more than 1, choose a square at random. Favor squares that have not been visited.
        */
        if(count2 == 1){
            AgentX = m.remove();
            AgentY = m.remove();
        }else{
            int num = (r.nextInt(count2)) * 2;
            for(;num>0; num--){
                m.remove();
            }
            AgentX = m.remove();
            AgentY = m.remove();
        }

        int[] location = new int[2];
        location[0] = AgentX; location[1] = AgentY;

        return location;
    }
}
