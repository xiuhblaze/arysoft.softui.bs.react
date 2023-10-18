import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setNavbarTitle, useArysoftUIController } from "../../context/context";
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import enums from "../../helpers/enums";
import { useOrganizationsStore } from "../../hooks/useOrganizationsStore";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { ViewLoading } from "../../components/Loaders";
import Status from "./components/Status";
import { Form, Formik } from "formik";
import { AryFormikTextInput } from "../../components/Forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble, faSave, faTrashCan, faUserGear, faUserPen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import statusProps from "./helpers/StatusProps";

import bgHead from '../../assets/img/bgTrianglesBW.jpg';
import { Button } from "react-bootstrap";

const EditView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [controller, dispatch] = useArysoftUIController();
  const { OrganizationStatusType } = enums();
  const {
    isOrganizationLoading,
    isOrganizationSaving,
    organizationSavedOk,
    isOrganizationDeleting,
    organizationDeletedOk,
    organization,
    organizationsErrorMessage,

    organizationAsync,
    organizationSaveAsync,
    organizationDeleteAsync,
    organizationClear,
  } = useOrganizationsStore();
  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  // HOOKS

  useEffect(() => {
    if (!!id) organizationAsync(id);
  }, [id]);
  
  useEffect(() => {
    if (!!organization) {
      setNavbarTitle(dispatch, organization.Name);
    }
  }, [organization]);

  useEffect(() => {
    if (organizationSavedOk) {
      Swal.fire('Organization', 'The changes were made successfully', 'success');
      organizationClear();
      navigate('/organizations/');
    }
  }, [organizationSavedOk]);
  
  useEffect(() => {
    if (organizationDeletedOk) {
      Swal.fire('Organization', 'Record deleted successfully', 'success');
      organizationClear();
      navigate('/organizations/');
    }
  }, [organizationDeletedOk]);
  
  useEffect(() => {
    if (!!organizationsErrorMessage) {
      Swal.fire('Organization', organizationsErrorMessage, 'error');
    }
  }, [organizationsErrorMessage]);
  
  // METHODS

  const onFormSubmit = (values) => {
    console.log(values);

    const itemToSave = {
      OrganizationID: organization.OrganizationID,
      Name: values.nameInput,
      LegalEntity: values.legalEntityInput,
      LogoFile: '',
      Website: values.websiteInput,
      Phone: values.phoneInput,
      Status: organization.Status,
    };

    organizationSaveAsync(itemToSave);
  };

  const onCancelButton = () => {
    organizationClear();
    navigate('/organizations/');
  }

  const onDeleteButton = () => {

    Swal.fire({
      title: 'Organizations',
      text: 'This action will remove the registry. Do you wish to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then( resp => {
      if (resp.value) {
        organizationDeleteAsync(organization.OrganizationID);
      } 
    });
  };

  return (
    <Container fluid className="py-4 px-0 px-sm-4">
      <Row>
        <Col xs={12}>
          <Card>
            {
              isOrganizationLoading ? (
                <Card.Body>
                  <ViewLoading />
                </Card.Body>
              ) : !!organization ? (
                <>
                  <Card.Body>
                    <div 
                      className="page-header min-height-100 border-radius-lg"
                      style={{
                        backgroundImage: `url(${ bgHead })`,
                        backgroundPositionY: '50%'
                      }}
                    >
                      <span className={ `mask bg-gradient-${ statusProps[organization.Status].bgColor } opacity-6` }></span>
                    </div>
                    <div className="card card-body blur shadow-blur mx-4 mt-n5 overflow-hidden">
                      <div className="row gx-4">
                        <div className="col-auto">
                          <div className="avatar avatar-xl position-relative">
                            <img src="/files/organizations/lgoArysoft2019.png" alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                          </div>
                        </div>
                        <div className="col-auto my-auto">
                          <div className="h-100">
                            <h5 className="mb-1">
                              { organization.Name }
                            </h5>
                            <p className="mb-0 font-weight-bold text-sm">
                              { organization.LegalEntity }
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3 text-end">
                          <Status value={ organization.Status } />
                        </div>
                      </div>
                    </div>
                    <Formik
                      initialValues={{
                        nameInput: organization?.Name || '',
                        legalEntityInput: organization?.LegalEntity || '',
                        websiteInput: organization?.Website || '',
                        phoneInput: organization?.Phone || '',
                      }}
                      onSubmit={ onFormSubmit }
                      validationSchema={ Yup.object({
                        nameInput: Yup.string()
                          .required('Name is required')
                          .max(250, 'Name must be at most 250 characters'),
                        legalEntityInput: Yup.string()
                          .required('Legal entity is required')
                          .max(250, 'Legal entity must be at most 250 characters'),
                        websiteInput: Yup.string()
                          .max(250, 'Web site must be at most 250 characters'),
                        phoneInput: Yup.string()
                          .max(25, 'Phone number must be at most 25 characters')
                          .matches(phoneRegExp, 'Phone number is not valid')
                      })}
                    >
                      { (formik) => (
                        <Form>
                          <Row>
                            <Col xs={12} sm={8}>
                              <Row>
                                <Col xs={12}>
                                  <AryFormikTextInput name="nameInput"
                                    label="Name"
                                    type="text"
                                  />
                                </Col>
                                <Col xs={12}>
                                  <AryFormikTextInput name="legalEntityInput"
                                    label="Legal entity"
                                    type="text"
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col xs={12} sm={4}>
                              <Row>
                                <Col xs={12}>
                                  <AryFormikTextInput name="websiteInput"
                                    label="Website"
                                    type="text"
                                  />
                                </Col>
                                <Col xs={12}>
                                  <AryFormikTextInput name="phoneInput"
                                    label="Phone"
                                    type="text"
                                  />
                                </Col>
                              </Row>                         
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12}>
                              {/* <div className="form-check form-switch mb-0">
                                <input id="activeCheck" name="activeCheck"
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={ formik.handleChange }
                                  checked={ formik.values.activeCheck }
                                />
                                <label className="form-check-label" htmlFor="activaCheck">Is active</label>
                              </div> */}
                              <span className="text-secondary">(aquí van las opciones de cambio de status)</span>
                              <hr className="horizontal dark my-3" />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} className="d-flex gap-2">
                              <Button type="button" variant="success" className="bg-gradient-success">
                                <FontAwesomeIcon icon={ faCheck } size="lg" className="me-1" />
                                Approve
                              </Button>
                              <Button type="button" className="bg-gradient-info">
                                <FontAwesomeIcon icon={ faCheckDouble } size="lg" className="me-1" />
                                Active
                              </Button>
                              <button type="button" 
                                className="btn bg-gradient-secondary"
                                onClick={ onDeleteButton }
                                disabled={ isOrganizationDeleting }
                              >
                                <FontAwesomeIcon icon={ faTrashCan } size="lg" className="me-1" />
                                Delete
                              </button>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="d-flex flex-column flex-sm-row justify-content-between">
                              <div className="d-flex align-items-center">
                                <p className="text-xs mb-sm-0">
                                  <strong>Last updated: </strong> { new Date(organization.Updated).toLocaleDateString() }<br />
                                  <strong>By: </strong> { organization.UpdatedUser }
                                </p>
                              </div>
                              <div className="d-flex justify-content-center justify-content-sm-between gap-2">
                                <button type="button" className="btn btn-outline-secondary mb-0" onClick={ onCancelButton }>
                                  Cancel
                                </button>
                                <button type="submit" 
                                  className="btn bg-gradient-dark mb-0"
                                  disabled={ isOrganizationSaving }
                                >
                                  <FontAwesomeIcon icon={ faSave } size="lg" className="me-1" />
                                  Save
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </Card.Body>
                </>
              ) : null
            }
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} sm={4}>
          <Card className="h-100">
            <Card.Header className="pb-0 p-3">
              <div className="d-flex justify-content-between">
                <h6 className="mb-0">Contacts</h6>
                <a href="#" onClick={ () => console.log('Add Contact') }>
                  <FontAwesomeIcon icon={ faUserPlus } />
                </a>
              </div>
            </Card.Header>
            <Card.Body className="p-3">
              <ListGroup>
                <ListGroup.Item className="border-0 d-flex justify-content-between align-items-center px-0 mb-2">
                  <div className="d-flex align-items-center me-2">
                    <div className="avatar me-3">
                      <img className="border-radius-lg shadow" src="/files/contacts/contact (4).jpg" />
                    </div>
                    <div className="d-flex align-items-start flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">Anne Marie</h6>
                      <p className="mb-0 text-xs">
                        <a href="mailto:anne@organization.com">anne@organization.com</a><br />
                        <a href="tel:3410000000">341 000 0000 ext 000</a>
                      </p>
                    </div>
                  </div>
                  <div>
                    <a href="#" onClick={ () => { console.log('Edit contact') }} title="Edit contact">
                      <FontAwesomeIcon icon={ faUserPen } />
                    </a>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 d-flex justify-content-between align-items-center px-0 mb-2">
                  <div className="d-flex align-items-center me-2">
                    <div className="avatar me-3">
                      <img className="border-radius-lg shadow" src="/files/contacts/contact (1).jpg" />
                    </div>
                    <div className="d-flex align-items-start flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">Peter Norton</h6>
                      <p className="mb-0 text-xs">
                        <a href="mailto:anne@organization.com">peter@organization.com</a><br />
                        <a href="tel:3410000000">341 000 0000 ext 000</a>
                      </p>
                    </div>
                  </div>
                  <div>
                    <a href="#" onClick={ () => { console.log('Edit contact') }} title="Edit contact">
                      <FontAwesomeIcon icon={ faUserPen } />
                    </a>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 d-flex justify-content-between align-items-center px-0 mb-2 opacity-6">
                  <div className="d-flex align-items-center me-2">
                    <div className="avatar me-3">
                      <img className="border-radius-lg shadow" src="/files/contacts/contact (2).jpg" />
                    </div>
                    <div className="d-flex align-items-start flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">Grace Old Contact</h6>
                      <p className="mb-0 text-xs">
                        <a href="mailto:anne@organization.com">grace@organization.com</a><br />
                        <a href="tel:3410000000">341 000 0000 ext 000</a>
                      </p>
                    </div>
                  </div>
                  <div>
                    <a href="#" onClick={ () => { console.log('Edit contact') }} title="Edit contact">
                      <FontAwesomeIcon icon={ faUserGear } />
                    </a>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4}>
          <Card className="h-100">
            <Card.Header className="pb-0 p-3">
              <h6 className="mb-0">Sites</h6>
            </Card.Header>
            <Card.Body className="p-3">
              Lorem ipsum
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4}>
          <Card className="h-100">
            <Card.Header className="pb-0 p-3">
              <h6 className="mb-0">Certificates</h6>
            </Card.Header>
            <Card.Body className="p-3">
              Lorem ipsum
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default EditView;