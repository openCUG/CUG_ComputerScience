
import java.util.LinkedList;
import java.util.Queue;

public class Pit {

    public static double[][][] pit(double[][][] knowledge, int[][][] map, int x, int y, int breeze){

        if(breeze == 1){ //if agent feels a breeze

            Queue<Integer> p = new LinkedList<>();

            int count = 0;
            if(x > 0 && knowledge[x-1][y][0] != 0) {
                p.add(x-1);
                p.add(y);
                count++;
            }
            if(x < 3 && knowledge[x+1][y][0] != 0) {
                p.add(x+1);
                p.add(y);
                count++;
            }
            if(y > 0  && knowledge[x][y-1][0] != 0) {
                p.add(x);
                p.add(y-1);
                count++;
            }
            if(y < 3  && knowledge[x][y+1][0] != 0) {
                p.add(x);
                p.add(y+1);
                count++;
            }

            while(p.peek() != null){

                int a = p.remove();
                int b = p.remove();
                knowledge[a][b][0] = (double) 1/count;
            }
        }else{ //if there is no breeze

            if(x > 0) {
                knowledge[x - 1][y][0] = 0;
            }
            if(x < 3) {
                knowledge[x + 1][y][0] = 0;
            }
            if(y > 0) {
                knowledge[x][y - 1][0] = 0;
            }
            if(y < 3) {
                knowledge[x][y + 1][0] = 0;
            }
        }

        return knowledge;
    }
}
