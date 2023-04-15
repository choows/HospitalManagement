import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Typography, Divider, Row, Col, Card, Space, Modal, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { FuncCreateUser, FuncRegisterDoctor, FuncGetDoctor, FuncRegisterPharmacist, FuncGetPharmacist } from '../functions/Users';
import { store } from '../redux/store';
const { Title } = Typography;

function Admin() {
    let navigate = useNavigate();
    const user = store.getState();

    const [showModel, setShowModel] = useState('');
    const [doctorList, setDoctorList] = useState([]);
    const [pharmacistList, setPharmacistList] = useState([]);
    const [NewDoctor, setNewDoctor] = useState({});
    const [NewPharmacist , setNewPharmacist] = useState({});

    useEffect(() => {
        GetDoctorList();
        GetPharmacistlist();
    }, []);

    const GetDoctorList = () => {
        FuncGetDoctor().then((resp) => {
            console.log(resp);
            setDoctorList([...resp.doctorList]);
        })
    }

    const GetPharmacistlist = ()=>{
        FuncGetPharmacist().then((resp)=>{
            console.log(resp);
            setPharmacistList([...resp.pharmacistList]);
        }).catch((exp)=>{
            console.warn(exp);
        })
    }
    const SetDoctorVal = (obj, val) => {
        NewDoctor[obj] = val;
        setNewDoctor({ ...NewDoctor });
    }

    const SetPharmacistVal = (obj , val)=>{
        NewPharmacist[obj] = val;
        setNewPharmacist({...NewPharmacist});
    }

    const OnModelFinished = () => {
        if (showModel === 'Doctor') {
            CreateNewDoctor();
        }
        console.log("Close Model")
    }

    const NavigateToDoctors = (doctor_id) => {
        navigate('/DoctorProfile', { state: { id: doctor_id } });
    }

    const NavigateToPharmacy = (pharmacist_id) => {
        navigate('/PharmacistProfile', { state: { id: pharmacist_id } });
    }

    const CreateNewDoctor = () => {
        //calling to create new doctor 
        FuncCreateUser(NewDoctor.UserName, NewDoctor.Password, NewDoctor.ConfirmPassword, NewDoctor.Email).then((resp) => {
            if (resp.success && resp.userId) {
                FuncRegisterDoctor(resp.userId, NewDoctor.FirstName, NewDoctor.LastName,
                    NewDoctor.Introduction, NewDoctor.Professional, NewDoctor.ContactNum, NewDoctor.Email).then((regis_resp) => {
                        window.alert(regis_resp.message);
                        setShowModel('');
                        setNewDoctor({});
                    });
            }
        }).catch((exp) => {
            console.warn(exp);
        })
    }

    const RegisterNewPharmacist=()=>{
        FuncCreateUser(NewPharmacist.UserName, NewPharmacist.Password, NewPharmacist.ConfirmPassword, NewPharmacist.Email).then((resp) => {
            if (resp.success && resp.userId) {
                FuncRegisterPharmacist(resp.userId, NewPharmacist.FirstName, NewPharmacist.LastName,
                    NewPharmacist.Introduction).then((regis_resp) => {
                        window.alert(regis_resp.message);
                        setShowModel('');
                        setNewPharmacist({});
                    });
            }
        }).catch((exp) => {
            console.warn(exp);
        })
    }
    return (
        <div style={{ width: '100%', height: '100%', padding: 20 }}>
            <Title level={3}>Administration</Title>
            <Divider orientation="left">Doctors</Divider>
            {
                user.Role == "Admin" &&
                <Row justify='start' align='top'>
                    <Button type="primary" style={{ alignSelf: 'flex-start' }} onClick={() => { setShowModel('Doctor') }}>New</Button>
                </Row>
            }

            <Row justify='start' align='top' style={{ padding: 10 }} >
                {
                    doctorList.map(x =>
                        <Col xl={8} xs={16} xxl={8} key={x.id}>
                            <Card title={x.firstName + " " + x.lastName} extra={<Button type="link" icon={<InfoCircleOutlined />} onClick={() => { NavigateToDoctors(x.id) }} />} style={{ minWidth: 300, margin: 20 }}>
                                <p><b>{x.profession}</b></p>
                                <p>{x.introduction}</p>
                                <p>{x.contactNum}</p>
                            </Card>
                        </Col>
                    )
                }

            </Row>


            <Divider orientation="left">Pharmacist</Divider>
            {
                user.Role == "Admin" &&
                <Row justify='start' align='top'>
                    <Button type="primary" style={{ alignSelf: 'flex-start' }} onClick={() => { setShowModel('Pharmacist') }}>New</Button>
                </Row>
            }

            <Row justify='start' align='top' style={{ padding: 10 }} >
                {
                    pharmacistList.map(x =>
                        <Col xl={8} xs={16} xxl={8} key={x.id}>
                            <Card title={x.firstName + " " + x.lastName} extra={<Button type="link" icon={<InfoCircleOutlined />} onClick={() => { NavigateToPharmacy(x.id) }} />} style={{ width: 300, margin: 20 }}>
                                <p><b>Introduction</b></p>
                                <p>{x.introduction}</p>
                            </Card>
                        </Col>
                    )
                }
            </Row>
            <Modal title={"Register New " + showModel} open={showModel != ''} onOk={OnModelFinished} onCancel={() => { setShowModel('') }}>
                <div>
                    <Row justify="center" align="middle">
                        <Col span={16}>
                            {
                                (showModel === 'Doctor') &&
                                <Form
                                    name="basic"
                                    style={{ width: '100%', alignSelf: 'center', marginTop: '10%' }}
                                    initialValues={{ remember: true }}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input value={NewDoctor?.UserName} onChange={(val) => { SetDoctorVal("UserName", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password value={NewDoctor?.Password} onChange={(val) => { SetDoctorVal("Password", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Confirm Password"
                                        name="Confirmpassword"
                                        rules={[{ required: true, message: 'Re-enter Password' }]}
                                    >
                                        <Input.Password value={NewDoctor?.ConfirmPassword} onChange={(val) => { SetDoctorVal("ConfirmPassword", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="First Name"
                                        name="firstname"
                                        rules={[{ required: true, message: 'First Name Required' }]}
                                    >
                                        <Input value={NewDoctor?.FirstName} onChange={(val) => { SetDoctorVal("FirstName", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Last Name"
                                        name="lastname"
                                        rules={[{ required: true, message: 'Last Name Required' }]}
                                    >
                                        <Input value={NewDoctor?.LastName} onChange={(val) => { SetDoctorVal("LastName", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Last Name Required' }]}
                                    >
                                        <Input value={NewDoctor?.Email} onChange={(val) => { SetDoctorVal("Email", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Professional"
                                        name="professional"
                                        rules={[{ required: true, message: 'Professional Required' }]}
                                    >
                                        <Input value={NewDoctor?.Professional} onChange={(val) => { SetDoctorVal("Professional", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Contact Number"
                                        name="contact"
                                        rules={[{ required: true, message: 'Contact Number Required' }]}
                                    >
                                        <Input value={NewDoctor?.ContactNum} onChange={(val) => { SetDoctorVal("ContactNum", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Introduction"
                                        name="Introduction"
                                    >
                                        <Input.TextArea value={NewDoctor?.Introduction} onChange={(val) => { SetDoctorVal("Introduction", val.target.value) }} />
                                    </Form.Item>


                                </Form>
                            }
                            {
                                (showModel === 'Pharmacist') &&
                                <Form
                                    name="basic"
                                    style={{ width: '100%', alignSelf: 'center', marginTop: '10%' }}
                                    initialValues={{ remember: true }}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input value={NewPharmacist?.UserName} onChange={(val) => { SetPharmacistVal("UserName", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password value={NewPharmacist?.Password} onChange={(val) => { SetPharmacistVal("Password", val.target.value) }} />

                                    </Form.Item>

                                    <Form.Item
                                        label="Confirm Password"
                                        name="Confirmpassword"
                                        rules={[{ required: true, message: 'Re-enter Password' }]}
                                    >
                                        <Input.Password value={NewPharmacist?.ConfirmPassword} onChange={(val) => { SetPharmacistVal("ConfirmPassword", val.target.value) }} />

                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Email Required' }]}
                                    >
                                        <Input value={NewPharmacist?.Email} onChange={(val) => { SetPharmacistVal("Email", val.target.value) }} />

                                    </Form.Item>

                                    <Form.Item
                                        label="First Name"
                                        name="firstname"
                                        rules={[{ required: true, message: 'First Name Required' }]}
                                    >
                                        <Input value={NewPharmacist?.FirstName} onChange={(val) => { SetPharmacistVal("FirstName", val.target.value) }} />

                                    </Form.Item>

                                    <Form.Item
                                        label="Last Name"
                                        name="lastname"
                                        rules={[{ required: true, message: 'Last Name Required' }]}
                                    >
                                        <Input value={NewPharmacist?.LastName} onChange={(val) => { SetPharmacistVal("LastName", val.target.value) }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Introduction"
                                        name="introduction"
                                        rules={[{ required: true, message: 'Introduction Required' }]}
                                    >
                                        <Input.TextArea value={NewPharmacist?.Introduction} onChange={(val) => { SetPharmacistVal("Introduction", val.target.value) }} />

                                    </Form.Item>

                                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                                        <Button type="primary" htmlType="button" onClick={RegisterNewPharmacist}>
                                            Create New Pharmacist
                                        </Button>
                                    </Form.Item>
                                </Form>
                            }
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    )
}
export default Admin;