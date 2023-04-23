import React, { useState, useEffect } from "react";
import { Button, TimePicker, Form, Input, Typography, Divider, Timeline,List, Row, Col, Descriptions, Tag, Modal, Select, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../redux/reducer/UserReducer';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { GetTagWording, GenerateAgeSelect } from '../functions/CommonFunc';
import { FuncGetPatient, FuncUpdatePatient, FuncGetDoctor } from '../functions/Users';
import { FuncGetAppointmentList, FuncNewAppointment, FuncUpdateAppointment, FuncGetNonPatientAppointment } from '../functions/Appointment';
import { FuncGetMedicines, FuncAddNewNonPatientPrescription, FuncGetPrescriptionsByAppointment } from '../functions/Prescription';
import { store } from '../redux/store';

const { Title, Text } = Typography;

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={'blue'}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3,
            }}
        >
            {label}
        </Tag>
    );
};

function NonPatientDetails() {
    const { state } = useLocation();
    const user = store.getState();

    const [Profile, setProfile] = useState({});
    const [UpdateProfile, setUpdateProfile] = useState({});
    const [ShowModal, setShowModal] = useState(false);
    const [NewAppointmentModal, setNewAppModal] = useState(false);
    const [DoctorList, setDoctorList] = useState([]);
    const [AppointmentList, setAppointmentList] = useState([]);
    const [MedicineList, setMedicineList] = useState([]);
    const [SelectedPrescription , setSelectedPrescription] = useState([]);
    const [NewAppVal, setNewAppVal] = useState({
        AppDate: '',
        AppTime: '',
        DoctorID: '',
        Remark: ''
    });
    const [NewPrescriptionModal, setNewPrescriptionModal] = useState(false);
    const [PrescriptionDetail, setPrescriptionDetail] = useState({});

    const [SelectedAppointment, setSelectedAppointment] = useState(null);
    useEffect(() => {
        //id
        GetDetails(state.id);
        // GetPatientDetails(state.id);
        // GetAppointmentDetails(state.id);
        GetMedicines();
    }, []);

    const GetDetails =(app_id)=>{
        FuncGetNonPatientAppointment(app_id).then((resp)=>{
            console.log("Get Detail Resp");
            console.log(resp);
            var d = resp.details[0].patient;

            const profile = {
                FirstName: d.firstName,
                LastName: d.lastName,
                ContactNum: d.contactNum,
                Nric: d.nric
            }
            setProfile({ ...profile });
            setAppointmentList([...resp.details]);
        });
    }

    const GetMedicines = () => {
        FuncGetMedicines().then((resp) => {
            console.log(resp);
            var list = [];
            resp.list.forEach(med => list.push({
                name: med.name + "(" + med.dose + "mg)",
                dose: med.dose,
                value: med.id,
                label: med.name + "(" + med.dose + "mg)"
            }));
            setMedicineList([...list]);
        })
    }

    const ViewAppointment = (appointment_id) => {
        setSelectedAppointment(AppointmentList.find(x => x.id === appointment_id));
        FuncGetPrescriptionsByAppointment(appointment_id).then((resp) => {
            setSelectedPrescription(resp.details);
        }).catch((exp) => {
            console.warn(exp);
        });

    }

    const GetAppointmentList = () => {
        var list = [];
        AppointmentList.map(x => {
            let d = x.appointmentDateTime.replace("T", " ");
            list.push({
                label: d,
                children: <Text onClick={() => { ViewAppointment(x.id) }}>{'Appointment ' + x.status + " with doctor" + x.doctor?.firstName + " " + x.doctor?.lastName}</Text>,
            })
        });
        return list;
    }

    const UpdateAppStatus = (newStatus) => {
        SelectedAppointment.status = newStatus;
        setSelectedAppointment({ ...SelectedAppointment });
    }

    const UpdateAppRemark = (newRemark) => {
        SelectedAppointment.remark = newRemark;
        setSelectedAppointment({ ...SelectedAppointment });
    }
    const UpdatePrescriptionRemark = (val) => {
        PrescriptionDetail.Remark = val;
        setPrescriptionDetail({ ...PrescriptionDetail });
    }
    const UpdatePrescriptionMedicine = (val) => {
        PrescriptionDetail.Medicine = val;
        setPrescriptionDetail({ ...PrescriptionDetail });
    }
    const SubmitNewPrescription = () => {
        FuncAddNewNonPatientPrescription(SelectedAppointment?.doctor?.id,
            PrescriptionDetail.Remark, SelectedAppointment.id, PrescriptionDetail.Medicine).then((resp) => {
                window.alert(resp.message);
                setNewPrescriptionModal(false);
            }).catch((exp) => {
                console.warn(exp);
            })
    }
    const UpdateAppointmentDetail = () => {
        FuncUpdateAppointment(SelectedAppointment.id, SelectedAppointment.appointmentDateTime,
            SelectedAppointment.remark, SelectedAppointment.status).then((resp) => {
                console.log(resp);
                window.alert(resp.message);
            }).catch((exp) => {
                console.warn(exp);
            })
    }

    const CancelAppointment = () => {
        UpdateAppStatus('Cancelled');
        UpdateAppointmentDetail();
    }

    const GetAppointmentButton = () => {
        if (user.Role == 'Patient') {
            return (
                <>
                    <Button onClick={CancelAppointment} danger>Cancel Appointment</Button></>
            )
        } else {
            return null;
            return (
                <>
                    <Button type="primary" onClick={UpdateAppointmentDetail}>Update Appointment Information</Button>
                    <Button type="primary" onClick={() => { setNewPrescriptionModal(true) }}>Add Prescription</Button>
                </>
            )
        }

    }
    return (
        <div>
            <Title level={3}>{Profile?.FirstName + " " + Profile?.LastName}</Title>
            <Divider></Divider>
            <Row>
                <Col xs={24} xl={12} sm={24} style={{ border: '1px solid grey', alignContent: 'center', padding: 10 }}>
                    <Descriptions title="Profile" extra={ user.Role == 'Patient' && <Button type="primary" onClick={() => { setShowModal(true) }}>Update</Button>}>
                        <Descriptions.Item label="First Name">{Profile?.FirstName}</Descriptions.Item>
                        <Descriptions.Item label="Last Name">{Profile?.LastName}</Descriptions.Item>
                        <Descriptions.Item label="Contact">{Profile?.ContactNum}</Descriptions.Item>
                        <Descriptions.Item label="NRIC">{Profile?.Nric}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col xs={24} xl={12} sm={24} style={{ border: '1px solid grey', alignContent: 'center', padding: 10 }}>
                    <Timeline style={{ textAlign: 'start', alignSelf: 'center' }} mode={"left"}
                        items={GetAppointmentList()}
                    />
                </Col>
            </Row>
            {
                SelectedAppointment != null &&
                <Row style={{ marginTop: 20 }}>
                    <Descriptions title="Appointment Details"
                        extra={GetAppointmentButton()}>
                        <Descriptions.Item label="Doctor In charge">{SelectedAppointment?.doctor?.firstName + " " + SelectedAppointment?.doctor?.lastName}</Descriptions.Item>
                        <Descriptions.Item label="Date Time">{SelectedAppointment?.appointmentDateTime.replace("T", " ")}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Select
                                style={{ minWidth: 150 }}
                                onChange={(val) => { UpdateAppStatus(val) }}
                                options={[
                                    {
                                        value: 'booked',
                                        label: 'Booked'
                                    },
                                    {
                                        value: 'cancelled',
                                        label: 'Cancelled'
                                    },
                                    {
                                        value: 'attended',
                                        label: 'Attended'
                                    }
                                ]}
                                value={SelectedAppointment?.status} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Remark">
                            <Input.TextArea value={SelectedAppointment?.remark} onChange={(val) => { UpdateAppRemark(val.target.value) }} />
                        </Descriptions.Item>
                        {
                            SelectedPrescription.length > 0 && 
                            <Descriptions.Item label="Prescription">
                                <List
                                dataSource={SelectedPrescription[0].medicine}
                                renderItem={(item) => (
                                    <List.Item>
                                      {item.name} ({item.dose} mg)
                                    </List.Item>
                                  )}
                                >
                                </List>
                               
                                
                            </Descriptions.Item>
                        }
                    </Descriptions>
                </Row>
            }
            <Modal
                title="New Prescription"
                open={NewPrescriptionModal}
                onOk={SubmitNewPrescription}
                onCancel={() => { setNewPrescriptionModal(false) }}
                okText="Confirm"
                cancelText="Cancel"
            >
                <Descriptions>
                    <Descriptions.Item label="Remark" span={3}>
                        <Input.TextArea value={PrescriptionDetail?.Remark} onChange={(val) => { UpdatePrescriptionRemark(val.target.value) }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Medicine" span={3}>
                        <Select
                            mode="multiple"
                            showArrow
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                            }}
                            onChange={UpdatePrescriptionMedicine}
                            options={MedicineList}
                        />
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </div>
    )
}
export default NonPatientDetails;