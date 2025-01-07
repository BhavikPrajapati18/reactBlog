import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Input , Button , Logo } from './index'
import { useForm } from 'react-hook-form'
import { AuthService } from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { Link } from 'react-router-dom'

function Login() {
  const {register , handleSubmit} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const Login = async (data) => {
    console.log(data)
    setError("")
    try {
      const session = await AuthService.login(data);
    
      if (session) {
        const userData = await AuthService.userAcitve();
        if(userData)dispatch(login(userData))
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <form onSubmit={handleSubmit}
        className=''
         ><div>
          <Input
          type='email'
          name='email'
          className='mt-4'
          placeholder='Email'
          {...register("email", {
            required: true,
            validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            }
        })}
         />
         <Input
         type='password'
          name='password'
          className='mt-4'
          placeholder='Password'
          {...register('password' , {
            required: true,
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters',
            },
          })}
          />

          <Button 
          type='submit'
          children={'Login'}
          classname='w-full mt-4'
          ></Button>
          </div>

        </form>

        </div>
        </div>
  )
}

export default Login
