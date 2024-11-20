package com.example.Veterinary_system.Model;

import jakarta.persistence.*;


@Entity
@Table( name = "mascotas")

public class PetModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false,unique = true)

    private Long id;
    private String pet_name;
    private String species;
    private Integer pet_age;
    private String breed;
    private String ownerName;
    private String ownerContact;
    public PetModel() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getPet_name() {
        return pet_name;
    }

    public void setPet_name(String pet_name) {
        this.pet_name = pet_name;
    }

    public String getSpecies() {
        return species;
    }
    public void setSpecies(String species) {
        this.species = species;
    }
    public Integer getPet_age() {
        return pet_age;
    }
    public void setPet_age(Integer pet_age) {
        this.pet_age = pet_age;
    }
    public String getBreed() {
        return breed;
    }
    public void setBreed(String breed) {
        this.breed = breed;
    }
    public String getOwnerName() {
        return ownerName;
    }
    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }
    public String getOwnerContact() {
        return ownerContact;
    }
    public void setOwnerContact(String ownerContact) {
        this.ownerContact = ownerContact;
    }

    public PetModel(String pet_name, String species, Integer pet_age, String breed, String ownerName, String ownerContact)
    {
        this.pet_name = pet_name;
        this.species = species;
        this.pet_age = pet_age;
        this.breed = breed;
        this.ownerName = ownerName;
        this.ownerContact = ownerContact;
    }
}
