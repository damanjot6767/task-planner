import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,Tfoot, Stack, Input, Button,Heading,Box } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AssignSprint from './assignSprint';

const Sprint = (props) => {
    const[sprint,setSprint]=useState([]);
    const[page,setPage]=useState(1);
    const[task,setTask]=useState("");
    const fetchSprint=async (page)=>{
      try {
        const {data} = await axios.post('https://task-planner-flph.onrender.com/sprint/get',{page});
         setSprint(data.message)
         props.fetchAllTasks()
      } catch (error) {
        alert(error.message)
      }
    }
    const addTask=async (id)=>{
      try {
        const {data} = await axios.post('https://task-planner-flph.onrender.com/task/add',{id,name:task});
         alert(data.message)
         fetchSprint(page)
         props.fetchAllTasks()
      } catch (error) {
        alert(error.message)
      }
    }
    useEffect(()=>{
       fetchSprint(page)
    },[page])

    return <Stack w="70%" m="auto" spacing={4} mt={"45px"}>

          <Stack w="100%" m="auto" spacing={4} mt={"45px"} border={"2px solid #00FFFF"} borderRadius={"10px"} p="20px">
          <Heading as='h3' size='xl' noOfLines={1} textAlign={"center"}>
         All Sprint
        </Heading>

        {sprint.length===0 && <Heading as='h3' size='xl' noOfLines={1} textAlign={"center"}>Loading</Heading>}
        {sprint.length>0&&sprint.map((ele,ind)=>
          <Stack spacing={6}>
          <TableContainer w="100%" m="auto">
          <Heading as='h4' size='lg' noOfLines={1} mb={5}>
           {ele.name}
          </Heading>
          <Box style={{display:"flex",justifyContent:"space-between"}} mb={8}>
          <Input w={"70%"} placeholder='Add Your Task' required={true} onChange={(e)=>setTask(e.target.value)} />
          <Button onClick={()=>addTask(ele._id)} w={"20%"}>Add Task</Button>
          </Box>
          {ele.tasks.length===0?<Heading as="h4" size="md">No Task Present!</Heading>:
           ele.tasks.map((ele1)=>
           <Table  variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>Task Name</Th>
            <Th>Task Status</Th>
            <Th>Task Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{ele1.name}</Td>
            <Td>{ele1.isCompleted?"Completed":"Pending"}</Td>
            <Td>{`${ele1.day}-0${ele1.month}-${ele1.date}`}</Td>
          </Tr>
        </Tbody>
      </Table>
           )
          }
         </TableContainer>
          </Stack>
        )}
        <Box style={{display:"flex",justifyContent:"space-between"}}>
          <Button isDisabled={page==1?true:false} onClick={()=>setPage(page-1)}>Prev</Button>
          <Heading as='h3' size='xl' noOfLines={1}>
          {page}
        </Heading>
          <Button isDisabled={page==sprint.lengtht?true:false} onClick={()=>setPage(page+1)}>Next</Button>
        </Box>
          </Stack>
          <AssignSprint fetchSprint={fetchSprint} page={page} length={sprint.length&&sprint[0].tasks.length}/>
    </Stack>
}

export default Sprint