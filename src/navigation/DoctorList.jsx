import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Typography, Divider, Timeline, Row, Col, Space, Card } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import {FuncGetAppointmentList} from '../functions/Appointment';

const { Title, Text } = Typography;

function DoctorList() {
    let navigate = useNavigate();
    const [AppointmentList, SetAppointmentList] = useState([]);
    const { state } = useLocation();
    useEffect(() => {
        //test to initialize the list 
        console.log(state.id);
        GetAppointmentList(state.id);
       
    }, []);

    const GetAppointmentList=(doctor_id)=>{
        FuncGetAppointmentList("", doctor_id, "", "").then((resp)=>{
            SetAppointmentList([...resp.appointmentList]);
            console.log(resp);
        })
    }

    const GoToPatientDetail = (patient_id) => {
        console.log(patient_id);
        //navigate('/PatientDetails', { state: { id: patient_id} });
    }

    const DonePatient = (patient_id)=>{
        console.log(patient_id);
    }

    return (
        <div>
            <Title level={3}>Appointment List</Title>
            <Divider></Divider>
            <div style={{ backgroundColor: '#dbdbdb', minHeight: window.innerHeight - 160, borderRadius: 10, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Row>
                    {
                        AppointmentList.map(x =>
                            <Col xs={24} xl={6} sm={24} style={{ alignContent: 'center', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Card title={x?.patient?.firstName + " " + x?.patient?.lastName} bordered={false} style={{ padding: 10 }}
                                    extra={
                                        <>
                                            <Button
                                                type='link'
                                                icon={<CloseOutlined />}
                                                onClick={()=>{DonePatient(x?.id)}}
                                            />
                                            <Button
                                                type='link'
                                                icon={<InfoCircleOutlined /> }
                                                onClick={()=>{GoToPatientDetail(x)}}
                                            />
                                        </>
                                    }>
                                    <p>{x?.remark}</p>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </div>

        </div>
    )
}
export default DoctorList;