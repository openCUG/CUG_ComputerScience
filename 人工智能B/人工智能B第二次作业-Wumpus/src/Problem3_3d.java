import java.util.*;

public class Problem3_3d {
    public static void main(String[] args){

        int[][][] map = new int[4][4][5]; //create a 4X4 grid, where each point on the grid has 5 pieces of data
        /*
        The Wumpus, pits, and gold will be randomly placed.
        Note that in about 21% of the possible environments, it is impossible for the agent to reach the gold

        The 5 pieces of data for each coordinate represent pecpects the agent will percieve
        The 5 percepts are: Stench, Breeze, Glitter, being killed by a Wumpus, and falling in a pit
        */

        int AgentX = 0, AgentY = 3; //agent starts in bottom left corner of map

        Random r = new Random();

        //randomly place Wumpus
        int WumpusX;
        int WumpusY;
        do{
            WumpusX = r.nextInt(4);
            WumpusY = r.nextInt(4);
        }while(WumpusX == 0 && WumpusY == 3); //Wumpus cannot be in agent's starting position

        map[WumpusX][WumpusY][3] = 1;

        //randomly place gold
        int GoldX;
        int GoldY;
        do {
            GoldX = r.nextInt(4);
            GoldY = r.nextInt(4);
        } while((GoldX == 0 && GoldY == 3) | (GoldX == WumpusX && GoldY == WumpusY)); //Gold cannot be in agent's starting position, or where the Wumpus is

        map[GoldX][GoldY][2] = 1;

        /*
        Randomly add pits. Each location has a 0.2 chance of having a pit, except for location of
        Wumpus, location of gold, and agent's starting location
        */
        for(int x=0; x<4; x++){
            for(int y=0; y<4; y++){
                if((!(x == AgentX && y == AgentY)) && (!(x == WumpusX && y == WumpusY)) && (!(x == GoldX && y == GoldY))){
                    int pit = r.nextInt(10);
                    if(pit<2){
                        map[x][y][4] = 1;
                    }
                }
            }
        }

        //add a stench to squares directly adjacent to Wumpus
        for(int x=0; x<4; x++){
            for(int y=0; y<4; y++){

                if(x == WumpusX && y == WumpusY){
                    if(WumpusX > 0){
                        map[x-1][y][0] = 1;
                    }
                    if(WumpusX < 3){
                        map[x+1][y][0] = 1;
                    }
                    if(WumpusY > 0){
                        map[x][y-1][0] = 1;
                    }
                    if(WumpusY < 3){
                        map[x][y+1][0] = 1;
                    }
                }

            }
        }
        //add a breeze to squares directly adjacent to pits
        for(int x=0; x<4; x++){
            for(int y=0; y<4; y++){

                if(map[x][y][4] == 1){
                    if(x > 0){
                        map[x-1][y][1] = 1;
                    }
                    if(x < 3){
                        map[x+1][y][1] = 1;
                    }
                    if(y > 0){
                        map[x][y-1][1] = 1;
                    }
                    if(y < 3){
                        map[x][y+1][1] = 1;
                    }
                }

            }
        }

        //print the starting Wumpus Environment
        System.out.print("    0   1   2   3");
        for(int y=0; y<4; y++){
            System.out.print("\n" + y + " |");
            for(int x=0; x<4; x++){
                if(x == AgentX && y == AgentY){
                    System.out.print(" A ");
                }else if(x == WumpusX && y == WumpusY){
                    System.out.print(" W ");
                }else if(x == GoldX && y == GoldY){
                    System.out.print(" G ");
                }else if(map[x][y][4] == 1){
                    System.out.print(" P ");
                }else{
                    System.out.print("   ");
                }
                System.out.print("|");
            }
        }
        System.out.println("\n");

        /*store all knowledge the agent has acquired. The knowledge for each square includes:
        chance the square has a pit, the chance it has a Wumpus, and whether it has been visited by the agent
        */
        double[][][] knowledge = new double[4][4][3];

        //the agent starts by assuming each square has a 0.2 chance of having a pit, and a 1/15 chance of having the Wumpus
        for(int x=0; x<4; x++){
            for(int y=0; y<4; y++){
                if(!(x==0 && y==3)){
                    knowledge[x][y][0] = 0.2;
                    knowledge[x][y][1] = 1d/15d;
                }
            }
        }

        boolean done = false; //true once the gold has been brought back to the starting point
        boolean hasGold = false;
        boolean hasArrow = true; //The agent starts with one arrow it can use to kill the wumpus
        while(!done){

            knowledge[AgentX][AgentY][2] +=1; //mark the current location as visited
            System.out.println("\nCurrent location: (" + AgentX + ", " + AgentY + ")");

            if(map[AgentX][AgentY][3] == 1){
                System.out.println("The agent has been eaten by the Wumpus.");
                break;
            }else if(map[AgentX][AgentY][4] == 1){
                System.out.println("The agent has fallen in a pit.");
                break;
            }

            //update knowledge base based on whether or not the agent smells a stench
            knowledge = Wumpus.wumpus(knowledge, map, AgentX, AgentY, map[AgentX][AgentY][0]);

            //update knowledge base based on whether or not the agent feels a breeze
            knowledge = Pit.pit(knowledge, map, AgentX, AgentY, map[AgentX][AgentY][1]);
            if(map[AgentX][AgentY][2] == 1){
                System.out.println("The Agent has picked up the gold.");
                hasGold = true;
            }

            //display information about the current location
            Information.information(AgentX, AgentY, knowledge, map);

            if(AgentX == 0 && AgentY == 3 && hasGold == true){
                done = true;
                System.out.println("\nThe agent has brought the gold back to the beginning!");
            }

            //decide whether or not to attempt to shoot the wumpus
            int[][][] m = map;
            if(hasArrow == true){
                map = Shoot.shoot(AgentX, AgentY, knowledge, map);
            }
            //if the knowledge base has changed, the arrow has been shot
            if(m != map){
                hasArrow = false;
            }

            //decide where to move. Agent will move to adjacent square with lowest chance of having a pit/wumpus
            int[] location =  Move.move(AgentX, AgentY, knowledge, hasGold);
            AgentX = location[0]; AgentY = location[1];

        }
    }
}
