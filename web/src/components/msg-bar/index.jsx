import "./index.css";

const App = ({content, isMe}) => {
  return (
    <div className={isMe ? 'msg-bar msg-bar--me' : 'msg-bar'}>
      {content}
    </div>
  );
};

export default App;
