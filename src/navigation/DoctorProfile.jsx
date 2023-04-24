//for doctor profile or information except appointment 
import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Typography, Divider, Timeline, Row, Col, Descriptions, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../redux/reducer/UserReducer';
import { UserOutlined } from '@ant-design/icons';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FuncGetDoctor, UpdateDoctor } from '../functions/Users';
import { store } from '../redux/store';
import { isRejected } from "@reduxjs/toolkit";

const { Title, Text } = Typography;

function DoctorProfile() {
    const user = store.getState();
    const { state } = useLocation();
    const [profile, setProfile] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        console.log(state.id);
        GetProfile(state.id);
    }, []);

    const GetProfile = (id) => {
        FuncGetDoctor("", id).then((resp) => {
            if (resp.doctorList.length != 1) {
                window.alert("User Not found");
                return;
            } else {
                const doctor = resp.doctorList[0];
                setProfile({ ...doctor });
            }
            console.log(resp);
        }).catch((exp) => {
            console.warn(exp);
        })
    }
    const ViewAppointment = (Id) => {
        navigate('/DoctorList', { state: { id: Id } });
    }
    const SaveProfile =()=>{
        UpdateDoctor(profile).then((resp)=>{
            window.alert(resp.message);
            if(resp.success){
                setIsUpdating(false);
            }
        });
    }   
    return (
        <div>
            <Title level={3}>Profile</Title>
            <Divider></Divider>
            <div>
                <Avatar size={80} icon={<UserOutlined />} />
            </div>
            <Descriptions bordered style={{ marginTop: '3%' }} extra={

                (user.Role == 'Admin' || user.Role == 'Doctor') &&
                <>
                    <Button type={'primary'} style={{ margin: 10 }} onClick={() => { setIsUpdating(!isUpdating) }}>{isUpdating ? "Cancel" : "Edit Profile"}</Button>
                    {isUpdating && <Button type={'primary'} style={{ margin: 10 }} onClick={() => { SaveProfile()}}>Save</Button>}
                    {
                        user.Role != 'Patient' && 
                    
                        <Button type="primary" onClick={() => { ViewAppointment(profile.id) }} style={{ margin: 10 }}>View Appointments</Button>
                    }
                </>

            }>
                <Descriptions.Item label="First Name">
                    {
                        isUpdating && user.Role == 'Admin' ?
                            <Input value={profile?.firstName} onChange={(e) => { setProfile({ ...profile, firstName: e.target.value }) }}></Input>
                            :
                            profile?.firstName
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                    {
                        isUpdating && user.Role == 'Admin'?
                            <Input value={profile?.lastName} onChange={(e) => { setProfile({ ...profile, lastName: e.target.value }) }}></Input>
                            :
                            profile?.lastName
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Profession">
                    {
                        isUpdating && user.Role == 'Admin'?
                            <Input value={profile?.profession} onChange={(e) => { setProfile({ ...profile, profession: e.target.value }) }}></Input>
                            :
                            profile?.profession
                    }
                </Descriptions.Item>
                <Descriptions.Item label="ContactNo">
                    <p>
                        {
                            isUpdating ?
                                <Input value={profile?.contactNum} onChange={(e) => { setProfile({ ...profile, contactNum: e.target.value }) }}></Input>
                                :
                                profile?.contactNum
                        }</p>
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                    {
                        isUpdating ?
                            <Input value={profile?.email} onChange={(e) => { setProfile({ ...profile, email: e.target.value }) }}></Input>
                            :
                            profile?.email
                    }</Descriptions.Item>
                <Descriptions.Item label="Date of Join">{profile?.createDateTime?.split("T")[0]}</Descriptions.Item>
                <Descriptions.Item label="Introduction" span={3}>{
                    isUpdating && user.Role == 'Admin'?
                        <Input.TextArea value={profile?.introduction} onChange={(e) => { setProfile({ ...profile, introduction: e.target.value }) }}></Input.TextArea>
                        :
                        profile?.introduction
                }   </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
export default DoctorProfile;