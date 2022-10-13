import './Upload.scss';

type Props = {
  photo: File | null;
  handleChange: (value: File) => void;
  hasError: boolean;
  errorMessage: string;
};

export const Upload:React.FC<Props> = ({
  photo, handleChange, hasError, errorMessage, 
}) => {
  let displayedName;

  if (photo) {
    displayedName = photo.name.length > 30
      ? photo.name.slice(0,15) + '...' + photo.name.slice(-10)
      : photo.name
  }
  
  return (
    <>
      <div className='Upload'>
        <input 
          type="file" 
          className='Upload__input'
          id='upload'
          onChange={(e) => {
            if (!e.target.files) {return};
            handleChange(e.target.files[0])
          }}
        />

        <label 
          htmlFor="upload"
          className='Upload__button'
        >
          Upload
        </label>

        <p className='Upload__text'>
          {displayedName || 'Upload your photo'}
        </p>
      </div>

      <div className="Error">
        {hasError && (
          <p className='Error__Message'>
            {errorMessage}
          </p>
        )}
      </div>
    </>
    
  )
}