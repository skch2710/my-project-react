import * as Yup from 'yup';

export const initialValues = {
    hospitalName: '',
    hospitalEmail: '',
    hospitalAddress: '',
    phoneNumber: '',
    startDate: '',
};

export const validationSchema = Yup.object({
    hospitalName: Yup.string().required('Hospital Name is required'),
    hospitalEmail: Yup.string().email('Invalid email format').required('Hospital Email is required'),
    hospitalAddress: Yup.string().required('Hospital Address is required'),
    startDate: Yup.string().required('Hospital Start Date is required'),
});