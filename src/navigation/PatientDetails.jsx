import React, { useState, useEffect } from "react";
import { Button, TimePicker, Form, Input, Typography, Divider, Timeline, Row, Col, Descriptions, Tag, Modal, Select, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../redux/reducer/UserReducer';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { GetTagWording, GenerateAgeSelect } from '../functions/CommonFunc';
import { FuncGetPatient, FuncUpdatePatient, FuncGetDoctor } from '../functions/Users';
import { FuncGetAppointmentList, FuncNewAppointment, FuncUpdateAppointment } from '../functions/Appointment';
import { FuncGetMedicines, FuncAddNewPrescription } from '../functions/Prescription';
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

function PatientDetails() {
    const { state } = useLocation();
    const user = store.getState();

    const [Profile, setProfile] = useState({});
    const [UpdateProfile, setUpdateProfile] = useState({});
    const [ShowModal, setShowModal] = useState(false);
    const [NewAppointmentModal, setNewAppModal] = useState(false);
    const [DoctorList, setDoctorList] = useState([]);
    const [AppointmentList, setAppointmentList] = useState([]);
    const [MedicineList, setMedicineList] = useState([]);
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
        GetPatientDetails(state.id);
        GetAppointmentDetails(state.id);
        GetDoctor();
        GetMedicines();
    }, []);

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

    const GetAppointmentDetails = (id) => {
        FuncGetAppointmentList(id, "", "", "").then((resp) => {
            console.log(resp.appointmentList);
            setAppointmentList([...resp.appointmentList]);
        }).catch((exp) => {
            console.warn(exp);
        });
    }

    const GetDoctor = () => {
        FuncGetDoctor().then((resp) => {
            setDoctorList([...resp.doctorList]);
        }).catch((exp) => {
            console.warn(exp);
        })
    }

    const GetPatientDetails = (id) => {
        FuncGetPatient(id, 'id').then((resp) => {
            if (resp.patientList.length != 1) {
                window.alert("User Not Found");
            } else {
                var patient = resp.patientList[0];
                const profile = {
                    Id: patient.id,
                    FirstName: patient.firstName,
                    LastName: patient.lastName,
                    Age: patient.age,
                    Address: patient.address,
                    ContactNum: patient.contactNum,
                    Tag: patient.tag,
                    Nric: patient.nric,
                    EmergencyContactNum: patient.emergencyContactNum,
                    EmergencyContactName: patient.emergencyContactName,
                    EmergencyContactRelation: patient.emergencyContactRelation
                }
                // EmergencyContactNum : e_contact,
                //EmergencyContactName : e_name,
                //EmergencyContactRelation : e_relation

                setProfile({ ...profile });
                setUpdateProfile({ ...profile });
            }
        })
    }

    const ViewAppointment = (appointment_id) => {
        setSelectedAppointment(AppointmentList.find(x => x.id === appointment_id));
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

    const UpdateDetail = () => {
        FuncUpdatePatient(UpdateProfile).then((resp) => {
            window.alert(resp.message);
            if (resp.success) {
                GetPatientDetails(UpdateProfile.Id);
                setShowModal(false);
            }
        }).catch((exp) => {
            console.warn(exp);
        })
    }

    const UpdateSpecificColumn = (column, value) => {
        UpdateProfile[column] = value;
        setUpdateProfile({ ...UpdateProfile });
    }

    const UpdateNewAppVar = (column, value) => {
        NewAppVal[column] = value;
        setNewAppVal({ ...NewAppVal });
    }

    const MakeNewApp = () => {
        var dateTimeReformatting = NewAppVal.AppDate + "T" + NewAppVal.AppTime;
        FuncNewAppointment(dateTimeReformatting, true, Profile.Id, NewAppVal.DoctorID, NewAppVal.Remark).then((resp) => {
            window.alert(resp.message);
            GetAppointmentDetails(Profile.Id);
            setNewAppModal(false);
        }).catch((exp) => {
            console.warn(exp);
        })
    }

    const GetDoctorListSelection = () => {
        var list = [];
        DoctorList.forEach(x => list.push({ value: x.id, label: x.firstName + " " + x.lastName }));
        return list;
    }

    const onDateChange = (date, dateString) => {
        NewAppVal.AppDate = dateString;
        setNewAppVal({ ...NewAppVal });
    };

    const onTimeChange = (time, timeString) => {
        NewAppVal.AppTime = timeString;
        setNewAppVal({ ...NewAppVal });
    };

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
        FuncAddNewPrescription(Profile.Id, SelectedAppointment?.doctor?.id,
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
            return (
                <>
                    <Button type="primary" onClick={UpdateAppointmentDetail}>Update Appointment Information</Button>
                    {/* <Button type="primary" onClick={() => { setNewPrescriptionModal(true) }}>Add Prescription</Button> */}
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
                        <Descriptions.Item label="Age">{Profile?.Age}</Descriptions.Item>
                        <Descriptions.Item label="NRIC">{Profile?.Nric}</Descriptions.Item>
                        <Descriptions.Item label="Tag">
                            {
                                Profile?.Tag &&
                                <Tag color={Profile?.Tag} key={Profile?.Id}>
                                    {GetTagWording(Profile?.Tag)}
                                </Tag>
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Address">
                            {Profile?.Address}
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Emergency Contact">
                        <Descriptions.Item label="Name">{Profile?.EmergencyContactName}</Descriptions.Item>
                        <Descriptions.Item label="Contact">{Profile?.EmergencyContactNum}</Descriptions.Item>
                        <Descriptions.Item label="Relationship">{Profile?.EmergencyContactRelation}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col xs={24} xl={12} sm={24} style={{ border: '1px solid grey', alignContent: 'center', padding: 10 }}>
                    {
                        user.Role != 'Pharmacist' && 
                        <Descriptions title="Histories" extra={<Button type="primary" onClick={() => { setNewAppModal(true) }}>New Appointment</Button>}></Descriptions>
                    }
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
                    </Descriptions>
                </Row>
            }
            <Modal
                title="Update Detail"
                open={ShowModal}
                onOk={UpdateDetail}
                onCancel={() => { setShowModal(false) }}
                okText="Update"
                cancelText="Cancel"
            >
                <Descriptions>
                    <Descriptions.Item label="First Name" span={3}><Input value={UpdateProfile?.FirstName} onChange={(val) => { UpdateSpecificColumn("FirstName", val.target.value) }} /></Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={3}><Input value={UpdateProfile?.LastName} onChange={(val) => { UpdateSpecificColumn("LastName", val.target.value) }} /></Descriptions.Item>
                    <Descriptions.Item label="Contact" span={3}><Input value={UpdateProfile?.ContactNum} onChange={(val) => { UpdateSpecificColumn("ContactNum", val.target.value) }} /></Descriptions.Item>
                    <Descriptions.Item label="NRIC" span={3}><Input value={UpdateProfile?.Nric} onChange={(val) => { UpdateSpecificColumn("Nric", val.target.value) }} /></Descriptions.Item>
                    <Descriptions.Item label="Age" span={3}>
                        <Select
                            onChange={(val) => { UpdateSpecificColumn("Age", val) }}
                            options={GenerateAgeSelect()}
                            value={Profile?.Age}
                            style={{ width: 100 }}
                            defaultValue={10}
                        /></Descriptions.Item>
                    <Descriptions.Item label="Tag" span={3}>
                        <Select
                            disabled={user.Role == "Patient"}
                            onChange={(val) => { UpdateSpecificColumn("Tag", val) }}
                            options={[
                                { value: 'Red', label: GetTagWording('Red') },
                                { value: 'Blue', label: GetTagWording('Blue') },
                                { value: 'Green', label: GetTagWording('Green') }
                            ]}
                            value={UpdateProfile?.Tag}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>
                        <Input.TextArea value={UpdateProfile?.Address} onChange={(val) => { UpdateSpecificColumn("Address", val.target.value) }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Emergency Contact Name" span={3}><Input value={UpdateProfile?.EmergencyContactName} onChange={(val) => { UpdateSpecificColumn("EmergencyContactName", val.target.value) }} /></Descriptions.Item>
                    <Descriptions.Item label="Emergency Contact Number" span={3}><Input value={UpdateProfile?.EmergencyContactNum} onChange={(val) => { UpdateSpecificColumn("EmergencyContactNum", val.target.value) }} /></Descriptions.Item>
                    <Descriptions.Item label="Emergency Contact Relationship" span={3}><Input value={UpdateProfile?.emergencyContactRelation} onChange={(val) => { UpdateSpecificColumn("emergencyContactRelation", val.target.value) }} /></Descriptions.Item>

                </Descriptions>

            </Modal>
            <Modal
                title="New Appointment"
                open={NewAppointmentModal}
                onOk={MakeNewApp}
                onCancel={() => { setNewAppModal(false) }}
                okText="Book"
                cancelText="Cancel"
            >
                <Descriptions>
                    <Descriptions.Item label="Date" span={3}>
                        <DatePicker onChange={onDateChange} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Time" span={3}>
                        <TimePicker onChange={onTimeChange} defaultValue={dayjs('00:00:00', 'HH:mm:ss')} />

                    </Descriptions.Item>
                    <Descriptions.Item label="Doctor" span={3}>
                        <Select
                            style={{ minWidth: 150 }}
                            onChange={(val) => { UpdateNewAppVar("DoctorID", val) }}
                            options={GetDoctorListSelection()}
                            value={NewAppVal?.DoctorID}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Remark" span={3}>
                        <Input.TextArea value={NewAppVal?.Remark} onChange={(val) => { UpdateNewAppVar("Remark", val.target.value) }} />
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
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
export default PatientDetails;