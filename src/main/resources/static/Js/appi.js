async function AppiPets() 
	{
		try
		{
			const respuesta = await fetch("http://34.228.153.184:8080/pet");

			if(respuesta.ok)
			{
				const datos =  await respuesta.json();
				let informacion = ''
				datos.forEach(mascota => {
					informacion += `
						<tr>
							<td>${mascota.id}</td>
							<td class="editable" data-field="pet_name">${mascota.pet_name}</td>
							<td class="editable" data-field="species">${mascota.species}</td>
							<td class="editable" data-field="pet_age">${mascota.pet_age}</td>
							<td class="editable" data-field="breed">${mascota.breed}</td>
							<td class="editable" data-field="ownerName">${mascota.ownerName}</td>
                            <td class="editable" data-field="ownerContact">${mascota.ownerContact}</td>
							<td><button class="btn btn-danger"  data-contact="${mascota.ownerContact}">Delete</button></td>
							<td><button class="btn btn-warning" data-contact="${mascota.ownerContact}" data-id ="${mascota.id}">Edit</button></td>
						</tr>
					`;
				});
				document.getElementById("info-table").innerHTML = informacion;

				document.querySelectorAll(".btn-danger").forEach(button =>{
					button.addEventListener('click', async (event) => {
						const contact = event.target.getAttribute('data-contact');
						await deletebyownerContact(contact);
					});
				});

				document.querySelectorAll(".btn-warning").forEach(button => {
					button.addEventListener('click', (event) => {
						const contact = event.target.getAttribute('data-contact');
						const id = event.target.getAttribute('data-id');
						const row = event.target.closest('tr');

						document.querySelectorAll(".btn-warning").forEach(boton => {
							if(boton != event.target)
							{
								boton.disabled = true;
							}
						});

						if (event.target.textContent == 'Edit') {
							editPetRow(row);
							event.target.textContent = 'Save';
							event.target.classList.remove('btn-warning');
							event.target.classList.add('btn-success');
						} else {
							savePetRow(row,contact,id);
							document.querySelectorAll(".btn-warning").forEach(boton => {
								if(boton != event.target)
								{
									boton.disabled = false;
								}
							});
							event.target.textContent = 'Edit';
							event.target.classList.remove('btn-success');
							event.target.classList.add('btn-warning');
						}
					});
				});
			}
		}
		catch(error)
		{
			console.log(error);
		}
	}

AppiPets();

//funcion asincrona que nos ayuda a realizar el metodo delete
	async function deletebyownerContact(contact){
		const respuesta = await fetch(`http://34.228.153.184:8080/pet/delete-by-ownerContact?ownerContact=${contact}`,{
			method: 'DELETE'
		});

		if(respuesta.ok)
		{
			console.log("La mascota se elimino exitosamente de la base de datos");
			AppiPets();
		}
		else
		{
			console.log("Mascota no encontrada no encontrado");
		}
	}

	//funcion asincrona que nos ayuda a realizar el metodo post
	async function sendPets(Petdata) {
		const respuesta = await fetch("http://34.228.153.184:8080/pet",{
			method: 'POST',
			headers:{
				'content-Type':'application/json'
			},
			body: JSON.stringify(Petdata)
		});
		if(respuesta.ok)
		{
			console.log("La lista de mascotas se actualizo exitosamente");
			return await respuesta.json();
		}
		else
		{
			console.log("Hubo un error al intentar realizar la solicitud");
		}
	}
//lineas 99 a 136, nos ayudan a enviar a la base de datos los datos que ingresemos en los inputs de nuestro formulario para poder actualizar la lista de nuestro json y que se generen mas filas en nuestra tabla
  document.getElementById("PetsForm").addEventListener("submit",

  	async function(event){
  		event.preventDefault();

  		//obtenemos los valores que el usuario ingresa en el formulario
  		var petnameFromForm = document.getElementById("pet_name").value;
  		var petspecieFromForm = document.getElementById("species").value;
  		var petageFromForm = document.getElementById("pet_age").value;
  		var petbreedFromForm = document.getElementById("breed").value;
  		var petownerNameFromForm = document.getElementById("ownerName").value;
        var petownerContactFromForm = document.getElementById("ownerContact").value;

		if( petnameFromForm == ''||petspecieFromForm == ''||petageFromForm == ''|| petbreedFromForm == ''|| petownerNameFromForm  == '' || petownerContactFromForm == '')
		{
			alert('No lleno los campos que se requieren en este formulario');
		}
		else
		{
			const Petdata =
			{
				pet_name :petnameFromForm,
				species :petspecieFromForm,
				pet_age :petageFromForm,
				breed :petbreedFromForm,
				ownerName :petownerNameFromForm,
                ownerContact:petownerContactFromForm
			};

			const nuevamascota = await sendPets(Petdata);

			if(nuevamascota)
			{
				AppiPets();
				//limpiamos el formulario
				 document.querySelector("#PetsForm").reset();
			}
		}
  	}
   );

//funcion asincrona que nos ayuda a realizar el metodo put
   async function updatepets(contact,Petdata) {
	const respuesta = await fetch(`http://34.228.153.184:8080/pet/update-by-ownerContact?ownerContact=${contact}`,{
		method: 'PUT',
		headers:{
			'content-Type':'application/json'
		},
		body: JSON.stringify(Petdata)
	});
	if(respuesta.ok)
	{
		console.log("La lista de mascotas se actualizo exitosamente");
		AppiPets();
	}
	else
	{
		console.log("Hubo un error al intentar realizar la solicitud");
	}
}
//funcion que nos ayuda a editar las celdas de nuestra fila con la que deseemos trabajar cuando le demos click al boton de edit
function editPetRow(row) {
	const cells = row.querySelectorAll('.editable');
	cells.forEach(cell => {
		const field = cell.getAttribute('data-field');
		const originalValue = cell.textContent;
		cell.innerHTML = `<input type="text" value="${originalValue}" data-field="${field}" class = "inputable">`;
	});
}
//funcion asincrona que nos permite guardar los cambios una vez que modifiquemos los valores de los inputs y le demos click en "save"
async function savePetRow(row, contact,id) {
	const cells = row.querySelectorAll('.editable input');
	const Petdata = {id:id,};

	cells.forEach(cell => {
		const field = cell.getAttribute('data-field');
		Petdata[field] = cell.value;
	});

	const updatedpet = await updatepets(contact,Petdata);
	if (updatedpet) {
		AppiPets();
	}
}