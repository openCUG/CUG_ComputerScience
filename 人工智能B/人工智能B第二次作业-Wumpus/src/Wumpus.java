import java.util.LinkedList;
import java.util.Queue;

public class Wumpus {
    public static double[][][] wumpus(double[][][] knowledge, int[][][] map, int x, int y, int stench){

        if(stench==1){ //if the agent smells a stench
            Queue<Integer> w = new LinkedList<>();

            /*
            check 4 surrounding directions. Add them to list of possible Wumpus locations if they are not
            out of bounds, and aren't already marked as having a 0% chance of having a Wumpus
            */
            int count = 0;
            if(x > 0 && knowledge[x-1][y][1] != 0) {
                w.add(x-1);
                w.add(y);
                count++;
            }
            if(x < 3 && knowledge[x+1][y][1] != 0) {
                w.add(x+1);
                w.add(y);
                count++;
            }
            if(y > 0  && knowledge[x][y-1][1] != 0) {
                w.add(x);
                w.add(y-1);
                count++;
            }
            if(y < 3  && knowledge[x][y+1][1] != 0) {
                w.add(x);
                w.add(y+1);
                count++;
            }

            //change the confidence of each location containing a wumpus (confidence on a scale of 0 to 1)
            while(w.peek() != null){

                int a = w.remove();
                int b = w.remove();
                knowledge[a][b][1] = (double) 1/count;
            }
            //all other locations do not have a Wumpus, so set confidence to 0.

            for(x=0; x<4; x++){
                for(y=0; y<4; y++){
                    if(knowledge[x][y][1] < (double) 1/count){
                        knowledge[x][y][1] = 0;
                    }
                }
            }
        }else{ //if there is no stench, then there is a zero chnce of the 4 surronding squares having a wumpus

            if(x > 0) {
                knowledge[x-1][y][1] = 0;
            }
            if(x < 3) {
                knowledge[x+1][y][1] = 0;
            }
            if(y > 0) {
                knowledge[x][y-1][1] = 0;
            }
            if(y < 3) {
                knowledge[x][y+1][1] = 0;
            }
        }

        return knowledge;
    }
}
