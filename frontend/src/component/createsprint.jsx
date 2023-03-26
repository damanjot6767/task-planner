import React, { useState } from 'react';
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,Tfoot, Stack, Input, Button,Heading,Box, Select } from '@chakra-ui/react'
import axios from "axios";
import {NotificationManager} from "react-notifications"
const CreateSprint = () => {
    const[sprint,setSprint]=useState("")
    const Submit = async()=>{
        if(sprint===""){
         alert("Please Select Valid Sprint!!!")
        }
       
        else{
            try {
                const response = await axios.post('https://task-planner-flph.onrender.com/sprint/add', {
                  name:sprint
                });
                 alert(response.data.message)
              } catch (error) {
                alert(error.message)
              }
        }
        
    }
  return (
    <Stack w="md" m="auto" spacing={4} border={"2px solid #00FFFF"} borderRadius={"10px"} p="20px">
        <Heading as='h3' size='xl' noOfLines={1} textAlign={"center"}>
         Select Sprint
        </Heading>
         <Box style={{display:"flex",justifyContent:"space-between"}}>
         <Select w="70%" placeholder='Select option' onChange={(e)=>setSprint(e.target.value)}>
  <option value='Sprint 1'>Sprint 1</option>
  <option value='Sprint 2'>Sprint 2</option>
  <option value='Sprint 3'>Sprint 3</option>
  <option value='Sprint 4'>Sprint 4</option>
</Select>
         <Button onClick={Submit} w={"20%"}>Add Sprint</Button>
         </Box>
    </Stack>
  )
}

export default CreateSprint