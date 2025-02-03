import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import CountUp from "react-countup";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";

import { useFetchAllFacultiesQuery } from "features/faculties/faculties";

import { FacultiesEtudiant, FacultyEtudiant, useFetchFacultyEtudiantOfAllFacultiesQuery } from "features/facultyEtudiant/facultyEtudiant";
import { useFetchStudentSubscriptionTypeOfAllFacultiesQuery } from "features/studentSubscriptionType/studentSubscriptionTypeSlice";
import { useFetchStudentsLevelsOfAllFacultiesQuery } from "features/studentLevel/studentLevelSlice";

  const wilayaOptions = [
    "اريانة",
    "بن عروس",
    "باجة",
    "بنزرت",
    "قابس",
    "قفصة",
    "جندوبة",
    "قبلي",
    "الكاف",
    "القيروان",
    "مدنين",
    "المهدية",
    "المنستير",
    "نابل",
    "صفاقس",
    "سليانة",
    "سوسة",
    "تطاوين",
    "توزر",
    "تونس",
    "زغوان",
    "منوبة",
    "القصرين",
    "سيدي بوزيد",
  ];

  interface StudentWithFaculty{
    student: FacultyEtudiant;
    facultyAbreviation: String;
  }

const StatEtudiant = () => {
  document.title = "Liste des étudiants | UGAF";

  const { data: AllFaculties } = useFetchAllFacultiesQuery();
  console.log("AllFaculties", AllFaculties);

  const { data: TotalSubscriptionTypes,  isSuccess: TotalSubscriptionTypesLoaded, } = useFetchStudentSubscriptionTypeOfAllFacultiesQuery();
  console.log("TotalSubscriptionTypes", TotalSubscriptionTypes);

  const { data: TotalLevels,  isSuccess: TotalLevelsLoaded, } = useFetchStudentsLevelsOfAllFacultiesQuery();
  console.log("TotalLevels", TotalLevels);

    const {
      data: AllStudentsFaculties,
      isSuccess: AllStudentsFacultiesLoaded,
    } = useFetchFacultyEtudiantOfAllFacultiesQuery();
    console.log("AllStudentsFaculties", AllStudentsFaculties);

  const [selectedFaculty, setSelectedFaculty] = useState<string>("tous");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [etudiantCount, setEtudiantCount] = useState(0);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState<StudentWithFaculty[]>([]);
  const [allStudents, setAllStudents] = useState<FacultyEtudiant[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedYearBac, setSelectedYearBac] = useState<string>("");
  const [yearsBac, setYearsBac] = useState<string[]>([]);
  const [selectedSectionBac, setSelectedSectionBac] = useState<string>("");
  const [selectedSessionBac, setSelectedSessionBac] = useState<string>("");

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === e.target.value);

    if (e.target.value !== "tous") {
      let studentsData: any = AllStudentsFaculties?.totalStudents.filter(
        (teachersList) => teachersList.facultyName === e.target.value
      );

      let students: StudentWithFaculty[] = [];
      for (const student of studentsData[0].students) {
        students.push(
          {
            student: student,
            facultyAbreviation: factultyAbreviation[0].abreviation
          }
        )
      }
      setFilteredStudents(students)
      setEtudiantCount(studentsData[0].studentsNumber);
    } else {
      let studentsWithFaculty: StudentWithFaculty[] = [];
      for (const total_students of AllStudentsFaculties?.totalStudents!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_students.facultyName);
      
        for(const student of total_students.students){
          studentsWithFaculty.push(
            {
              student: student,
              facultyAbreviation: factultyAbreviation[0].abreviation
            }
          )
        }
      }
      setFilteredStudents(studentsWithFaculty)
      setEtudiantCount(AllStudentsFaculties?.totalStudentsNumber!);
    }
    setSelectedFaculty(e.target.value);
    setSelectedFilter('');
    setSelectedSubscriptionType("");
    setSelectedLevel('');
    setSelectedState('');
    setSelectedGender("");
    setSelectedSectionBac('');
    setSelectedSessionBac('');
    setSelectedYearBac('');
  };

  const processData = (studentsData: FacultiesEtudiant) => {

    let students: FacultyEtudiant[] = [];
      let studentsWithFaculty: StudentWithFaculty[] = [];

      for (const total_students of studentsData.totalStudents) {
        students = students.concat(total_students.students);
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_students.facultyName);
  
        for(const student of total_students.students){
          studentsWithFaculty.push(
            {
              student: student,
              facultyAbreviation: factultyAbreviation[0].abreviation
            }
          )
        }
      }

    setFilteredStudents(studentsWithFaculty);
    setAllStudents(students)
   
  };

  useEffect(() => {
    if (AllStudentsFacultiesLoaded && !hasProcessed) {
      setEtudiantCount(AllStudentsFaculties.totalStudentsNumber);

      processData(AllStudentsFaculties);

      const currentYear = new Date().getFullYear();

      let years = [currentYear.toFixed()];

      for( let i = 1; i < 30; i++){
        years.push((currentYear - i).toFixed())
      }

      setYearsBac(years)

      setHasProcessed(true);
    }
  }, [AllStudentsFacultiesLoaded, hasProcessed]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    setSelectedFilter(event.target.value);
  };

  const handleSubscriptionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    console.log('selectedFaculty',selectedFaculty)
    let studentsWithFaculty: StudentWithFaculty[] = [];
    if (selectedFaculty === "tous") {

      for (const total_students of AllStudentsFaculties?.totalStudents!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_students.facultyName);
        for(const student of total_students.students){
          if(student?.type_inscription?.type_fr! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }

    }else{
      const facultyStudents: any = AllStudentsFaculties?.totalStudents.filter(
        (studentsList) => studentsList.facultyName === selectedFaculty
      );
      
      if(facultyStudents?.length > 0){
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
        for(const student of facultyStudents[0].students){
          if(student?.type_inscription?.type_fr! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }

    setFilteredStudents(studentsWithFaculty)

    setSelectedSubscriptionType(event.target.value);
    setSelectedLevel('');
    setSelectedState('');
    setSelectedGender("");
    setSelectedSectionBac('');
    setSelectedSessionBac('');
    setSelectedYearBac('');
  };

  const handleSelectedLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let studentsWithFaculty: StudentWithFaculty[] = [];
    console.log('selectedFaculty',selectedFaculty)
    if (selectedFaculty === "tous") {
      for (const total_students of AllStudentsFaculties?.totalStudents!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_students.facultyName);
        for(const student of total_students.students){
          if(student?.groupe_classe?.niveau_classe?.name_niveau_fr! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }else{

      const facultyStudents: any = AllStudentsFaculties?.totalStudents.filter(
        (studentsList) => studentsList.facultyName === selectedFaculty
      );

      console.log(facultyStudents);
      
      if(facultyStudents?.length > 0){
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
        for(const student of facultyStudents[0].students){
          if(student?.groupe_classe?.niveau_classe?.name_niveau_fr! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }

    setFilteredStudents(studentsWithFaculty)

    setSelectedLevel(event.target.value);
    setSelectedSubscriptionType("");
    setSelectedState('');
    setSelectedGender("");
    setSelectedSectionBac('');
    setSelectedSessionBac('');
    setSelectedYearBac('');
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    let studentsWithFaculty: StudentWithFaculty[] = [];
    console.log('selectedFaculty',selectedFaculty)
    if (selectedFaculty === "tous") {
      for (const total_students of AllStudentsFaculties?.totalStudents!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_students.facultyName);
        for(const student of total_students.students){
          if(student?.state! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }else{

      const facultyStudents: any = AllStudentsFaculties?.totalStudents.filter(
        (studentsList) => studentsList.facultyName === selectedFaculty
      );
      
      if(facultyStudents?.length > 0){
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
        for(const student of facultyStudents[0].students){
          if(student?.state! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }

    setFilteredStudents(studentsWithFaculty)

    setSelectedState(event.target.value);
    setSelectedLevel('');
    setSelectedSubscriptionType("");
    setSelectedGender("");
    setSelectedSectionBac('');
    setSelectedSessionBac('');
    setSelectedYearBac('');
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    let studentsWithFaculty: StudentWithFaculty[] = [];
    console.log('selectedFaculty',selectedFaculty)
    if (selectedFaculty === "tous") {
      for (const total_students of AllStudentsFaculties?.totalStudents!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_students.facultyName);
        for(const student of total_students.students){
          if(student?.sexe! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }else{

      const facultyStudents: any = AllStudentsFaculties?.totalStudents.filter(
        (studentsList) => studentsList.facultyName === selectedFaculty
      );
      
      if(facultyStudents?.length > 0){
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
        for(const student of facultyStudents[0].students){
          if(student?.sexe! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }

    setFilteredStudents(studentsWithFaculty)

    setSelectedGender(event.target.value);
    setSelectedLevel('');
    setSelectedSubscriptionType("");
    setSelectedState('');
    setSelectedSectionBac('');
    setSelectedSessionBac('');
    setSelectedYearBac('');
  };

  const handleYearBacChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    let studentsWithFaculty: StudentWithFaculty[] = [];
    console.log('selectedFaculty',selectedFaculty)
    if (selectedFaculty === "tous") {
      for (const total_students of AllStudentsFaculties?.totalStudents!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_students.facultyName);
        for(const student of total_students.students){
          if(student?.annee_scolaire! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }else{

      const facultyStudents: any = AllStudentsFaculties?.totalStudents.filter(
        (studentsList) => studentsList.facultyName === selectedFaculty
      );
      
      if(facultyStudents?.length > 0){
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
        for(const student of facultyStudents[0].students){
          if(student?.annee_scolaire! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }

    setFilteredStudents(studentsWithFaculty)

    setSelectedYearBac(event.target.value);
    setSelectedLevel('');
    setSelectedSubscriptionType("");
    setSelectedState('');
    setSelectedGender("");
    setSelectedSectionBac('');
    setSelectedSessionBac('');
  };

  const handleSectionBacChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    let studentsWithFaculty: StudentWithFaculty[] = [];
    console.log('selectedFaculty',selectedFaculty)
    if (selectedFaculty === "tous") {
      for (const total_students of AllStudentsFaculties?.totalStudents!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_students.facultyName);
        for(const student of total_students.students){
          if(student?.filiere! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }else{

      const facultyStudents: any = AllStudentsFaculties?.totalStudents.filter(
        (studentsList) => studentsList.facultyName === selectedFaculty
      );
      
      if(facultyStudents?.length > 0){
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
        for(const student of facultyStudents[0].students){
          if(student?.filiere! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }

    setFilteredStudents(studentsWithFaculty)

    setSelectedSectionBac(event.target.value);
    setSelectedLevel('');
    setSelectedSubscriptionType("");
    setSelectedState('');
    setSelectedGender("");
    setSelectedSessionBac('');
    setSelectedYearBac('');
  };

  const handleSessionBacChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    let studentsWithFaculty: StudentWithFaculty[] = [];
    console.log('selectedFaculty',selectedFaculty)
    if (selectedFaculty === "tous") {
      for (const total_students of AllStudentsFaculties?.totalStudents!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_students.facultyName);
        for(const student of total_students.students){
          if(student?.session! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }else{

      const facultyStudents: any = AllStudentsFaculties?.totalStudents.filter(
        (studentsList) => studentsList.facultyName === selectedFaculty
      );
      
      if(facultyStudents?.length > 0){
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
        for(const student of facultyStudents[0].students){
          if(student?.session! === event.target.value){
            studentsWithFaculty.push(
              {
                student: student,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }
    }

    setFilteredStudents(studentsWithFaculty)

    setSelectedSessionBac(event.target.value);
    setSelectedLevel('');
    setSelectedSubscriptionType("");
    setSelectedState('');
    setSelectedGender("");
    setSelectedSectionBac('');
    setSelectedYearBac('');
  };

  const [modal_SendMessageModals, setmodal_SendMessageModals] =
          useState<boolean>(false);
  
      const [isActionButtons, setIsActionButtons] =
        useState<boolean>(false);
    
      function tog_SendMessageModals() {
        setmodal_SendMessageModals(!modal_SendMessageModals);
      }
  
      const [modal_SendSMSModals, setmodal_SendSMSModals] =
        useState<boolean>(false);
    
      function tog_SendSMSModals() {
        setmodal_SendSMSModals(!modal_SendSMSModals);
      }
  
      const [modal_SendEmailModals, setmodal_SendEmailModals] =
        useState<boolean>(false);
    
      function tog_SendEmailModals() {
        setmodal_SendEmailModals(!modal_SendEmailModals);
      }
  
     const checkedAll = useCallback(() => {
        const checkall = document.getElementById("checkAll") as HTMLInputElement;
        const ele = document.querySelectorAll(".studentCheckBox");
    
        if (checkall.checked) {
          ele.forEach((ele: any) => {
            ele.checked = true;
          });
        } else {
          ele.forEach((ele: any) => {
            ele.checked = false;
          });
        }
        checkedbox();
      }, []);
    
      const checkedbox = () => {
        const ele = document.querySelectorAll(".studentCheckBox:checked");
        ele.length > 0
          ? setIsActionButtons(true)
          : setIsActionButtons(false);
      };

  const columns = useMemo(
    () => {

      const baseColumns = [
        {
          Header: (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkAll"
                onClick={() => checkedAll()}
              />
            </div>
          ),
          Cell: (cellProps: any) => {
            return (
              <div className="form-check">
                <input
                  className="studentCheckBox form-check-input"
                  type="checkbox"
                  name="chk_child"
                  value={cellProps.row.original.id}
                  onChange={() => checkedbox()}
                />
              </div>
            );
          },
          id: "#",
        },
          {
            Header: "Nom et Prénom",
            accessor: (row: any) => `${row?.student?.prenom_fr!} ${row?.student?.nom_fr!}`,
            disableFilters: true,
            filterable: true,
          },
          {
            Header: "Niveau",
            accessor: (row: any) => row?.student?.groupe_classe?.niveau_classe?.name_niveau_fr! || "",
            disableFilters: true,
            filterable: true,
          },
          {
            Header: "Année Bac",
            accessor: (row: any) => row?.student?.annee_scolaire! || "",
            disableFilters: true,
            filterable: true,
          },
          {
            Header: "Section Bac",
            accessor: (row: any) => row?.student?.filiere! || "",
            disableFilters: true,
            filterable: true,
          },
          {
            Header: "Session Bac",
            accessor: (row: any) => row?.student?.session! || "",
            disableFilters: true,
            filterable: true,
          },
          {
            Header: "Tél",
            accessor: (row: any) => row?.student?.num_phone! || "",
            disableFilters: true,
            filterable: true,
          },
          {
            Header: "E-mail",
            accessor: (row: any) => row?.student?.email! || "",
            disableFilters: true,
            filterable: true,
          },
          {
            Header: "Genre",
            disableFilters: true,
            filterable: true,
            accessor: (row: any) => row?.student?.sexe! || "",
          },
          {
            Header: "Type d'inscription",
            disableFilters: true,
            filterable: true,
            accessor: (row: any) => row?.student?.type_inscription?.type_fr! || "",
          },
          {
            Header: "Gouvernorat",
            disableFilters: true,
            filterable: true,
            accessor: (row: any) => row?.student?.state! || "",
          },
      ];

      if (selectedFaculty === 'tous') {
        baseColumns.push({
          Header: "Faculté",
          disableFilters: true,
          filterable: true,
          accessor: (row: any) => row?.facultyAbreviation || "",
        },);
      }

  return baseColumns;
},
[selectedFaculty]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Etudiant"
            pageTitle="Chiffres et Statistiques "
          />
          <Row>
            <Col lg={3} md={6}>
              <p className=" fw-medium mb-2 fs-14">
                Sélectionner un établissement
              </p>
              <select
                className="form-select mt-4 mt-sm-0"
                data-choices
                data-choices-search-false
                name="choices-single-default"
                id="idStatus"
                value={selectedFaculty}
                onChange={handleFacultyChange}
              >
                <option value="tous">Tous les établissement</option>
                {AllFaculties?.map((faculty) => (
                  <option value={faculty.name_fr}>{faculty.name_fr}</option>
                ))}
              </select>
            </Col>
            <Col lg={3} md={6}>
              <p className=" fw-medium mb-2 fs-14">Filtrer par</p>
              <select
                className="form-select mt-4 mt-sm-0"
                data-choices
                data-choices-search-false
                name="choices-single-default"
                id="idStatus"
                value={selectedFilter}
                onChange={handleFilterChange}
              >
                {" "}
                <option value="">Sélectionner un filtre</option>
                <option value="cycle">Cycle</option>
                <option value="niveau">Niveau</option>
                <option value="gouvernorat">Gouvernorat</option>
                <option value="annee">Année bac</option>
                <option value="section">Section bac</option>
                <option value="session">Session bac</option>
                <option value="inscri">Type d’inscription</option>
                <option value="genre">Genre</option>
              </select>
            </Col>
            <Col lg={3} md={6}>
              {selectedFilter === "section" && (
                <>
                  <p className=" fw-medium mb-2 fs-14">Sélectionner une section</p>
                  <select
                    className="form-select mt-4 mt-sm-0"
                    data-choices
                    data-choices-search-false
                    name="choices-single-default"
                    id="idStatus"
                    value={selectedSectionBac}
                    onChange={handleSectionBacChange}
                  >
                    <option value="">Sélectionner une section</option>
                    <option value="آداب ">آداب</option>
                    <option value="رياضيات">رياضيات </option>
                    <option value="علوم تجريبية">علوم تجريبية</option>
                    <option value="اقتصاد وتصرف">اقتصاد وتصرف</option>
                    <option value="تقنية">تقنية</option>
                    <option value="علوم إعلامية">علوم إعلامية</option>
                  </select>
                </>
              )}
              {selectedFilter === "session" && (
                <>
                  <p className=" fw-medium mb-2 fs-14">Sélectionner une session</p>
                  <select
                    className="form-select mt-4 mt-sm-0"
                    data-choices
                    data-choices-search-false
                    name="choices-single-default"
                    id="idStatus"
                    value={selectedSessionBac}
                    onChange={handleSessionBacChange}
                  >
                    <option value="">Sélectionner une session</option>
                    <option value="Principale">Principale</option>
                    <option value="Controle">Controle</option>
                  </select>
                </>
              )}
              {selectedFilter === "annee" && (
                <>
                  <p className=" fw-medium mb-2 fs-14">Sélectionner une année</p>
                  <select
                    className="form-select mt-4 mt-sm-0"
                    data-choices
                    data-choices-search-false
                    name="choices-single-default"
                    id="idStatus"
                    value={selectedYearBac}
                    onChange={handleYearBacChange}
                  >
                    <option value="">Sélectionner une année</option>
                    {yearsBac?.map((year) => (
                  <option value={year}>{year}</option>
                ))}
                  </select>
                </>
              )}
              {selectedFilter === "inscri" && (
                <>
                  <p className=" fw-medium mb-2 fs-14">
                    Sélectionner un type d'inscription
                  </p>
                  <select
                    className="form-select mt-4 mt-sm-0"
                    data-choices
                    data-choices-search-false
                    name="choices-single-default"
                    id="idStatus"
                    value={selectedSubscriptionType}
                    onChange={handleSubscriptionTypeChange}
                  >
                    <option value="tous">Sélectionner un type d'inscription</option>
                    {TotalSubscriptionTypes?.map((subscriptionType) => (
                  <option value={subscriptionType.type_fr}>{subscriptionType.type_fr}</option>
                ))}
                  </select>
                </>
              )}
              {selectedFilter === "niveau" && (
                <>
                  <p className=" fw-medium mb-2 fs-14">
                    Sélectionner un niveau
                  </p>
                  <select
                    className="form-select mt-4 mt-sm-0"
                    data-choices
                    data-choices-search-false
                    name="choices-single-default"
                    id="idStatus"
                    value={selectedLevel}
                    onChange={handleSelectedLevelChange}
                  >
                    <option value="tous">Sélectionner un niveau</option>
                    {TotalLevels?.map((level) => (
                  <option value={level.name_niveau_fr}>{level.name_niveau_fr}</option>
                ))}
                  </select>
                </>
              )}
              {selectedFilter === "gouvernorat" && (
                <>
                  <p className=" fw-medium mb-2 fs-14">
                    Sélectionner un gouvernorat
                  </p>
                  <select
                    className="form-select mt-4 mt-sm-0"
                    data-choices
                    data-choices-search-false
                    name="choices-single-default"
                    id="idStatus"
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    <option value="tous">Sélectionner un gouvernorat</option>
                    {wilayaOptions?.map((state) => (
                  <option value={state}>{state}</option>
                ))}
                  </select>
                </>
              )}
              {selectedFilter === "genre" && (
                <>
                  <p className=" fw-medium mb-2 fs-14">
                    Sélectionner un genre
                  </p>
                  <select
                    className="form-select mt-4 mt-sm-0"
                    data-choices
                    data-choices-search-false
                    name="choices-single-default"
                    id="idStatus"
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    <option value="">Sélectionner un genre</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </>
              )}
            </Col>
            <Col lg={3} md={6}>
              <Card className="card-height-100 bg-success-subtle border-0 overflow-hidden">
                <div className="position-absolute end-0 start-0 top-0 z-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="400"
                    height="250"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 250"
                  >
                    <g mask='url("#SvgjsMask1608")' fill="none">
                      <path
                        d="M390 87L269 208"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M358 175L273 260"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M319 84L189 214"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M327 218L216 329"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M126 188L8 306"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M220 241L155 306"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M361 92L427 26"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M391 188L275 304"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M178 74L248 4"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M84 52L-56 192"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M183 111L247 47"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M46 8L209 -155"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                    </g>
                    <defs>
                      <mask id="SvgjsMask1608">
                        <rect width="400" height="250" fill="#ffffff"></rect>
                      </mask>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                        id="SvgjsLinearGradient1609"
                      >
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0.2)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        id="SvgjsLinearGradient1610"
                      >
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0.2)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="p-4 z-1 position-relative">
                  <h4 className="fs-22 fw-semibold mb-3">
                    <CountUp
                      start={0}
                      end={etudiantCount}
                      duration={3}
                      decimals={0}
                    />
                  </h4>
                  <p className="mb-0 fw-medium text-uppercase fs-14">
                    Nombre des étudiants
                  </p>
                  
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-3">
              <div className="d-flex gap-2 flex-wrap">
                {isActionButtons && (
                <div>
                  <Link
                  to="#"
                  className="btn btn-soft-success m-1"
                >
                  <i className="bi bi-file-earmark-spreadsheet align-bottom me-1"></i> Export Excel
                </Link>
                <Link
                  to="#"
                  className="btn btn-soft-danger m-1"
                >
                  <i className="bi bi-filetype-pdf align-bottom me-1"></i> Export PDF
                </Link>
                <Link
                to="#"
                className="btn btn-soft-info m-1"
                onClick={tog_SendMessageModals}
              >
                <i className="bi bi-send align-bottom me-1"></i> Envoyer Message
              </Link>
              <Link
                to="#"
                className="btn btn-soft-warning m-1"
                onClick={tog_SendEmailModals}
              >
                <i className="bi bi-envelope-at align-bottom me-1"></i> Envoyer Email
              </Link>
              <Link
                to="#"
                className="btn btn-soft-secondary m-1"
                onClick={tog_SendSMSModals}
              >
                <i className="bi bi-chat-left-dots align-bottom me-1"></i> Envoyer SMS
              </Link>
                </div>
              )}
            </div>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body className="p-0">
                  <div className="table-responsive mb-1 p-0">
                    <table
                      className="table align-middle table-nowrap"
                      id="customerTable"
                    >
                      <TableContainer
                        columns={columns || []}
                        data={filteredStudents}
                        // isGlobalFilter={false}
                        iscustomPageSize={false}
                        isBordered={false}
                        customPageSize={10}
                        className="custom-header-css table align-middle table-nowrap"
                        tableClass="table-centered align-middle table-nowrap mb-0"
                        theadClass="text-muted table-light"
                        SearchPlaceholder="Search Products..."
                      />
                    </table>
                    <div className="noresult" style={{ display: "none" }}>
                      <div className="text-center py-4">
                        <div className="avatar-md mx-auto mb-4">
                          <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                            <i className="bi bi-search"></i>
                          </div>
                        </div>
                        <h5 className="mt-2">Sorry! No Result Found</h5>
                        <p className="text-muted mb-0">
                          We've searched more than 150+ seller We did not find
                          any seller for you search.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* Message Modal */}
          <Modal
            className="fade"
            show={modal_SendMessageModals}
            onHide={() => {
              tog_SendMessageModals();
            }}
          >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title" id="exampleModalLabel">
            Message
          </h5>
        </Modal.Header>
        <Form className="tablelist-form">
          <Modal.Body className="p-4">
          <textarea
            className="form-control"
            id="companyAddress"
            placeholder="Taper votre message ici"
            defaultValue=""
            rows={3}
          />
          </Modal.Body>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                className="btn-ghost-danger"
                onClick={() => {
                  tog_SendMessageModals();
                }}
              >
                Fermer
              </Button>
              <Button className="btn-soft-info" id="add-btn">
                Envoyer
              </Button>
            </div>
          </div>
        </Form>
          </Modal>
          {/* SMS Modal */}
          <Modal
            className="fade"
            show={modal_SendSMSModals}
            onHide={() => {
              tog_SendSMSModals();
            }}
          >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title" id="exampleModalLabel">
            SMS
          </h5>
        </Modal.Header>
        <Form className="tablelist-form">
          <Modal.Body className="p-4">
          <textarea
            className="form-control"
            id="companyAddress"
            placeholder="Taper votre sms ici"
            defaultValue=""
            rows={3}
          />
          </Modal.Body>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                className="btn-ghost-danger"
                onClick={() => {
                  tog_SendSMSModals();
                }}
              >
                Fermer
              </Button>
              <Button className="btn-soft-secondary" id="add-btn">
                Envoyer
              </Button>
            </div>
          </div>
          </Form>
          </Modal>
          {/* EMAIL Modal */}
          <Modal
            className="fade"
            show={modal_SendEmailModals}
            onHide={() => {
              tog_SendEmailModals();
            }}
          >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title" id="exampleModalLabel">
            Email
          </h5>
        </Modal.Header>
        <Form className="tablelist-form">
          <Modal.Body className="p-4">
            <Form.Control
            className="mb-1"
              type="text"
              id="registrationNumber"
              placeholder="Objet de l'email"
              required
            />
          <textarea
            className="form-control"
            id="companyAddress"
            placeholder="Taper votre email ici"
            defaultValue=""
            rows={3}
          />
          </Modal.Body>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                className="btn-ghost-danger"
                onClick={() => {
                  tog_SendEmailModals();
                }}
              >
                Fermer
              </Button>
              <Button className="btn-soft-warning" id="add-btn">
                Envoyer
              </Button>
            </div>
          </div>
          </Form>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default StatEtudiant;
