import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from "yup";
import RHFCodes from '../../components/hook-form/RHFCodes';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyEmail } from '../../redux/slices/auth';

const VerifyForm = () => {
    // Get email from store
    const { email } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Define the schema
    const VerifyCodeSchema = Yup.object().shape({
        code1: Yup.string().required("Code is required"),
        code2: Yup.string().required("Code is required"),
        code3: Yup.string().required("Code is required"),
        code4: Yup.string().required("Code is required"),
        code5: Yup.string().required("Code is required"),
        code6: Yup.string().required("Code is required"),
    });

    // Define default values
    const defaultValues = {
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: "",
    };

    // Initialize useForm
    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(VerifyCodeSchema),
        defaultValues
    });
    const { handleSubmit, formState } = methods;

    // Define onSubmit function
    const onSubmit = async (data) => {
        try {
            await dispatch(VerifyEmail({
                otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
                email
            }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <RHFCodes keyName='code' inputs={["code1", "code2", "code3", "code4", "code5", "code6"]} />
                    <Button
                        fullWidth
                        variant='contained'
                        size='large'
                        type='submit'
                        sx={{
                            bgcolor: "text.primary",
                            color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                            "&:hover": {
                                bgcolor: "text.primary",
                                color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                            }
                        }}>
                        Verify
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
}

export default VerifyForm;
