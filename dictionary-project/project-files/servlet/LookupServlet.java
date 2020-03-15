/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlet;

import com.database.EntriesModel;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author gnome
 */
public class LookupServlet extends HttpServlet {

    @Override
    public void init() {
        try {
            getServletContext().setAttribute("entriesModel", EntriesModel.getInstance());
        } catch (SQLException | ClassNotFoundException ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex.getMessage());
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException {
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Methods","*");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(200);

        try (PrintWriter out = response.getWriter()) {
            EntriesModel entryModel = (EntriesModel) getServletContext().getAttribute("entriesModel");
            out.print(entryModel.findEntries(request.getParameter("word")));
        } catch (SQLException ex) {
            Logger.getLogger(LookupServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
