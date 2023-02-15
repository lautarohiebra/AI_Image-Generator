import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
});


const [generatingImg, setGeneratingImg] = useState(false)
const [loading, setLoading] = useState(false)

const handleChange = (e) => {
  setForm({...form, [e.target.name]: e.target.value })
}


const handleSurpriseMe = () => {
  const randomPrompt = getRandomPrompt(form, prompt)
  setForm({ ...form, prompt: randomPrompt})
}

const generateImg = async () => {
  if (form.prompt) {
    try {
      setGeneratingImg(true);
      /* change url */
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: form.prompt,
        }),
      });

      const data = await response.json();
      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    } catch (err) {
      alert(err);
    } finally {
      setGeneratingImg(false);
    }
  } else {
    alert('Please enter a prompt');
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.prompt && form.photo) {
    setLoading(true);
    try {
      /* change url */
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form }),
      });

      await response.json();
      alert('Your image has been shared!');
      navigate('/');
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  } else {
    alert('Please generate an image with proper details');
  }
};


return (
  <section className='max-w-7x1 mx-auto'>
    <div>
      <h1 className='font-extrabold text-[#222328] text-[32px]'>
        Create
      </h1>
      <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
        Create imaginative and visually stunning images through DALL-E AI and share them with the community.
      </p>
    </div>
    <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}t>
      <div className='flex flex-col gap-5'>
        <FormField
        labelName='Your Name'
        type='text'
        name='name'
        placeholder='Vincent Van Bot'
        value={form.name}
        handleChange={handleChange} 
        />

        <FormField
        labelName='Prompt'
        type='text'
        name='prompt'
        placeholder='A velociraptor working at a hotdog stand, lomography'
        value={form.prompt}
        handleChange={handleChange}
        isSurpriseMe
        handleSurpriseMe={handleSurpriseMe} />

        <div className='relative border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] w-64 p-3 h-64 flex justify-center items-center'>
          {form.photo ? (
            <img 
            src={form.photo}
            alt={form.prompt}
            className="w-full h-full object-contain" />
          ) : (
            <img 
            src={preview}
            alt={preview}
            className="w-9/12 h-9/12 object-contain opacity-40" />
          )}

            {generatingImg && (
            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
              <Loader />
            </div>
            )} 

        </div>
      </div>

      <div className='mt-5 flex gap-5'>
        <button
        type='button'
        onClick={generateImg}
        className='text-white bg-green-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          {generatingImg ? 'Generating...' : 'Generate'}
        </button>
      </div>

      <div className='mt-10'>
        <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with the community</p>

        <button
        type='submit'
        className='mt-3 text-white bg-[#6469ff] font-medium text-sm rounded-md px-5 w-full py-2.5 sm:w-auto text-center'
        > 
        {loading ? "Sharing..." : "Share with the community"}
        </button>
      </div>
    </form>
  </section>
  )
}

export default CreatePost