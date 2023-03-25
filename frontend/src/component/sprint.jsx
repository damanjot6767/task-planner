import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,Tfoot, Stack, Input, Button,Heading,Box } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Sprint = () => {
    const[sprint,setSprint]=useState([]);
    const[page,setPage]=useState(1);
    const[detail,setDetail]=useState("")
    const fetchSprint=async (page)=>{
      try {
        const {data} = await axios.post('http://localhost:8000/sprint/get',{page});
         setSprint(data.message)
         console.log(data.message)
      } catch (error) {
        alert(error.message)
      }
    }
    useEffect(()=>{
       fetchSprint(page)
    },[page])
    return <Stack w="md" m="auto" spacing={4}>

        <Heading as='h3' size='xl' noOfLines={1}>
         All Sprint
        </Heading>
         
         <Box style={{display:"flex",justifyContent:"space-between"}}>
         <Input w={"70%"} placeholder='Add Your Task' required={true} />
         <Button w={"20%"}>Add Task</Button>
         </Box>


        {sprint.length>0&&sprint.map((ele,ind)=>
          <TableContainer w="md" m="auto">
          <Heading as='h4' size='lg' noOfLines={1}>
           {ele.name}
          </Heading>
      <Table  variant='striped' colorScheme='teal'>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Task Name</Th>
            <Th>Task Status</Th>
            <Th>Task Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
         </TableContainer>
         
        )}
        <Box style={{display:"flex",justifyContent:"space-between"}}>
          <Button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</Button>
          <Heading as='h3' size='xl' noOfLines={1}>
          {page}
        </Heading>
          <Button disabled={page===sprint.length} onClick={()=>setPage(page+1)}>Next</Button>
        </Box>
    </Stack>
}

export default Sprint