package com.example.Veterinary_system.Repository;

import com.example.Veterinary_system.Model.PetModel;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

public interface PetRepository extends CrudRepository<PetModel,Long> {

    public abstract ArrayList<PetModel> findPetsByOwnerName(String name);

    public Optional<PetModel> findPetByOwnerContact(String ownerContact);

}
