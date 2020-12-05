package com.upgrad.quora.service.entity;

import org.apache.commons.lang3.builder.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "USERS")
@NamedQueries({
        @NamedQuery(name = "userByUuid", query = "select ue from UserEntity ue where ue.uuid = :uuid"),
        @NamedQuery(name = "userByEmail", query = "select ue from UserEntity ue where ue.email = :email"),
        @NamedQuery(name = "userByUsername", query = "select ue from UserEntity ue where ue.userName = :username")
})

public class UserEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 200)
    @NotNull
    private String uuid;

    @Column(name = "firstname")
    @Size(max = 30)
    @NotNull
    private String firstName;

    @Column(name = "lastname")
    @Size(max = 30)
    @NotNull
    private String lastName;

    @Column(name = "username", unique = true)
    @Size(max = 30)
    @NotNull
    private String userName;

    @Column(unique = true)
    @Size(max = 50)
    @NotNull
    private String email;

    @Size(max = 255)
    @NotNull
    private String password;

    @Size(max = 200)
    @NotNull
    private String salt;


    @Size(max = 30)
    private String dob;

    @Size(max = 30)
    private String role;

    @Column(name = "contactnumber")
    @Size(max = 30)
    private String contactNumber;

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getUuid() { return uuid; }

    public void setUuid(String uuid) { this.uuid = uuid; }

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getUserName() { return userName; }

    public void setUserName(String userName) { this.userName = userName; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getSalt() { return salt; }

    public void setSalt(String salt) { this.salt = salt; }



    public String getDob() { return dob; }

    public void setDob(String dob) { this.dob = dob; }

    public String getRole() { return role; }

    public void setRole(String role) { this.role = role; }

    public String getContactNumber() { return contactNumber; }

    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    @Override
    public int hashCode() { return new HashCodeBuilder().append(this).hashCode(); }

    @Override
    public boolean equals(Object obj) { return new EqualsBuilder().append(this, obj).isEquals(); }

    @Override
    public String toString() { return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE); }
}
