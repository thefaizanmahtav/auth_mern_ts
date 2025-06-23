import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSession } from '../lib/api';


const useDeleteSession = (sessionId) => {

    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: () => deleteSession(sessionId),
        onSuccess: () => {
            queryClient.setQueryData(['sessions'], (oldSessions) => {
                return oldSessions.filter(session => session._id !== sessionId);
            });
        }
    });
    return {
        deleteSession: mutate,
        ...rest
    }
}

export default useDeleteSession;