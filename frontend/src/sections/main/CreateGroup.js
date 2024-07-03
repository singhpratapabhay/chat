import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextField from '../../components/hook-form/RHFTextField';
import RHFAutoComplete from '../../components/hook-form/RHFAutoComplete';

const MEMBERS = ["Name 1", "Name 2", "Name 3"]
//Todo create it as reusable comp
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose}) => {
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    members: Yup.array().min(2, "Must have atleast Two members"),
  });

  const defaultValues = {
    title: "",
    members: []
  }

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues
  })
  const { reset, watch, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful, isValid }, } = methods;

  const onSubmit = async (data)=>{
    try{

    }catch(error){
console.log(error)
    }
  }
return (
  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
<Stack direction={"column"} spacing={3}>
  <RHFTextField name={"title"} label="Title"/>
  <RHFAutoComplete name={"members"} label="Members" multiple freeSolo options={MEMBERS.map((option)=>{return option})} ChipProps={{size:"medium"}}/>
  <Stack justifyContent={"flex-end"} direction={"row"} alignItems={"center"} spacing={2}>
  
  <Button onClick={handleClose}>
  Cancel
</Button>
  <Button type='submit' variant='contained'>
  Create
</Button>
</Stack>
</Stack>


  </FormProvider>
)
}
const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} TransitionComponent={Transition} keepMounted sx={{ p: 4 }}>
      <DialogTitle sx={{mb:2}}>Create New Group</DialogTitle>
      <DialogContent>
<CreateGroupForm handleClose={handleClose}/>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroup