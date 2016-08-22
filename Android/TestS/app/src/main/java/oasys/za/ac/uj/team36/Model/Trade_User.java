package oasys.za.ac.uj.team36.Model;

/**
 * Created by Nick on 2016-07-29.
 */
public class Trade_User extends RegisteredUser {

    private boolean isAvailable;

    public Trade_User(String name,String surname,int ID,  String username, String email,
                     int phoneNumber, String password, int userT,boolean availabile) {

        super(name,surname,ID,username,email,phoneNumber,password,userT);


        this.isAvailable = availabile ;
    }

    public Trade_User (String username,String password){
        super(username,password) ;

        this.isAvailable = true;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
