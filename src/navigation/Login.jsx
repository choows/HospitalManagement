import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography, Divider, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../redux/reducer/UserReducer';
import { useNavigate } from "react-router-dom";
import { FuncLogin } from '../functions/Access';
const { Title } = Typography;

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const onFinish = () => {
        FuncLogin(userName, password).then((resp) => {
            var loginInfo = {
                UserName: userName,
                FirstName: resp.user.firstName,
                LastName: resp.user.lastName,
                Role: resp.user.role,
                RoleId: resp.user.id,
                UserId: resp.user.userId
            }
            dispatch(login(loginInfo));
            return {
                role: resp.user.role,
                id: resp.user.id
            }
        }).then((val) => {
            console.log(val);
            if (val.role == "Doctor") {
                navigate('/DoctorProfile', { state: { id: val.id } });
                return;
            }
            if (val.role == "Patient") {
                navigate('/PatientDetails', { state: { id: val.id } });
                return;
            }
            if (val.role == "Pharmacist") {
                navigate('/PharmacistList');
                return;
            }
            if (val.role == "Admin") {
                navigate('/Admin');
                return;
            }
        }).catch((exp) => {
            console.warn(exp);
        });
    };

    const onRegister=()=>{
        navigate('/Register');
    }
    
    return (

        <div style={{ width: '100%', height: '100%', alignContent: 'center', alignItems: 'center', padding: 50, justifyContent: 'center' }}>
            <Title level={2}>Hospital Management System</Title>
            <Divider orientation="left">Login</Divider>
            <Row justify="center" align="middle">
                <Col span={8}>
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
                            <Input value={userName} onChange={(val) => { setUserName(val.target.value) }} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password value={password} onChange={(val) => { setPassword(val.target.value) }} />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form>
                    <Button type="primary" htmlType="button" onClick={()=>{navigate('/AnnoymousAppointment')}} style={{ margin: 20 }}>
                        New Appointment
                    </Button>
                    <Button type="primary" htmlType="button" onClick={onRegister} style={{ margin: 20 }}>
                        Register
                    </Button>
                    <Button type="primary" htmlType="button" onClick={onFinish} style={{ margin: 20 }}>
                        Login
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Login;