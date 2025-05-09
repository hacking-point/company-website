import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import React, { useReducer, useState } from 'react'
const initState={
    password:""
}
const reducer=(store,{type,payload})=>{
    switch(type){
        case "password":
            return {...store}
        default:
            return {...store}
    }

}
const ResetPassword = () => {
    const [showPassword,setShowPassword]=useState(false)
    const [text,setText]=useReducer(reducer,initState)
    const handleSubmit=()=>{
        console.log(text)
    }
  return (
    <Flex>
        <Stack px={2} py={4} spacing={4} >
              <Stack>
                 <Heading>Enter Your New Password</Heading>
              </Stack>
              <Stack px={8} py={6}>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input/>
                </FormControl>
                <FormControl>
                    <FormLabel>New-Password</FormLabel>
                    <InputGroup>
                       <Input type={showPassword?"text":"password"} onChange={(e)=>setText({type:"password",payload:e.target.value})}/>
                       <InputRightElement onClick={()=>setShowPassword(!showPassword)}>{showPassword?<ViewIcon/>:<ViewOffIcon/>}</InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button bg={"blue.500"} color={'white'} onClick={handleSubmit}>Submit</Button>
              </Stack>
        </Stack>
    </Flex>
  )
}

export default ResetPassword
