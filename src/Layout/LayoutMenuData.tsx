import React, { useEffect, useState } from "react";

const Navdata = () => {
  //state data
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isDemandeAdministrative, setIsDemandeAdministrative] = useState(false);
  const [isActivite, setIsActivite] = useState(false);
  const [isAvisPersonnel, setIsAvisPersonnel] = useState(false);
  const [isConseil, setIsConseil] = useState(false);
  const [isParametreEtudiant, setIsParametreEtudiant] = useState(false);
  const [isParametreEnseignant, setIsParametreEnseignant] = useState(false);
  const [isParametrePersonnel, setIsParametrePersonnel] = useState(false);
  const [isSellers, setIsSellers] = useState(false);
  const [isCourrier, setIsCourrier] = useState(false);
  const [isParametre, setIsParametre] = useState(false);
  const [isLocalization, setIsLocalization] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [isStatistique, setIsStatistique] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPapier, setIsPapier] = useState(false);
  const [isHeureEnseignant, setIsHeureEnseignant] = useState(false);
  const [isSoutenance, setIsSoutenance] = useState(false);
  const [isDeaprtement, setIsDeaprtement] = useState(false);
  const [isEmplois, setIsEmplois] = useState(false);
  const [isRattrapage, setIsRattrapage] = useState(false);
  const [isExamen, setIsExamen] = useState(false);
  const [isNotesExamen, setIsNotesExamen] = useState(false);
  const [isConge, setIsConge] = useState(false);
  const [isDeplacement, setIsDeplacement] = useState(false);
  const [isParcours, setIsParcours] = useState(false);
  const [isNotesProfessionnelles, setIsNotesProfessionnelles] = useState(false);
  const [isModele, setIsModele] = useState(false);
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);
  const [isLevel3, setIsLevel3] = useState(false);
  const [isLevel4, setIsLevel4] = useState(false);
  const [isLevel5, setIsLevel5] = useState(false);
  const [isLevel6, setIsLevel6] = useState(false);
  const [isLevel7, setIsLevel7] = useState(false);
  const [isLevel8, setIsLevel8] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        // var id: any = item.getAttribute("subitems");
        // if (document.getElementById(id)){
        //     document.getElementById(id).classList.remove("show");
        // }
      });
    }
  }
  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Ecommerce") {
      setIsEcommerce(false);
    }
    if (iscurrentState !== "Orders") {
      setIsOrder(false);
    }
    if (iscurrentState !== "Sellers") {
      setIsSellers(false);
    }
    if (iscurrentState !== "Courrier") {
      setIsCourrier(false);
    }
    if (iscurrentState !== "Parametre") {
      setIsParametre(false);
    }
    if (iscurrentState !== "Localization") {
      setIsLocalization(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "DemandeAdministrative") {
      setIsDemandeAdministrative(false);
    }
    if (iscurrentState !== "Activite") {
      setIsActivite(false);
    }
    if (iscurrentState !== "AvisPersonnel") {
      setIsAvisPersonnel(false);
    }
    if (iscurrentState !== "Conseil") {
      setIsConseil(false);
    }
    if (iscurrentState !== "Statistique") {
      setIsStatistique(false);
    }
    if (iscurrentState !== "Admin") {
      setIsAdmin(false);
    }
    if (iscurrentState !== "HeureEnseignant") {
      setIsHeureEnseignant(false);
    }
    if (iscurrentState !== "Soutenance") {
      setIsSoutenance(false);
    }
    if (iscurrentState !== "Departement") {
      setIsDeaprtement(false);
    }
    if (iscurrentState !== "Conge") {
      setIsConge(false);
    }
    if (iscurrentState !== "Deplacement") {
      setIsDeplacement(false);
    }
    if (iscurrentState !== "NotesProfessionelles") {
      setIsNotesProfessionnelles(false);
    }
    if (iscurrentState !== "Modele") {
      setIsModele(false);
    }
    if (iscurrentState !== "ParametreEtudiant") {
      setIsParametreEtudiant(false);
    }
    if (iscurrentState !== "ParametreEnseignant") {
      setIsParametreEnseignant(false);
    }
    if (iscurrentState !== "ParametrePersonnel") {
      setIsParametrePersonnel(false);
    }
    if (iscurrentState !== "PapierAdministratif") {
      setIsPapier(false);
    }
    if (iscurrentState !== "Rattrapages") {
      setIsRattrapage(false);
    }
    if (iscurrentState !== "Emplois") {
      setIsEmplois(false);
    }
    if (iscurrentState !== "Examen") {
      setIsExamen(false);
    }
    if (iscurrentState !== "NotesExamen") {
      setIsNotesExamen(false);
    }
    if (iscurrentState !== "Parcours") {
      setIsParcours(false);
    }
  }, [
    iscurrentState,
    isEcommerce,
    isOrder,
    isCourrier,
    isParametre,
    isLocalization,
    isAuth,
    isMultiLevel,
    isDemandeAdministrative,
    isActivite,
    isAvisPersonnel,
    isStatistique,
    isAdmin,
    isPapier,
    isHeureEnseignant,
    isSoutenance,
    isDeaprtement,
    isParametreEtudiant,
    isExamen,
    isNotesExamen,
    isParcours,
  ]);

  const menuItems: any = [
    {
      label: "Menu",
      isHeader: true,
    },
    //dashboard
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "bi bi-speedometer2",
      link: "/dashboard",
    },

    // Statistiques
    {
      id: "Statistiques",
      label: "Chiffres et Statistiques",
      link: "/#",
      icon: "bi bi-person-fill-gear",
      click: function (e: any) {
        e.preventDefault();
        setIsStatistique(!isStatistique);
        setIscurrentState("Statistique");
        updateIconSidebar(e);
      },
      stateVariables: isStatistique,
      subItems: [
        {
          id: "Etudiants",
          label: "Etudiants",
          link: "/statistique/stat-etudiant",
          parentId: "Statistiques",
          icon: "bi bi-person-fill-add",
        },
        {
          id: "Enseignants",
          label: "Enseignants",
          link: "/statistique/stat-enseignant",
          parentId: "Statistiques",
          icon: "bi bi-person-lines-fill",
        },
        {
          id: "Personnels",
          label: "Personnels",
          link: "/statistique/stat-personnel",
          parentId: "Statistiques",
          icon: "bi bi-person-lines-fill",
        },
        {
          id: "Patrimoine",
          label: "Patrimoine",
          link: "/gestion-etudiant/liste-etudiants",
          parentId: "Statistiques",
          icon: "bi bi-person-lines-fill",
        },
        {
          id: "Besoin achat",
          label: "Besoin achat",
          link: "/gestion-etudiant/liste-etudiants",
          parentId: "Statistiques",
          icon: "bi bi-person-lines-fill",
        },
      ],
    },
    // Heures d'enseignements
    {
      id: "heures-enseignements",
      label: "Heures d'enseignements",
      link: "/#",
      icon: "bi bi-person-fill-gear",
      click: function (e: any) {
        e.preventDefault();
        setIsHeureEnseignant(!isHeureEnseignant);
        setIscurrentState("HeureEnseignant");
        updateIconSidebar(e);
      },
      stateVariables: isHeureEnseignant,
      subItems: [
        {
          id: "Tableau-equilibrage",
          label: "Tableau d'equilibrage de charge",
          link: "/gestion-enseignant/ajouter-enseignant",
          parentId: "Tableau-equilibrage",
          icon: "bi bi-person-fill-add",
        },
        {
          id: "Contractuels",
          label: "Contractuels",
          link: "/gestion-enseignant/liste-enseignants",
          parentId: "Tableau-equilibrage",
          icon: "bi bi-person-lines-fill",
        },
        {
          id: "Vacataires",
          label: "Vacataires",
          link: "/gestion-enseignant/liste-dossier-administartif",
          parentId: "Tableau-equilibrage",
          icon: "bi bi-person-lines-fill",
        },
        {
          id: "Expert",
          label: "Expert",
          link: "/gestion-enseignant/liste-archive-dossier-administratif",
          parentId: "Tableau-equilibrage",
          icon: "bi bi-person-lines-fill",
        },
        {
          id: "PES",
          label: "PES",
          link: "/gestion-enseignant/liste-archive-dossier-administratif",
          parentId: "Tableau-equilibrage",
          icon: "bi bi-person-lines-fill",
        },
      ],
    },
    // Soutenances et encadrements
    {
      id: "Soutenance-encadrement",
      label: "Soutenance et encadrement",
      link: "/demandes-etudiant/Liste-demandes-etudiant",
      icon: "bi bi-telephone-forward",
    },

    // Demandes Administratives
    {
      id: "demande-administrative",
      label: "Demande administrative",
      link: "/#",
      icon: "bi bi-megaphone",
      click: function (e: any) {
        e.preventDefault();
        setIsDemandeAdministrative(!isDemandeAdministrative);
        setIscurrentState("DemandeAdministrative");
        updateIconSidebar(e);
      },
      stateVariables: isDemandeAdministrative,
      subItems: [
        {
          id: "Attestation-salaire",
          label: "Attestation de salaire",
          link: "/avis-etudiant/ajouter-avis-etudiant",
          parentId: "demande-administrative",
          icon: "bi bi-file-earmark-plus",
        },
        {
          id: "Fiche-de-paie",
          label: "Fiche de paie",
          link: "/avis-etudiant/liste-avis-etudiant",
          parentId: "demande-administrative",
          icon: "bi bi-list-ul",
        },
        {
          id: "Domiciliation-de-salaire",
          label: "Domiciliation de salaire",
          link: "/avis-etudiant/liste-avis-etudiant",
          parentId: "demande-administrative",
          icon: "bi bi-list-ul",
        },
        {
          id: "Retenu-source",
          label: "Retenu à la source",
          link: "/avis-etudiant/liste-avis-etudiant",
          parentId: "demande-administrative",
          icon: "bi bi-list-ul",
        },
      ],
    },
    // Bourses et alternances
    {
      id: "Bourse-alternance",
      label: "Bourse et alternance",
      link: "/demandes-etudiant/Liste-demandes-etudiant",
      icon: "bi bi-telephone-forward",
    },
    {
      id: "Activites",
      label: "Activités",
      link: "/#",
      icon: "bi bi-megaphone",
      click: function (e: any) {
        e.preventDefault();
        setIsActivite(!isActivite);
        setIscurrentState("Activite");
        updateIconSidebar(e);
      },
      stateVariables: isActivite,
      subItems: [
        {
          id: "clubs",
          label: "Clubs",
          link: "/avis-enseignant/ajouter-avis-enseignant",
          parentId: "Activites",
          icon: "bi bi-file-earmark-plus",
        },
        {
          id: "Conferences",
          label: "Conferences",
          link: "/avis-enseignant/liste-avis-enseignant",
          parentId: "Activites",
          icon: "bi bi-list-ul",
        },
        {
          id: "Hackathon",
          label: "Hackathon",
          link: "/avis-enseignant/liste-avis-enseignant",
          parentId: "Activites",
          icon: "bi bi-list-ul",
        },
      ],
    },
    //Activites
    {
      id: "Avis-Personnel",
      label: "Avis Personnel",
      link: "/#",
      icon: "bi bi-megaphone",
      click: function (e: any) {
        e.preventDefault();
        setIsAvisPersonnel(!isAvisPersonnel);
        setIscurrentState("AvisPersonnel");
        updateIconSidebar(e);
      },
      stateVariables: isAvisPersonnel,
      subItems: [
        {
          id: "AjouterAvisPersonnel",
          label: "Ajouter un avis",
          link: "/avis-personnel/ajouter-avis-personnel",
          parentId: "Avis-Personnel",
          icon: "bi bi-file-earmark-plus",
        },
        {
          id: "GestionAvisPersonnel",
          label: "Liste des avis",
          link: "/avis-personnel/liste-avis-personnel",
          parentId: "Avis-Personnel",
          icon: "bi bi-list-ul",
        },
      ],
    },
    // deroulement des examens
    {
      id: "deroulement-examens",
      label: "Déroulement des examens",
      link: "/demandes-etudiant/Liste-demandes-etudiant",
      icon: "bi bi-telephone-forward",
    },
    // deliberation des resultats
    {
      id: "deliberation-resultats",
      label: "Déliberation des resultats",
      link: "/demandes-etudiant/Liste-demandes-etudiant",
      icon: "bi bi-telephone-forward",
    },
    // PV et conseils
    {
      id: "PV-conseils",
      label: "PV et conseils",
      link: "/#",
      icon: "bi bi-chat-quote",
      click: function (e: any) {
        e.preventDefault();
        setIsConseil(!isConseil);
        setIscurrentState("Conseil");
        updateIconSidebar(e);
      },
      stateVariables: isConseil,
      subItems: [
        {
          id: "Scientifique",
          label: "Scientifique",
          link: "/actualite/ajouter-actualite",
          parentId: "PV-conseils",
          icon: "bi bi-file-earmark-plus",
        },
        {
          id: "Disciplinaires",
          label: "Disciplinaires",
          link: "/actualite/liste-actualite",
          parentId: "PV-conseils",
          icon: "bi bi-list-ul",
        },
      ],
    },
    // Courrier interne
    {
      id: "Courrier-interne",
      label: "Courrier interne",
      link: "/#",
      icon: "bi bi-chat-quote",
      click: function (e: any) {
        e.preventDefault();
        setIsCourrier(!isCourrier);
        setIscurrentState("Courrier");
        updateIconSidebar(e);
      },
      stateVariables: isCourrier,
      subItems: [
        {
          id: "par-etablissement",
          label: "au sein du meme etablissement",
          link: "/actualite/ajouter-actualite",
          parentId: "Courrier-interne",
          icon: "bi bi-file-earmark-plus",
        },
        {
          id: "etablissement",
          label: "inter etablissement",
          link: "/actualite/liste-actualite",
          parentId: "Courrier-interne",
          icon: "bi bi-list-ul",
        },
        {
          id: "etablissement-uni",
          label: "Etablissement - Université",
          link: "/actualite/liste-actualite",
          parentId: "Courrier-interne",
          icon: "bi bi-list-ul",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
