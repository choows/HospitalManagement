import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Checkbox, Form, Input, Typography, Divider, Modal, InputNumber, Timeline, Row, Col, Descriptions, Select, Space, Table, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import { FuncGetPatient } from '../functions/Users';
import { GetTagWording } from '../functions/CommonFunc';
import { FuncGetMedicines, FuncUpdateMedicine, FuncNewMedicine } from '../functions/Prescription';

const { Title, Text } = Typography;
const { Option } = Select;
function MedicineManagement() {
    let navigate = useNavigate();
    const [MedicineList, setMedicineList] = useState([]);
    const [ShowModal, setShowModal] = useState(false);
    const [ShowNewModel, setShowNewModel] = useState(false);
    const [UpdateMedicine, setUpdateMedicine] = useState({});
    const [NewMedicine, setNewMedicine] = useState({});
    useEffect(() => {
        GetMedicines();
    }, []);
    const GetMedicines = () => {
        FuncGetMedicines().then((resp) => {
            if (resp.success) {
                setMedicineList(resp.list);
            }
        });
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Dose',
            dataIndex: 'dose',
            key: 'dose',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { UpdateAMedicine(record) }}>Update</a>
                </Space>
            ),
        },
    ];
    const UpdateAMedicine = (medicine) => {
        setUpdateMedicine(medicine);
        setShowModal(true);
    }
    const UpdateMedicineFunction = () => {
        FuncUpdateMedicine(UpdateMedicine.id, UpdateMedicine.name, UpdateMedicine.dose).then((resp) => {
            if (resp.success) {
                window.alert("Update Success");
                setShowModal(false);
                GetMedicines();
            }
        });
    }
    const UpdateSpecificColumn = (column, value) => {
        UpdateMedicine[column] = value;

        setUpdateMedicine({ ...UpdateMedicine });
        console.log(UpdateMedicine);
    }

    const UpdateNewSpecificColumn = (column, value) => {
        NewMedicine[column] = value;
        setNewMedicine({ ...NewMedicine });
    }

    const InsertNewMedicine = () => {
        console.log(NewMedicine)
        setShowModal(false);
        FuncNewMedicine(NewMedicine.Name, NewMedicine.Dose).then((resp) => {
            if(resp.success){
                window.alert(resp.message);
                setNewMedicine({});
                GetMedicines();
                setShowNewModel(false);
            }
           
        });
    }
    return (
        <div>
            <Title level={3}>Medicine Management</Title>
            <Divider></Divider>
            <Row>
                <Col xs={12} xl={3} sm={12} style={{ alignContent: 'flex-start', padding: 10 }}>
                    <Button type="primary" onClick={() => { setShowNewModel(true) }} style={{ alignSelf: 'flex-start' }}>New</Button>
                </Col>
            </Row>

            {MedicineList.length > 0 &&
                <div style={{ width: '100%', marginTop: '5%' }}>
                    <Table columns={columns} dataSource={MedicineList} />
                </div>
            }
            <Modal
                title="Update Medicine"
                open={ShowModal}
                onOk={UpdateMedicineFunction}
                onCancel={() => { setShowModal(false) }}
                okText="Update"
                cancelText="Cancel"
            >
                <Descriptions>
                    <Descriptions.Item label="Name" span={3}><Input value={UpdateMedicine?.name} onChange={(val) => { UpdateSpecificColumn("name", val.target.value) }} /></Descriptions.Item>
                    <Descriptions.Item label="Dose" span={3}><InputNumber min={1} max={50000} value={parseInt(UpdateMedicine?.dose)} onChange={(val) => { UpdateSpecificColumn("dose", val) }} /></Descriptions.Item>
                </Descriptions>
            </Modal>
            <Modal
                title="New Medicine"
                open={ShowNewModel}
                onOk={InsertNewMedicine}
                onCancel={() => { setShowNewModel(false) }}
                okText="Add"
                cancelText="Cancel"
            >
                <Descriptions>
                    <Descriptions.Item label="Name" span={3}><Input value={NewMedicine?.Name} onChange={(val) => { UpdateNewSpecificColumn("Name", val.target.value) }} /></Descriptions.Item>
                    <Descriptions.Item label="Dose" span={3}><InputNumber min={1} max={50000} value={NewMedicine?.Dose} onChange={(val) => { UpdateNewSpecificColumn("Dose", val) }} /></Descriptions.Item>
                </Descriptions>
            </Modal>
        </div>
    )
}

export default MedicineManagement;