type Message<T extends object,V extends string>={
    type:V ;
    timestamp:number ;
    payload:T ;
}

//client side to server side Message types

//JOIN_ROOM to send the room Id and join the room 
type JoinRoomPayload={
    roomId:string ,
    userName:string 
} ;
type JoinRoom=Message<JoinRoomPayload,"JOIN_ROOM"> ;



//RUN_CODE to send the request to run the current code 
type RunCodePayload={
    roomId:string ,
    language:string ,
    code:string ,
    input : string 
} ;
type RunCode=Message<RunCodePayload,"RUN_CODE"> ;



//Server Side to client side Message types


type SessionJoinedPayload = {
  roomId: string
  connectedUsers: string[]
}
type SessionJoined=Message<SessionJoinedPayload,"SESSION_JOINED"> ;




type ExecutionResultPayload={
   status:'success'|'timeout' | 'error',
   output :string,
   error:string ,
   executionTime:number 
} ;
type ExecutionResult=Message<ExecutionResultPayload,"EXECUTION_RESULT"> ;


type ErrorPayload={
    message:string 
}
type ServerError=Message<ErrorPayload,"ERROR"> ;


type UserJoinedPayload = {
  userName: string
 connectedUsers: string[]
}
type UserJoined = Message<UserJoinedPayload, "USER_JOINED">


type UserLeftPayload = {
  userName: string
 connectedUsers: string[]
}
type UserLeft = Message<UserLeftPayload, "USER_LEFT">

type YjsUpdatePayload={
  roomId:string ,
  update:string 
}
type YjsUpdate=Message<YjsUpdatePayload,"YJS_UPDATE"> 

type awarenessUpdatePayload ={
  roomId:string ,
  update:string 
} 
type awarenessUpdate=Message<awarenessUpdatePayload,"AWARENESS_UPDATE"> ;



export type ClientMessage = JoinRoom | RunCode | YjsUpdate | awarenessUpdate
export type ServerMessage = SessionJoined | UserJoined | UserLeft | ExecutionResult | ServerError | YjsUpdate | awarenessUpdate
export type {Message,JoinRoom,RunCode}
