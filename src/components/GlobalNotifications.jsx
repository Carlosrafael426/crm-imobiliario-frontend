import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import api from '../services/api';
import Toast from './Toast';

export default function GlobalNotifications() {
  const notifications = useStore(state => state.notifications);
  const setNotifications = useStore(state => state.setNotifications);
  const addNotification = useStore(state => state.addNotification);
  const soundEnabled = useStore(state => state.soundEnabled);
  
  const lastIdRef = useRef(0);

  const playSound = () => {
    if (!soundEnabled) return;
    try {
      // Usando um AudioData base64 curto para um pop agradável (apenas um beep simples para o MVP)
      const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'); // Beep muito basico para evitar errors
      audio.play().catch(e => console.log('Audio block by browser:', e));
    } catch (err) {
      console.log('Error playing sound', err);
    }
  };

  const fetchGlobalNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      const data = response.data;
      
      if (data && data.length > 0) {
        // Checar se há novas
        const newNotifs = data.filter(n => n.id > lastIdRef.current);
        if (newNotifs.length > 0) {
          lastIdRef.current = Math.max(...data.map(n => n.id));
          
          newNotifs.forEach(notif => {
            playSound();
            addNotification(notif);
          });
        }
      }
    } catch (error) {
      // silenzioso para n floodar no console
    }
  };

  useEffect(() => {
    fetchGlobalNotifications();
    const interval = setInterval(fetchGlobalNotifications, 10000); // pool a cada 10s
    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
      {notifications.map((notif, idx) => (
        <Toast 
          key={notif.id + '-' + idx} 
          message={notif.message} 
          title={notif.title}
          type={notif.type}
          onClose={() => removeNotification(notif.id)} 
        />
      ))}
    </div>
  );
}
