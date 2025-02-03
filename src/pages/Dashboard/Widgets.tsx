import { useFetchAllFacultiesQuery } from "features/faculties/faculties";
import {
  useFetchEnseignantsByFacultyIdQuery,
  useFetchFacultiesEnseignantOfAllFacultiesQuery,
} from "features/facultyEnseignant/facultyEnseignant";
import { useFetchFacultyEtudiantOfAllFacultiesQuery } from "features/facultyEtudiant/facultyEtudiant";
import React from "react";
import { Card, Col } from "react-bootstrap";
import CountUp from "react-countup";

interface WidgetsProps {
  id: number;
  name: string;
  amount: number;
  decimal?: number;
  icon: string;
  iconColor: string;
}
const Widgets = () => {
  const { data: AllEnseignantsFaculties } =
    useFetchFacultiesEnseignantOfAllFacultiesQuery();
  console.log("AllEnseignantsFaculties", AllEnseignantsFaculties);
  const { data: AllFaculties } = useFetchAllFacultiesQuery();
  console.log("AllFaculties", AllFaculties);
  const { data: AllEtudiantsFaculties } =
    useFetchFacultyEtudiantOfAllFacultiesQuery();
  console.log("AllEtudiantsFaculties", AllEtudiantsFaculties);
  const widgetsData: Array<WidgetsProps> = [
    {
      id: 1,
      name: "Nombres Total Des Facultés",
      amount: AllFaculties?.length || 0,
      icon: "ph ph-building-apartment",
      iconColor: "danger",
    },
    {
      id: 2,
      name: "Nombres Total Des Enseignants",
      amount: AllEnseignantsFaculties?.totalEnseignantsNumber || 0,
      icon: "ph ph-chalkboard-teacher",
      iconColor: "info",
    },
    {
      id: 3,
      name: "Nombres Total Des Etudiants",
      amount: AllEtudiantsFaculties?.totalStudentsNumber|| 0,
      icon: "ph ph-graduation-cap",
      iconColor: "warning",
    },
    {
      id: 4,
      name: "Nombres Total Des Personnels",
      amount: 15,
      icon: "ph ph-users-three",
      iconColor: "primary",
    },
  ];

  return (
    <React.Fragment>
      {(widgetsData || []).map((item: any, key: number) => (
        <Col key={key}>
          <Card className="card-animate">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div
                  className={"vr rounded bg-" + item.iconColor + " opacity-50"}
                  style={{ width: "4px" }}
                ></div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted fs-14 text-truncate">
                    {item.name}
                  </p>
                  <h4 className="fs-22 fw-semibold mb-3">
                    {item.decimal ? "$" : ""}
                    <span className="counter-value" data-target="98851.35">
                      <CountUp
                        start={0}
                        end={item.amount}
                        separator=","
                        decimals={item.decimal && 2}
                      />
                    </span>
                  </h4>
                  <div className="d-flex align-items-center gap-2">
                    <h5
                      className={
                        "mb-0 badge bg-" +
                        item.badgeColor +
                        "-subtle text-" +
                        item.badgeColor
                      }
                    >
                      <i
                        className={
                          item.badgeColor === "success"
                            ? "ri-arrow-right-up-line align-bottom"
                            : "ri-arrow-right-down-line align-bottom"
                        }
                      ></i>{" "}
                      {item.perstange} %
                    </h5>
                    {/* <p className="text-muted mb-0">than last week</p> */}
                  </div>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span
                    className={
                      "avatar-title bg-" +
                      item.iconColor +
                      "-subtle text-" +
                      item.iconColor +
                      " rounded fs-3"
                    }
                  >
                    <i className={item.icon}></i>
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default Widgets;
