package oasys.za.ac.uj.team36.Model;

/**
 * Created by Nicholas Rader on 2016-07-14.
 * Student Number: 201325732
 */

public class Home_User extends RegisteredUser{


    private boolean isAvailable;

    public Home_User(String name,String surname,int ID,  String username, String email,
                     int phoneNumber, String password, int userT,boolean availabile) {

        super(name,surname,ID,username,email,phoneNumber,password,userT);
        this.isAvailable = availabile ;
    }

    public Home_User (String username,String password){
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
