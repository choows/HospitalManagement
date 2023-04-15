import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Typography, Divider, Row, Col, Card, Space, Modal, Tag, Table } from 'antd';
import {FuncgetAllQna, FuncNewQna} from '../functions/Qna';
import { useNavigate } from "react-router-dom";
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { FuncCreateUser, FuncRegisterDoctor, FuncGetDoctor, FuncRegisterPharmacist, FuncGetPharmacist } from '../functions/Users';
import { store } from '../redux/store';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
const { Title } = Typography;

const QnAList = () => {

    const [showModel, setShowModel] = useState('');
    const [NewQnAQuote, setNewQnAQuote] = useState({});
    const [TableSource , setTableSource] = useState([]);
    
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
        },
    ];

    useEffect(() => {
        RetreiveTableSource();
    }, []);

    const RetreiveTableSource=()=>{
        FuncgetAllQna().then((resp)=>{
            console.log(resp);
            setTableSource(resp.qnaList);
        });
    }
    const NewQnA=()=> {
        FuncNewQna(NewQnAQuote["Question"] , NewQnAQuote["Answer"]).then((resp)=>{
            if(resp.success){
               setShowModel(false); 
            }
            window.alert(resp.message);

        }).catch((exp)=>
        {
            console.warn(exp);
        });
    }

    const UpdateField=(field, value)=>{
        NewQnAQuote[field] = value;
        setNewQnAQuote(...NewQnAQuote);
    }
    return (
        <div>
            <Title level={2}>QnA List</Title>
            <Button type="primary" onClick={() => {setShowModel(true)}} style={{alignSelf:'flex-start'}}>New QnA</Button>
            <Table dataSource={TableSource} columns={columns} />
            <Modal title={"New QnA"} open={showModel} onOk={NewQnA}>
                <Input placeholder="Question" onChange={(val)=> {UpdateField('Question',val.target.value)}}/>
                <Input placeholder="Answer" onChange={(val)=> {UpdateField('Answer',val.target.value)}}/>
            </Modal>
        </div>
    );
}
export default QnAList;