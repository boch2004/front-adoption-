import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addanimal } from "../JS/userSlice/animalSlice";
import Swal from "sweetalert2";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "./Ajouter.css";

function Ajouter() {
  const user = useSelector((state) => state.user.user);

  const [newanimal, setnewanimal] = useState({
    name: "",
    img: "",
    description: "",
    race: "",
    Type: "",
    age: "",
    birthDate: null,
    gender: "",
    vaccin:"",
    Activite: "",
    Couleur: "",
    location: "",
    remarque: "",
    idanimal: user?._id,
    proprietaire: user?.name,
  });

  const dispatch = useDispatch();
  const animals = useSelector((state) => state.animal?.animalList || []);

  const genderOptions = [
    { label: "Mâle", value: "Mâle" },
    { label: "Femelle", value: "Femelle" },
  ];
  const vaccinOptions = [
    { label: "Oui", value: "Oui" },
    { label: "Non", value: "Non" },
  ];

  const TypeOptions = [
    { label: "Chats", value: "Chats" },
    { label: "Chiens", value: "Chiens" },
    { label: "Petits Mammifères", value: "Petits Mammifères" },
    { label: "Oiseaux", value: "Oiseaux" },
    { label: " Reptiles & Amphibiens", value: " Reptiles & Amphibiens" },
    { label: " Poissons", value: " Poissons" },
  ];

  const activiteOptions = [
    { label: "Calme", value: "Calme" },
    { label: "Joueur", value: "Joueur" },
    { label: "Sportif", value: "Sportif" },
    { label: "Protecteur", value: "Protecteur" },
    { label: "Indépendant", value: "Indépendant" },
  ];

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Ajuster les mois si le jour n’est pas encore atteint
    if (days < 0) {
      months -= 1;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Cas particulier : moins d’un mois
    const totalDays = (today - birth) / (1000 * 60 * 60 * 24);
    if (totalDays < 30) {
      return "moins d'un mois";
    }

    // Formatage de l'âge
    if (years === 0) {
      return months === 1 ? "1 mois" : `${months} mois`;
    } else {
      if (months === 0) {
        return years === 1 ? "1 an" : `${years} ans`;
      } else {
        const yearText = years === 1 ? "1 an" : `${years} ans`;
        const monthText = months === 1 ? "1 mois" : `${months} mois`;
        return `${yearText} et ${monthText}`;
      }
    }
  };
  
  const isFormValid = () => {
    return (
      newanimal.img && //chaque champ a un valeur
      newanimal.name &&
      newanimal.description &&
      newanimal.race &&
      newanimal.age &&
      newanimal.gender &&
      newanimal.vaccin &&
      newanimal.Activite &&
      newanimal.Couleur &&
      newanimal.Type &&
      newanimal.location &&
      newanimal.remarque
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* Image */}
        <div
          style={{
            backgroundImage: `url("https://www.la-spa.fr/app/app/uploads/2023/09/prendre-soin_mon-chien-saute-sur-les-gens.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "50%",
            height: "1000px",
          }}
        ></div>

        {/* Formulaire */}
        <div
          style={{
            backgroundColor: "#efeff1",
            width: "50%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 50,
            marginTop: 200,
          }}
          className="inputt"
        >
          <h1>Ajouter un animal</h1>

          {/* Nom et Image */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <h5>
                Nom de l’animal<span>*</span>
              </h5>
              <input
                type="text"
                onChange={(e) =>
                  setnewanimal({ ...newanimal, name: e.target.value })
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <h5>
                Image<span>*</span>
              </h5>
              <input
                style={{ padding: "8.3px" }}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setnewanimal({ ...newanimal, img: e.target.files[0] })
                }
              />
            </div>
          </div>

          <h5>
            Description<span>*</span>
          </h5>
          <input
            type="text"
            onChange={(e) =>
              setnewanimal({ ...newanimal, description: e.target.value })
            }
          />

          {/* Type et Race */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <h5>
                Type d'animal<span>*</span>
              </h5>
              <Dropdown
                value={newanimal.Type}
                options={TypeOptions}
                onChange={(e) => setnewanimal({ ...newanimal, Type: e.value })}
                placeholder="Choisir un Type d'animal"
                className="p-inputtext-sm"
              />
            </div>
            <div style={{ flex: 1 }}>
              <h5>
                Race<span>*</span>
              </h5>
              <input
                type="text"
                onChange={(e) =>
                  setnewanimal({ ...newanimal, race: e.target.value })
                }
              />
            </div>

            <div style={{ flex: 2 }}>
              <h5>
                Date de naissance<span>*</span>
              </h5>
              <Calendar
                id="date"
                value={newanimal.birthDate}
                onChange={(e) => {
                  const age = calculateAge(e.value);
                  setnewanimal({
                    ...newanimal,
                    birthDate: e.value,
                    age: age,
                  });
                }}
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <h5>
                Sexe<span>*</span>
              </h5>
              <Dropdown
                value={newanimal.gender}
                options={genderOptions}
                onChange={(e) =>
                  setnewanimal({ ...newanimal, gender: e.value })
                }
                placeholder="Choisir le sexe"
                className="p-inputtext-sm"
              />
            </div>
            <div style={{ flex: 1 }}>
              <h5>
                Vaccin<span>*</span>
              </h5>
              <Dropdown
                value={newanimal.vaccin}
                options={vaccinOptions}
                onChange={(e) =>
                  setnewanimal({ ...newanimal, vaccin: e.value })
                }
                placeholder="Choix"
                className="p-inputtext-sm"
              />
            </div>
            <div style={{ flex: 1 }}>
              <h5>
                Activite<span>*</span>
              </h5>
              <Dropdown
                value={newanimal.Activite}
                options={activiteOptions}
                onChange={(e) =>
                  setnewanimal({ ...newanimal, Activite: e.value })
                }
                placeholder="Choisir une activité"
                className="p-inputtext-sm"
              />
            </div>
          </div>

    
          <h5>
            Couleur<span>*</span>
          </h5>
          <input
            type="text"
            onChange={(e) =>
              setnewanimal({ ...newanimal, Couleur: e.target.value })
            }
          />

          <h5>
            Lieu<span>*</span>
          </h5>
          <input
            type="text"
            onChange={(e) =>
              setnewanimal({ ...newanimal, location: e.target.value })
            }
          />

          <h5>
            Remarque<span>*</span>
          </h5>
          <input
            type="text"
            onChange={(e) =>
              setnewanimal({ ...newanimal, remarque: e.target.value })
            }
          />

          {/* Validation et Enregistrement */}
          <div className="wrapper">
            <a
              onClick={() => {
                if (!isFormValid()) {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Veuillez remplir tous les champs",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  return;
                }

                const isDuplicateAnimal = animals.some(
                  (animal) =>
                    animal.name.trim().toLowerCase() ===
                    newanimal.name.trim().toLowerCase() &&
                    animal.race.trim().toLowerCase() ===
                    newanimal.race.trim().toLowerCase() &&
                    animal.Type.trim().toLowerCase() ===
                    newanimal.Type.trim().toLowerCase() &&
                    animal.location.trim().toLowerCase() ===
                    newanimal.location.trim().toLowerCase() &&
                    animal.age.trim().toLowerCase() ===
                    newanimal.age.trim().toLowerCase() 
                );

                if (isDuplicateAnimal) {
                  Swal.fire({
                    icon: "error",
                    title: "Cet animal existe déjà",
                    text: "Un animal avec le même nom, race et type est déjà ajouté.",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                  return;
                }

                const formData = new FormData();
                formData.append("name", newanimal.name);
                formData.append("img", newanimal.img);
                formData.append("description", newanimal.description);
                formData.append("race", newanimal.race);
                formData.append("Type", newanimal.Type);
                formData.append("gender", newanimal.gender);
                formData.append("vaccin", newanimal.vaccin);
                formData.append("location", newanimal.location);
                formData.append("remarque", newanimal.remarque);
                formData.append("Couleur", newanimal.Couleur);
                formData.append("Activite", newanimal.Activite);
                formData.append("age", newanimal.age);
                formData.append("birthDate", newanimal.birthDate); 
                formData.append("idanimal", newanimal.idanimal);
                formData.append("proprietaire", newanimal.proprietaire);

                dispatch(addanimal(formData));

                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "L'animal a été ajouté avec succès",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }}
            >
              <span>Enregistrer</span> 
              {/* button. css*/}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ajouter;
