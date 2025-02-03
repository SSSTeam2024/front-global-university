import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Modal, Row, Form } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import CountUp from "react-countup";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";

import { useFetchAllFacultiesQuery } from "features/faculties/faculties";
import {
  FacultiesEnseignant,
  Teacher,
  useFetchFacultiesEnseignantOfAllFacultiesQuery,
} from "features/facultyEnseignant/facultyEnseignant";
import { useFetchTeacherRanksOfAllFacultiesQuery } from "features/teacherRank/teacherRankSlice";
import { TeacherSpecialty, useFetchTeacherSpecialtiesOfAllFacultiesQuery } from "features/teacherSpecialty/teacherSpecialtySlice";

interface TeacherWithFaculty{
  teacher: Teacher;
  facultyAbreviation: String;
}

const StatEnseignant = () => {
  document.title = "Liste des enseignants | UGAF";

  const { data: AllFaculties } = useFetchAllFacultiesQuery();
  // console.log("AllFaculties", AllFaculties);

  const { data: TotalGrade } = useFetchTeacherRanksOfAllFacultiesQuery();
  // console.log("TotalGrade", TotalGrade);
  
  const { data: TotalSpecialties,  isSuccess: TotalSpecialtiesLoaded, } = useFetchTeacherSpecialtiesOfAllFacultiesQuery();
  // console.log("TotalSpecialties", TotalSpecialties);

  const {
    data: AllEnseignantsFaculties,
    isSuccess: AllEnseignantsFacultiesLoaded,
  } = useFetchFacultiesEnseignantOfAllFacultiesQuery();
  // console.log("AllEnseignantsFaculties", AllEnseignantsFaculties);


  const [selectedFaculty, setSelectedFaculty] = useState<string>("tous");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [filteredSpecialties, setFilteredSpecialties] = useState<TeacherSpecialty[]>([]);
  const [enseignantCount, setEnseignantCount] = useState(0);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherWithFaculty[]>([]);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === e.target.value);

    if (e.target.value !== "tous") {
      let teachersData: any = AllEnseignantsFaculties?.totalEnseignants.filter(
        (teachersList) => teachersList.facultyName === e.target.value
      );

      let teachers: TeacherWithFaculty[] = [];
      for (const teacher of teachersData[0].enseignants) {
        teachers.push(
          {
            teacher: teacher,
            facultyAbreviation: factultyAbreviation[0].abreviation
          }
        )
      }
      setFilteredTeachers(teachers)
      setEnseignantCount(teachersData[0].enseignantsNumber);
    } else {
      let teachersWithFaculty: TeacherWithFaculty[] = [];
      for (const total_teachers of AllEnseignantsFaculties?.totalEnseignants!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_teachers.facultyName);
        // console.log(total_teachers)
        for(const teacher of total_teachers.enseignants){
          teachersWithFaculty.push(
            {
              teacher: teacher,
              facultyAbreviation: factultyAbreviation[0].abreviation
            }
          )
        }
      }
      setFilteredTeachers(teachersWithFaculty)
      setEnseignantCount(AllEnseignantsFaculties?.totalEnseignantsNumber!);
    }
    setSelectedFaculty(e.target.value);
    setSelectedFilter('');
    setSelectedGrade('');
  };

  const processData = (teachersData: FacultiesEnseignant, specialties: TeacherSpecialty[]) => {
    let teachers: Teacher[] = [];
    let teachersWithFaculty: TeacherWithFaculty[] = [];

    for (const total_teachers of teachersData.totalEnseignants) {
      teachers = teachers.concat(total_teachers.enseignants);
      const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_teachers.facultyName);
      // console.log(total_teachers)
      for(const teacher of total_teachers.enseignants){
        teachersWithFaculty.push(
          {
            teacher: teacher,
            facultyAbreviation: factultyAbreviation[0].abreviation
          }
        )
      }
    }

    // console.log(teachersWithFaculty)
    setFilteredTeachers(teachersWithFaculty);
    setAllTeachers(teachers)
    setFilteredSpecialties(specialties)
  };

  useEffect(() => {
    if (AllEnseignantsFacultiesLoaded && TotalSpecialtiesLoaded && !hasProcessed) {
      setEnseignantCount(AllEnseignantsFaculties.totalEnseignantsNumber);

      processData(AllEnseignantsFaculties, TotalSpecialties);

      setHasProcessed(true);
    }
  }, [AllEnseignantsFacultiesLoaded,TotalSpecialtiesLoaded, hasProcessed]);


  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  
    setSelectedFilter(event.target.value);
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    let teachersWithFaculty: TeacherWithFaculty[] = [];

    // console.log('selectedFaculty',selectedFaculty)
    if (selectedFaculty === "tous") {
      for (const total_teachers of AllEnseignantsFaculties?.totalEnseignants!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_teachers.facultyName);
        for(const teacher of total_teachers.enseignants){
          if(teacher?.grade?.grade_fr! === event.target.value){
            teachersWithFaculty.push(
              {
                teacher: teacher,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }

    }else{
      const facultyTeachers: any = AllEnseignantsFaculties?.totalEnseignants.filter(
        (teachersList) => teachersList.facultyName === selectedFaculty
      );
      // console.log(facultyTeachers)
      if(facultyTeachers?.length > 0){
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
        for(const teacher of facultyTeachers[0].enseignants){
          if(teacher?.grade?.grade_fr! === event.target.value){
            teachersWithFaculty.push(
              {
                teacher: teacher,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      
      }
    }

    setFilteredTeachers(teachersWithFaculty)

    setSelectedGrade(event.target.value);
    setSelectedSpecialty('');
  };

  const handleSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  
    let teachersWithFaculty: TeacherWithFaculty[] = [];
    // console.log('selectedFaculty',selectedFaculty)
    if (selectedFaculty === "tous") {
  
      for (const total_teachers of AllEnseignantsFaculties?.totalEnseignants!) {
        const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === total_teachers.facultyName);
        for(const teacher of total_teachers.enseignants){
          if(teacher?.specilaite?.specialite_fr! === event.target.value){
            teachersWithFaculty.push(
              {
                teacher: teacher,
                facultyAbreviation: factultyAbreviation[0].abreviation
              }
            )
          }
        }
      }

    }else{
      const facultyTeachers: any = AllEnseignantsFaculties?.totalEnseignants.filter(
        (teachersList) => teachersList.facultyName === selectedFaculty
      );
      const factultyAbreviation: any = AllFaculties?.filter(f => f.name_fr === selectedFaculty);
      for(const teacher of facultyTeachers[0].enseignants){
        if(teacher?.specilaite?.specialite_fr! === event.target.value){
          teachersWithFaculty.push(
            {
              teacher: teacher,
              facultyAbreviation: factultyAbreviation[0].abreviation
            }
          )
        }
      }
      
      }
    
    setFilteredTeachers(teachersWithFaculty)

    setSelectedSpecialty(event.target.value);
    setSelectedGrade('');
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
    const ele = document.querySelectorAll(".teacherCheckBox");

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
    const ele = document.querySelectorAll(".teacherCheckBox:checked");
    ele.length > 0
      ? setIsActionButtons(true)
      : setIsActionButtons(false);
  };

  const columns = useMemo(() => {
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
                className="teacherCheckBox form-check-input"
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
        accessor: (row: any) => `${row.teacher.prenom_fr} ${row.teacher.nom_fr}`,
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Spécialité",
        accessor: (row: any) => row?.teacher.specilaite?.specialite_fr || "",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Poste",
        accessor: (row: any) => row?.teacher.poste?.poste_fr || "",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Département",
        accessor: (row: any) => row?.teacher.departements?.name_fr || "",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Grade",
        accessor: (row: any) => row?.teacher.grade?.grade_fr! || "",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Tél",
        accessor: (row: any) => row?.teacher.num_phone1,
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "E-mail",
        accessor: (row: any) => row?.teacher.email,
        disableFilters: true,
        filterable: true,
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Enseignants"
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
                <option value="grade">Grade</option>
                <option value="specialite">Spécialité </option>
                <option value="vacataires">Vacataires</option>
                <option value="contractuels_docteur ">
                  Contractuels docteur{" "}
                </option>
                <option value="experts">Experts</option>
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
                   
                    {TotalGrade?.map((grade) => (
                  <option value={grade.grade_fr}>{grade.grade_fr}</option>
                ))}
                  </select>
                </>
              )}
              {selectedFilter === "specialite" && (
                <>
                  <p className=" fw-medium mb-2 fs-14">
                    Sélectionner une spécialité
                  </p>
                  <select
                    className="form-select mt-4 mt-sm-0"
                    data-choices
                    data-choices-search-false
                    name="choices-single-default"
                    id="idStatus"
                    value={selectedSpecialty}
                    onChange={handleSpecialtyChange}
                  >
                    <option value="tous">Sélectionner une spécialité</option>
                    {filteredSpecialties?.map((specialty) => (
                  <option value={specialty.specialite_fr}>{specialty.specialite_fr}</option>
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
                      end={enseignantCount}
                      duration={3}
                      decimals={0}
                    />
                  </h4>
                  <p className="mb-0 fw-medium text-uppercase fs-14">
                    Nombre des enseignants
                  </p>
                  <p className="mb-0 fw-medium  fs-10">
                    {selectedFaculty}
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
                        data={filteredTeachers}
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

export default StatEnseignant;
