/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author gnome
 */
public class EntriesModel {
    private static EntriesModel instance;
    
    private PreparedStatement lookupStatement; 
    private EntriesModel() throws ClassNotFoundException, SQLException {
        connectToDatabase();
    }
    
    private void connectToDatabase() throws ClassNotFoundException, SQLException {
        String myUrl = "jdbc:mysql://localhost/dict?autoReconnect=true&useSSL=false";
        Class.forName("com.mysql.jdbc.Driver"); 

        Connection conn = DriverManager.getConnection(myUrl, "dict", "dict");
        
        lookupStatement = conn.prepareStatement("SELECT * from entries where word = ?");
    }
    
    public List<EntryModel> findEntries(String name) throws SQLException {
        lookupStatement.setString(1, name);
        ResultSet res = lookupStatement.executeQuery();
        
        List<EntryModel> list = new ArrayList<>();
        while (res.next()) {
            list.add(new EntryModel(res.getString(1), res.getString(2), res.getString(3)));
        }
        
        return list;
    }
    
    public static EntriesModel getInstance() throws ClassNotFoundException, SQLException {
        if (instance == null) {
            instance = new EntriesModel();
        }
        
        return instance;
    }
}
