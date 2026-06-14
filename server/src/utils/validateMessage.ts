import {z} from 'zod' 
import yjsUpdate from '../ws/handlers/yjsUpdate.js';

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

const YjsUpdateSchema = z.object({
   type: z.literal("YJS_UPDATE"),
   timestamp: z.number(),

   payload: z.object({
      roomId: z.string(),
      update: z.string()
   })
});

const awarenessUpdateSchema = z.object({
   type: z.literal("AWARENESS_UPDATE"),
   timestamp: z.number(),

   payload: z.object({
      roomId: z.string(),
      update: z.string()
   })
});

const languageChangedSchema=z.object({
   type: z.literal("LANGUAGE_CHANGED"),
   timestamp :z.number(),

   payload: z.object({
      roomId: z.string(),
      language: z.string()
   })
}) ;



const IncomingMessageSchema =
   z.discriminatedUnion("type", [
      JoinRoomSchema,
      RunCodeSchema,
      YjsUpdateSchema,
      awarenessUpdateSchema,
      languageChangedSchema
      

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