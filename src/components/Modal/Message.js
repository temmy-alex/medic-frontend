

const Message = ({ notification }) => {
    return (
      <>
        <div className="flex justify-between items-center text-[20px] font-bold">
          <span>{notification.title}</span>
        </div>
        <div className="text-center mt-5">{notification.body}</div>
      </>
    );
  };
  
  export default Message;