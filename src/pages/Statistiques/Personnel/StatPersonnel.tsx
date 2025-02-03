import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import CountUp from "react-countup";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";

import { useFetchAllFacultiesQuery } from "features/faculties/faculties";

import { TeacherSpecialty, useFetchTeacherSpecialtiesOfAllFacultiesQuery } from "features/teacherSpecialty/teacherSpecialtySlice";
import { FacultiesPersonnel, Personnel, useFetchPersonnelsOfAllFacultiesQuery } from "features/facultyPersonnel/facultyPersonnel";
import { useFetchPersonnelCategoriesOfAllFacultiesQuery } from "features/personnelCategory/personnelCategorySlice";
import { useFetchPersonnelRanksOfAllFacultiesQuery } from "features/personnelRank/personnelRankSlice";
import { useFetchPersonnelPostsOfAllFacultiesQuery } from "features/personnelPost/personnelPostSlice";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

interface PersonnelWithFaculty{
  personnel: Personnel;
  facultyAbreviation: String;
}

const StatPersonnel = () => {
  document.title = "Liste des personnels | UGAF";

  const { data: AllFaculties } = useFetchAllFacultiesQuery();
  console.log("AllFaculties", AllFaculties);

  const { data: TotalCategories } = useFetchPersonnelCategoriesOfAllFacultiesQuery();
  console.log("TotalCategories", TotalCategories);
  
  const { data: TotalRanks } = useFetchPersonnelRanksOfAllFacultiesQuery();
  console.log("TotalRanks", TotalRanks);

  const { data: TotalPosts} = useFetchPersonnelPostsOfAllFacultiesQuery();
  console.log("TotalPosts", TotalPosts);

  const {
    data: AllPersonnelsFaculties,
    isSuccess: AllPersonnelsFacultiesLoaded,
  } = useFetchPersonnelsOfAllFacultiesQuery();
  console.log("AllPersonnelsFaculties", AllPersonnelsFaculties);

  const [selectedFaculty, setSelectedFaculty] = useState<string>("tous");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPoste, setSelectedPoste] = useState<string>("");
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [filteredSpecialties, setFilteredSpecialties] = useState<TeacherSpecialty[]>([]);
  const [personnelCount, setPersonnelCount] = useState(0);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [filteredPersonnels, setFilteredPersonnels] = useState<PersonnelWithFaculty[]>([]);
  const [allPersonnels, setAllPersonnels] = useState<Personnel[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");


 const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === e.target.value);
 
     if (e.target.value !== "tous") {
       let personnelsData: any = AllPersonnelsFaculties?.totalPersonnels.filter(
         (personnelsList) => personnelsList.facultyName === e.target.value
       );
 
       let personnels: PersonnelWithFaculty[] = [];
       for (const personnel of personnelsData[0].personnels) {
        personnels.push(
           {
            personnel: personnel,
             facultyAbreviation: factultyAbreviation[0].abreviation
           }
         )
       }
       setFilteredPersonnels(personnels)
       setPersonnelCount(personnelsData[0].personnelsNumber);
     } else {
       let personnelsWithFaculty: PersonnelWithFaculty[] = [];
       for (const total_personnels of AllPersonnelsFaculties?.totalPersonnels!) {
         const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_personnels.facultyName);
         // console.log(total_teachers)
         for(const personnel of total_personnels.personnels){
          personnelsWithFaculty.push(
             {
              personnel: personnel,
               facultyAbreviation: factultyAbreviation[0].abreviation
             }
           )
         }
       }
       setFilteredPersonnels(personnelsWithFaculty)
       setPersonnelCount(AllPersonnelsFaculties?.totalPersonnelsNumber!);
     }
     setSelectedFaculty(e.target.value);
     setSelectedFilter('');
     setSelectedGrade('');
   };
 

  const processData = (personnelsData: FacultiesPersonnel) => {
    let personnels: Personnel[] = [];
    let personnelsWithFaculty: PersonnelWithFaculty[] = [];
    for (const total_personnels of personnelsData.totalPersonnels) {
      personnels = personnels.concat(total_personnels.personnels);
      const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_personnels.facultyName);
      // console.log(total_teachers)
      for(const personnel of total_personnels.personnels){
        personnelsWithFaculty.push(
          {
            personnel: personnel,
            facultyAbreviation: factultyAbreviation[0].abreviation
          }
        )
      }
    }

    setFilteredPersonnels(personnelsWithFaculty);
    setAllPersonnels(personnels)
   
  };

  useEffect(() => {
    if (AllPersonnelsFacultiesLoaded && !hasProcessed) {
      setPersonnelCount(AllPersonnelsFaculties.totalPersonnelsNumber);

      processData(AllPersonnelsFaculties);

      setHasProcessed(true);
    }
  }, [AllPersonnelsFacultiesLoaded, hasProcessed]);

 const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  
    setSelectedFilter(event.target.value);
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  
      let personnelsWithFaculty: PersonnelWithFaculty[] = [];
  
      // console.log('selectedFaculty',selectedFaculty)
      if (selectedFaculty === "tous") {
        for (const total_personnels of AllPersonnelsFaculties?.totalPersonnels!) {
          const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_personnels.facultyName);
          for(const personnel of total_personnels.personnels){
            if(personnel?.grade?.grade_fr! === event.target.value){
              personnelsWithFaculty.push(
                {
                  personnel: personnel,
                  facultyAbreviation: factultyAbreviation[0].abreviation
                }
              )
            }
          }
        }
  
      }else{
        const facultyPersonnels: any = AllPersonnelsFaculties?.totalPersonnels.filter(
          (personnelsList) => personnelsList.facultyName === selectedFaculty
        );
        // console.log(facultyTeachers)
        if(facultyPersonnels?.length > 0){
          const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
          for(const personnel of facultyPersonnels[0].personnels){
            if(personnel?.grade?.grade_fr! === event.target.value){
              personnelsWithFaculty.push(
                {
                  personnel: personnel,
                  facultyAbreviation: factultyAbreviation[0].abreviation
                }
              )
            }
          }
        
        }
      }
  
      setFilteredPersonnels(personnelsWithFaculty)
  
      setSelectedGrade(event.target.value);
      // setSelectedSpecialty('');
    };


    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  
      let personnelsWithFaculty: PersonnelWithFaculty[] = [];
  
      // console.log('selectedFaculty',selectedFaculty)
      if (selectedFaculty === "tous") {
        for (const total_personnels of AllPersonnelsFaculties?.totalPersonnels!) {
          const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_personnels.facultyName);
          for(const personnel of total_personnels.personnels){
            if(personnel?.categorie?.categorie_fr! === event.target.value){
              personnelsWithFaculty.push(
                {
                  personnel: personnel,
                  facultyAbreviation: factultyAbreviation[0].abreviation
                }
              )
            }
          }
        }
  
      }else{
        const facultyPersonnels: any = AllPersonnelsFaculties?.totalPersonnels.filter(
          (personnelsList) => personnelsList.facultyName === selectedFaculty
        );
        // console.log(facultyTeachers)
        if(facultyPersonnels?.length > 0){
          const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
          for(const personnel of facultyPersonnels[0].personnels){
            if(personnel?.categorie?.categorie_fr! === event.target.value){
              personnelsWithFaculty.push(
                {
                  personnel: personnel,
                  facultyAbreviation: factultyAbreviation[0].abreviation
                }
              )
            }
          }
        
        }
      }
  
      setFilteredPersonnels(personnelsWithFaculty)
  
      setSelectedCategory(event.target.value);
      // setSelectedSpecialty('');
    };
    const handlePosteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  
      let personnelsWithFaculty: PersonnelWithFaculty[] = [];
  
      // console.log('selectedFaculty',selectedFaculty)
      if (selectedFaculty === "tous") {
        for (const total_personnels of AllPersonnelsFaculties?.totalPersonnels!) {
          const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_personnels.facultyName);
          for(const personnel of total_personnels.personnels){
            if(personnel?.poste?.poste_fr! === event.target.value){
              personnelsWithFaculty.push(
                {
                  personnel: personnel,
                  facultyAbreviation: factultyAbreviation[0].abreviation
                }
              )
            }
          }
        }
  
      }else{
        const facultyPersonnels: any = AllPersonnelsFaculties?.totalPersonnels.filter(
          (personnelsList) => personnelsList.facultyName === selectedFaculty
        );
        // console.log(facultyTeachers)
        if(facultyPersonnels?.length > 0){
          const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
          for(const personnel of facultyPersonnels[0].personnels){
            if(personnel?.poste?.poste_fr! === event.target.value){
              personnelsWithFaculty.push(
                {
                  personnel: personnel,
                  facultyAbreviation: factultyAbreviation[0].abreviation
                }
              )
            }
          }
        
        }
      }
  
      setFilteredPersonnels(personnelsWithFaculty)
  
      setSelectedPoste(event.target.value);
      // setSelectedSpecialty('');
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
      const ele = document.querySelectorAll(".personnelCheckBox");
  
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
      const ele = document.querySelectorAll(".personnelCheckBox:checked");
      ele.length > 0
        ? setIsActionButtons(true)
        : setIsActionButtons(false);
    };


  const columns = useMemo(() =>{
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
                className="personnelCheckBox form-check-input"
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
        accessor: (row: any) => `${row?.personnel.prenom_fr!} ${row?.personnel.nom_fr!}`,
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Poste",
        accessor: (row: any) => row?.personnel.poste?.poste_fr! || "",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Grade",
        accessor: (row: any) => row?.personnel.grade?.grade_fr! || "",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Catégorie",
        accessor: (row: any) => row?.personnel.categorie?.categorie_fr! || "",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Tél",
        accessor: (row: any) => row?.personnel.num_phone1 || "",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "E-mail",
        accessor: (row: any) => row?.personnel.email || "",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Gouvernorat",
        disableFilters: true,
        filterable: true,
        accessor: (row: any) => row?.personnel.state! || "",
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
   }, [selectedFaculty]);


  //  const exportToExcel = (data: any[], fileName: string) => {
  //   // Convert the data to a worksheet
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  
  //   // Create a new workbook and append the worksheet
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
  //   // Write the workbook and generate a buffer
  //   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
  //   // Convert the buffer to a Blob and trigger the download
  //   const excelBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  //   saveAs(excelBlob, `${fileName}.xlsx`);
  // };
  

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Personnels"
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
                            <option value="categorie">Catégorie</option>
                            <option value="grade">Grade</option>
                            <option value="poste">poste</option>
                           
                          </select>
                        </Col>
                        <Col lg={3} md={6}>
                          {selectedFilter === "grade" && (
                            <>
                              <p className=" fw-medium mb-2 fs-14">Sélectionner un grade</p>
                              <select
                                className="form-select mt-4 mt-sm-0"
                                data-choices
                                data-choices-search-false
                                name="choices-single-default"
                                id="idStatus"
                                value={selectedGrade}
                                onChange={handleGradeChange}
                              >
                                <option value="">Sélectionner un grade</option>
                               
                                {TotalRanks?.map((grade) => (
                              <option value={grade.grade_fr}>{grade.grade_fr}</option>
                            ))}
                              </select>
                            </>
                          )}
                          {selectedFilter === "categorie" && (
                            <>
                              <p className=" fw-medium mb-2 fs-14">
                                Sélectionner une catégories
                              </p>
                              <select
                                className="form-select mt-4 mt-sm-0"
                                data-choices
                                data-choices-search-false
                                name="choices-single-default"
                                id="idStatus"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                              >
                                <option value="tous">Sélectionner une spécialité</option>
                                {TotalCategories?.map((category) => (
                              <option value={category.categorie_fr}>{category.categorie_fr}</option>
                            ))}
                              </select>
                              
                            </>
                          )}
                          {selectedFilter === "poste" && (
                            <>
                              <p className=" fw-medium mb-2 fs-14">
                                Sélectionner un poste
                              </p>
                              <select
                                className="form-select mt-4 mt-sm-0"
                                data-choices
                                data-choices-search-false
                                name="choices-single-default"
                                id="idStatus"
                                value={selectedPoste}
                                onChange={handlePosteChange}
                              >
                                <option value="tous">Sélectionner un poste</option>
                                {TotalPosts?.map((poste) => (
                              <option value={poste.poste_fr}>{poste.poste_fr}</option>
                            ))}
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
                      end={personnelCount}
                      duration={3}
                      decimals={0}
                    />
                  </h4>
                  <p className="mb-0 fw-medium text-uppercase fs-14">
                    Nombre des personnels
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
                        data={filteredPersonnels}
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

export default StatPersonnel;
