import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,Tfoot, Stack, Input, Button,Heading,Box, Select } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AssignSprint = (props) => {
    const[users,setUsers]=useState([]);
    const[allUsers,setAllUsers]=useState([])
    const[usertask,setUserTask]=useState([]);
    const[page,setPage]=useState(1);
    const[tasks,setTasks]=useState([])
    const[assign,setAssign]=useState({id:"",userId:""})
    
     const fetchUser=async (page)=>{
        try {
          const {data} = await axios.post('http://localhost:8000/task/All',{page});
           setUsers(data.result);
           setUserTask(data.result1)
        } catch (error) {
          alert(error.message)
        }
      }
      const fetchAllTasks=async ()=>{
        try {
          const {data} = await axios.get('http://localhost:8000/task/alltasks');
           setTasks(data.result);
        } catch (error) {
          alert(error.message)
        }
      }
      const fetchAllUsers=async ()=>{
        try {
          const {data} = await axios.get('http://localhost:8000/task/alluser');
           setAllUsers(data.result);
        } catch (error) {
          alert(error.message)
        }
      }
      const AssignTask=async (id,userId)=>{
        try {
          const {data} = await axios.post(`http://localhost:8000/task/assign/${assign.id}`,{userId:assign.userId});
           alert(data.message)
           fetchUser(page)
        } catch (error) {
          alert(error.message)
        }
      }
      const CompleteTask=async (id)=>{
        try {
          const {data} = await axios.put(`http://localhost:8000/task/status/${id}`);
           alert(data.message)
           fetchUser(page)
           props.fetchSprint(props.page)
        } catch (error) {
          alert(error.message)
        }
      }
      useEffect(()=>{
       fetchAllTasks()
       fetchAllUsers()
      },[props.length])
      useEffect(()=>{
      fetchUser(page)
     },[page])
     
    return <Stack w={"100%"} m="auto">
        <Stack w="100%" m="auto" spacing={4} mt={"45px"} mb={"100px"} border={"2px solid #00FFFF"} borderRadius={"10px"} p="20px">

<Heading as='h3' size='xl' noOfLines={1} textAlign={"center"}>
 All Users
</Heading>
{users.length===0 && <Heading as='h3' size='xl' noOfLines={1} textAlign={"center"}>Loading</Heading>}
{users.length>0?users.map((ele,ind)=>
  <Stack spacing={6}>
  <TableContainer w="100%" m="auto">
  <Box style={{display:"flex",justifyContent:"space-between"}}>
  <Heading as='h4' size='lg' noOfLines={1} mb={5}>
   {`Username:- ${ele.name}`}
  </Heading>
  <Heading as='h4' size='lg' noOfLines={1} mb={5}>
   {`Email:- ${ele.email}`}
  </Heading>
  </Box>
  {usertask.length===0?<Heading as="h4" size="md">No Task Assign to User</Heading>:
   usertask[0].tasks.map((ele1)=>
   <Table  variant='striped' colorScheme='teal'>
<Thead>
  <Tr>
    <Th>Task Name</Th>
    <Th>Task Status</Th>
    <Th>Task Created</Th>
    <Th>Complete Task</Th>
  </Tr>
</Thead>
<Tbody>
  <Tr>
    <Td>{ele1.name}</Td>
    <Td>{ele1.isCompleted?"Completed":"Pending"}</Td>
    <Td>{`${ele1.day}-0${ele1.month}-${ele1.date}`}</Td>
    <Td onClick={(e)=>CompleteTask(ele1._id)}>{ele1.isCompleted?"Task Completed":"Click & Complete"}</Td>
  </Tr>
</Tbody>
</Table>
   )
  }
 </TableContainer>
  </Stack>
):<Heading as='h5' size='md' noOfLines={1} mb={5}>
No User Found
</Heading>}
<Box style={{display:"flex",justifyContent:"space-between"}}>
  <Button isDisabled={page==1?true:false} onClick={()=>setPage(page-1)}>Prev</Button>
  <Heading as='h3' size='xl' noOfLines={1}>
  {page}
</Heading>
  <Button isDisabled={page==users.lengtht?true:false} onClick={()=>setPage(page+1)}>Next</Button>
</Box>
       </Stack>

        <Stack w="100%" m="auto" mt={"45px"} style={{marginBottom:"50px",paddingBottom:"30px"}} border={"2px solid #00FFFF"} borderRadius={"10px"} p="20px">
        <Heading as='h3' size='xl' noOfLines={1} textAlign={"center"}>
         Assign Task to user
       </Heading>
        
       <Box style={{display:"flex",justifyContent:"space-between",width:"50%",margin:"auto",marginTop:"30px"}}>
       <Select w="30%" placeholder='Select User' onChange={(e)=>setAssign({...assign,userId:e.target.value})} >
        {allUsers.length>0 && allUsers.map((ele)=><option value={ele._id}>{ele.name}</option>)}
       </Select>

<Select w="30%"placeholder='Select Task'  onChange={(e)=>setAssign({...assign,id:e.target.value})}>
{tasks.length===0 && <Heading as='h3' size='xl' noOfLines={1} textAlign={"center"}>Loading</Heading>}
{tasks.length>0 && tasks.map((ele)=><option value={ele._id}>{ele.name}</option>)}
</Select>

<Button onClick={AssignTask}>Assign Task</Button>

       </Box>
        </Stack>
    </Stack>
}

export default AssignSprint