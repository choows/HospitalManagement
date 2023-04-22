import React, { useState, useEffect } from "react";
import { Button, TimePicker, Form, Input, Typography, Divider, Timeline, Row, Col, Descriptions, Tag, Modal, Select, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../redux/reducer/UserReducer';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { FuncRegisterPatient, FuncCreateUser } from '../functions/Users';
import { GenerateAgeSelect, GetTagWording } from '../functions/CommonFunc';

const { Title, Text } = Typography;

function Register() {
    const { state } = useLocation();
    const [Profile, setProfile] = useState({
        Tag: 'Blue',
        Gender: 'Male'
    });
    const [UpdateProfile, setUpdateProfile] = useState([]);
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
    useEffect(() => {
        //get id from state 
        // var patient_id = state.id;
    }, []);

    const UpdateSpecificColumn = (column, value) => {
        Profile[column] = value;
        setProfile({ ...Profile });
    }

    const UpdateNewAppVar = (column, value) => {
        NewAppVal[column] = value;
        setNewAppVal({ ...NewAppVal });
    }

    const SubmitNewPatient = () => {
        console.log(Profile);
        FuncCreateUser(Profile.UserName, Profile.Password, Profile.ConfirmPassword, Profile.Email).then((resp) => {
            if (resp.success && resp.userId) {
                FuncRegisterPatient(resp.userId, Profile.FirstName, Profile.LastName,
                    Profile.NRIC, Profile.Address, Profile.ContactNum, Profile.Tag, Profile.Age, Profile.Gender,
                    Profile.EmergencyContactNum, Profile.EmergencyContactName, Profile.emergencyContactRelation).then((resp) => {
                        window.alert("Patient Created");
                    });
            }
        }).catch((exp) => {
            console.warn(exp);
        })
    }
    return (
        <div>
            <Title level={3}>New User Registration</Title>
            <Divider></Divider>
            <Row>
                <Col xs={0} xl={4} sm={0}></Col>
                <Col xs={24} xl={16} sm={24}>
                    <Descriptions extra={<Button type="primary" onClick={SubmitNewPatient}>Register</Button>}>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="UserName" span={3}>
                            <Input value={Profile?.UserName} onChange={(val) => { UpdateSpecificColumn("UserName", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="Password" span={3}>
                            <Input.Password value={Profile?.Password} onChange={(val) => { UpdateSpecificColumn("Password", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="Confirm Password" span={3}>
                            <Input.Password value={Profile?.ConfirmPassword} onChange={(val) => { UpdateSpecificColumn("ConfirmPassword", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="Email" span={3}>
                            <Input value={Profile?.Email} onChange={(val) => { UpdateSpecificColumn("Email", val.target.value) }} />
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="First Name" span={3}>
                            <Input value={Profile?.FirstName} onChange={(val) => { UpdateSpecificColumn("FirstName", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="Last Name" span={3}>
                            <Input value={Profile?.LastName} onChange={(val) => { UpdateSpecificColumn("LastName", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="NRIC" span={3}>
                            <Input value={Profile?.NRIC} onChange={(val) => { UpdateSpecificColumn("NRIC", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="Age" span={3}>
                            <Select
                                onChange={(val) => { UpdateSpecificColumn("Age", val) }}
                                options={GenerateAgeSelect()}
                                value={Profile?.Age}
                                style={{ width: 100 }}
                                defaultValue={10}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="Contact" span={3}>
                            <Input value={Profile?.ContactNum} onChange={(val) => { UpdateSpecificColumn("ContactNum", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="Tag" span={3}>
                            <Select
                                disabled
                                onChange={(val) => { UpdateSpecificColumn("Tag", val) }}
                                options={[
                                    { value: 'Red', label: GetTagWording('Red') },
                                    { value: 'Blue', label: GetTagWording('Blue') },
                                    { value: 'Green', label: GetTagWording('Green') }
                                ]}
                                value={Profile?.Tag}
                            />

                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="Gender" span={3}>
                            <Select
                                onChange={(val) => { UpdateSpecificColumn("Gender", val) }}
                                options={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' }
                                ]}
                                value={Profile?.Gender}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '15%' }} label="Address" span={3}>
                            <Input.TextArea value={Profile?.Address} onChange={(val) => { UpdateSpecificColumn("Address", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Emergency Contact Name" labelStyle={{ width: '15%' }} span={3}><Input value={Profile?.EmergencyContactName} onChange={(val) => { UpdateSpecificColumn("EmergencyContactName", val.target.value) }} /></Descriptions.Item>
                        <Descriptions.Item label="Emergency Contact Number" labelStyle={{ width: '15%' }} span={3}><Input value={Profile?.EmergencyContactNum} onChange={(val) => { UpdateSpecificColumn("EmergencyContactNum", val.target.value) }} /></Descriptions.Item>
                        <Descriptions.Item label="Emergency Contact Relationship" labelStyle={{ width: '15%' }} span={3}><Input value={Profile?.emergencyContactRelation} onChange={(val) => { UpdateSpecificColumn("emergencyContactRelation", val.target.value) }} /></Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col xs={0} xl={4} sm={0}></Col>
            </Row>
        </div>
    )
}
export default Register;