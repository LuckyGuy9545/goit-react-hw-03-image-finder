import './Loader.css';
import { FadeLoader } from 'react-spinners';

export default function LoaderImage() {
  return (
    <div className="loader__wrapper">
      <FadeLoader
        color="#3f51b5"
        height={40}
        loading
        margin={20}
        radius={2}
        speedMultiplier={1}
        width={10}
      />
    </div>
  );
}
