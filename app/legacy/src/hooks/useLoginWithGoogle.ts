import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
} from '@firebase/auth';

import {useState} from 'react';

interface IUseLoginWithGoogle {
  onSuccess: (response: UserCredential) => void;
  onError: (response: Error) => void;
}

export function useLoginWithGoogle(config: IUseLoginWithGoogle): {
  isLoading: boolean;
  refetch: () => Promise<void>;
} {
  const {onSuccess, onError} = config;
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const request = async () => {
    setIsLoading(true);

    try {
      const response = await signInWithPopup(auth, provider);
      setIsLoading(false);
      onSuccess && onSuccess(response);
    } catch (error) {
      onError && onError(error as any);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    refetch: () => request(),
  };
}
