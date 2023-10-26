import './ConversationItem.css';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css'

function ConversationItem ({image_url, video_url}) {
    <MessageBox
        position={'left'}
        type={'photo'}
        text={'react.svg'}
        data={{
            uri: 'https://facebook.github.io/react/img/logo.svg',
            status: {
            click: false,
            loading: 0,
            },
        }}
    />
}

export default ConversationItem;