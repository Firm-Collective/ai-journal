import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';
import {Alert} from 'react-native';

// Create a custom hook to fetch user data
interface User {
  id: string;
}

const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({data: {user}}) => {
      if (user) {
        setUser(user);
      } else {
        Alert.alert('Error Accessing User');
      }
    });
  }, []);

  return user;
};

export default useFetchUser;
