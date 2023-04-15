import React, { useState, useEffect } from "react";
import { Button, TimePicker, Form, Input, Typography, Divider, Timeline, Row, Col, Descriptions, Tag, Modal, Select, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../redux/reducer/UserReducer';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {FuncRegisterPatient, FuncCreateUser} from '../functions/Users';
import {GenerateAgeSelect, GetTagWording} from '../functions/CommonFunc';

const { Title, Text } = Typography;

function NewPatient() {
    const { state } = useLocation();
    const [Profile, setProfile] = useState({});
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
    }, []);

    const UpdateSpecificColumn = (column, value) => {
        Profile[column] = value;
        setProfile({ ...Profile });
    }

    const UpdateNewAppVar = (column, value) => {
        NewAppVal[column] = value;
        setNewAppVal({ ...NewAppVal });
    }

    const SubmitNewPatient=()=>{
        console.log(Profile);
        FuncCreateUser(Profile.UserName , Profile.Password, Profile.ConfirmPassword, Profile.Email).then((resp)=>{
            if(resp.success && resp.userId){
                FuncRegisterPatient(resp.userId , Profile.FirstName , Profile.LastName,
                     Profile.NRIC, Profile.Address, Profile.ContactNum, Profile.Tag, Profile.Age,
                      Profile.EmergencyContactNum, Profile.EmergencyContactName, Profile.EmergencyContactRelation).then((resp)=>{
                        window.alert("Patient Created");
                     });
            }
        }).catch((exp)=>{
            console.warn(exp);
        })
    }
    return (
        <div>
            <Title level={3}>New Patient Registration</Title>
            
            <Divider></Divider>
            <Row>
                <Col xs={24} xl={12} sm={24} style={{ border: '1px solid grey', alignContent: 'center', padding: 10 }}>
                    <Descriptions title="Login Profile">
                        <Descriptions.Item label="UserName" span={3}>
                            <Input value={Profile?.UserName} onChange={(val) => { UpdateSpecificColumn("UserName", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Password" span={3}>
                            <Input.Password value={Profile?.Password} onChange={(val) => { UpdateSpecificColumn("Password", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Confirm Password" span={3}>
                            <Input.Password value={Profile?.ConfirmPassword} onChange={(val) => { UpdateSpecificColumn("ConfirmPassword", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Email" span={3}>
                            <Input value={Profile?.Email} onChange={(val) => { UpdateSpecificColumn("Email", val.target.value) }} />
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col xs={24} xl={12} sm={24} style={{ border: '1px solid grey', alignContent: 'center', padding: 10 }}>
                    <Descriptions title="Profile" extra={<Button type="primary" onClick={SubmitNewPatient}>Save</Button>}>
                        <Descriptions.Item label="First Name" span={3}>
                            <Input value={Profile?.FirstName} onChange={(val) => { UpdateSpecificColumn("FirstName", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Last Name" span={3}>
                            <Input value={Profile?.LastName} onChange={(val) => { UpdateSpecificColumn("LastName", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="NRIC" span={3}>
                            <Input value={Profile?.NRIC} onChange={(val) => { UpdateSpecificColumn("NRIC", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Age" span={3}>
                            <Select
                                onChange={(val) => { UpdateSpecificColumn("Age", val) }}
                                options={GenerateAgeSelect()}
                                value={Profile?.Age}
                                style={{width : 100}}
                                defaultValue={10}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Contact" span={3}>
                            <Input value={Profile?.ContactNum} onChange={(val) => { UpdateSpecificColumn("ContactNum", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Tag" span={3}>
                            <Select
                                onChange={(val) => { UpdateSpecificColumn("Tag", val) }}
                                options={[
                                    { value: 'Red', label: GetTagWording('Red') },
                                    { value: 'Blue', label: GetTagWording('Blue') },
                                    { value: 'Green', label: GetTagWording('Green') }
                                ]}
                                value={Profile?.Tag}
                            />

                        </Descriptions.Item>
                        <Descriptions.Item label="Address" span={3}>
                            <Input.TextArea value={Profile?.Address} onChange={(val) => { UpdateSpecificColumn("Address", val.target.value) }} />
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Emergency Contact">
                        <Descriptions.Item label="Name" span={3}>
                            <Input value={Profile?.EmergencyContactName} onChange={(val) => { UpdateSpecificColumn("EmergencyContactName", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Contact" span={3}>
                            <Input value={Profile?.EmergencyContactNum} onChange={(val) => { UpdateSpecificColumn("EmergencyContactNum", val.target.value) }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Relationship" span={3}>
                            <Input value={Profile?.EmergencyContactRelation} onChange={(val) => { UpdateSpecificColumn("EmergencyContactRelation", val.target.value) }} />
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    )
}
export default NewPatient;