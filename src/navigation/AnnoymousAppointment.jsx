import React, { useState, useEffect } from "react";
import { Button, TimePicker, Form, Input, Typography, Divider, Timeline, Row, Col, Descriptions, Tag, Modal, Select, DatePicker } from 'antd';
import { FuncNewNonPatientAppointment } from '../functions/Appointment';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import {FuncGetAppointmentList} from '../functions/Appointment';
import { FuncGetPatient, FuncUpdatePatient, FuncGetDoctor } from '../functions/Users';
import dayjs from 'dayjs';
const { Title, Text } = Typography;

function AnnoymousAppointment() {
    let navigate = useNavigate();
    const [DoctorList, setDoctorList] = useState([]);
    const [NewAppVal, setNewAppVal] = useState({
        AppDate: '',
        AppTime: '',
        DoctorID: '',
        Remark: ''
    });
    useEffect(() => {
        //id
        GetDoctor();
    }, []);

    const onDateChange = (date, dateString) => {
        NewAppVal.AppDate = dateString;
        setNewAppVal({ ...NewAppVal });
    };

    const UpdateNewAppVar = (column, value) => {
        NewAppVal[column] = value;
        setNewAppVal({ ...NewAppVal });
    }
    const GetDoctorListSelection = () => {
        var list = [];
        DoctorList.forEach(x => list.push({ value: x.id, label: x.firstName + " " + x.lastName }));
        return list;
    }

    const onTimeChange = (time, timeString) => {
        NewAppVal.AppTime = timeString;
        setNewAppVal({ ...NewAppVal });
    };

    const GetDoctor = () => {
        FuncGetDoctor().then((resp) => {
            setDoctorList([...resp.doctorList]);
        }).catch((exp) => {
            console.warn(exp);
        })
    }
    const MakeApp=()=>{
        var dateTimeReformatting = NewAppVal.AppDate + "T" + NewAppVal.AppTime;
        NewAppVal.AppointmentDateTime = dateTimeReformatting;
        FuncNewNonPatientAppointment(NewAppVal).then((resp) => {
            window.alert(resp.message);
            navigate('/Login');
        }).catch((exp) => {
            console.warn(exp);
        })
    }
   return (
    <div>
        <Title level={3}>Make Appointment</Title>
        <Row>
        <Col span={4}>
            </Col>
            <Col span={16} style={{alignContent:'center'}}>
            <Descriptions style={{width: '80%' , alignSelf:'center'}}>
                    <Descriptions.Item label="Date" span={3}>
                        <DatePicker onChange={onDateChange}  disabledDate={d => !d || d.isBefore(new Date())}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="Time" span={3}>
                        <TimePicker onChange={onTimeChange} showSecond={false} showMinute={false}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="Doctor" span={3}>
                        <Select
                            style={{ minWidth: 150 }}
                            onChange={(val) => { UpdateNewAppVar("DoctorID", val) }}
                            options={GetDoctorListSelection()}
                            value={NewAppVal?.DoctorID}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="First Name" span={3}>
                        <Input value={NewAppVal?.FirstName} onChange={(val) => { UpdateNewAppVar("FirstName", val.target.value) }}></Input>
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={3}>
                        <Input value={NewAppVal?.LastName} onChange={(val) => { UpdateNewAppVar("LastName", val.target.value) }}></Input>
                    </Descriptions.Item>
                    <Descriptions.Item label="NRIC" span={3}>
                        <Input value={NewAppVal?.Nric} onChange={(val) => { UpdateNewAppVar("Nric", val.target.value) }}></Input>
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact Number" span={3}>
                        <Input value={NewAppVal?.Contact} onChange={(val) => { UpdateNewAppVar("Contact", val.target.value) }}></Input>
                    </Descriptions.Item>
                    <Descriptions.Item label="Remark" span={3}>
                        <Input.TextArea value={NewAppVal?.Remark} onChange={(val) => { UpdateNewAppVar("Remark", val.target.value) }} />
                    </Descriptions.Item>
                </Descriptions>
                <Button type="primary" onClick={() => { MakeApp()}}>Submit</Button>
                </Col>
                <Col span={4}>
            </Col>
        </Row>
    </div>
   );
}

export default AnnoymousAppointment;