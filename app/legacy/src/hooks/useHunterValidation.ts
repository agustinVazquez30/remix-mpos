import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "~/legacy/src/contexts/AppContext";
import { useAsync } from "~/legacy/src/hooks/useAsync";
import { useNavigate } from "react-router-dom";
import { validateHunterService } from "~/legacy/src/services/validate-hunter.service";

export function useHunterValidation(enabled = false) {
  const navigate = useNavigate();
  const idRef = useRef("");
  const { setHuntersData, hunter } = useContext(AppContext);
  const [isLogged, setIsLogged] = useState(!enabled);

  const { status, run } = useAsync(false, {
    onError: () => {
      enabled && navigate("/");
    },
    onSuccess: (isValid) => {
      setIsLogged(isValid);
      setHuntersData({ id: idRef.current }); // persist and revalidate when reload
    },
  });

  const validate = useCallback(
    (id: string) => {
      idRef.current = id;
      run(validateHunterService(idRef.current));
    },
    [run]
  );

  useEffect(() => {
    if (isLogged) return; // persist between hunter context navigation

    idRef.current = hunter.id;

    if (!idRef.current && enabled) {
      navigate("/");
      return;
    }

    if (enabled) {
      run(validateHunterService(hunter.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, hunter.id]);

  return {
    isLogged,
    validate,
    status,
  };
}
