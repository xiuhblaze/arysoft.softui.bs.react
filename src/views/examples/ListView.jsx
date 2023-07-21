import { Button, Card, Col, Row, Table } from 'react-bootstrap';

import DashboardLayout from '../../layouts/dashboard/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons';

const headStyle = 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7';

const dataList = [
  {
    id: 1,
    estatus: 1,
    nombreCompleto: 'Adrián Castillo',
    email: 'adrian.castillo@ciudadguzman.gob.mx',
    area: 'Tecnologías de la Información',
    puesto: 'Encargado de Gobierno Electrónico',
    fechaIngreso: '01/03/2001',
  },
  {
    id: 2,
    estatus: 2,
    nombreCompleto: 'Cecilia Barajas',
    email: 'cecilia.barajas@ciudadguzman.gob.mx',
    area: 'Tecnologías de la Información',
    puesto: 'Programador Analista',
    fechaIngreso: '01/01/0001',
  },
  {
    id: 3,
    estatus: 1,
    nombreCompleto: 'Rodolfo Figueroa',
    email: 'rodolfo.figueroa@ciudadguzman.gob.mx',
    area: 'Tecnologías de la Información',
    puesto: 'Jefe Operativo',
    fechaIngreso: '01/01/2008',
  },
  {
    id: 4,
    estatus: 1,
    nombreCompleto: 'Ofelia Larios',
    email: 'ofelia.larios@ciudadguzman.gob.mx',
    area: 'Tecnologías de la Información',
    puesto: 'Jefe Administrativo',
    fechaIngreso: '01/01/1990',
  },
];

export const ListView = () => {
  return (
    <DashboardLayout>
      <Row>
        <Col xs="12">
          <Card className="mb-4">
            <Card.Header className="pb-0">
              <h6>List view con bootstrap components</h6>
            </Card.Header>
            <Card.Body className="px-0 pt-0 pb-2">
              <Table responsive className="align-items-center mb-0">
                <thead>
                  <tr>
                    <th className={ headStyle }>Empleado</th>
                    <th className={ headStyle }>Departamento</th>
                    <th className={ `text-center ${ headStyle }` }>Ingreso</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <div className="icon icon-sm icon-shape bg-gradient-info border-radius-md d-flex align-items-center justify-content-center me-3">
                            <FontAwesomeIcon icon={ faUser } size="lg" className="opacity-10 text-white" aria-hidden="true" />
                          </div>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">Adrián Castillo</h6>
                          <p className="text-xs text-secondary mb-0">
                            adrian.castillo@ciudadguzman.gob.mx
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">Tecnologías de la Información</p>
                      <p className="text-xs text-secondary mb-0">Encargado de Gobierno Electrónico</p>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">01/03/2021</span>
                    </td>
                    <td><FontAwesomeIcon icon={ faEdit } /></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <div className="icon icon-sm icon-shape bg-gradient-info border-radius-md d-flex align-items-center justify-content-center me-3">
                            <FontAwesomeIcon icon={ faUser } size="lg" className="opacity-10 text-white" aria-hidden="true" />
                          </div>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">Adrián Castillo</h6>
                          <p className="text-xs text-secondary mb-0">
                            adrian.castillo@ciudadguzman.gob.mx
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">Tecnologías de la Información</p>
                      <p className="text-xs text-secondary mb-0">Encargado de Gobierno Electrónico</p>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">01/03/2021</span>
                    </td>
                    <td><FontAwesomeIcon icon={ faEdit } /></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <div className="icon icon-sm icon-shape bg-gradient-info border-radius-md d-flex align-items-center justify-content-center me-3">
                            <FontAwesomeIcon icon={ faUser } size="lg" className="opacity-10 text-white" aria-hidden="true" />
                          </div>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">Adrián Castillo</h6>
                          <p className="text-xs text-secondary mb-0">
                            adrian.castillo@ciudadguzman.gob.mx
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">Tecnologías de la Información</p>
                      <p className="text-xs text-secondary mb-0">Encargado de Gobierno Electrónico</p>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">01/03/2021</span>
                    </td>
                    <td><FontAwesomeIcon icon={ faEdit } /></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12">
          <Card className="mb-4">
            <Card.Header className="pb-0">
              <h6>List view con html</h6>
            </Card.Header>
            <Card.Body className="px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className={ headStyle }>Empleado</th>
                      <th className={ headStyle }>Departamento</th>
                      <th className={ `text-center ${ headStyle }` }>Ingreso</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataList.map(item => {
                        const iconStyle = `icon icon-sm icon-shape ${ item.estatus === 1 ? 'bg-gradient-info' : 'bg-gradient-warning' } border-radius-md d-flex align-items-center justify-content-center me-3`;

                        return (
                        <tr key={ item.id }>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div>
                                <div className={ iconStyle }>
                                  <FontAwesomeIcon icon={ faUser } size="lg" className="opacity-10 text-white" aria-hidden="true" />
                                </div>
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{ item.nombreCompleto }</h6>
                                <p className="text-xs text-secondary mb-0">
                                  { item.email }
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold mb-0">{ item.area }</p>
                            <p className="text-xs text-secondary mb-0">{ item.puesto }</p>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">01/03/2021</span>
                          </td>
                          <td>
                            <a href="#" onClick={ () => alert(`Editar a: ${ item.id }`) }>
                              <FontAwesomeIcon icon={ faEdit } />
                            </a>
                          </td>
                        </tr>
                      )})
                    }
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  )
}

export default ListView;