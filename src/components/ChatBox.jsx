import { Widget, addLinkSnippet, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {FuncGetAnswer} from '../functions/Qna';
function ChatBox() {

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        FuncGetAnswer(newMessage).then((resp)=>{
            for(var idx in resp.qnaList){
                var itm = resp.qnaList[idx];
                addResponseMessage(itm.answer);
            }
            if(resp.qnaList.length == 0){
                addResponseMessage("Sorry, I don't know the answer to that question yet. Please contact us via whatsapp");
                addLinkSnippet({
                    title: 'Hotel Management System',
                    link: 'https://api.whatsapp.com/send?phone=0123456789',
                    target: '_blank'
                  });
            }
        });
    };
    return (
        <Widget 
            title={"Q&A"}
            subtitle={"Please ask your questions here."}
            handleNewUserMessage={handleNewUserMessage} 
            emojis={true}/>
    );
}

export default ChatBox;