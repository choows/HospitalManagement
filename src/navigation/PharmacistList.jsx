import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Typography, Divider, Timeline,InputNumber , Row, Col, Space, Card, Modal,Descriptions  } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { FuncGetPrescriptions, FuncNewMedicine, FuncPrescriptionIsCollected } from '../functions/Prescription';
const { Title, Text } = Typography;

function PharmacistList() {
    const [PrescriptionList, setPrescriptionList] = useState([]);
    const [ShowModal , setShowModal] = useState(false);
    const [NewMedicine, setNewMedicine] = useState({});
    useEffect(() => {
        GetPrescriptionLists();
    }, []);

    const UpdateSpecificColumn=(column, value)=>{
        NewMedicine[column] = value;
        setNewMedicine({ ...NewMedicine });
    }

    const GetPrescriptionLists=()=>{
        FuncGetPrescriptions("", "").then((resp)=>{
            var list = [];
            resp.histories.forEach(hist => {
                var Medicine_list = [];
                hist.medicine.forEach(med => {
                    Medicine_list.push({
                        name : med.name,
                        dose : med.dose.toString() + "mg"
                    });
                });

                list.push(
                    {
                        id : hist.id,
                        PatientName: hist.patient.firstName + " " + hist.patient.lastName,
                        NRIC : hist.patient.nric,
                        Medicine : Medicine_list
                    }
                );
            });
            setPrescriptionList(list);
        })
    }
    const InsertNewMedicine=()=>{
        console.log(NewMedicine)
        setShowModal(false);
        FuncNewMedicine(NewMedicine.Name, NewMedicine.Dose)
    }
    const DoseGiven = (id) => {
        console.log("Update Prescription Status");
        PrescriptionList.splice(PrescriptionList.indexOf(x => x.id === id), 1);
        setPrescriptionList([...PrescriptionList]);
        FuncPrescriptionIsCollected(id).then((resp)=>{
            window.alert(resp.message);
        });
    }

    return (
        <div>
            <Title level={3}>Prescription List</Title>
            <Divider></Divider>
            <div style={{width:'100%', alignItems:'flex-end', alignContent:'end' , justifyContent:'center'}}>
                <Button type="primary" onClick={()=>{setShowModal(true)}} style={{alignSelf:'end',marginBottom:'1%', marginLeft:'90%'}}>+</Button>
            </div>
            <div style={{ backgroundColor: '#dbdbdb', minHeight: window.innerHeight - 160, borderRadius: 10, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        PrescriptionList.map(x =>
                            <Col key={x.id} xs={24} xl={6} sm={24} style={{ alignContent: 'center', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Card title={x.PatientName} bordered={false} style={{ padding: 10 }}
                                    extra={
                                        <Button
                                            type='link'
                                            icon={<CloseOutlined />}
                                            onClick={() => { DoseGiven(x.id) }}
                                        />}>
                                            <p><b>{x.NRIC}</b></p>
                                    {x.Medicine.map(med =>
                                        <p>{med.name + "( " + med.dose + ")"}</p>
                                    )}
                                    
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </div>
            <Modal
                title="New Medicine"
                open={ShowModal}
                onOk={InsertNewMedicine}
                onCancel={() => { setShowModal(false) }}
                okText="Update"
                cancelText="Cancel"
            >
                <Descriptions>
                    <Descriptions.Item label="Name" span={3}><Input value={NewMedicine?.Name} onChange={(val) => { UpdateSpecificColumn("Name", val.target.value) }} /></Descriptions.Item>
                    <Descriptions.Item label="Dose" span={3}><InputNumber min={1} max={50} value={NewMedicine?.Dose} onChange={(val) => { UpdateSpecificColumn("Dose", val) }} /></Descriptions.Item>
                </Descriptions>
            </Modal>
        </div>
    )
}
export default PharmacistList;