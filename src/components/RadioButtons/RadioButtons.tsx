import { useEffect, useState } from 'react';
import { getPositions } from '../../api';
import { Position } from '../../types/Position';
import './RadioButtons.scss';

type Props = {
  position_id: string;
  handleChange: (value: string) => void;
};

export const RadioButtons:React.FC<Props> = ({ position_id, handleChange }) => {
  const [availablePositions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    getPositions().then(data => 
      setPositions(data.positions)
    )
  }, [])

  return (
    <div className='RadioButtons'>
      <p className='RadioButtons__title'> Select your position</p>

      {availablePositions.map(position => 
        <div className='RadioButtons__item' key={position.id}> 
          <input
            id={position.name}
            type="radio" 
            name="position"
            value={position.id}
            checked={+position_id === position.id}
            className="RadioButtons__input"
            onChange={() => handleChange(position.id.toString())}
          />
          <label htmlFor={position.name} >
            {position.name}
          </label>
    </div>
      )}
    </div>
)}
