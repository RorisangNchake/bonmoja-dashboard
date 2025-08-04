import type { IStatus } from '../types/status';

const StatusBadge = ({ status }: IStatus) => {
    const styles = {
        success: "bg-green-100 text-green-700",
        failed: "bg-red-100 text-red-700",
    };

    return (
        <span className={`px-2 py-1 rounded-full text-sm ${styles[status]}`}>
            {status}
        </span>
    );
};

export default StatusBadge;