import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Form = ({ isImageLoading, setImg }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const config = {
      data,
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',

      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/generate`,
    };

    try {
      setImg('');
      setIsLoading(true);
      isImageLoading(true);
      const response = await axios(config);

      setIsLoading(false);
      isImageLoading(false);

      reset();
      setImg(response.data.imageUrl);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div>
      <form id="image-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Describe an image to generate</h1>
        <p className="text-small">
          (For example: Mozart drinking wine on skates)
        </p>
        <div className="form-control">
          <input
            placeholder="Enter Text"
            {...register('prompt', { required: true })}
          />
          {errors.prompt && <p className="text-small">This is required</p>}
        </div>
        <div className="form-control">
          <select {...register('size')} defaultValue="medium">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <button className="btn" disabled={isLoading} type="submit">
          Generate
        </button>
        {isLoading && <p className="text-small">Generating image...</p>}
      </form>
    </div>
  );
};

export default Form;
