import {z} from 'zod' 

const JoinRoomSchema = z.object({
   type: z.literal("JOIN_ROOM"),
   timestamp: z.number(),

   payload: z.object({
      roomId: z.string(),
      userName: z.string()
   })
});

const RunCodeSchema = z.object({
   type: z.literal("RUN_CODE"),
   timestamp: z.number(),

   payload: z.object({
        roomId:z.string() ,
        language:z.string() ,
        code:z.string() ,
        input : z.string() 
   })
});


const IncomingMessageSchema =
   z.discriminatedUnion("type", [
      JoinRoomSchema,
      RunCodeSchema
   ]);


export default function validateMessage(message:object)
{
     const result =IncomingMessageSchema.safeParse(message)

        if (!result.success)
        {
             return false ;
        }

        return true ;
}