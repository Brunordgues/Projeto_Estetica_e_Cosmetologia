import { Outlet } from 'react-router'
import { SafeArea } from 'capacitor-plugin-safe-area'
import { useEffect } from 'react';
import { Keyboard } from '@capacitor/keyboard';
import AuthContext from './components/auth/AuthContext';

import './App.css'

function App() {
  useEffect(() => {
    const setStatusBarSpace = async () => {
      document.body.style.setProperty("--status-bar-space", (await SafeArea.getStatusBarHeight()).statusBarHeight + "px");
    }

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if ((target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        target.scrollIntoView({behavior: 'smooth', block: "center"});
      }
    }

    const show = Keyboard.addListener("keyboardWillShow", (keyboard) => {
      document.body.style.setProperty("--keyboard-height", keyboard.keyboardHeight * 80 / 100 + "px");

      document.activeElement?.scrollIntoView({behavior: "smooth", block: "center"});
    })

    const hide = Keyboard.addListener("keyboardWillHide", () => {
      document.body.style.setProperty("--keyboard-height", "0px");
    })

    window.addEventListener("focusin", handleFocusIn)
    setStatusBarSpace();

    return () => {
      window.removeEventListener("focus", handleFocusIn);

      show.then((e) => e.remove());
      hide.then((e) => e.remove());
    }
  }, [])

  return (
    <>
      <AuthContext>
        <Outlet />
      </AuthContext>
    </>
  )
}

export default App
