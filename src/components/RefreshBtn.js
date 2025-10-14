'use client'
import { useRouter } from "next/navigation";
import { IconButton } from '@mui/material';
import { RefreshIcon } from '@heroicons/react/solid';

const RefreshBtn = () => {
    const router = useRouter();
    const handleRefresh = () => {
        router.refresh();
    };

    return (
        <div>
            <IconButton
                onClick={handleRefresh}
                className=" rounded-full p-2 text-gray-400 
                           hover:bg-gray-200 disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
                <RefreshIcon style={{ width: 24, height: 24, color: 'gray' }} />
            </IconButton>
        </div>
    );
};

export default RefreshBtn;
