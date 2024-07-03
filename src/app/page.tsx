"use client"
import { useEffect, useState } from 'react';
import Script from 'next/script';
import Main from '../../Components/Shared/product/page'
import Loading from '../../Components/Ui/Loading/page'
export default function Home() {
  const [googleTranslateLoaded, setGoogleTranslateLoaded] = useState(false);
  const [started, setStarted] = useState(false);

  // useEffect(() => {
  //   const loadGoogleTranslateScript = async () => {
  //     if (!window.googleTranslateElementInit) {
  //       window.googleTranslateElementInit = () => {
  //         new window.google.translate.TranslateElement(
  //           { pageLanguage: 'en' },
  //           'google_translate_element'
  //         );
  //       };
  
  //       const script = document.createElement('script');
  //       script.type = 'text/javascript';
  //       script.src =
  //         'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //       script.async = true;
  //       script.defer = true;
  //       script.onload = () => {
  //         setGoogleTranslateLoaded(true);
  //       };
  //       script.onerror = (error) => {
  //         console.error('Error loading Google Translate script:', error);
  //       };
  
  //       document.head.appendChild(script);
  //     }
  //   };
  
  //   loadGoogleTranslateScript();
  
  //   return () => {
  //     // Cleanup if needed
  //     delete window.googleTranslateElementInit;
  //   };
  // }, []);
  
  return (
    <>
      {/* Add a key to Script tag to trigger re-render when the key changes */}
      <Loading started={started} setStarted={setStarted}/>
      {/* <Script key="google-translate-script">
        {`
          function changeLanguage(lang) {
            window.google.translate.translate(
              document.getElementById('google_translate_element').innerText,
              'en',
              lang,
              function (result) {
                document.getElementById('google_translate_element').innerText = result.translation;
              }
            );
          }
        `}
      </Script> */}
      <div className="main_wrapper">
        {/* <div id="google_translate_element">Translate</div> */}
        <Main />
      </div>
    </>
  );
}
