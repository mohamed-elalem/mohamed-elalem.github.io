/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.database;

/**
 *
 * @author gnome
 */
public class EntryModel {
    private final String word;
    private final String wordType;
    private final String definition;
    
    public EntryModel(String word, String wordType, String definition) {
        this.word = word.replace("\n", "").replace("\"", "\\\"");
        this.wordType = wordType.replace("\n", "").replace("\"", "\\\"");
        this.definition = definition.replace("\n", "").replace("\"", "\\\"");
    }

    public String getWord() {
        return word;
    }

    public String getWordType() {
        return wordType;
    }

    public String getDefinition() {
        return definition;
    }
    
    @Override
    public String toString() {
        return String.format("{\"word\": \"%s\",\"wordType\":\"%s\",\"definition\":\"%s\"}",
                getWord(), getWordType(), getDefinition());
    }
}
