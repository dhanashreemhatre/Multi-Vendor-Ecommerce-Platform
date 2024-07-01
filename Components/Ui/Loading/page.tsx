import { useProgress } from "@react-three/drei";
import { useEffect,useState } from "react";

interface PageProps {
  started: boolean;
  setStarted: (started: boolean) => void;
}

const Page: React.FC<PageProps> = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    // Retrieve user's email from local storage
    const storedName = localStorage.getItem('userName');
    setUserName(storedName || '');

    // If the user is not logged in, redirect to the login page
   
  });
  useEffect(() => {
    console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 500);
    }
  }, [progress, total, loaded, item, setStarted]);

  return (
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 50,
      transition: 'opacity 1000ms',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#cbe4c9',
      opacity: started ? 0 : 1,
    }}
    >
      <div
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: 'rgba(62, 173, 34, 1)',
          position: 'relative',
          fontFamily:"Irish Grover"
        }}
        className="text-4xl md:text-9xl font-bold text-indigo-900 relative"
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'width 500ms',
            width: `${progress}%`,
          }}
        >
          <h1 style={{fontFamily:"Irish Grover"}}>{userName ? userName :'INCLUSIFY'}</h1>
        </div>
        <div
          style={{
            opacity: 0.4,
            fontFamily:"Irish Grover"
          }}
        >
          <h1 style={{fontFamily:"Irish Grover"}}>{userName ? userName :'INCLUSIFY'}</h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
