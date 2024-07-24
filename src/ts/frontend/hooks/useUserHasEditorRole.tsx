import { useMemo } from "react"
import { useSelector } from 'react-redux';

import { RootState } from "@store/ConfigureStore";

/* determines if user has an editor or readonly role */
const useUserHasEditorRole = () => {
    const { userRole } = useSelector((state: RootState) => state.userState);

    const isEditor = useMemo(() => {
        if (!userRole) { return false }

        return ["editor", "publisher", "admin"].includes(userRole)

    }, [userRole])

    return isEditor

};

export default useUserHasEditorRole;
