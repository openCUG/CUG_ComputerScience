import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Random;

public class Shoot {
    public static int[][][] shoot(int AgentX, int AgentY, double[][][] knowledge, int[][][] map){

        Queue<Integer> shoot = new LinkedList<>(); //used to check if the agent should try to shoot the wumpus

        int[] arrowLocation = new int[2]; //where the arrow is being aimed

        int count=0;
        if(AgentX > 0) {
            shoot.add(AgentX-1);
            shoot.add(AgentY);
            count++;
        }
        if(AgentX < 3) {
            shoot.add(AgentX+1);
            shoot.add(AgentY);
            count++;
        }
        if(AgentY > 0) {
            shoot.add(AgentX);
            shoot.add(AgentY-1);
            count++;
        }
        if(AgentY < 3) {
            shoot.add(AgentX);
            shoot.add(AgentY+1);
            count++;
        }

        //Agent will shoot arrow if it knows where the Wumpus is, or if it has only 2 possible locations
        int possibleLocationCount=0;
        for(int a = 0; a<count; a++){

            int x = shoot.remove();
            int y = shoot.remove();
            if(knowledge[x][y][1] == 1){
                arrowLocation[0] = x;
                arrowLocation[1] = y;
                possibleLocationCount++;
            }else if(knowledge[x][y][1] == 0.5){
                shoot.add(x);
                shoot.add(y);
                possibleLocationCount++;
            }
        }

        /*
        if there are 2 locations that each have a 0.5 chance of having a wumpus, pick one at random.
        The agent will now know where the wumpus is, regardless of whether or not it hits the wumpus.
        */
        if(possibleLocationCount == 2){

            Random r = new Random();
            int num = r.nextInt(2);
            if(num == 1){
                shoot.remove();
                shoot.remove();
            }

            arrowLocation[0] = shoot.remove();
            arrowLocation[1] = shoot.remove();
        }

        if(possibleLocationCount > 0){

            System.out.println("The Agent shoots his arrow at location " + Arrays.toString(arrowLocation));

            if(map[arrowLocation[0]][arrowLocation[1]][3] == 1){
                System.out.println("The agent hears a scream. The Wumpus has been killed!");
            }
            if(map[arrowLocation[0]][arrowLocation[1]][3] == 0){ //if the agent does not hit the wumpus, it knows the Wumpus is in the second location
                System.out.println("There is no scream. The agent now knows the exact location of the Wumpus");
            }

            for(int x=0; x<4; x++){
                for(int y=0; y<4; y++){

                    map[x][y][3] = 0;
                }
            }
        }

        return map;
    }
}
