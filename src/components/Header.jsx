import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, useStore } from 'react-redux'
import { login, logout, userSlice } from '../redux/reducer/UserReducer';
import React, {useEffect, useState} from "react";
import {store} from '../redux/store';
import ChatBox from './ChatBox';

const { Content, Sider } = Layout;
function NavigationHeader(param) {
    let navigate = useNavigate();
    const user = store.getState();
    const dispatch = useDispatch();
    const [SideMenu , setMenu] = useState([]);
    useEffect(() => {
        //navigate to login if not found user 
        if(user.UserName == null || user.FirstName == null || user.LastName == null || user.Role == null || user.UserId == null || user.RoleId == null){
            //go to login page
            window.alert("Please Login to Proceed");
            Logout();
        }
        SettingSideMenu(user.Role);
      }, []);
    const Logout=()=>{
        dispatch(logout());
        navigate('/Login');
    }

    const SettingSideMenu=(role)=>{
        var list = [];
        switch(role){
            case 'Pharmacist':{
                list.push(getItem('Search Patient', '/PatientList', <UserOutlined />, null, null));
                list.push(getItem('Prescription List', '/PharmacistList', <UserOutlined />, null, null));
                list.push( getItem('Medicines', '/MedicineManagement', <UserOutlined />, null, null));
                break;
            }
            case 'Doctor':{
                list.push(getItem('Search Patient', '/PatientList', <UserOutlined />, null, null));
                list.push(getItem('Prescription List', '/PharmacistList', <UserOutlined />, null, null));
                list.push( getItem('Profile', '/DoctorProfile', <UserOutlined />, null, null),);
                break;
            }
            case 'Patient':{
                list.push( getItem('Profile', '/PatientDetails', <UserOutlined />, null, null));
                list.push( getItem('Doctor List', '/Admin', <UserOutlined />, null, null));
                break;
            }
            case 'Admin':{
                list.push( getItem('Search Patient', '/PatientList', <UserOutlined />, null, null));
                list.push( getItem('Admin', '/Admin', <UserOutlined />, null, null));
                list.push( getItem('New Patient', '/NewPatient', <UserOutlined />, null, null));
                list.push( getItem('QnA List', '/QnAList', <UserOutlined />, null, null));
                list.push( getItem('Medicines', '/MedicineManagement', <UserOutlined />, null, null));

                break;
            }
            default : break;
        }
        list.push(getItem('Logout', 'logout', <UserOutlined />, null, null));
        setMenu(list);
    }
    // setting menu item 
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type
        };
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onClick = (item) => {
        if(item.key == 'logout'){
            Logout();
            return;
        }
        if(item.key == "/PatientDetails"){
            console.log(user.RoleId);
            navigate(item.key ,  { state: { id: user.RoleId } })
            return;
        }
        if(item.key == "/DoctorProfile"){
            navigate(item.key ,  { state: { id: user.RoleId } })
            return;
        }
        navigate(item.key);
    };
    
    return (
        <Layout>
            {
                user.Role == 'Patient' && 
                <ChatBox/>
            }
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={onClick}
                    defaultSelectedKeys={['home']}
                    defaultOpenKeys={['home']}
                    items={SideMenu}
                />
            </Sider>
            <Layout>
                <Content
                    style={{
                        padding: 20
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: window.innerHeight - 40,
                            background: colorBgContainer,
                        }}
                    >
                        {param.Content}
                    </div>
                </Content>
                {/* <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout>
    )
}

export default NavigationHeader;