import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Typography, Divider,Tag, Timeline, Row, Col, Space, Card, Table } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import {FuncGetAppointmentList, FuncUpdateAppointment} from '../functions/Appointment';

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
    const columns = [
        {
            title: 'First Name',
            key: 'firstName',
            render: (_, record) => (
                <label>{record?.patient?.firstName}</label>
            ),
        },
        {
            title: 'Last Name',
            key: 'lastName',
            render: (_, record) => (
                <label>{record?.patient?.firstName}</label>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render:(_, record)=>(
                <>
                    <Button type="primary" onClick={()=>{DonePatient(record.id)}}>Attended</Button>
                    <Button type="default" onClick={()=>{GoToPatientDetail(record.patient?.id)}}>Patient Detail</Button>
                </>
            )
        }
    ];
    const GoToPatientDetail = (patient_id) => {
        console.log(patient_id);
        navigate('/PatientDetails', { state: { id: patient_id} });
    }

    const DonePatient = (app_id)=>{
        FuncUpdateAppointment(app_id , null , '', 'attended').then((resp)=>{
            window.alert(resp.message);
            GetAppointmentList(state.id);
        });
    }

    return (
        <div>
            <Title level={3}>Appointment List</Title>
            <Divider></Divider>
            <div style={{ backgroundColor: '#dbdbdb', minHeight: window.innerHeight - 160, borderRadius: 10, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ width: '100%', marginTop: '5%' }}>
                    <Table columns={columns} dataSource={AppointmentList} />
                </div>
                
{/*                 
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
                                                onClick={()=>{GoToPatientDetail(x?.patient?.id)}}
                                            />
                                        </>
                                    }>
                                    <p>{x?.remark}</p>
                                </Card>
                            </Col>
                        )
                    }
                </Row> */}
            </div>

        </div>
    )
}
export default DoctorList;