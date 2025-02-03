import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import CustomerSatisfaction from './CustomerSatisfaction';
import NewCustomers from './NewCustomers';
import ProductDelivery from './ProductDelivery';
import StockReport from './StockReport';
import TopCategories from './TopCategories';
import TopProducts from './TopProducts';
import TopSalesLocation from './TopSalesLocation';
import Widgets from './Widgets';
import RecentOrders from './RecentOrders';
import Revenue from './Revenue';
import { SimpleDonut, SimplePie } from './Pie';
import { SplineAreaChart, StackedAreaChart } from './Area';
import { CustomDataLabel } from './Bar';
import { StackedColumn2 } from './Column';

const Dashboard = () => {

    document.title = "Dashboard | Toner eCommerce + Admin React Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xxl={12} lg={6} className="order-first">
                            <Row className="row-cols-xxl-4 row-cols-1">
                                <Widgets />
                            </Row>
                        </Col>
                        {/* <Revenue />
                        <TopSalesLocation /> */}
                    </Row>
                    <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Enseignants permanents</h4>
                            </Card.Header>

                            <Card.Body>
                                <SimplePie dataColors='["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]' />
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Enseignants non permanents </h4>
                            </Card.Header>
                            <Card.Body>
                                <SimpleDonut dataColors='["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info", "--tb-dark"]' />
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <Row>
                    <Col lg={6}>
                    <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Activités par établissement </h4>
                            </Card.Header>
                            <Card.Body>
                                <CustomDataLabel dataColors='["--tb-primary", "--tb-secondary", "--tb-success", "--tb-info", "--tb-warning", "--tb-danger", "--tb-dark", "--tb-primary", "--tb-success", "--tb-secondary"]' />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        {/* <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Repartition des étudiants par sexe</h4>
                            </Card.Header>
                            <Card.Body>
                                <StackedAreaChart dataColors='["--tb-success", "--tb-info", "--tb-light"]' />
                            </Card.Body>
                        </Card> */}
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Répartition des étudiants par sexe</h4>
                            </Card.Header>
                            {/* <Card.Body>
                                <StackedColumn2 dataColors='["--tb-primary", "--tb-success", "--tb-warning"]' />
                            </Card.Body> */}
                            <Card.Body>
                                <SplineAreaChart dataColors='["--tb-success", "--tb-secondary", "--tb-light"]' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                    {/* <Row>
                        <RecentOrders />
                    </Row>
                    <Row className='widget-responsive-fullscreen'>
                        <CustomerSatisfaction />
                        <StockReport />
                        <ProductDelivery />
                        <TopCategories />
                        <NewCustomers />
                        <TopProducts />
                    </Row> */}
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;