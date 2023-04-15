import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Checkbox, Form, Input, Typography, Divider, Timeline, Row, Col, Descriptions, Select, Space, Table, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import { FuncGetPatient } from '../functions/Users';
import { GetTagWording } from '../functions/CommonFunc';

const { Title, Text } = Typography;
const { Option } = Select;
function PatientList() {
    let navigate = useNavigate();
    const [value, setValue] = useState('');
    const [type, setType] = useState('name');
    const [PatientList, setPatientList] = useState([]);
    useEffect(() => {
       // setValue('A');
        Search('A');
    }, []);
    const onCurrencyChange = (newType) => {
        setType(newType);
    };

    const Search = (val) => {
        if (val == '') {
            window.alert("Value Required for Search");
            return;
        }
        FuncGetPatient(value, type).then((resp) => {
            (resp.patientList).forEach(element => {
                element.key = element.id
            });
            setPatientList(resp.patientList);
        }).catch((exp) => {
            console.warn(exp);
        })

    }
    const GoToDetail = (patient_id) => {
        navigate('/PatientDetails', { state: { id: patient_id } });
    }

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'NRIC',
            dataIndex: 'nric',
            key: 'nric',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tag',
            key: 'tag',
            dataIndex: 'tag',
            render: (tag) => (
                <Tag color={tag} key={tag}>
                    {GetTagWording(tag)}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { GoToDetail(record.id) }}>View Detail</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
            Id: '123'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
            Id: '123'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
            Id: '123'
        },
    ];
    return (
        <div>
            <Title level={3}>Search Patient</Title>
            <Divider></Divider>
            <div style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Input
                    type="text"
                    value={value}
                    style={{
                        width: '40%',
                    }}
                    onChange={(val) => { setValue(val.target.value) }}
                />
                <Select
                    value={type}
                    style={{
                        margin: '0 8px'
                    }}
                    onChange={onCurrencyChange}
                >
                    <Option value="name">Name</Option>
                    <Option value="nric">NRIC</Option>
                </Select>
                <Button type="primary" onClick={()=>{Search(value)}}>Search</Button>
            </div>
            {PatientList.length > 0 &&
                <div style={{ width: '100%', marginTop: '5%' }}>
                    <Table columns={columns} dataSource={PatientList} />
                </div>
            }

        </div>
    )
}

export default PatientList;