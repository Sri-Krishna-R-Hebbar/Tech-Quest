import {MultiChatSocket , MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced'
const ChatsPage = (props) => {
    const chatprops = useMultiChatLogic('5ec141d2-9ded-4b57-ad00-098def6cf17d',
    props.user.username,
    props.user.secret
);
    return <div style={{height:'100vh'}}>
        <MultiChatSocket {...chatprops} />
        <MultiChatWindow{...chatprops} style={{height:'100%'}} />
    </div>


  };
  export default ChatsPage;