package com.example.Veterinary_system.Service;

import com.example.Veterinary_system.Model.PetModel;
import com.example.Veterinary_system.Repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Service
public class PetService {
    @Autowired
    PetRepository petRepository;

    public ArrayList<PetModel> findAllPets(){

        return (ArrayList<PetModel>) petRepository.findAll();
    }

    public PetModel savePet(PetModel pet){

        return petRepository.save(pet);
    }

    public ArrayList<PetModel> findPetsByOwnerName(String owner_name){
        return petRepository.findPetsByOwnerName(owner_name);
    }

    public Optional<PetModel> findPetByOwnerContact(String ownerContact){
        return petRepository.findPetByOwnerContact(ownerContact);
    }

    public String deletePetByOwnerContact( String ownerContact) {
        String mensaje = "";
        Optional<PetModel> pet = findPetByOwnerContact(ownerContact);
        if (pet.isPresent()) {
            petRepository.delete(pet.get());
            mensaje = "Se elimino la mascota de la base de datos con exito";
        }
        else
        {
            mensaje = "mascota de la base de datos no existe";
        }
        return mensaje;
    }

    public PetModel updatePet(String ownerContact,PetModel pet){
        return findPetByOwnerContact(ownerContact).isPresent() ? petRepository.save(pet) : new PetModel("pet not found","",0,"","","" );
    }

}

