package oasys.za.ac.uj.team36.Model;

/**
 * Created by Nicholas Rader on 2016-07-14.
 * Student Number: 201325732
 */
public class RegisteredUser {
    private String Name, Surname, Username, Email, Password;
    private int IDnum, PhoneN,confirm, userID, userType;

    public RegisteredUser(){};

    public RegisteredUser(int usersID,String name, String surname, int ID, String username, String email,
                          int phoneNumber, String password, int userT, int confirmation) {
        this.userID = usersID ;
        this.Name = name ;
        this.Surname = surname;
        this.Username = username ;
        this.Email = email ;
        this.IDnum = ID ;
        this.PhoneN = phoneNumber ;
        this.Password = password;
        this.userType = userT ;
        this.confirm = confirmation ;

    }


    public RegisteredUser (String username, String password){
        this.Username = username ;
        this.Password = password;
        this.userID = -1;
        this.Name = "";
        this.Surname = "" ;
        this.Email = "";
        this.IDnum = -1 ;

        this.PhoneN = 0 ;
        this.userType = 0 ;
        this.confirm = -1 ;
    }

    public String getName() {
        return Name;
    }

    public String getSurname() {
        return Surname;
    }

    public String getUsername() {
        return Username;
    }

    public String getEmail() {
        return Email;
    }

    public String getPassword() {
        return Password;
    }

    public int getIDnum() {
        return IDnum;
    }

    public int getPhoneN() {
        return PhoneN;
    }

    public int getUserType() {
        return userType;
    }

    public void setName(String name) {
        Name = name;
    }

    public void setSurname(String surname) {
        Surname = surname;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public void setIDnum(int IDnum) {
        this.IDnum = IDnum;
    }

    public void setPhoneN(int phoneN) {
        PhoneN = phoneN;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }

    public int getConfirm() {
        return confirm;
    }

    public void setConfirm(int confirm) {
        this.confirm = confirm;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
}
