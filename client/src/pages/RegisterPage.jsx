import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuth, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) { navigate('/admin') }
    }, [isAuth])
    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });
    return (
        <div className='flex justify-center h-screen items-center'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md h-3/5'>
                {
                    registerErrors && registerErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white m-2' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl text-bold'>Sign up</h1>
                <form onSubmit={onSubmit}>
                    <input type="text"
                        {...register("username", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Username' />
                    {errors.username && <p className="text-red-500">Username is required</p>}
                    <input type="email"
                        {...register("email", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email' />
                    {errors.email && <p className="text-red-500">Email is required</p>}
                    <input type="password"
                        {...register("password", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Password' />
                    {errors.password && <p className="text-red-500">Password is required</p>}
                    <button type="submit" className='text-bold text-sky-500 m-2 p-2 rounded-md bg-gray-700' >Register</button>
                </form>
                <p className='flex gap-x-2 justify-between'>
                    Already have an account? <Link to="/login" className='text-bold text-sky-500'>Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage;