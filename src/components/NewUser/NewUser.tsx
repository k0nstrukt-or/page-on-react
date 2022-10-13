import React from 'react';
import { useState } from 'react';
import { addUser } from '../../api';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Loader } from '../Loader/Loader';
import { RadioButtons } from '../RadioButtons/RadioButtons';
import { Upload } from '../Upload/Upload';
import './NewUser.scss';
import { regexEmail, regexPhone } from './regex';

type Props = {
  displayUsers: (value: number) => void;
};

const errorObj = {
  name: false,
  email: false,
  phone: false,
  photo: false,
};

export const NewUser:React.FC<Props> = React.memo(({ displayUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position_id, setPositionId] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const [errors, setErrors] = useState(errorObj);
  const [isLoaded, setLoaded] = useState(true);
  const [isUploadSuccessful, setUpload] = useState(false);

  const handleNameChange = (value: string) => {
		setName(value);

		setErrors({
			...errors,
			name: (value.length < 2 || value.length > 60) ? true : false,
		})
	};

	const handleEmailChange = (value: string) => {
		setEmail(value);

		setErrors({
			...errors,
			email: (!regexEmail.test(value)) ? true : false,
		})
	};

	const handlePhoneChange= (value: string) => {
		setPhone(value);

		setErrors({
			...errors,
			phone: (!regexPhone.test(value)) ? true : false,
		})
	};

  const handlePhotoChange = (photo: File) => {
		setPhoto(photo);

		setErrors({
			...errors,
			photo: photo.size > 5242880 ? true : false,
		})

		if (!photo.name.slice(-4).toLowerCase().includes('jpg')
		&& !photo.name.slice(-4).toLowerCase().includes('jpeg')) {
			setErrors({
				...errors,
				photo: true,
			})
		} else {
			setErrors({
				...errors,
				photo: false,
			})
		}
	};

  const areInputsEmpty = !name || !email || !phone || !position_id || !photo;
  const areInputsInvalid = errors.name || errors.email || errors.phone || errors.photo;

  const isDisabled = areInputsEmpty || areInputsInvalid;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoaded(false);

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', position_id);
    formData.append('photo', photo as Blob);

    await addUser(formData)
      .then(data => {
        setUpload(true)
      })
      .catch((error) => {
        alert(error)
      })
      .finally(() => {
        setLoaded(true);
      })

    setName('');
    setEmail('');
    setPhone('');
    setPositionId('');
    setPhoto(null);

    displayUsers(6);
  };
  
  return (
    <section className='NewUser' id='NewUser'>
      <h2 className="subtitle UserList__subtitle" >
        {isUploadSuccessful
          ? (
            'User successfully registered'
          ) : (
            'Working with POST request'
          )
        } 
      </h2>

      {isUploadSuccessful
        ? (
          <div className="successImage" />
        ) : (
          <form 
            className='NewUser__form'
            onSubmit={handleSubmit}
          >
          <Input 
            type='text'
            placeholder='Your name'
            value={name}
            handleChange={handleNameChange}
            errorMessage='User name should be 2-60 characters'
            hasError={errors.name}
          />
  
          <Input 
            type='email'
            placeholder='Email'
            value={email}
            handleChange={handleEmailChange}
            errorMessage='Enter a valid email: example@domen.com'
            hasError={errors.email}
          />
  
          <Input 
            type="tel"
            placeholder='Phone'
            value={phone}
            handleChange={handlePhoneChange}
            errorMessage='Enter a valid phone number: +38 (XXX) XXX-XX-XX'
            hasError={errors.phone}
            inputHint='+38 (XXX) XXX - XX - XX'
          />
  
          <RadioButtons 
            position_id={position_id}
            handleChange={setPositionId}
          />
          
          <div className="UploadContainer">
            <Upload 
              photo={photo}
              handleChange={handlePhotoChange}
              hasError={errors.photo}
              errorMessage='Photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB.'
            />
          </div>
  
          {isLoaded
            ? (        
            <Button isDisabled={isDisabled} >
              Sign up
            </Button>
            ) : (
              <Loader />
            )
          }
          </form>
        )}

    </section>
  )}
)