package com.example.Veterinary_system.Controller;

import com.example.Veterinary_system.Model.PetModel;
import com.example.Veterinary_system.Service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping(path = "/pet")
@CrossOrigin
public class PetController {
    @Autowired
    PetService petService;

    @GetMapping()
    public ArrayList<PetModel> findAllPets() {
        return petService.findAllPets();
    }

    @GetMapping(path = "/find-by-ownerContact")
    public Optional<PetModel> findPetByOwnerContact(@RequestParam("ownerContact") String ownerContact) {
        return petService.findPetByOwnerContact(ownerContact);
    }

    @GetMapping(path = "/find-by-ownerName")
    public ArrayList<PetModel> findPetsByOwnerName(@RequestParam("ownerName") String ownerName) {
        return petService.findPetsByOwnerName(ownerName);
    }

    @PostMapping()
    public PetModel savePet(@RequestBody PetModel pet){
        return petService.savePet(pet);
    }
    @PutMapping()
    public PetModel updatePet(@RequestBody PetModel pet){
        return petService.savePet(pet);
    }

    @PutMapping(path ="/update-by-ownerContact")
    public PetModel updatePet(@RequestParam("ownerContact") String ownerContact,@RequestBody PetModel pet){
        return petService.updatePet(ownerContact,pet);
    }

    @DeleteMapping(path ="/delete-by-ownerContact")
    public String deletePetByOwnerContact(@RequestParam("ownerContact") String ownerContact){
        return petService.deletePetByOwnerContact(ownerContact);
    }
}
